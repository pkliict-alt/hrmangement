
export enum Page {
  Dashboard = 'Dashboard',
  Applicants = 'Applicants',
  Recruitment = 'Recruitment',
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: 'Engineering' | 'Marketing' | 'Sales' | 'HR' | 'Design';
  email: string;
  phone: string;
  startDate: string; // YYYY-MM-DD
  avatar: string;
  status: 'Active' | 'On Leave' | 'Terminated';
}

export enum CandidateStage {
  Applied = 'Applied',
  Screening = 'Screening',
  Interview = 'Interview',
  Offer = 'Offer',
  Hired = 'Hired',
}

export interface Candidate {
  id: string;
  name: string;
  position: string;
  stage: CandidateStage;
  appliedDate: string; // YYYY-MM-DD
  avatar: string;
}

// FIX: Add ChatMessage type to fix import errors in services/geminiService.ts and components/AiAssistant.tsx
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}