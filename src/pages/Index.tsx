
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Candidate, JobRequirement, AnalysisStatus } from "@/types";
import { analyzeResume, generateRandomName, generateRandomEmail } from "@/lib/analysis";
import { Users, FileText, BarChartBig } from "lucide-react";
import ResumeUploader from "@/components/ResumeUploader";
import JobRequirements from "@/components/JobRequirements";
import CandidateCard from "@/components/CandidateCard";
import ResultsTable from "@/components/ResultsTable";
import MatchScore from "@/components/MatchScore";
import { v4 as uuidv4 } from "uuid";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("setup");
  const [jobRequirements, setJobRequirements] = useState<JobRequirement>({
    title: "",
    description: "",
    requiredSkills: ["JavaScript", "React", "TypeScript"],
    preferredSkills: ["Node.js", "GraphQL"],
    requiredYearsExperience: 3,
    requiredEducation: ["Bachelor's in Computer Science"]
  });
  
  const [jobSaved, setJobSaved] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | undefined>();
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);

  const saveJobRequirements = () => {
    if (!jobRequirements.title) {
      toast({
        title: "Missing Job Title",
        description: "Please enter a job title before saving.",
        variant: "destructive",
      });
      return;
    }
    
    setJobSaved(true);
    setActiveTab("candidates");
    
    toast({
      title: "Job Requirements Saved",
      description: "You can now upload candidate resumes for analysis.",
    });
  };

  const handleResumeUpload = async (name: string, email: string, resumeText: string) => {
    if (!jobSaved) {
      toast({
        title: "Save Job Requirements First",
        description: "Please define and save job requirements before uploading resumes.",
        variant: "destructive",
      });
      return;
    }
    
    setAnalysisStatus(AnalysisStatus.LOADING);
    
    try {
      // Analyze the resume
      const analysisResult = await analyzeResume(resumeText, jobRequirements);
      
      // Create a new candidate object
      const newCandidate: Candidate = {
        id: uuidv4(),
        name,
        email,
        resumeText,
        skills: analysisResult.skills || [],
        experience: analysisResult.experience || 0,
        education: analysisResult.education || [],
        matchScore: analysisResult.matchScore || 0,
        skillMatches: analysisResult.skillMatches || [],
        strengths: analysisResult.strengths || [],
        weaknesses: analysisResult.weaknesses || [],
        recommendation: analysisResult.recommendation || ""
      };
      
      // Add the new candidate to the list
      setCandidates(prev => [...prev, newCandidate]);
      setAnalysisStatus(AnalysisStatus.SUCCESS);
      
      toast({
        title: "Analysis Complete",
        description: `${name}'s resume has been analyzed.`,
      });
      
      // Switch to the results tab if this is the first candidate
      if (candidates.length === 0) {
        setActiveTab("results");
      }
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

  const selectCandidate = (candidate: Candidate) => {
    setSelectedCandidate(prev => 
      prev?.id === candidate.id ? undefined : candidate
    );
    
    if (selectedCandidate?.id !== candidate.id) {
      toast({
        title: "Candidate Selected",
        description: `${candidate.name} has been selected as a potential match.`,
      });
    }
  };

  const generateTestData = () => {
    // Check if job requirements are saved
    if (!jobSaved) {
      saveJobRequirements();
    }
    
    // Generate 5 test candidates
    const generateTestCandidates = async () => {
      setAnalysisStatus(AnalysisStatus.LOADING);
      
      try {
        const newCandidates: Candidate[] = [];
        
        for (let i = 0; i < 5; i++) {
          const name = generateRandomName();
          const email = generateRandomEmail(name);
          const resumeText = `Mock resume for ${name}`;
          
          // Analyze the mock resume
          const analysisResult = await analyzeResume(resumeText, jobRequirements);
          
          // Create a new candidate object
          const newCandidate: Candidate = {
            id: uuidv4(),
            name,
            email,
            resumeText,
            skills: analysisResult.skills || [],
            experience: analysisResult.experience || 0,
            education: analysisResult.education || [],
            matchScore: analysisResult.matchScore || 0,
            skillMatches: analysisResult.skillMatches || [],
            strengths: analysisResult.strengths || [],
            weaknesses: analysisResult.weaknesses || [],
            recommendation: analysisResult.recommendation || ""
          };
          
          newCandidates.push(newCandidate);
        }
        
        // Add the new candidates to the list
        setCandidates(prev => [...prev, ...newCandidates]);
        setAnalysisStatus(AnalysisStatus.SUCCESS);
        
        toast({
          title: "Test Data Generated",
          description: "5 test candidates have been created and analyzed.",
        });
        
        // Switch to the results tab
        setActiveTab("results");
      } catch (error) {
        console.error("Test data generation failed:", error);
        setAnalysisStatus(AnalysisStatus.ERROR);
        
        toast({
          title: "Generation Failed",
          description: "There was a problem generating test data.",
          variant: "destructive",
        });
      }
    };
    
    generateTestCandidates();
  };

  const clearAllData = () => {
    setCandidates([]);
    setSelectedCandidate(undefined);
    setJobSaved(false);
    setJobRequirements({
      title: "",
      description: "",
      requiredSkills: ["JavaScript", "React", "TypeScript"],
      preferredSkills: ["Node.js", "GraphQL"],
      requiredYearsExperience: 3,
      requiredEducation: ["Bachelor's in Computer Science"]
    });
    setActiveTab("setup");
    
    toast({
      title: "Data Cleared",
      description: "All job and candidate data has been reset.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-recruit-primary">
                Candidate Match
              </h1>
              <p className="text-gray-500">AI-powered candidate assessment tool</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={clearAllData}>
                Reset
              </Button>
              <Button onClick={generateTestData}>
                Generate Test Data
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="setup" className="flex items-center" disabled={analysisStatus === AnalysisStatus.LOADING}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Job Setup</span>
            </TabsTrigger>
            <TabsTrigger value="candidates" className="flex items-center" disabled={!jobSaved || analysisStatus === AnalysisStatus.LOADING}>
              <Users className="mr-2 h-4 w-4" />
              <span>Candidates</span>
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center" disabled={candidates.length === 0 || analysisStatus === AnalysisStatus.LOADING}>
              <BarChartBig className="mr-2 h-4 w-4" />
              <span>Results</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="setup">
            <JobRequirements 
              jobRequirements={jobRequirements}
              onChange={setJobRequirements}
              onSave={saveJobRequirements}
              disabled={jobSaved}
            />
            {jobSaved && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700">
                  Job requirements saved! 
                  <Button 
                    variant="link" 
                    className="text-green-700 underline p-0 h-auto font-normal"
                    onClick={() => setJobSaved(false)}
                  >
                    Click here to edit
                  </Button>
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="candidates">
            <ResumeUploader 
              onResumeUpload={handleResumeUpload} 
              disabled={analysisStatus === AnalysisStatus.LOADING}
            />
            
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Uploaded Candidates</h2>
                <span className="text-sm text-gray-500">{candidates.length} candidates</span>
              </div>
              
              {candidates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {candidates.map((candidate) => (
                    <CandidateCard 
                      key={candidate.id} 
                      candidate={candidate}
                      onSelect={selectCandidate}
                      selected={selectedCandidate?.id === candidate.id}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center h-40">
                    <div className="text-center">
                      <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">No candidates uploaded yet</p>
                      <p className="text-gray-400 text-sm">
                        Upload candidate resumes to start the analysis
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            {candidates.length > 0 ? (
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-1">
                        Results for {jobRequirements.title}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {candidates.length} candidates analyzed
                      </p>
                    </div>
                    
                    <ResultsTable 
                      candidates={candidates}
                      selectedCandidate={selectedCandidate}
                    />
                  </CardContent>
                </Card>
                
                {selectedCandidate && (
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-lg font-semibold mb-4">Selected Candidate Details</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Candidate Information</h3>
                          <div className="space-y-2">
                            <p><span className="font-medium">Name:</span> {selectedCandidate.name}</p>
                            <p><span className="font-medium">Email:</span> {selectedCandidate.email}</p>
                            <p><span className="font-medium">Experience:</span> {selectedCandidate.experience} years</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Strengths</h3>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            {selectedCandidate.strengths.map((strength, index) => (
                              <li key={index}>{strength}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Areas for Growth</h3>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            {selectedCandidate.weaknesses.length > 0 ? (
                              selectedCandidate.weaknesses.map((weakness, index) => (
                                <li key={index}>{weakness}</li>
                              ))
                            ) : (
                              <li>No significant weaknesses identified</li>
                            )}
                          </ul>
                        </div>
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <div className="text-center">
                        <div className="mb-2">Final Assessment</div>
                        <div className="mb-4 flex justify-center">
                          <MatchScore score={selectedCandidate.matchScore} size="lg" />
                        </div>
                        <p className="text-lg font-medium max-w-lg mx-auto">
                          {selectedCandidate.recommendation}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-40">
                  <div className="text-center">
                    <BarChartBig className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No results available</p>
                    <p className="text-gray-400 text-sm">
                      Upload and analyze candidate resumes to see results
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

export default Index;
