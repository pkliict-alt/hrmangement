import React, { useState } from 'react';
import { Course } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_COURSES } from '../constants';
import { Card, Button, Input, Modal, Select, Icons } from './ui';

// --- Add Course Modal ---
interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCourse: (course: Omit<Course, 'id' | 'thumbnail' | 'enrolledCount'>) => void;
}
const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose, onAddCourse }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newCourse = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            duration: parseInt(formData.get('duration') as string, 10),
            category: formData.get('category') as Course['category'],
            totalCapacity: parseInt(formData.get('totalCapacity') as string, 10),
        };
        onAddCourse(newCourse);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Course">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Course Title</label>
                    <Input id="title" name="title" type="text" required />
                </div>
                <div>
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                    <Input id="description" name="description" type="text" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                        <Select id="category" name="category" defaultValue="Technical" required>
                            <option>Technical</option>
                            <option>Soft Skills</option>
                            <option>Compliance</option>
                            <option>Leadership</option>
                        </Select>
                    </div>
                    <div>
                        <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900">Duration (minutes)</label>
                        <Input id="duration" name="duration" type="number" required />
                    </div>
                </div>
                <div>
                    <label htmlFor="totalCapacity" className="block mb-2 text-sm font-medium text-gray-900">Total Capacity</label>
                    <Input id="totalCapacity" name="totalCapacity" type="number" required />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit">Add Course</Button>
                </div>
            </form>
        </Modal>
    );
};


// --- Course Card ---
const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
    const progress = (course.enrolledCount / course.totalCapacity) * 100;
    return (
        <Card className="flex flex-col">
            <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover rounded-t-lg mb-4" />
            <div className="flex flex-col flex-grow">
                <span className="text-xs font-semibold bg-primary-100 text-primary-700 px-2 py-1 rounded-full self-start mb-2">{course.category}</span>
                <h3 className="text-lg font-bold text-gray-800 flex-grow">{course.title}</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4 flex-grow">{course.description}</p>
                <div className="text-sm text-gray-600 mb-4">{course.duration} mins</div>
                <div>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
                        <span>Enrollment</span>
                        <span>{course.enrolledCount} / {course.totalCapacity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>
        </Card>
    );
};


// --- Main LMS Page Component ---
const LMSPage: React.FC = () => {
    const [courses, setCourses] = useLocalStorage<Course[]>('courses', INITIAL_COURSES);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleAddCourse = (newCourseData: Omit<Course, 'id' | 'thumbnail' | 'enrolledCount'>) => {
        const newCourse: Course = {
            ...newCourseData,
            id: `crs-${Date.now()}`,
            thumbnail: `https://picsum.photos/seed/${newCourseData.title.replace(/\s/g, '')}/400/225`,
            enrolledCount: 0,
        };
        setCourses(prev => [...prev, newCourse]);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Learning Management</h2>
                 <Button onClick={() => setIsModalOpen(true)}>
                    <span className="mr-2">{Icons.plus}</span> Add New Course
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
            <AddCourseModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddCourse={handleAddCourse}
            />
        </div>
    );
};

export default LMSPage;
