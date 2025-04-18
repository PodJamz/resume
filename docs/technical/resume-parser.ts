// Resume parser implementation
import * as pdfjs from 'pdfjs-dist';
import { Document } from 'docx';
import { SectionType } from '@prisma/client';

// PDF Parser
export async function parsePDFResume(fileBuffer: Buffer): Promise<string> {
  // Load the PDF document
  const loadingTask = pdfjs.getDocument({ data: fileBuffer });
  const pdf = await loadingTask.promise;
  
  let fullText = '';
  
  // Extract text from each page
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map(item => 'str' in item ? item.str : '')
      .join(' ');
    fullText += pageText + '\n';
  }
  
  return fullText;
}

// DOCX Parser
export async function parseDocxResume(fileBuffer: Buffer): Promise<string> {
  const doc = new Document(fileBuffer);
  return doc.getText();
}

// Section Detection
interface ResumeSection {
  type: SectionType;
  content: string;
}

export function detectResumeSections(text: string): ResumeSection[] {
  const sections: ResumeSection[] = [];
  
  // Define section patterns
  const sectionPatterns = [
    { type: SectionType.CONTACT, regex: /(?:CONTACT|PERSONAL)\s+(?:INFORMATION|INFO|DETAILS)/i },
    { type: SectionType.SUMMARY, regex: /(?:SUMMARY|PROFILE|OBJECTIVE|ABOUT)/i },
    { type: SectionType.EXPERIENCE, regex: /(?:EXPERIENCE|EMPLOYMENT|WORK|PROFESSIONAL)/i },
    { type: SectionType.EDUCATION, regex: /EDUCATION/i },
    { type: SectionType.SKILLS, regex: /(?:SKILLS|TECHNOLOGIES|COMPETENCIES)/i },
    { type: SectionType.PROJECTS, regex: /(?:PROJECTS|PORTFOLIO)/i },
    { type: SectionType.CERTIFICATIONS, regex: /(?:CERTIFICATIONS|CERTIFICATES|LICENSES)/i }
  ];
  
  // Split text into lines
  const lines = text.split('\n')
    .map(line => line.trim())
    .filter(line => line);
  
  // Identify sections
  let currentSection: SectionType = SectionType.CUSTOM;
  let currentContent: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if line is a section header
    const sectionMatch = sectionPatterns.find(pattern => pattern.regex.test(line));
    
    if (sectionMatch || i === lines.length - 1) {
      // Save previous section if it exists
      if (currentContent.length > 0) {
        sections.push({
          type: currentSection,
          content: currentContent.join('\n')
        });
      }
      
      // Start new section
      if (sectionMatch) {
        currentSection = sectionMatch.type;
        currentContent = [];
      } else {
        // Add last line to current section
        currentContent.push(line);
        sections.push({
          type: currentSection,
          content: currentContent.join('\n')
        });
      }
    } else {
      // Add line to current section
      currentContent.push(line);
    }
  }
  
  // If we couldn't identify any sections, create a generic one
  if (sections.length === 0) {
    sections.push({
      type: SectionType.CUSTOM,
      content: text
    });
  }
  
  return sections;
}

// Content Refinement
interface RefinedSection {
  type: SectionType;
  content: any; // Structure depends on section type
}

export function refineSection(section: ResumeSection): RefinedSection {
  switch (section.type) {
    case SectionType.CONTACT:
      return refineContactSection(section);
    case SectionType.EXPERIENCE:
      return refineExperienceSection(section);
    case SectionType.EDUCATION:
      return refineEducationSection(section);
    case SectionType.SKILLS:
      return refineSkillsSection(section);
    default:
      return {
        type: section.type,
        content: section.content
      };
  }
}

