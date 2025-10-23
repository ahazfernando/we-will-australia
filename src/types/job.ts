export interface Job {
    id: string;
    title: string;
    company: string;
    description: string;
    type: string;
    experienceLevel: string;
    budget: string;
    skills: string[];
    rating?: number;
    postedTime: string;
    location: string;
    city?: string;
    state?: string;
    jobTitle?: string;
    companyName?: string;
    salarayRange?: string;
    responsibilities: string[];
    viewCount?: number;
  }