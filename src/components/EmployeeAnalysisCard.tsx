
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BadgeCheck, BookOpen, TrendingUp, User, Mail, Briefcase, Award, Building } from "lucide-react";
import { EmployeeAnalysis } from "@/types";

interface EmployeeAnalysisCardProps {
  analysis: EmployeeAnalysis;
}

const EmployeeAnalysisCard = ({ analysis }: EmployeeAnalysisCardProps) => {
  // Get initials from employee name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-recruit-primary text-white">
              {getInitials(analysis.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg">{analysis.name}</CardTitle>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Mail className="h-3.5 w-3.5 mr-1" />
                <span>{analysis.email}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="h-3.5 w-3.5 mr-1" />
                <span>{analysis.currentRole}</span>
              </div>
              <div className="flex items-center">
                <Building className="h-3.5 w-3.5 mr-1" />
                <span>{analysis.department}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                <BadgeCheck className="h-4 w-4 text-recruit-primary" />
                <span>Key Strengths</span>
              </h4>
              <ul className="text-sm list-disc pl-5 space-y-0.5">
                {analysis.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                <TrendingUp className="h-4 w-4 text-recruit-primary" />
                <span>Areas for Growth</span>
              </h4>
              <ul className="text-sm list-disc pl-5 space-y-0.5">
                {analysis.areasForImprovement.map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                <BookOpen className="h-4 w-4 text-recruit-primary" />
                <span>Training Recommendations</span>
              </h4>
              <ul className="text-sm list-disc pl-5 space-y-0.5">
                {analysis.trainingRecommendations.map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                ))}
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium mb-2">Performance Assessment</h4>
              <div className="text-sm bg-gray-50 p-3 rounded border border-gray-100">
                {analysis.performanceFeedback}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium flex items-center gap-1 mb-3">
                <Award className="h-4 w-4 text-recruit-primary" />
                <span>Career Path Recommendations</span>
              </h4>
              <div className="space-y-3">
                {analysis.careerPathSuggestions.slice(0, 3).map((path, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b flex items-center justify-between">
                      <div className="font-medium">{path.role}</div>
                      <Badge variant={path.matchScore >= 70 ? "default" : "outline"}>
                        {path.matchScore}% Match
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-3">
                        <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                          <span>Readiness</span>
                          <span>{path.timeToReady}</span>
                        </div>
                        <Progress value={
                          path.timeToReady === "Ready now" ? 100 :
                          path.timeToReady === "3-6 months" ? 75 :
                          path.timeToReady === "6-12 months" ? 50 : 25
                        } className="h-2" />
                      </div>
                      <h5 className="text-xs text-muted-foreground mb-1">Required Skills</h5>
                      <div className="flex flex-wrap gap-1">
                        {path.requiredSkills.map((skill, skillIndex) => (
                          <Badge 
                            key={skillIndex} 
                            variant={path.hasRequiredSkills[skillIndex] ? "default" : "outline"}
                            className={path.hasRequiredSkills[skillIndex] ? "" : "text-gray-500"}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeAnalysisCard;
