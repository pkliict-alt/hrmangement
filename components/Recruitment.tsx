
import React, { useState, useMemo } from 'react';
import { Candidate, CandidateStage } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_CANDIDATES, KANBAN_COLUMNS } from '../constants';
import { Card, Button, Input, Modal, Select, Icons } from './ui';

// --- Add Candidate Modal ---
interface AddCandidateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddCandidate: (candidate: Omit<Candidate, 'id' | 'avatar' | 'stage' | 'appliedDate'>) => void;
}
const AddCandidateModal: React.FC<AddCandidateModalProps> = ({ isOpen, onClose, onAddCandidate }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newCandidate = {
            name: formData.get('name') as string,
            position: formData.get('position') as string,
        };
        onAddCandidate(newCandidate);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Candidate">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                    <Input id="name" name="name" type="text" required />
                </div>
                <div>
                    <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900">Applying for</label>
                    <Input id="position" name="position" type="text" required />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit">Add Candidate</Button>
                </div>
            </form>
        </Modal>
    );
};

// --- Candidate Card ---
const CandidateCard: React.FC<{ candidate: Candidate, onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void }> = ({ candidate, onDragStart }) => (
    <div
        draggable
        onDragStart={(e) => onDragStart(e, candidate.id)}
        className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-4 cursor-grab active:cursor-grabbing"
    >
        <div className="flex items-center space-x-3">
            <img src={candidate.avatar} alt={candidate.name} className="w-10 h-10 rounded-full" />
            <div>
                <p className="font-semibold text-gray-800">{candidate.name}</p>
                <p className="text-sm text-gray-500">{candidate.position}</p>
            </div>
        </div>
    </div>
);

// --- Kanban Column ---
const KanbanColumn: React.FC<{
    stage: CandidateStage;
    candidates: Candidate[];
    onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>, stage: CandidateStage) => void;
}> = ({ stage, candidates, onDragStart, onDrop }) => {
    const [isOver, setIsOver] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsOver(true);
    };
    
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsOver(false);
        onDrop(e, stage);
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex-1 min-w-[280px] bg-gray-100 rounded-lg p-3 transition-colors ${isOver ? 'bg-primary-100' : ''}`}
        >
            <div className="flex justify-between items-center mb-4 px-1">
                <h3 className="font-semibold text-gray-700">{stage}</h3>
                <span className="text-sm font-medium bg-gray-200 text-gray-600 rounded-full px-2 py-0.5">{candidates.length}</span>
            </div>
            <div className="space-y-3">
                {candidates.map(candidate => (
                    <CandidateCard key={candidate.id} candidate={candidate} onDragStart={onDragStart} />
                ))}
            </div>
        </div>
    );
};

// --- Main Recruitment Page Component ---
const RecruitmentPage: React.FC = () => {
    const [candidates, setCandidates] = useLocalStorage<Candidate[]>('candidates', INITIAL_CANDIDATES);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddCandidate = (newCandidateData: Omit<Candidate, 'id' | 'avatar' | 'stage' | 'appliedDate'>) => {
        const newCandidate: Candidate = {
            ...newCandidateData,
            id: `can-${Date.now()}`,
            avatar: `https://picsum.photos/seed/${Date.now()}/200/200`,
            stage: CandidateStage.Applied,
            appliedDate: new Date().toISOString().split('T')[0],
        };
        setCandidates(prev => [...prev, newCandidate]);
    };
    
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
        e.dataTransfer.setData("candidateId", id);
    };
    
    const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStage: CandidateStage) => {
        const id = e.dataTransfer.getData("candidateId");
        setCandidates(prev =>
            prev.map(c => c.id === id ? { ...c, stage: newStage } : c)
        );
    };

    const candidatesByStage = useMemo(() => {
        return KANBAN_COLUMNS.reduce((acc, stage) => {
            acc[stage] = candidates.filter(c => c.stage === stage);
            return acc;
        }, {} as Record<CandidateStage, Candidate[]>);
    }, [candidates]);


    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-end mb-4">
                 <Button onClick={() => setIsModalOpen(true)}>
                    <span className="mr-2">{Icons.plus}</span> Add Candidate
                </Button>
            </div>
            <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
                {KANBAN_COLUMNS.map(stage => (
                    <KanbanColumn
                        key={stage}
                        stage={stage}
                        candidates={candidatesByStage[stage]}
                        onDragStart={handleDragStart}
                        onDrop={handleDrop}
                    />
                ))}
            </div>
             <AddCandidateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddCandidate={handleAddCandidate}
            />
        </div>
    );
};

export default RecruitmentPage;
