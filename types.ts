
export enum Page {
  Dashboard = 'Dashboard',
  Employees = 'Employees',
  Recruitment = 'Recruitment',
  AiAssistant = 'AI Assistant',
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

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
