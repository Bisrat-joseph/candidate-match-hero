
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Upload } from "lucide-react";

interface ResumeUploaderProps {
  onResumeUpload: (name: string, email: string, resumeText: string) => void;
  disabled?: boolean;
}

const ResumeUploader = ({ onResumeUpload, disabled }: ResumeUploaderProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Check file type - in a real app, you would check for PDF, DOCX, etc.
    if (!file.name.endsWith('.txt') && !file.name.endsWith('.pdf') && !file.name.endsWith('.docx')) {
      toast({
        title: "Invalid File Format",
        description: "Please upload a .txt, .pdf, or .docx file.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      // In a real app, you would use a proper parser for PDF and DOCX files
      // Here we're just handling text files as an example
      const text = e.target?.result as string;
      
      if (!name || !email) {
        toast({
          title: "Missing Information",
          description: "Please enter candidate name and email before uploading resume.",
          variant: "destructive",
        });
        return;
      }
      
      onResumeUpload(name, email, text);
      
      toast({
        title: "Resume Uploaded",
        description: `${file.name} was successfully uploaded for ${name}.`,
      });
      
      // Clear the form
      setName("");
      setEmail("");
    };
    
    reader.onerror = () => {
      toast({
        title: "Error Reading File",
        description: "There was a problem reading the file.",
        variant: "destructive",
      });
    };
    
    reader.readAsText(file);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-recruit-primary flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Resume Upload
        </CardTitle>
        <CardDescription>
          Upload candidate information and resume for analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Candidate Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter candidate name"
                disabled={disabled}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Candidate Email
              </label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter candidate email"
                disabled={disabled}
                className="mt-1"
              />
            </div>
          </div>
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? "border-recruit-primary bg-blue-50" : "border-gray-300"
            } ${disabled ? "opacity-50" : "cursor-pointer"}`}
            onDragOver={(e) => {
              e.preventDefault();
              if (!disabled) setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            onClick={() => {
              if (!disabled) document.getElementById("resumeUpload")?.click();
            }}
          >
            <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-recruit-primary">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PDF, DOCX, or TXT files (In this demo, only TXT files will be parsed)
            </p>
            <Input
              id="resumeUpload"
              type="file"
              onChange={handleFileInput}
              accept=".txt,.pdf,.docx"
              disabled={disabled}
              className="hidden"
            />
          </div>
          
          <Button 
            className="w-full" 
            disabled={disabled || !name || !email}
            onClick={() => document.getElementById("resumeUpload")?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Resume
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeUploader;
