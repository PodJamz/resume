// API Routes implementation
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { parseResume } from '@/lib/resume-parser';
import { createResumeAI } from '@/lib/ai-integration';
import { z } from 'zod';

// Validation schemas
const createResumeSchema = z.object({
  title: z.string().min(1),
  jobRole: z.string().optional(),
  file: z.instanceof(Buffer),
  fileType: z.string()
});

const updateResumeSchema = z.object({
  resumeId: z.string(),
  title: z.string().min(1).optional(),
  jobRole: z.string().optional(),
  sections: z.array(z.object({
    id: z.string().optional(),
    type: z.enum(['CONTACT', 'SUMMARY', 'EXPERIENCE', 'EDUCATION', 'SKILLS', 'PROJECTS', 'CERTIFICATIONS', 'CUSTOM']),
    content: z.any()
  })).optional()
});

// Resume creation endpoint
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get authenticated user
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Validate request body
    const validatedData = createResumeSchema.parse(req.body);
    
    // Parse resume file
    const parsedSections = await parseResume(validatedData.file, validatedData.fileType);
    
    // Create resume in database
    const resume = await prisma.resume.create({
      data: {
        title: validatedData.title,
        jobRole: validatedData.jobRole,
        user: {
          connect: {
            email: session.user.email
          }
        },
        currentVersion: {
          create: {
            sections: {
              createMany: {
                data: parsedSections.map(section => ({
                  type: section.type,
                  content: section.content
                }))
              }
            }
          }
        }
      },
      include: {
        currentVersion: {
          include: {
            sections: true
          }
        }
      }
    });
    
    // If job role is provided, analyze resume with AI
    if (validatedData.jobRole) {
      const ai = createResumeAI();
      await ai.analyzeResume(resume.id, validatedData.jobRole);
    }
    
    return res.status(201).json(resume);
  } catch (error) {
    console.error('Error creating resume:', error);
    return res.status(400).json({ error: 'Invalid request' });
  }
}

// Resume update endpoint
export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get authenticated user
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Validate request body
    const validatedData = updateResumeSchema.parse(req.body);
    
    // Check resume ownership
    const resume = await prisma.resume.findFirst({
      where: {
        id: validatedData.resumeId,
        user: {
          email: session.user.email
        }
      }
    });
    
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    
    // Create new version with updated sections
    if (validatedData.sections) {
      const newVersion = await prisma.resumeVersion.create({
        data: {
          resume: {
            connect: {
              id: resume.id
            }
          },
          sections: {
            createMany: {
              data: validatedData.sections.map(section => ({
                type: section.type,
                content: section.content
              }))
            }
          }
        }
      });
      
      // Update resume with new version
      await prisma.resume.update({
        where: {
          id: resume.id
        },
        data: {
          currentVersionId: newVersion.id,
          title: validatedData.title,
          jobRole: validatedData.jobRole
        }
      });
    } else {
      // Update resume metadata only
      await prisma.resume.update({
        where: {
          id: resume.id
        },
        data: {
          title: validatedData.title,
          jobRole: validatedData.jobRole
        }
      });
    }
    
    // Fetch updated resume
    const updatedResume = await prisma.resume.findUnique({
      where: {
        id: resume.id
      },
      include: {
        currentVersion: {
          include: {
            sections: true
          }
        }
      }
    });
    
    return res.status(200).json(updatedResume);
  } catch (error) {
    console.error('Error updating resume:', error);
    return res.status(400).json({ error: 'Invalid request' });
  }
}

// Resume deletion endpoint
export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get authenticated user
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { resumeId } = req.query;
    
    // Check resume ownership
    const resume = await prisma.resume.findFirst({
      where: {
        id: resumeId as string,
        user: {
          email: session.user.email
        }
      }
    });
    
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    
    // Delete resume and all associated data
    await prisma.resume.delete({
      where: {
        id: resume.id
      }
    });
    
    return res.status(204).end();
  } catch (error) {
    console.error('Error deleting resume:', error);
    return res.status(400).json({ error: 'Invalid request' });
  }
}

// Get user's resumes endpoint
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get authenticated user
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Fetch all resumes for the user
    const resumes = await prisma.resume.findMany({
      where: {
        user: {
          email: session.user.email
        }
      },
      include: {
        currentVersion: {
          include: {
            sections: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });
    
    return res.status(200).json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}

// Get single resume endpoint
export async function GET_ONE(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get authenticated user
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { resumeId } = req.query;
    
    // Fetch resume with all versions
    const resume = await prisma.resume.findFirst({
      where: {
        id: resumeId as string,
        user: {
          email: session.user.email
        }
      },
      include: {
        versions: {
          include: {
            sections: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        currentVersion: {
          include: {
            sections: true
          }
        }
      }
    });
    
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    
    return res.status(200).json(resume);
  } catch (error) {
    console.error('Error fetching resume:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}

// AI analysis endpoint
export async function POST_ANALYZE(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get authenticated user
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { resumeId, jobRole } = req.body;
    
    if (!resumeId || !jobRole) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Check resume ownership
    const resume = await prisma.resume.findFirst({
      where: {
        id: resumeId,
        user: {
          email: session.user.email
        }
      }
    });
    
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    
    // Perform AI analysis
    const ai = createResumeAI();
    const analysis = await ai.analyzeResume(resumeId, jobRole);
    
    return res.status(200).json(analysis);
  } catch (error) {
    console.error('Error analyzing resume:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}

// AI suggestion endpoint
export async function POST_SUGGEST(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get authenticated user
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { resumeId, sectionId } = req.body;
    
    if (!resumeId || !sectionId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Check resume ownership
    const resume = await prisma.resume.findFirst({
      where: {
        id: resumeId,
        user: {
          email: session.user.email
        }
      },
      include: {
        currentVersion: {
          include: {
            sections: true
          }
        }
      }
    });
    
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    
    // Get AI suggestions
    const ai = createResumeAI();
    const suggestions = await ai.suggestSectionImprovements(resumeId, sectionId);
    
    return res.status(200).json(suggestions);
  } catch (error) {
    console.error('Error getting suggestions:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}

// Apply AI suggestion endpoint
export async function POST_APPLY_SUGGESTION(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get authenticated user
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { resumeId, sectionId, suggestionId } = req.body;
    
    if (!resumeId || !sectionId || !suggestionId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Check resume ownership
    const resume = await prisma.resume.findFirst({
      where: {
        id: resumeId,
        user: {
          email: session.user.email
        }
      }
    });
    
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    
    // Apply suggestion
    const ai = createResumeAI();
    const updatedSection = await ai.applySuggestion(resumeId, sectionId, suggestionId);
    
    return res.status(200).json(updatedSection);
  } catch (error) {
    console.error('Error applying suggestion:', error);
    return res.status(500).json({ error: 'Server error' });
  }
} 