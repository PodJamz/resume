// Home Page Component
import { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, FileText, Clock } from 'lucide-react';
import Link from 'next/link';

async function getRecentResumes(userEmail: string) {
  return await prisma.resume.findMany({
    where: {
      user: {
        email: userEmail
      }
    },
    orderBy: {
      updatedAt: 'desc'
    },
    take: 6,
    include: {
      currentVersion: {
        include: {
          sections: true
        }
      }
    }
  });
}

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return (
      <div className="container mx-auto py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Build Your Perfect Resume with AI
          </h1>
          <p className="text-xl text-gray-600">
            Create professional resumes tailored to your target job roles with the help of AI-powered suggestions and real-time feedback.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/api/auth/signin">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <Card>
              <CardHeader>
                <CardTitle>Smart Resume Parsing</CardTitle>
              </CardHeader>
              <CardContent>
                Upload your existing resume in PDF, DOCX, or TXT format and our AI will automatically parse and organize your information.
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                Get intelligent suggestions to improve your resume content based on your target job role and industry best practices.
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Version History</CardTitle>
              </CardHeader>
              <CardContent>
                Keep track of all changes with automatic version history and easily switch between different versions of your resume.
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
  const recentResumes = await getRecentResumes(session.user.email);
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Resumes</h1>
        <Button asChild>
          <Link href="/resume/new">
            <Plus className="w-4 h-4 mr-2" />
            Create New Resume
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentResumes.map(resume => (
          <Link key={resume.id} href={`/resume/${resume.id}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {resume.title}
                </CardTitle>
                {resume.jobRole && (
                  <CardDescription>Target Role: {resume.jobRole}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  {resume.currentVersion.sections.length} sections
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  Last updated {new Date(resume.updatedAt).toLocaleDateString()}
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
        
        {recentResumes.length === 0 && (
          <Card className="col-span-full p-8 text-center">
            <CardContent>
              <p className="text-gray-600 mb-4">You haven't created any resumes yet.</p>
              <Button asChild>
                <Link href="/resume/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Resume
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export const metadata = {
  title: 'AI Resume Builder',
  description: 'Create professional resumes tailored to your target job roles with AI-powered suggestions.'
};

function ResumesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-24" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-4 w-36" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 