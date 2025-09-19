import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, Button } from './ui';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Employee, Page } from '../types';
import { INITIAL_EMPLOYEES } from '../constants';

// --- Reusable Components (defined outside main component) ---
interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
    <Card>
        <div className="flex items-center">
            <div className={`p-3 rounded-full mr-4`} style={{ backgroundColor: `${color}1A`, color: color }}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    </Card>
);

const DepartmentChart: React.FC<{ data: { name: string, count: number }[] }> = ({ data }) => (
    <Card className="h-96">
        <h3 className="font-semibold text-lg text-gray-800 mb-4">Employee Distribution</h3>
        <ResponsiveContainer width="100%" height="90%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip cursor={{ fill: 'rgba(219, 234, 254, 0.5)' }} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: '14px' }} />
                <Bar dataKey="count" fill="#3b82f6" name="Employees" barSize={40} radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </Card>
);

const UpcomingEventsCard: React.FC<{ employees: Employee[] }> = ({ employees }) => {
    const upcomingAnniversaries = useMemo(() => {
        const today = new Date();
        return employees
            .map(e => ({...e, anniversary: new Date(e.startDate)}))
            .filter(e => {
                const anniversary = new Date(e.startDate);
                anniversary.setFullYear(today.getFullYear());
                return anniversary >= today;
            })
            .sort((a, b) => a.anniversary.getTime() - b.anniversary.getTime())
            .slice(0, 5);
    }, [employees]);

    return (
        <Card>
            <h3 className="font-semibold text-lg text-gray-800 mb-4">Upcoming Anniversaries</h3>
            <ul className="space-y-4">
                {upcomingAnniversaries.length > 0 ? (
                    upcomingAnniversaries.map(emp => (
                        <li key={emp.id} className="flex items-center space-x-3">
                            <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full"/>
                            <div>
                                <p className="font-medium text-gray-800">{emp.name}</p>
                                <p className="text-sm text-gray-500">{emp.anniversary.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">No upcoming anniversaries.</p>
                )}
            </ul>
        </Card>
    );
};

const QuickActionsCard: React.FC<{ setActivePage: (page: Page) => void }> = ({ setActivePage }) => (
    <Card>
        <h3 className="font-semibold text-lg text-gray-800 mb-4">Quick Actions</h3>
        <div className="flex flex-col space-y-3">
            <Button variant="secondary" onClick={() => setActivePage(Page.LMS)}>
                Manage Courses
            </Button>
            <Button variant="secondary" onClick={() => setActivePage(Page.Recruitment)}>
                Manage Candidates
            </Button>
        </div>
    </Card>
);

// --- Main Dashboard Page Component ---
const DashboardPage: React.FC<{ setActivePage: (page: Page) => void }> = ({ setActivePage }) => {
    const [employees] = useLocalStorage<Employee[]>('employees', INITIAL_EMPLOYEES);

    const departmentData = useMemo(() => {
        const counts = employees.reduce((acc, emp) => {
            acc[emp.department] = (acc[emp.department] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(counts).map(([name, count]) => ({ name, count }));
    }, [employees]);

    const newHiresThisMonth = useMemo(() => {
        const today = new Date();
        return employees.filter(e => {
            const startDate = new Date(e.startDate);
            return startDate.getFullYear() === today.getFullYear() && startDate.getMonth() === today.getMonth();
        }).length;
    }, [employees]);

    const stats = [
        { title: 'Total Employees', value: employees.length, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, color: '#3b82f6' },
        { title: 'Active', value: employees.filter(e => e.status === 'Active').length, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>, color: '#16a34a' },
        { title: 'On Leave', value: employees.filter(e => e.status === 'On Leave').length, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, color: '#f97316' },
        { title: 'New Hires (Month)', value: newHiresThisMonth, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>, color: '#8b5cf6' },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <DepartmentChart data={departmentData} />
                </div>
                <div className="space-y-6">
                    <UpcomingEventsCard employees={employees} />
                    <QuickActionsCard setActivePage={setActivePage} />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
