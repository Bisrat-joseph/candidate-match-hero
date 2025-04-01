
import { EmployeeAnalysis } from "@/types";
import { v4 as uuidv4 } from "uuid";

// This is a mock implementation that would be replaced with actual AI analysis in production
export const analyzeEmployeeResume = (
  resumeText: string, 
  currentRole: string, 
  department: string
): Promise<EmployeeAnalysis> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // Extract employee info from resume text (mock implementation)
      const skills = extractSkills(resumeText);
      const education = extractEducation(resumeText);
      const experience = extractExperience(resumeText);
      
      // Generate strengths and areas for improvement
      const strengths = generateStrengths(skills);
      const areasForImprovement = generateAreasForImprovement(skills);
      
      // Generate career path suggestions
      const careerPathSuggestions = generateCareerPathSuggestions(currentRole, department, skills, experience);
      
      // Generate training recommendations
      const trainingRecommendations = generateTrainingRecommendations(skills, careerPathSuggestions);
      
      // Generate performance feedback
      const performanceFeedback = generatePerformanceFeedback(skills, experience);
      
      const employeeAnalysis: EmployeeAnalysis = {
        id: uuidv4(),
        name: extractName(resumeText),
        email: extractEmail(resumeText),
        resumeText,
        currentRole,
        department,
        skills,
        experience,
        education,
        strengths,
        areasForImprovement,
        careerPathSuggestions,
        trainingRecommendations,
        performanceFeedback
      };
      
      resolve(employeeAnalysis);
    }, 1500);
  });
};

// Helper functions (mock implementations)
const extractName = (resumeText: string): string => {
  // In a real implementation, this would use NLP to extract the name
  const names = ["Alex Johnson", "Jamie Smith", "Taylor Brown", "Morgan Lee", "Casey Williams"];
  return names[Math.floor(Math.random() * names.length)];
};

