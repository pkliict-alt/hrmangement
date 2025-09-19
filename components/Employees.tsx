
import React, { useState, useMemo } from 'react';
import { Employee } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_EMPLOYEES } from '../constants';
import { Card, Button, Input, Modal, Select, Icons } from './ui';

// --- Add Employee Modal ---
interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEmployee: (employee: Omit<Employee, 'id' | 'avatar'>) => void;
}
const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose, onAddEmployee }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newEmployee = {
            name: formData.get('name') as string,
            position: formData.get('position') as string,
            department: formData.get('department') as Employee['department'],
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            startDate: formData.get('startDate') as string,
            status: formData.get('status') as Employee['status'],
        };
        onAddEmployee(newEmployee);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Employee">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                        <Input id="name" name="name" type="text" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <Input id="email" name="email" type="email" required />
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900">Position</label>
                        <Input id="position" name="position" type="text" required />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                        <Input id="phone" name="phone" type="tel" required />
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900">Department</label>
                        <Select id="department" name="department" defaultValue="Engineering" required>
                            <option>Engineering</option>
                            <option>Marketing</option>
                            <option>Sales</option>
                            <option>HR</option>
                            <option>Design</option>
                        </Select>
                    </div>
                    <div>
                        <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900">Start Date</label>
                        <Input id="startDate" name="startDate" type="date" required />
                    </div>
                 </div>
                 <div>
                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                    <Select id="status" name="status" defaultValue="Active" required>
                        <option>Active</option>
                        <option>On Leave</option>
                        <option>Terminated</option>
                    </Select>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit">Add Employee</Button>
                </div>
            </form>
        </Modal>
    );
};

// --- Employee Table ---
const EmployeeTable: React.FC<{ employees: Employee[] }> = ({ employees }) => {
    const statusColor: Record<Employee['status'], string> = {
        'Active': 'bg-green-100 text-green-800',
        'On Leave': 'bg-yellow-100 text-yellow-800',
        'Terminated': 'bg-red-100 text-red-800'
    };
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {employees.map((employee) => (
                        <tr key={employee.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img className="h-10 w-10 rounded-full" src={employee.avatar} alt="" />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                        <div className="text-sm text-gray-500">{employee.position}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor[employee.status]}`}>
                                    {employee.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(employee.startDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div>{employee.email}</div>
                                <div>{employee.phone}</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// --- Main Employees Page Component ---
const EmployeesPage: React.FC = () => {
    const [employees, setEmployees] = useLocalStorage<Employee[]>('employees', INITIAL_EMPLOYEES);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredEmployees = useMemo(() => {
        return employees.filter(employee =>
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.position.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [employees, searchTerm]);
    
    const handleAddEmployee = (newEmployeeData: Omit<Employee, 'id' | 'avatar'>) => {
        const newEmployee: Employee = {
            ...newEmployeeData,
            id: `emp-${Date.now()}`,
            avatar: `https://picsum.photos/seed/${Date.now()}/200/200`
        };
        setEmployees(prev => [...prev, newEmployee]);
    };

    return (
        <div className="space-y-6">
            <Card>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <Input
                        type="text"
                        placeholder="Search for an employee..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-1/3"
                    />
                    <Button onClick={() => setIsModalOpen(true)}>
                        <span className="mr-2">{Icons.plus}</span> Add Employee
                    </Button>
                </div>
            </Card>
            <Card>
                <EmployeeTable employees={filteredEmployees} />
            </Card>
            <AddEmployeeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddEmployee={handleAddEmployee}
            />
        </div>
    );
};

export default EmployeesPage;
