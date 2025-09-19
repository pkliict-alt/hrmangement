export enum Page {
  Dashboard = 'Dashboard',
  Employees = 'Employees',
  Recruitment = 'Recruitment',
  LMS = 'LMS',
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

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // in minutes
  category: 'Technical' | 'Soft Skills' | 'Compliance' | 'Leadership';
  enrolledCount: number;
  totalCapacity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
