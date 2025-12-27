export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  aiSummary: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  aiBio: string;
}

export interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  salary: string;
  description: string;
}

export interface CandidateAnalysis {
  matchScore: number;
  skillsFound: string[];
  missingSkills: string[];
  aiVerdict: string;
}