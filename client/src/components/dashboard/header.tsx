import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  studentName: string;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ studentName, toggleSidebar }) => {
  return (
    <header className="bg-primary text-white shadow-md z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="mr-4 md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-medium">Student Dashboard</h1>
        </div>
        <div className="flex items-center">
          <div className="hidden md:block mr-4">
            <span className="text-sm">{studentName}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center overflow-hidden">
            <span className="text-sm">
              {studentName?.charAt(0).toUpperCase() || 'S'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
