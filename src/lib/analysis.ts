
import { Candidate, JobRequirement } from "@/types";

// This is a mock implementation that would be replaced with actual AI analysis in production
export const analyzeResume = (resumeText: string, jobRequirements: JobRequirement): Promise<Partial<Candidate>> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // Extract candidate info from resume text (mock implementation)
      const skills = extractSkills(resumeText);
      const education = extractEducation(resumeText);
      const experience = extractExperience(resumeText);
      
      // Calculate match score
      const matchScore = calculateMatchScore(
        skills, 
        education, 
        experience, 
        jobRequirements
      );
      
      // Generate skill matches
      const skillMatches = jobRequirements.requiredSkills.map(skill => ({
        skill,
        match: skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
      }));
      
      // Generate strengths and weaknesses
      const strengths = generateStrengths(skills, jobRequirements);
      const weaknesses = generateWeaknesses(skills, jobRequirements);
      
      // Generate recommendation
      const recommendation = generateRecommendation(matchScore);
      
      const candidateInfo: Partial<Candidate> = {
        skills,
        education,
        experience,
        matchScore,
        skillMatches,
        strengths,
        weaknesses,
        recommendation
      };
      
      resolve(candidateInfo);
    }, 1500);
  });
};

// Helper functions (mock implementations)
const extractSkills = (resumeText: string): string[] => {
  // In a real implementation, this would use NLP to extract skills
  const allPossibleSkills = [
    "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "SQL", 
    "NoSQL", "AWS", "Azure", "Docker", "Kubernetes", "CI/CD", "Agile", "Scrum",
    "Project Management", "Team Leadership", "Communication", "Problem Solving",
    "Data Analysis", "Machine Learning", "AI", "Big Data", "DevOps", "UX/UI Design"
  ];
  
  // Randomly select 5-10 skills from the list
  const skillCount = Math.floor(Math.random() * 6) + 5;
  const shuffled = [...allPossibleSkills].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, skillCount);
};

const extractEducation = (resumeText: string): string[] => {
  // Mock implementation
  const educationOptions = [
    "Bachelor's in Computer Science",
    "Master's in Computer Science",
    "Bachelor's in Information Technology",
    "Master's in Information Technology",
    "Bachelor's in Business Administration",
    "MBA",
    "Ph.D. in Computer Science",
    "Associate's in Web Development"
  ];
  
  const educationCount = Math.floor(Math.random() * 2) + 1;
  const shuffled = [...educationOptions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, educationCount);
};

const extractExperience = (resumeText: string): number => {
  // Mock implementation - return a random number of years between 1 and 15
  return Math.floor(Math.random() * 15) + 1;
};

const calculateMatchScore = (
  skills: string[], 
  education: string[], 
  experience: number, 
  jobRequirements: JobRequirement
): number => {
  // Mock implementation of match score calculation
  let score = 0;
  
  // Score for required skills (max 50 points)
  const requiredSkillsCount = jobRequirements.requiredSkills.length;
  let matchedRequiredSkills = 0;
  
  jobRequirements.requiredSkills.forEach(requiredSkill => {
    if (skills.some(s => s.toLowerCase().includes(requiredSkill.toLowerCase()))) {
      matchedRequiredSkills++;
    }
  });
  
  score += (matchedRequiredSkills / requiredSkillsCount) * 50;
  
  // Score for preferred skills (max 20 points)
  const preferredSkillsCount = jobRequirements.preferredSkills.length;
  let matchedPreferredSkills = 0;
  
  jobRequirements.preferredSkills.forEach(preferredSkill => {
    if (skills.some(s => s.toLowerCase().includes(preferredSkill.toLowerCase()))) {
      matchedPreferredSkills++;
    }
  });
  
  score += (matchedPreferredSkills / preferredSkillsCount) * 20;
  
  // Score for experience (max 15 points)
  const experienceScore = Math.min(experience / jobRequirements.requiredYearsExperience, 1) * 15;
  score += experienceScore;
  
  // Score for education (max 15 points)
  const hasRequiredEducation = education.some(edu => 
    jobRequirements.requiredEducation.some(req => 
      edu.toLowerCase().includes(req.toLowerCase())
    )
  );
  
  score += hasRequiredEducation ? 15 : 0;
  
  // Return the final score, rounded to nearest integer
  return Math.round(score);
};