const extractEmail = (name: string): string => {
  // Generate email based on name
  const formattedName = name.toLowerCase().replace(/\s/g, ".");
  const domains = ["company.com", "enterprise.org", "corp.net"];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${formattedName}@${domain}`;
};

const extractSkills = (resumeText: string): string[] => {
  // In a real implementation, this would use NLP to extract skills
  const allPossibleSkills = [
    "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "SQL", 
    "Project Management", "Team Leadership", "Communication", "Problem Solving",
    "Data Analysis", "Machine Learning", "UX/UI Design", "Agile", "Scrum",
    "Business Analytics", "DevOps", "Cloud Computing", "Public Speaking",
    "Customer Relations", "Strategic Planning", "Budget Management"
  ];
  
  // Randomly select 6-12 skills from the list
  const skillCount = Math.floor(Math.random() * 7) + 6;
  const shuffled = [...allPossibleSkills].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, skillCount);
};

const extractEducation = (resumeText: string): string[] => {
  // Mock implementation
  const educationOptions = [
    "Bachelor's in Computer Science",
    "Master's in Computer Science",
    "Bachelor's in Business Administration",
    "MBA",
    "Bachelor's in Information Technology",
    "Master's in Information Technology",
    "Ph.D. in Computer Science",
    "Bachelor's in Psychology",
    "Master's in Organizational Psychology"
  ];
  
  const educationCount = Math.floor(Math.random() * 2) + 1;
  const shuffled = [...educationOptions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, educationCount);
};

const extractExperience = (resumeText: string): number => {
  // Mock implementation - return a random number of years between 1 and 15
  return Math.floor(Math.random() * 15) + 1;
};

const generateStrengths = (skills: string[]): string[] => {
  const strengths = [];
  
  // Map specific skills to strengths
  const technicalSkills = ["JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "SQL"];
  const leadershipSkills = ["Project Management", "Team Leadership", "Strategic Planning", "Agile", "Scrum"];
  const analyticalSkills = ["Data Analysis", "Problem Solving", "Business Analytics", "Machine Learning"];
  
  const hasTechnicalSkills = skills.some(skill => technicalSkills.includes(skill));
  const hasLeadershipSkills = skills.some(skill => leadershipSkills.includes(skill));
  const hasAnalyticalSkills = skills.some(skill => analyticalSkills.includes(skill));
  
  if (hasTechnicalSkills) {
    strengths.push("Strong technical capabilities, particularly in " + 
      skills.filter(skill => technicalSkills.includes(skill)).join(", "));
  }
  
  if (hasLeadershipSkills) {
    strengths.push("Excellent leadership abilities, with experience in " + 
      skills.filter(skill => leadershipSkills.includes(skill)).join(", "));
  }
  
  if (hasAnalyticalSkills) {
    strengths.push("Exceptional analytical thinking and problem-solving skills");
  }
  
  // Add some random strengths
  const additionalStrengths = [
    "Strong communicator who can explain complex concepts simply",
    "Detail-oriented with excellent follow-through",
    "Adaptable and willing to learn new technologies and methodologies",
    "Collaborative team player who works well across departments",
    "Innovative thinker who brings fresh ideas to projects"
  ];
  
  const shuffledStrengths = additionalStrengths.sort(() => 0.5 - Math.random());
  strengths.push(...shuffledStrengths.slice(0, 2));
  
  return strengths;
};

const generateAreasForImprovement = (skills: string[]): string[] => {
  const improvements = [];
  
  // Identify missing skill categories
  const technicalSkills = ["JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "SQL"];
  const leadershipSkills = ["Project Management", "Team Leadership", "Strategic Planning", "Agile", "Scrum"];
  const communicationSkills = ["Communication", "Public Speaking", "Customer Relations"];
  
  const hasTechnicalSkills = skills.some(skill => technicalSkills.includes(skill));
  const hasLeadershipSkills = skills.some(skill => leadershipSkills.includes(skill));
  const hasCommunicationSkills = skills.some(skill => communicationSkills.includes(skill));
  
  if (!hasTechnicalSkills) {
    improvements.push("Technical skills could be enhanced, particularly in modern programming languages and frameworks");
  }
  
  if (!hasLeadershipSkills) {
    improvements.push("Leadership and project management experience would benefit career advancement");
  }
  
  if (!hasCommunicationSkills) {
    improvements.push("Communication skills could be further developed for more effective team collaboration");
  }
  
  // Add some random areas for improvement
  const additionalImprovements = [
    "Could benefit from deeper industry-specific knowledge",
    "Further development of strategic thinking would enhance leadership potential",
    "Expanding network within the organization would create more opportunities",
    "Additional certifications would strengthen expertise in key areas",
    "More experience with data-driven decision making would be beneficial",
    "Could improve work-life balance management for sustained performance"
  ];
  
  const shuffledImprovements = additionalImprovements.sort(() => 0.5 - Math.random());
  improvements.push(...shuffledImprovements.slice(0, 2));
  
  return improvements;
};

const generateCareerPathSuggestions = (
  currentRole: string, 
  department: string, 
  skills: string[], 
  experience: number
): EmployeeAnalysis["careerPathSuggestions"] => {
  const careerPaths = [];
  
  // Define career paths based on department
  const careerPathsByDepartment: Record<string, {role: string, requiredSkills: string[]}[]> = {
    "Engineering": [
      { role: "Senior Developer", requiredSkills: ["JavaScript", "TypeScript", "React"] },
      { role: "Engineering Manager", requiredSkills: ["Team Leadership", "Project Management", "Communication"] },
      { role: "DevOps Engineer", requiredSkills: ["DevOps", "Cloud Computing", "Python"] },
      { role: "Solution Architect", requiredSkills: ["System Design", "Cloud Computing", "Problem Solving"] }
    ],
    "Product": [
      { role: "Senior Product Manager", requiredSkills: ["Product Management", "Strategic Planning", "Communication"] },
      { role: "Director of Product", requiredSkills: ["Team Leadership", "Strategic Planning", "Budget Management"] },
      { role: "UX/UI Designer", requiredSkills: ["UX/UI Design", "Communication", "Problem Solving"] }
    ],
    "Marketing": [
      { role: "Marketing Manager", requiredSkills: ["Strategic Planning", "Communication", "Budget Management"] },
      { role: "Content Strategist", requiredSkills: ["Content Creation", "Strategic Planning", "Communication"] },
      { role: "Digital Marketing Specialist", requiredSkills: ["Data Analysis", "Social Media", "Content Creation"] }
    ],
    "Sales": [
      { role: "Account Executive", requiredSkills: ["Customer Relations", "Communication", "Strategic Planning"] },
      { role: "Sales Manager", requiredSkills: ["Team Leadership", "Budget Management", "Strategic Planning"] },
      { role: "Customer Success Manager", requiredSkills: ["Customer Relations", "Problem Solving", "Communication"] }
    ],
    "HR": [
      { role: "HR Manager", requiredSkills: ["Team Leadership", "Communication", "Budget Management"] },
      { role: "Talent Acquisition Specialist", requiredSkills: ["Recruitment", "Communication", "Strategic Planning"] },
      { role: "Learning & Development Specialist", requiredSkills: ["Training", "Communication", "Strategic Planning"] }
    ]
  };
  
  // Default to Engineering if department is not recognized
  const departmentPaths = careerPathsByDepartment[department] || careerPathsByDepartment["Engineering"];
  
  // Generate random career path suggestions based on department
  for (const path of departmentPaths) {
    const hasRequiredSkills = path.requiredSkills.map(skill => 
      skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
    );
    
    // Calculate match score based on required skills
    const matchedSkillsCount = hasRequiredSkills.filter(Boolean).length;
    const matchScore = Math.round((matchedSkillsCount / path.requiredSkills.length) * 100);
    
    // Calculate time to ready based on skills match and experience
    let timeToReady;
    if (matchScore >= 80) {
      timeToReady = "Ready now";
    } else if (matchScore >= 60) {
      timeToReady = "3-6 months";
    } else if (matchScore >= 40) {
      timeToReady = "6-12 months";
    } else {
      timeToReady = "1-2 years";
    }
    
    // Adjust for experience
    if (experience < 3 && timeToReady === "Ready now") {
      timeToReady = "6-12 months";
    }
    
    careerPaths.push({
      role: path.role,
      matchScore,
      requiredSkills: path.requiredSkills,
      hasRequiredSkills,
      timeToReady
    });
  }
  
  // Sort by match score (highest first)
  return careerPaths.sort((a, b) => b.matchScore - a.matchScore);
};

const generateTrainingRecommendations = (skills: string[], careerPaths: EmployeeAnalysis["careerPathSuggestions"]): string[] => {
  const recommendations = [];
  
  // Generate recommendations based on missing skills for top career paths
  if (careerPaths.length > 0) {
    const topCareerPath = careerPaths[0];
    const missingSkills = topCareerPath.requiredSkills.filter((_skill, index) => !topCareerPath.hasRequiredSkills[index]);
    
    if (missingSkills.length > 0) {
      recommendations.push(`Training in ${missingSkills.join(", ")} would prepare you for a ${topCareerPath.role} role`);
    }
  }
  
  // Add general training recommendations
  const generalRecommendations = [
    "Consider completing the internal leadership development program",
    "Enroll in advanced technical training for your current tech stack",
    "Participate in cross-functional projects to broaden experience",
    "Pursue relevant industry certifications to validate expertise",
    "Join a mentorship program to accelerate professional growth",
    "Attend industry conferences to expand knowledge and network",
    "Take public speaking workshops to enhance presentation skills",
    "Complete project management training to improve organizational skills"
  ];
  
  const shuffledRecommendations = generalRecommendations.sort(() => 0.5 - Math.random());
  recommendations.push(...shuffledRecommendations.slice(0, 3));
  
  return recommendations;
};

const generatePerformanceFeedback = (skills: string[], experience: number): string => {
  const performanceLevels = [
    "Consistently exceeds expectations with outstanding contributions to the team.",
    "Performs above expectations and delivers high-quality work consistently.",
    "Meets all performance expectations and is a reliable team member.",
    "Meeting most expectations but has specific areas for growth.",
    "Working to develop skills and meet performance expectations."
  ];
  
  // Calculate performance level based on skills and experience
  const skillScore = skills.length / 20; // Normalize to 0-1 range
  const experienceScore = Math.min(experience, 10) / 10; // Cap at 10 years, normalize to 0-1
  
  const combinedScore = (skillScore * 0.7) + (experienceScore * 0.3); // Weight skills more than experience
  const performanceIndex = Math.min(Math.floor(combinedScore * 5), 4); // Map to 0-4 index
  
  const baseFeedback = performanceLevels[performanceIndex];
  
  // Add specific details based on skills
  let detailedFeedback = baseFeedback;
  
  if (skills.includes("Team Leadership") || skills.includes("Project Management")) {
    detailedFeedback += " Demonstrates strong leadership qualities and effectively manages projects.";
  }
  
  if (skills.includes("Communication")) {
    detailedFeedback += " Communicates clearly and effectively with team members and stakeholders.";
  }
  
  if (skills.some(skill => ["JavaScript", "TypeScript", "React", "Python", "Java"].includes(skill))) {
    detailedFeedback += " Technical expertise is a notable strength that adds significant value to the team.";
  }
  
  return detailedFeedback;
};
