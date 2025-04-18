// Resume Page Component
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { ResumeEditor } from '@/components/ResumeEditor';
import { ResumePreview } from '@/components/ResumePreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

interface ResumePageProps {
  params: {
    id: string;
  };
}

async function getResume(id: string, userEmail: string) {
  const resume = await prisma.resume.findFirst({
    where: {
      id,
      user: {
        email: userEmail
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
    notFound();
  }
  
  return resume;
}

export default async function ResumePage({ params }: ResumePageProps) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return notFound();
  }
  
  const resume = await getResume(params.id, session.user.email);
  
  return (
    <div className="container mx-auto py-8">
      <Tabs defaultValue="edit" className="space-y-8">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit">
          <Suspense fallback={<EditorSkeleton />}>
            <ResumeEditor resumeId={params.id} initialData={resume} />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="preview">
          <Suspense fallback={<PreviewSkeleton />}>
            <ResumePreview resume={resume} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EditorSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-64" />
        <div className="space-x-4">
          <Skeleton className="h-10 w-32 inline-block" />
          <Skeleton className="h-10 w-32 inline-block" />
        </div>
      </div>
      
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-48 w-full" />
        </div>
      ))}
    </div>
  );
}

function PreviewSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-48" />
        <div className="space-x-4">
          <Skeleton className="h-10 w-24 inline-block" />
          <Skeleton className="h-10 w-24 inline-block" />
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-64 mx-auto" />
          <Skeleton className="h-6 w-48 mx-auto" />
        </div>
        
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-48 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Generate metadata for the page
export async function generateMetadata({ params }: ResumePageProps) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return {
      title: 'Resume Not Found'
    };
  }
  
  const resume = await getResume(params.id, session.user.email);
  
  return {
    title: `${resume.title} - Resume Builder`,
    description: `Edit and preview your resume: ${resume.title}`
  };
} 