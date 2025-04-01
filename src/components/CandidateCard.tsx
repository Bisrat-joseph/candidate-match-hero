
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Candidate } from "@/types";
import { Check, X, User, Briefcase, Award, Mail, Star } from "lucide-react";
import MatchScore from "./MatchScore";
import { cn } from "@/lib/utils";

interface CandidateCardProps {
  candidate: Candidate;
  onSelect: (candidate: Candidate) => void;
  selected?: boolean;
}

const CandidateCard = ({ candidate, onSelect, selected }: CandidateCardProps) => {
  // Get initials from candidate name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className={cn(
      "h-full flex flex-col transition-all hover:shadow-md",
      selected ? "border-recruit-primary border-2" : ""
    )}>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-recruit-primary text-white">
            {getInitials(candidate.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{candidate.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Mail className="h-3 w-3 mr-1" />
            <span>{candidate.email}</span>
          </div>
        </div>
        <MatchScore score={candidate.matchScore} size="sm" showLabel={false} />
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
              <Briefcase className="h-4 w-4 text-recruit-primary" />
              <span>Skills</span>
            </h4>
            <div className="flex flex-wrap gap-1">
              {candidate.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
              <Award className="h-4 w-4 text-recruit-primary" />
              <span>Experience</span>
            </h4>
            <p className="text-sm">{candidate.experience} years</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 text-recruit-primary" />
              <span>Education</span>
            </h4>
            <ul className="text-sm space-y-1">
              {candidate.education.map((education, index) => (
                <li key={index} className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
                  <span>{education}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <Separator className="my-1" />
          
          <div>
            <h4 className="text-sm font-medium mb-2">Required Skills Match</h4>
            <div className="space-y-1">
              {candidate.skillMatches.map((match, index) => (
                <div key={index} className="flex items-center gap-1">
                  {match.match ? (
                    <Check className="h-4 w-4 text-recruit-success" />
                  ) : (
                    <X className="h-4 w-4 text-recruit-danger" />
                  )}
                  <span className="text-sm">{match.skill}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Recommendation</h4>
            <div className="text-sm font-medium bg-gray-50 p-2.5 rounded border border-gray-100">
              {candidate.recommendation}
            </div>
          </div>
          
          {candidate.strengths.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1">Key Strengths</h4>
              <ul className="text-sm list-disc pl-5 space-y-0.5">
                {candidate.strengths.slice(0, 3).map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-4">
        <Button 
          onClick={() => onSelect(candidate)} 
          className={cn(
            "w-full transition-all",
            selected ? "bg-recruit-success hover:bg-recruit-success/90" : ""
          )}
        >
          {selected ? "Selected" : "Select Candidate"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CandidateCard;
