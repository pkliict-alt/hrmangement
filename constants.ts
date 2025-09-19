
import { Employee, Candidate, CandidateStage } from './types';

export const INITIAL_EMPLOYEES: Employee[] = [
  { id: 'emp-1', name: 'Alice Johnson', position: 'Senior Frontend Engineer', department: 'Engineering', email: 'alice.j@example.com', phone: '123-456-7890', startDate: '2021-03-15', avatar: 'https://picsum.photos/id/1027/200/200', status: 'Active' },
  { id: 'emp-2', name: 'Bob Williams', position: 'Product Manager', department: 'Design', email: 'bob.w@example.com', phone: '123-456-7891', startDate: '2020-07-20', avatar: 'https://picsum.photos/id/1005/200/200', status: 'Active' },
  { id: 'emp-3', name: 'Charlie Brown', position: 'UX/UI Designer', department: 'Design', email: 'charlie.b@example.com', phone: '123-456-7892', startDate: '2022-01-10', avatar: 'https://picsum.photos/id/1011/200/200', status: 'Active' },
  { id: 'emp-4', name: 'Diana Prince', position: 'Marketing Lead', department: 'Marketing', email: 'diana.p@example.com', phone: '123-456-7893', startDate: '2019-11-01', avatar: 'https://picsum.photos/id/1012/200/200', status: 'Active' },
  { id: 'emp-5', name: 'Ethan Hunt', position: 'Sales Executive', department: 'Sales', email: 'ethan.h@example.com', phone: '123-456-7894', startDate: '2023-05-22', avatar: 'https://picsum.photos/id/1025/200/200', status: 'Active' },
  { id: 'emp-6', name: 'Fiona Glenanne', position: 'HR Specialist', department: 'HR', email: 'fiona.g@example.com', phone: '123-456-7895', startDate: '2022-08-18', avatar: 'https://picsum.photos/id/1026/200/200', status: 'On Leave' },
  { id: 'emp-7', name: 'George Costanza', position: 'Backend Engineer', department: 'Engineering', email: 'george.c@example.com', phone: '123-456-7896', startDate: '2021-09-01', avatar: 'https://picsum.photos/id/103/200/200', status: 'Active' },
  { id: 'emp-8', name: 'Hannah Montana', position: 'Social Media Manager', department: 'Marketing', email: 'hannah.m@example.com', phone: '123-456-7897', startDate: '2023-02-14', avatar: 'https://picsum.photos/id/1047/200/200', status: 'Active' },
];

export const INITIAL_CANDIDATES: Candidate[] = [
  { id: 'can-1', name: 'Ivy Green', position: 'Senior Frontend Engineer', stage: CandidateStage.Interview, appliedDate: '2024-06-10', avatar: 'https://picsum.photos/id/201/200/200' },
  { id: 'can-2', name: 'Jack Black', position: 'UX/UI Designer', stage: CandidateStage.Applied, appliedDate: '2024-06-25', avatar: 'https://picsum.photos/id/202/200/200' },
  { id: 'can-3', name: 'Karen Page', position: 'Product Manager', stage: CandidateStage.Screening, appliedDate: '2024-06-22', avatar: 'https://picsum.photos/id/203/200/200' },
  { id: 'can-4', name: 'Leo Fitz', position: 'Senior Frontend Engineer', stage: CandidateStage.Offer, appliedDate: '2024-06-05', avatar: 'https://picsum.photos/id/204/200/200' },
  { id: 'can-5', name: 'Mona Lisa', position: 'Backend Engineer', stage: CandidateStage.Hired, appliedDate: '2024-05-20', avatar: 'https://picsum.photos/id/206/200/200' },
  { id: 'can-6', name: 'Nick Fury', position: 'Sales Executive', stage: CandidateStage.Applied, appliedDate: '2024-06-28', avatar: 'https://picsum.photos/id/208/200/200' },
  { id: 'can-7', name: 'Olivia Pope', position: 'Marketing Lead', stage: CandidateStage.Interview, appliedDate: '2024-06-15', avatar: 'https://picsum.photos/id/209/200/200' },
];

export const KANBAN_COLUMNS: CandidateStage[] = [
  CandidateStage.Applied,
  CandidateStage.Screening,
  CandidateStage.Interview,
  CandidateStage.Offer,
  CandidateStage.Hired,
];
