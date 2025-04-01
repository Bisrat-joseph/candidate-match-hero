
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { JobRequirement } from '@/types';
import { X, Save, Plus, FileText } from 'lucide-react';

interface JobRequirementsProps {
  jobRequirements: JobRequirement;
  onChange: (requirements: JobRequirement) => void;
  onSave: () => void;
  disabled?: boolean;
}

const JobRequirements = ({ jobRequirements, onChange, onSave, disabled }: JobRequirementsProps) => {
  const [newRequiredSkill, setNewRequiredSkill] = useState("");
  const [newPreferredSkill, setNewPreferredSkill] = useState("");
  const [newEducation, setNewEducation] = useState("");

  const addRequiredSkill = () => {
    if (!newRequiredSkill.trim()) return;
    
    onChange({
      ...jobRequirements,
      requiredSkills: [...jobRequirements.requiredSkills, newRequiredSkill.trim()]
    });
    
    setNewRequiredSkill("");
  };

  const removeRequiredSkill = (skill: string) => {
    onChange({
      ...jobRequirements,
      requiredSkills: jobRequirements.requiredSkills.filter(s => s !== skill)
    });
  };

  const addPreferredSkill = () => {
    if (!newPreferredSkill.trim()) return;
    
    onChange({
      ...jobRequirements,
      preferredSkills: [...jobRequirements.preferredSkills, newPreferredSkill.trim()]
    });
    
    setNewPreferredSkill("");
  };

  const removePreferredSkill = (skill: string) => {
    onChange({
      ...jobRequirements,
      preferredSkills: jobRequirements.preferredSkills.filter(s => s !== skill)
    });
  };

  const addEducation = () => {
    if (!newEducation.trim()) return;
    
    onChange({
      ...jobRequirements,
      requiredEducation: [...jobRequirements.requiredEducation, newEducation.trim()]
    });
    
    setNewEducation("");
  };

  const removeEducation = (education: string) => {
    onChange({
      ...jobRequirements,
      requiredEducation: jobRequirements.requiredEducation.filter(e => e !== education)
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-recruit-primary flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Job Requirements
        </CardTitle>
        <CardDescription>
          Define the requirements for this position
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="jobTitle" className="text-sm font-medium text-gray-700">
            Job Title
          </label>
          <Input
            id="jobTitle"
            value={jobRequirements.title}
            onChange={(e) => onChange({ ...jobRequirements, title: e.target.value })}
            placeholder="e.g. Senior Frontend Developer"
            disabled={disabled}
            className="mt-1"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            Job Description
          </label>
          <Textarea
            id="description"
            value={jobRequirements.description}
            onChange={(e) => onChange({ ...jobRequirements, description: e.target.value })}
            placeholder="Enter a detailed job description"
            disabled={disabled}
            className="mt-1 min-h-24"
          />
        </div>
        
        <div>
          <label htmlFor="experience" className="text-sm font-medium text-gray-700">
            Required Years of Experience
          </label>
          <Input
            id="experience"
            type="number"
            min="0"
            value={jobRequirements.requiredYearsExperience.toString()}
            onChange={(e) => onChange({ 
              ...jobRequirements, 
              requiredYearsExperience: parseInt(e.target.value) || 0 
            })}
            placeholder="e.g. 3"
            disabled={disabled}
            className="mt-1"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700">
            Required Skills
          </label>
          <div className="flex flex-wrap gap-2 mt-2 mb-3">
            {jobRequirements.requiredSkills.map((skill, index) => (
              <Badge key={index} className="bg-recruit-primary hover:bg-recruit-primary/90">
                {skill}
                {!disabled && (
                  <button 
                    className="ml-1 hover:bg-blue-600 rounded-full p-1" 
                    onClick={() => removeRequiredSkill(skill)}
                  >
                    <X className="h-2 w-2" />
                  </button>
                )}
              </Badge>
            ))}
            {jobRequirements.requiredSkills.length === 0 && (
              <span className="text-gray-400 text-sm">No required skills added</span>
            )}
          </div>
          {!disabled && (
            <div className="flex space-x-2">
              <Input
                value={newRequiredSkill}
                onChange={(e) => setNewRequiredSkill(e.target.value)}
                placeholder="e.g. React"
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addRequiredSkill();
                  }
                }}
              />
              <Button 
                type="button" 
                onClick={addRequiredSkill} 
                variant="secondary" 
                size="icon"
                disabled={!newRequiredSkill}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700">
            Preferred Skills
          </label>
          <div className="flex flex-wrap gap-2 mt-2 mb-3">
            {jobRequirements.preferredSkills.map((skill, index) => (
              <Badge key={index} className="bg-recruit-secondary hover:bg-recruit-secondary/90">
                {skill}
                {!disabled && (
                  <button 
                    className="ml-1 hover:bg-gray-600 rounded-full p-1" 
                    onClick={() => removePreferredSkill(skill)}
                  >
                    <X className="h-2 w-2" />
                  </button>
                )}
              </Badge>
            ))}
            {jobRequirements.preferredSkills.length === 0 && (
              <span className="text-gray-400 text-sm">No preferred skills added</span>
            )}
          </div>
          {!disabled && (
            <div className="flex space-x-2">
              <Input
                value={newPreferredSkill}
                onChange={(e) => setNewPreferredSkill(e.target.value)}
                placeholder="e.g. GraphQL"
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addPreferredSkill();
                  }
                }}
              />
              <Button 
                type="button" 
                onClick={addPreferredSkill} 
                variant="secondary" 
                size="icon"
                disabled={!newPreferredSkill}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700">
            Required Education
          </label>
          <div className="flex flex-wrap gap-2 mt-2 mb-3">
            {jobRequirements.requiredEducation.map((education, index) => (
              <Badge key={index} className="bg-recruit-dark hover:bg-recruit-dark/90">
                {education}
                {!disabled && (
                  <button 
                    className="ml-1 hover:bg-gray-900 rounded-full p-1" 
                    onClick={() => removeEducation(education)}
                  >
                    <X className="h-2 w-2" />
                  </button>
                )}
              </Badge>
            ))}
            {jobRequirements.requiredEducation.length === 0 && (
              <span className="text-gray-400 text-sm">No education requirements added</span>
            )}
          </div>
          {!disabled && (
            <div className="flex space-x-2">
              <Input
                value={newEducation}
                onChange={(e) => setNewEducation(e.target.value)}
                placeholder="e.g. Bachelor's in Computer Science"
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addEducation();
                  }
                }}
              />
              <Button 
                type="button" 
                onClick={addEducation} 
                variant="secondary" 
                size="icon"
                disabled={!newEducation}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={onSave} 
          disabled={disabled || !jobRequirements.title} 
          className="bg-recruit-primary hover:bg-recruit-primary/90"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Requirements
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobRequirements;
