
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MatchScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const MatchScore = ({ score, size = "md", showLabel = true }: MatchScoreProps) => {
  // Determine color based on score
  const getColor = () => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-blue-600 bg-blue-50";
    if (score >= 40) return "text-amber-600 bg-amber-50";
    return "text-red-600 bg-red-50";
  };
  
  const getRecommendation = () => {
    if (score >= 90) return "Strong Match";
    if (score >= 75) return "Good Match";
    if (score >= 60) return "Potential Match";
    if (score >= 40) return "Weak Match";
    return "Not a Match";
  };
  
  const sizeClasses = {
    sm: "text-lg w-12 h-12",
    md: "text-2xl w-16 h-16",
    lg: "text-3xl w-20 h-20"
  };
  
  const labelSizeClasses = {
    sm: "text-xs mt-1",
    md: "text-sm mt-1",
    lg: "text-base mt-2"
  };

  return (
    <div className="flex flex-col items-center">
      <Card className={cn(
        "flex items-center justify-center rounded-full",
        sizeClasses[size],
        getColor()
      )}>
        <CardContent className="p-0 flex items-center justify-center h-full">
          <span className="font-bold">{score}%</span>
        </CardContent>
      </Card>
      {showLabel && (
        <span className={cn(
          "text-gray-700 font-medium", 
          labelSizeClasses[size]
        )}>
          {getRecommendation()}
        </span>
      )}
    </div>
  );
};

export default MatchScore;
