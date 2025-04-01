
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { EmployeeAnalysis, AnalysisStatus } from "@/types";
import { analyzeEmployeeResume } from "@/lib/employeeAnalysis";
import { FileText, User } from "lucide-react";
import EmployeeResumeUploader from "@/components/EmployeeResumeUploader";
import EmployeeAnalysisCard from "@/components/EmployeeAnalysisCard";

const EmployeeDevelopment = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("upload");
  const [employeeAnalysis, setEmployeeAnalysis] = useState<EmployeeAnalysis | null>(null);
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);

  const handleResumeUpload = async (resumeText: string, currentRole: string, department: string) => {
    setAnalysisStatus(AnalysisStatus.LOADING);
    
    try {
      // Analyze the resume
      const analysis = await analyzeEmployeeResume(resumeText, currentRole, department);
      
      // Set the analysis result
      setEmployeeAnalysis(analysis);
      setAnalysisStatus(AnalysisStatus.SUCCESS);
      
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed. View your career development insights.",
      });
      
      // Switch to the results tab
      setActiveTab("results");
    } catch (error) {
      console.error("Resume analysis failed:", error);
      setAnalysisStatus(AnalysisStatus.ERROR);
      
      toast({
        title: "Analysis Failed",
        description: "There was a problem analyzing the resume.",
        variant: "destructive",
      });
    }
  };

  const generateDemoAnalysis = () => {
    setAnalysisStatus(AnalysisStatus.LOADING);
    
    // Generate a demo analysis
    analyzeEmployeeResume("Demo resume text", "Software Engineer", "Engineering")
      .then(analysis => {
        setEmployeeAnalysis(analysis);
        setAnalysisStatus(AnalysisStatus.SUCCESS);
        setActiveTab("results");
        
        toast({
          title: "Demo Analysis Generated",
          description: "A sample career analysis has been created for demonstration purposes.",
        });
      })
      .catch(error => {
        console.error("Demo analysis generation failed:", error);
        setAnalysisStatus(AnalysisStatus.ERROR);
        
        toast({
          title: "Generation Failed",
          description: "There was a problem generating the demo analysis.",
          variant: "destructive",
        });
      });
  };

  const resetAnalysis = () => {
    setEmployeeAnalysis(null);
    setAnalysisStatus(AnalysisStatus.IDLE);
    setActiveTab("upload");
    
    toast({
      title: "Analysis Reset",
      description: "Your career analysis data has been cleared.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-recruit-primary">
                Employee Development
              </h1>
              <p className="text-gray-500">AI-powered career growth analysis</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={resetAnalysis} disabled={analysisStatus === AnalysisStatus.LOADING}>
                Reset
              </Button>
              <Button onClick={generateDemoAnalysis} disabled={analysisStatus === AnalysisStatus.LOADING}>
                Generate Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="flex items-center" disabled={analysisStatus === AnalysisStatus.LOADING}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Upload Resume</span>
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center" disabled={!employeeAnalysis || analysisStatus === AnalysisStatus.LOADING}>
              <User className="mr-2 h-4 w-4" />
              <span>Analysis Results</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <EmployeeResumeUploader 
              onResumeUpload={handleResumeUpload} 
              disabled={analysisStatus === AnalysisStatus.LOADING}
            />
          </TabsContent>
          
          <TabsContent value="results">
            {employeeAnalysis ? (
              <EmployeeAnalysisCard analysis={employeeAnalysis} />
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-40">
                  <div className="text-center">
                    <User className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No analysis available yet</p>
                    <p className="text-gray-400 text-sm">
                      Upload your resume or generate a demo analysis
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default EmployeeDevelopment;
