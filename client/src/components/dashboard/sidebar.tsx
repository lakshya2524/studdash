import React from 'react';
import { 
  Home, User, BookOpen, ClipboardList, 
  ChartBarStacked, Settings, LogOut 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: User, label: 'Profile', active: false },
  { icon: BookOpen, label: 'Courses', active: false },
  { icon: ClipboardList, label: 'Assignments', active: false },
  { icon: ChartBarStacked, label: 'Grades', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  return (
    <aside 
      className={`w-64 bg-white shadow-md fixed md:static inset-y-0 left-0 z-20 
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 ease-in-out h-full`}
    >
      <nav className="py-4 h-full flex flex-col">
        <div className="flex-1">
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className={`px-4 py-2 border-l-4 ${
                item.active 
                  ? 'border-primary bg-primary bg-opacity-10' 
                  : 'border-transparent hover:bg-gray-100'
              } cursor-pointer`}
              onClick={item.active ? undefined : closeSidebar}
            >
              <div className="flex items-center">
                <item.icon 
                  className={`mr-3 ${
                    item.active ? 'text-primary' : 'text-gray-500'
                  }`} 
                  size={20} 
                />
                <span 
                  className={`${
                    item.active ? 'text-primary font-medium' : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t">
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={closeSidebar}>
            <div className="flex items-center">
              <LogOut className="mr-3 text-gray-500" size={20} />
              <span className="text-gray-500">Logout</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
