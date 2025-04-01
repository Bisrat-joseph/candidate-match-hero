
export interface Candidate {
  id: string;
  name: string;
  email: string;
  resumeText: string;
  skills: string[];
  experience: number; // in years
  education: string[];
  matchScore: number;
  skillMatches: {
    skill: string;
    match: boolean;
  }[];
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
}

export interface JobRequirement {
  title: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  requiredYearsExperience: number;
  requiredEducation: string[];
}

export enum AnalysisStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}
