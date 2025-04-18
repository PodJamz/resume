// Resume Editor Component
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SectionType } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { createResumeAI } from '@/lib/ai-integration';

interface ResumeEditorProps {
  resumeId?: string;
  initialData?: any;
}

export function ResumeEditor({ resumeId, initialData }: ResumeEditorProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('edit');
  const [resumeData, setResumeData] = useState(initialData || {
    title: '',
    jobRole: '',
    sections: []
  });
  const [file, setFile] = useState<File | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setResumeData(initialData);
    }
  }, [initialData]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setLoading(true);
      
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', file.name);
        
        const response = await fetch('/api/resume', {
          method: 'POST',
          body: formData
        });
        
        if (!response.ok) {
          throw new Error('Failed to upload resume');
        }
        
        const data = await response.json();
        setResumeData(data);
        router.push(`/resume/${data.id}`);
        toast({
          title: 'Resume uploaded successfully',
          description: 'Your resume has been parsed and is ready for editing.'
        });
      } catch (error) {
        console.error('Error uploading resume:', error);
        toast({
          title: 'Error uploading resume',
          description: 'There was a problem uploading your resume. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/resume/${resumeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resumeData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save resume');
      }
      
      toast({
        title: 'Resume saved successfully',
        description: 'Your changes have been saved.'
      });
    } catch (error) {
      console.error('Error saving resume:', error);
      toast({
        title: 'Error saving resume',
        description: 'There was a problem saving your changes. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeData.jobRole) {
      toast({
        title: 'Job role required',
        description: 'Please enter a job role to analyze the resume against.',
        variant: 'destructive'
      });
      return;
    }
    
    setAnalyzing(true);
    try {
      const ai = createResumeAI();
      const analysis = await ai.analyzeResume(resumeId!, resumeData.jobRole);
      setAiSuggestions(analysis.suggestions);
      setActiveTab('ai');
      
      toast({
        title: 'Analysis complete',
        description: 'AI has analyzed your resume and provided suggestions.'
      });
    } catch (error) {
      console.error('Error analyzing resume:', error);
      toast({
        title: 'Error analyzing resume',
        description: 'There was a problem analyzing your resume. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSectionSelect = async (sectionId: string) => {
    setSelectedSection(sectionId);
    try {
      const ai = createResumeAI();
      const suggestions = await ai.suggestSectionImprovements(resumeId!, sectionId);
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error('Error getting suggestions:', error);
      toast({
        title: 'Error getting suggestions',
        description: 'There was a problem getting AI suggestions. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleApplySuggestion = async (suggestionId: string) => {
    if (!selectedSection) return;
    
    try {
      const ai = createResumeAI();
      const updatedSection = await ai.applySuggestion(resumeId!, selectedSection, suggestionId);
      
      setResumeData(prev => ({
        ...prev,
        sections: prev.sections.map(section =>
          section.id === selectedSection ? updatedSection : section
        )
      }));
      
      toast({
        title: 'Suggestion applied',
        description: 'The AI suggestion has been applied to your resume.'
      });
    } catch (error) {
      console.error('Error applying suggestion:', error);
      toast({
        title: 'Error applying suggestion',
        description: 'There was a problem applying the suggestion. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const renderSection = (section: any) => {
    switch (section.type) {
      case SectionType.CONTACT:
        return (
          <div className="space-y-4">
            <Input
              value={section.content.email || ''}
              onChange={e => updateSection(section.id, 'email', e.target.value)}
              placeholder="Email"
            />
            <Input
              value={section.content.phone || ''}
              onChange={e => updateSection(section.id, 'phone', e.target.value)}
              placeholder="Phone"
            />
            <Input
              value={section.content.location || ''}
              onChange={e => updateSection(section.id, 'location', e.target.value)}
              placeholder="Location"
            />
          </div>
        );
      
      case SectionType.EXPERIENCE:
        return (
          <div className="space-y-6">
            {section.content.map((exp: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <Input
                    value={exp.title || ''}
                    onChange={e => updateExperience(section.id, index, 'title', e.target.value)}
                    placeholder="Job Title"
                    className="font-bold mb-2"
                  />
                  <Input
                    value={exp.company || ''}
                    onChange={e => updateExperience(section.id, index, 'company', e.target.value)}
                    placeholder="Company"
                    className="mb-2"
                  />
                  <Input
                    value={exp.period || ''}
                    onChange={e => updateExperience(section.id, index, 'period', e.target.value)}
                    placeholder="Period"
                  />
                </CardHeader>
                <CardContent>
                  {exp.responsibilities.map((resp: string, respIndex: number) => (
                    <Input
                      key={respIndex}
                      value={resp}
                      onChange={e => updateResponsibility(section.id, index, respIndex, e.target.value)}
                      placeholder="Responsibility"
                      className="mb-2"
                    />
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => addResponsibility(section.id, index)}
                    className="mt-2"
                  >
                    Add Responsibility
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() => addExperience(section.id)}
              className="w-full"
            >
              Add Experience
            </Button>
          </div>
        );
      
      case SectionType.EDUCATION:
        return (
          <div className="space-y-6">
            {section.content.map((edu: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <Input
                    value={edu.degree || ''}
                    onChange={e => updateEducation(section.id, index, 'degree', e.target.value)}
                    placeholder="Degree"
                    className="font-bold mb-2"
                  />
                  <Input
                    value={edu.institution || ''}
                    onChange={e => updateEducation(section.id, index, 'institution', e.target.value)}
                    placeholder="Institution"
                    className="mb-2"
                  />
                  <Input
                    value={edu.year || ''}
                    onChange={e => updateEducation(section.id, index, 'year', e.target.value)}
                    placeholder="Year"
                  />
                </CardHeader>
                <CardContent>
                  {edu.additionalInfo?.map((info: string, infoIndex: number) => (
                    <Input
                      key={infoIndex}
                      value={info}
                      onChange={e => updateEducationInfo(section.id, index, infoIndex, e.target.value)}
                      placeholder="Additional Information"
                      className="mb-2"
                    />
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => addEducationInfo(section.id, index)}
                    className="mt-2"
                  >
                    Add Information
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() => addEducation(section.id)}
              className="w-full"
            >
              Add Education
            </Button>
          </div>
        );
      
      case SectionType.SKILLS:
        return (
          <div className="space-y-6">
            {Object.entries(section.content).map(([category, skills]: [string, any]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>
                    <Input
                      value={category}
                      onChange={e => updateSkillCategory(section.id, category, e.target.value)}
                      placeholder="Category"
                      className="font-bold"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={skill}
                          onChange={e => updateSkill(section.id, category, index, e.target.value)}
                          placeholder="Skill"
                          className="w-40"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSkill(section.id, category, index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => addSkill(section.id, category)}
                      className="mt-2"
                    >
                      Add Skill
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() => addSkillCategory(section.id)}
              className="w-full"
            >
              Add Category
            </Button>
          </div>
        );
      
      default:
        return (
          <textarea
            value={section.content || ''}
            onChange={e => updateSection(section.id, 'content', e.target.value)}
            placeholder="Section content"
            className="w-full min-h-[200px] p-2 border rounded"
          />
        );
    }
  };

  const updateSection = (sectionId: string, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              content: typeof section.content === 'object'
                ? { ...section.content, [field]: value }
                : value
            }
          : section
      )
    }));
  };

  const updateExperience = (sectionId: string, expIndex: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((exp: any, index: number) =>
                index === expIndex ? { ...exp, [field]: value } : exp
              )
            }
          : section
      )
    }));
  };

  const updateResponsibility = (
    sectionId: string,
    expIndex: number,
    respIndex: number,
    value: string
  ) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((exp: any, index: number) =>
                index === expIndex
                  ? {
                      ...exp,
                      responsibilities: exp.responsibilities.map((resp: string, idx: number) =>
                        idx === respIndex ? value : resp
                      )
                    }
                  : exp
              )
            }
          : section
      )
    }));
  };

  const addResponsibility = (sectionId: string, expIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((exp: any, index: number) =>
                index === expIndex
                  ? {
                      ...exp,
                      responsibilities: [...exp.responsibilities, '']
                    }
                  : exp
              )
            }
          : section
      )
    }));
  };

  const addExperience = (sectionId: string) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              content: [
                ...section.content,
                {
                  title: '',
                  company: '',
                  period: '',
                  responsibilities: ['']
                }
              ]
            }
          : section
      )
    }));
  };

  const updateEducation = (sectionId: string, eduIndex: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((edu: any, index: number) =>
                index === eduIndex ? { ...edu, [field]: value } : edu
              )
            }
          : section
      )
    }));
  };

  const updateEducationInfo = (
    sectionId: string,
    eduIndex: number,
    infoIndex: number,
    value: string
  ) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((edu: any, index: number) =>
                index === eduIndex
                  ? {
                      ...edu,
                      additionalInfo: edu.additionalInfo.map((info: string, idx: number) =>
                        idx === infoIndex ? value : info
                      )
                    }
                  : edu
              )
            }
          : section
      )
    }));
  };

  const addEducationInfo = (sectionId: string, eduIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((edu: any, index: number) =>
                index === eduIndex
                  ? {
                      ...edu,
                      additionalInfo: [...(edu.additionalInfo || []), '']
                    }
                  : edu
              )
            }
          : section
      )
    }));
  };

  const addEducation = (sectionId: string) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              content: [
                ...section.content,
                {
                  degree: '',
                  institution: '',
                  year: '',
                  additionalInfo: []
                }
              ]
            }
          : section
      )
    }));
  };

  const updateSkillCategory = (sectionId: string, oldCategory: string, newCategory: string) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              content: Object.entries(section.content).reduce(
                (acc: any, [category, skills]) => ({
                  ...acc,
                  [category === oldCategory ? newCategory : category]: skills
                }),
                {}
              )
            }
          : section
      )
    }));
  };

  const updateSkill = (sectionId: string, category: string, skillIndex: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              content: {
                ...section.content,
                [category]: section.content[category].map((skill: string, index: number) =>
                  index === skillIndex ? value : skill
                )
              }
            }
          : section
      )
    }));
  };

  const addSkill = (sectionId: string, category: string) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              content: {
                ...section.content,
                [category]: [...section.content[category], '']
              }
            }
          : section
      )
    }));
  };

  const removeSkill = (sectionId: string, category: string, skillIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              content: {
                ...section.content,
                [category]: section.content[category].filter((_: any, index: number) => index !== skillIndex)
              }
            }
          : section
      )
    }));
  };

  const addSkillCategory = (sectionId: string) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              content: {
                ...section.content,
                'New Category': []
              }
            }
          : section
      )
    }));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-2">
          <Label htmlFor="title">Resume Title</Label>
          <Input
            id="title"
            value={resumeData.title}
            onChange={e => setResumeData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter resume title"
            className="w-64"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobRole">Target Job Role</Label>
          <Input
            id="jobRole"
            value={resumeData.jobRole || ''}
            onChange={e => setResumeData(prev => ({ ...prev, jobRole: e.target.value }))}
            placeholder="Enter target job role"
            className="w-64"
          />
        </div>
        <div className="space-x-4">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Save Changes
          </Button>
          <Button onClick={handleAnalyze} disabled={analyzing || !resumeData.jobRole}>
            {analyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Analyze with AI
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="edit">Edit Resume</TabsTrigger>
          <TabsTrigger value="ai">AI Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-8">
          {!resumeId && (
            <div className="text-center p-8 border-2 border-dashed rounded-lg">
              <Label htmlFor="file" className="cursor-pointer">
                <div className="space-y-4">
                  <div>Upload your existing resume (PDF, DOCX, or TXT)</div>
                  <Button variant="secondary">Choose File</Button>
                </div>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </Label>
            </div>
          )}

          {resumeData.sections.map((section: any) => (
            <Card key={section.id}>
              <CardHeader>
                <CardTitle>{section.type}</CardTitle>
              </CardHeader>
              <CardContent>
                {renderSection(section)}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="ai" className="space-y-8">
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1 space-y-4">
              <h3 className="font-semibold">Resume Sections</h3>
              {resumeData.sections.map((section: any) => (
                <Button
                  key={section.id}
                  variant={selectedSection === section.id ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => handleSectionSelect(section.id)}
                >
                  {section.type}
                </Button>
              ))}
            </div>

            <div className="col-span-2 space-y-4">
              <h3 className="font-semibold">AI Suggestions</h3>
              {aiSuggestions.map((suggestion: any) => (
                <Card key={suggestion.id}>
                  <CardHeader>
                    <CardTitle>Suggestion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{suggestion.content}</p>
                    <Button
                      onClick={() => handleApplySuggestion(suggestion.id)}
                      variant="outline"
                    >
                      Apply Suggestion
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 