const generateStrengths = (skills: string[], jobRequirements: JobRequirement): string[] => {
  // Mock implementation
  const strengths: string[] = [];
  
  const matchedRequiredSkills = jobRequirements.requiredSkills.filter(
    requiredSkill => skills.some(s => s.toLowerCase().includes(requiredSkill.toLowerCase()))
  );
  
  if (matchedRequiredSkills.length > 0) {
    strengths.push(`Strong match in key skills: ${matchedRequiredSkills.join(', ')}`);
  }
  
  const matchedPreferredSkills = jobRequirements.preferredSkills.filter(
    preferredSkill => skills.some(s => s.toLowerCase().includes(preferredSkill.toLowerCase()))
  );
  
  if (matchedPreferredSkills.length > 0) {
    strengths.push(`Has preferred skills: ${matchedPreferredSkills.join(', ')}`);
  }
  
  // Add some random strengths
  const potentialStrengths = [
    "Excellent communication skills",
    "Strong problem-solving abilities",
    "Team leadership experience",
    "Project management expertise",
    "Exceptional attention to detail"
  ];
  
  // Add 1-2 random strengths
  const randomCount = Math.floor(Math.random() * 2) + 1;
  const shuffled = [...potentialStrengths].sort(() => 0.5 - Math.random());
  strengths.push(...shuffled.slice(0, randomCount));
  
  return strengths;
};

const generateWeaknesses = (skills: string[], jobRequirements: JobRequirement): string[] => {
  // Mock implementation
  const weaknesses: string[] = [];
  
  const missingRequiredSkills = jobRequirements.requiredSkills.filter(
    requiredSkill => !skills.some(s => s.toLowerCase().includes(requiredSkill.toLowerCase()))
  );
  
  if (missingRequiredSkills.length > 0) {
    weaknesses.push(`Missing required skills: ${missingRequiredSkills.join(', ')}`);
  }
  
  // Add some random weaknesses
  const potentialWeaknesses = [
    "Limited leadership experience",
    "Needs improvement in communication",
    "Lacks experience with enterprise systems",
    "May need additional training",
    "Has gaps in technical knowledge"
  ];
  
  // Add 0-2 random weaknesses
  const randomCount = Math.floor(Math.random() * 3);
  const shuffled = [...potentialWeaknesses].sort(() => 0.5 - Math.random());
  weaknesses.push(...shuffled.slice(0, randomCount));
  
  return weaknesses;
};

const generateRecommendation = (matchScore: number): string => {
  if (matchScore >= 90) {
    return "Strong recommend - Excellent candidate who exceeds requirements";
  } else if (matchScore >= 75) {
    return "Recommend - Good candidate with strong qualifications";
  } else if (matchScore >= 60) {
    return "Consider - Decent candidate with most qualifications";
  } else if (matchScore >= 40) {
    return "Interview with reservations - Has some relevant qualifications but missing key requirements";
  } else {
    return "Not recommended - Does not meet minimum requirements";
  }
};

// Mock function to generate random candidate names
export const generateRandomName = (): string => {
  const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Susan", "Richard", "Jessica", "Joseph", "Sarah", "Thomas", "Karen", "Charles", "Nancy", "Christopher", "Lisa", "Daniel", "Margaret", "Matthew", "Betty", "Anthony", "Sandra", "Mark", "Ashley", "Donald", "Emily", "Steven", "Donna", "Andrew", "Michelle", "Paul", "Carol", "Joshua", "Amanda", "Kenneth", "Melissa", "Kevin", "Deborah", "Brian", "Stephanie", "George", "Dorothy", "Timothy", "Rebecca", "Ronald", "Sharon", "Jason", "Laura"];
  
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzales", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${lastName}`;
};

// Mock function to generate a random email based on name
export const generateRandomEmail = (name: string): string => {
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "company.com"];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  
  // Create email from name (remove spaces and lowercase)
  const namePart = name.toLowerCase().replace(/\s+/g, ".");
  
  return `${namePart}@${domain}`;
};
