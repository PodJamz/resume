// Resume Preview Component
'use client';

import { useState } from 'react';
import { SectionType } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Printer } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

interface ResumePreviewProps {
  resume: any;
  className?: string;
}

export function ResumePreview({ resume, className = '' }: ResumePreviewProps) {
  const [selectedVersion, setSelectedVersion] = useState(resume.currentVersion.id);
  const printRef = React.useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    content: () => printRef.current
  });
  
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${resume.title.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  const currentVersion = resume.versions.find((v: any) => v.id === selectedVersion) || resume.currentVersion;
  
  const renderContactSection = (section: any) => {
    const { email, phone, location } = section.content;
    return (
      <div className="text-center mb-8">
        {email && <div>{email}</div>}
        {phone && <div>{phone}</div>}
        {location && <div>{location}</div>}
      </div>
    );
  };
  
  const renderExperienceSection = (section: any) => {
    return (
      <div className="space-y-6">
        {section.content.map((exp: any, index: number) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{exp.title}</h3>
                <div className="text-gray-600">{exp.company}</div>
              </div>
              <div className="text-gray-600">{exp.period}</div>
            </div>
            <ul className="list-disc ml-6 mt-2">
              {exp.responsibilities.map((resp: string, idx: number) => (
                <li key={idx}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };
  
  const renderEducationSection = (section: any) => {
    return (
      <div className="space-y-6">
        {section.content.map((edu: any, index: number) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{edu.degree}</h3>
                <div className="text-gray-600">{edu.institution}</div>
              </div>
              <div className="text-gray-600">{edu.year}</div>
            </div>
            {edu.additionalInfo?.length > 0 && (
              <ul className="list-disc ml-6 mt-2">
                {edu.additionalInfo.map((info: string, idx: number) => (
                  <li key={idx}>{info}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  const renderSkillsSection = (section: any) => {
    return (
      <div className="space-y-4">
        {Object.entries(section.content).map(([category, skills]: [string, any]) => (
          <div key={category}>
            <h3 className="font-semibold mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 rounded text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderSection = (section: any) => {
    switch (section.type) {
      case SectionType.CONTACT:
        return renderContactSection(section);
      case SectionType.EXPERIENCE:
        return renderExperienceSection(section);
      case SectionType.EDUCATION:
        return renderEducationSection(section);
      case SectionType.SKILLS:
        return renderSkillsSection(section);
      default:
        return <div className="whitespace-pre-wrap">{section.content}</div>;
    }
  };
  
  const orderedSections = currentVersion.sections.sort((a: any, b: any) => {
    const order = [
      SectionType.CONTACT,
      SectionType.SUMMARY,
      SectionType.EXPERIENCE,
      SectionType.EDUCATION,
      SectionType.SKILLS,
      SectionType.PROJECTS,
      SectionType.CERTIFICATIONS,
      SectionType.CUSTOM
    ];
    return order.indexOf(a.type) - order.indexOf(b.type);
  });

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Select value={selectedVersion} onValueChange={setSelectedVersion}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select version" />
            </SelectTrigger>
            <SelectContent>
              {resume.versions.map((version: any) => (
                <SelectItem key={version.id} value={version.id}>
                  {new Date(version.createdAt).toLocaleDateString()} {version.id === resume.currentVersionId && '(Current)'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-4">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
      
      <div
        ref={printRef}
        className="bg-white p-8 shadow-lg rounded-lg max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{resume.title}</h1>
          {resume.jobRole && (
            <div className="text-gray-600">Target Role: {resume.jobRole}</div>
          )}
        </div>
        
        {orderedSections.map((section: any) => (
          <Card key={section.id} className="mb-6">
            <CardHeader>
              <CardTitle>{section.type}</CardTitle>
            </CardHeader>
            <CardContent>
              {renderSection(section)}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 