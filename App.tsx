import React, { useState } from 'react';
import { Page } from './types';
import { Icons } from './components/ui';
import DashboardPage from './components/Dashboard';
import EmployeesPage from './components/Employees';
import RecruitmentPage from './components/Recruitment';

const NAV_ITEMS: { page: Page; icon: JSX.Element }[] = [
  { page: Page.Dashboard, icon: Icons.dashboard },
  { page: Page.Employees, icon: Icons.employees },
  { page: Page.Recruitment, icon: Icons.recruitment },
];

const Sidebar: React.FC<{ activePage: Page; setActivePage: (page: Page) => void }> = ({ activePage, setActivePage }) => {
  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-gray-200 flex flex-col">
      <div className="h-16 flex items-center justify-center px-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
            {Icons.logo}
            <span className="text-xl font-semibold">ZenithHR</span>
        </div>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {NAV_ITEMS.map(({ page, icon }) => (
          <a
            key={page}
            href="#"
            onClick={(e) => { e.preventDefault(); setActivePage(page); }}
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
              ${activePage === page 
                ? 'bg-primary-600 text-white' 
                : 'hover:bg-gray-700 hover:text-white'}`}
          >
            <span className="mr-3">{icon}</span>
            {page}
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
            <img className="h-9 w-9 rounded-full" src="https://picsum.photos/id/1027/100/100" alt="Admin user"/>
            <div className="ml-3">
                <p className="text-sm font-medium text-white">Jane Doe</p>
                <p className="text-xs font-medium text-gray-400">Admin</p>
            </div>
        </div>
      </div>
    </aside>
  );
};

const Header: React.FC<{ activePage: Page }> = ({ activePage }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8">
      <h1 className="text-2xl font-semibold text-gray-800">{activePage}</h1>
    </header>
  );
};

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Dashboard);

  const renderPage = () => {
    switch (activePage) {
      case Page.Dashboard:
        return <DashboardPage />;
      case Page.Employees:
        return <EmployeesPage />;
      case Page.Recruitment:
        return <RecruitmentPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activePage={activePage} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;