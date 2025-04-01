
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Candidate } from "@/types";
import { Check, X, User } from "lucide-react";
import MatchScore from "./MatchScore";

interface CandidateCardProps {
  candidate: Candidate;
  onSelect: (candidate: Candidate) => void;
  selected?: boolean;
}

const CandidateCard = ({ candidate, onSelect, selected }: CandidateCardProps) => {
  return (
    <Card className={cn(
      "h-full flex flex-col transition-all",
      selected ? "border-recruit-primary border-2" : ""
    )}>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <User className="h-6 w-6 text-gray-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{candidate.name}</h3>
          <p className="text-sm text-muted-foreground">{candidate.email}</p>
        </div>
        <MatchScore score={candidate.matchScore} size="sm" showLabel={false} />
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Skills</h4>
            <div className="flex flex-wrap gap-1">
              {candidate.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Experience</h4>
            <p className="text-sm">{candidate.experience} years</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Education</h4>
            <ul className="text-sm space-y-1">
              {candidate.education.map((education, index) => (
                <li key={index}>{education}</li>
              ))}
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-medium mb-2">Required Skills Match</h4>
            <div className="space-y-1">
              {candidate.skillMatches.map((match, index) => (
                <div key={index} className="flex items-center">
                  {match.match ? (
                    <Check className="h-4 w-4 text-recruit-success mr-2" />
                  ) : (
                    <X className="h-4 w-4 text-recruit-danger mr-2" />
                  )}
                  <span className="text-sm">{match.skill}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Recommendation</h4>
            <p className="text-sm font-medium bg-gray-50 p-2 rounded">
              {candidate.recommendation}
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4">
        <Button 
          onClick={() => onSelect(candidate)} 
          className={selected ? "bg-recruit-success hover:bg-recruit-success/90 w-full" : "w-full"}
        >
          {selected ? "Selected" : "Select Candidate"}
        </Button>
      </CardFooter>
    </Card>
  );
};

// Helper function to conditionally merge classes
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default CandidateCard;
