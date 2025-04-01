
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { Candidate } from "@/types";
import MatchScore from "./MatchScore";

interface ResultsTableProps {
  candidates: Candidate[];
  selectedCandidate?: Candidate;
}

const ResultsTable = ({ candidates, selectedCandidate }: ResultsTableProps) => {
  // Sort candidates by match score
  const sortedCandidates = [...candidates].sort((a, b) => b.matchScore - a.matchScore);
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Match</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Education</TableHead>
            <TableHead>Skills Match</TableHead>
            <TableHead>Recommendation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCandidates.map((candidate, index) => (
            <TableRow key={candidate.id} className={
              selectedCandidate?.id === candidate.id 
                ? "bg-blue-50" 
                : ""
            }>
              <TableCell className="font-medium">#{index + 1}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{candidate.name}</div>
                  <div className="text-sm text-muted-foreground">{candidate.email}</div>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <MatchScore score={candidate.matchScore} size="sm" />
              </TableCell>
              <TableCell>{candidate.experience} years</TableCell>
              <TableCell>
                <div className="space-y-1 text-sm">
                  {candidate.education.map((edu, i) => (
                    <div key={i}>{edu}</div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1 text-sm">
                  {candidate.skillMatches.map((match, i) => (
                    <div key={i} className="flex items-center">
                      {match.match ? (
                        <Check className="h-3 w-3 text-recruit-success mr-1" />
                      ) : (
                        <X className="h-3 w-3 text-recruit-danger mr-1" />
                      )}
                      <span>{match.skill}</span>
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm max-w-xs">
                  {candidate.recommendation}
                </div>
              </TableCell>
            </TableRow>
          ))}
          
          {candidates.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                No candidates uploaded yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResultsTable;
