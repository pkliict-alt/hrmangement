import { Employee, Candidate, CandidateStage, Course } from './types';

export const KANBAN_COLUMNS: CandidateStage[] = [
  CandidateStage.Applied,
  CandidateStage.Screening,
  CandidateStage.Interview,
  CandidateStage.Offer,
  CandidateStage.Hired,
];

export const INITIAL_EMPLOYEES: Employee[] = [
  { id: 'emp-1', name: 'Alice Johnson', position: 'Senior Frontend Engineer', department: 'Engineering', email: 'alice.j@example.com', phone: '123-456-7890', startDate: '2021-03-15', avatar: 'https://picsum.photos/id/1027/200/200', status: 'Active' },
  { id: 'emp-2', name: 'Bob Williams', position: 'Product Manager', department: 'Design', email: 'bob.w@example.com', phone: '123-456-7891', startDate: '2020-11-20', avatar: 'https://picsum.photos/id/1025/200/200', status: 'Active' },
  { id: 'emp-3', name: 'Charlie Brown', position: 'Data Scientist', department: 'Engineering', email: 'charlie.b@example.com', phone: '123-456-7892', startDate: '2022-01-10', avatar: 'https://picsum.photos/id/1005/200/200', status: 'Active' },
  { id: 'emp-4', name: 'Diana Miller', position: 'UX Designer', department: 'Design', email: 'diana.m@example.com', phone: '123-456-7893', startDate: '2021-08-01', avatar: 'https://picsum.photos/id/1011/200/200', status: 'On Leave' },
  { id: 'emp-5', name: 'Ethan Davis', position: 'Marketing Lead', department: 'Marketing', email: 'ethan.d@example.com', phone: '123-456-7894', startDate: '2019-05-25', avatar: 'https://picsum.photos/id/1012/200/200', status: 'Active' },
  { id: 'emp-6', name: 'Fiona Garcia', position: 'Sales Executive', department: 'Sales', email: 'fiona.g@example.com', phone: '123-456-7895', startDate: '2022-06-12', avatar: 'https://picsum.photos/id/1013/200/200', status: 'Active' },
  { id: 'emp-7', name: 'George Rodriguez', position: 'HR Manager', department: 'HR', email: 'george.r@example.com', phone: '123-456-7896', startDate: '2018-09-30', avatar: 'https://picsum.photos/id/1014/200/200', status: 'Terminated' },
  { id: 'emp-8', name: 'Hannah Wilson', position: 'Junior Developer', department: 'Engineering', email: 'hannah.w@example.com', phone: '123-456-7897', startDate: '2023-02-20', avatar: 'https://picsum.photos/id/1015/200/200', status: 'Active' },
];

export const INITIAL_CANDIDATES: Candidate[] = [
  { id: 'can-1', name: 'Ivy Martinez', position: 'Frontend Developer', stage: CandidateStage.Applied, appliedDate: '2023-05-01', avatar: 'https://picsum.photos/id/201/200/200' },
  { id: 'can-2', name: 'Jack Taylor', position: 'Backend Developer', stage: CandidateStage.Interview, appliedDate: '2023-04-28', avatar: 'https://picsum.photos/id/202/200/200' },
  { id: 'can-3', name: 'Karen Anderson', position: 'Product Manager', stage: CandidateStage.Screening, appliedDate: '2023-05-02', avatar: 'https://picsum.photos/id/203/200/200' },
  { id: 'can-4', name: 'Leo Thomas', position: 'UX Designer', stage: CandidateStage.Offer, appliedDate: '2023-04-25', avatar: 'https://picsum.photos/id/204/200/200' },
  { id: 'can-5', name: 'Mia Hernandez', position: 'Data Scientist', stage: CandidateStage.Hired, appliedDate: '2023-04-20', avatar: 'https://picsum.photos/id/206/200/200' },
  { id: 'can-6', name: 'Noah King', position: 'Frontend Developer', stage: CandidateStage.Interview, appliedDate: '2023-05-03', avatar: 'https://picsum.photos/id/208/200/200' },
];

export const INITIAL_COURSES: Course[] = [
  { id: 'crs-1', title: 'Advanced React Patterns', description: 'Deep dive into hooks, context, and performance.', thumbnail: 'https://picsum.photos/seed/react/400/225', duration: 180, category: 'Technical', enrolledCount: 25, totalCapacity: 50 },
  { id: 'crs-2', title: 'Effective Communication', description: 'Learn to communicate clearly and effectively.', thumbnail: 'https://picsum.photos/seed/comm/400/225', duration: 90, category: 'Soft Skills', enrolledCount: 45, totalCapacity: 50 },
  { id: 'crs-3', title: 'Leadership for New Managers', description: 'Essential skills for first-time leaders.', thumbnail: 'https://picsum.photos/seed/lead/400/225', duration: 240, category: 'Leadership', enrolledCount: 15, totalCapacity: 20 },
  { id: 'crs-4', title: 'Workplace Harassment Training', description: 'Mandatory compliance training for all employees.', thumbnail: 'https://picsum.photos/seed/comp/400/225', duration: 60, category: 'Compliance', enrolledCount: 150, totalCapacity: 150 },
  { id: 'crs-5', title: 'Python for Data Science', description: 'Master the fundamentals of data analysis with Python.', thumbnail: 'https://picsum.photos/seed/python/400/225', duration: 300, category: 'Technical', enrolledCount: 30, totalCapacity: 40 },
];