function refineContactSection(section: ResumeSection): RefinedSection {
  const lines = section.content.split('\n');
  const contact: any = {};
  
  // Extract email
  const emailMatch = section.content.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch) {
    contact.email = emailMatch[0];
  }
  
  // Extract phone
  const phoneMatch = section.content.match(/(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
  if (phoneMatch) {
    contact.phone = phoneMatch[0];
  }
  
  // Extract location
  const locationLines = lines.filter(line => 
    /^[A-Za-z\s]+,\s*[A-Za-z]{2}/.test(line) || 
    /^[A-Za-z\s]+,\s*[A-Za-z\s]+$/.test(line)
  );
  if (locationLines.length > 0) {
    contact.location = locationLines[0];
  }
  
  return {
    type: SectionType.CONTACT,
    content: contact
  };
}

function refineExperienceSection(section: ResumeSection): RefinedSection {
  const lines = section.content.split('\n');
  const experiences: any[] = [];
  let currentExp: any = {};
  
  for (const line of lines) {
    // Look for company and title pattern
    const titleMatch = line.match(/^(.+?)\s*(?:at|@|,)\s*(.+)$/i);
    if (titleMatch) {
      if (currentExp.company) {
        experiences.push(currentExp);
      }
      currentExp = {
        title: titleMatch[1].trim(),
        company: titleMatch[2].trim(),
        responsibilities: []
      };
      continue;
    }
    
    // Look for date range
    const dateMatch = line.match(/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*\d{4}\s*(?:-|–|to)\s*(?:Present|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*\d{4})/i);
    if (dateMatch && currentExp.company) {
      currentExp.period = dateMatch[0];
      continue;
    }
    
    // Add other lines as responsibilities
    if (currentExp.company && line.trim()) {
      currentExp.responsibilities.push(line.trim());
    }
  }
  
  // Add the last experience
  if (currentExp.company) {
    experiences.push(currentExp);
  }
  
  return {
    type: SectionType.EXPERIENCE,
    content: experiences
  };
}

function refineEducationSection(section: ResumeSection): RefinedSection {
  const lines = section.content.split('\n');
  const education: any[] = [];
  let currentEdu: any = {};
  
  for (const line of lines) {
    // Look for degree and institution pattern
    const degreeMatch = line.match(/^(.+?)\s*(?:from|at|,)\s*(.+)$/i);
    if (degreeMatch) {
      if (currentEdu.institution) {
        education.push(currentEdu);
      }
      currentEdu = {
        degree: degreeMatch[1].trim(),
        institution: degreeMatch[2].trim()
      };
      continue;
    }
    
    // Look for graduation year
    const yearMatch = line.match(/\b(19|20)\d{2}\b/);
    if (yearMatch && currentEdu.institution) {
      currentEdu.year = yearMatch[0];
      continue;
    }
    
    // Add other lines as additional info
    if (currentEdu.institution && line.trim()) {
      if (!currentEdu.additionalInfo) {
        currentEdu.additionalInfo = [];
      }
      currentEdu.additionalInfo.push(line.trim());
    }
  }
  
  // Add the last education entry
  if (currentEdu.institution) {
    education.push(currentEdu);
  }
  
  return {
    type: SectionType.EDUCATION,
    content: education
  };
}

function refineSkillsSection(section: ResumeSection): RefinedSection {
  const content = section.content;
  const skillGroups: any = {};
  
  // Common skill categories
  const categories = {
    technical: /(?:technical|programming|development|software|languages|frameworks)/i,
    soft: /(?:soft skills|interpersonal|communication)/i,
    tools: /(?:tools|platforms|software|applications)/i,
    languages: /(?:languages|spoken languages)/i
  };
  
  // Split content into lines and process
  const lines = content.split('\n').map(line => line.trim()).filter(Boolean);
  
  let currentCategory = 'uncategorized';
  let skills: string[] = [];
  
  for (const line of lines) {
    // Check if line is a category header
    let isHeader = false;
    for (const [category, pattern] of Object.entries(categories)) {
      if (pattern.test(line)) {
        if (skills.length > 0) {
          skillGroups[currentCategory] = skills;
        }
        currentCategory = category;
        skills = [];
        isHeader = true;
        break;
      }
    }
    
    if (!isHeader) {
      // Split line into individual skills
      const lineSkills = line
        .split(/[,|•]/)
        .map(skill => skill.trim())
        .filter(Boolean);
      skills.push(...lineSkills);
    }
  }
  
  // Add remaining skills
  if (skills.length > 0) {
    skillGroups[currentCategory] = skills;
  }
  
  return {
    type: SectionType.SKILLS,
    content: skillGroups
  };
}

// Main parser function
export async function parseResume(file: Buffer, fileType: string): Promise<ResumeSection[]> {
  let text = '';
  
  // Extract text based on file type
  if (fileType === 'application/pdf') {
    text = await parsePDFResume(file);
  } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    text = await parseDocxResume(file);
  } else if (fileType === 'text/plain') {
    text = file.toString('utf-8');
  } else {
    throw new Error('Unsupported file type');
  }
  
  // Detect sections
  const sections = detectResumeSections(text);
  
  // Refine each section
  return sections.map(section => refineSection(section));
} 