import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import Greeting from '@/components/dashboard/greeting';
import StudentInfoCard from '@/components/dashboard/student-info-card';
import AcademicSummaryCard from '@/components/dashboard/academic-summary-card';
import UpcomingCard from '@/components/dashboard/upcoming-card';
import CoursesCard from '@/components/dashboard/courses-card';
import AnnouncementsCard from '@/components/dashboard/announcements-card';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

  const { data: student, isLoading } = useQuery({
    queryKey: ['/api/students/1'],
    refetchOnMount: true,
  });

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Header 
        studentName={student?.name} 
        toggleSidebar={toggleMobileSidebar} 
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={isMobileSidebarOpen} 
          closeSidebar={closeMobileSidebar} 
        />
        
        {/* Mobile sidebar overlay */}
        {isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={closeMobileSidebar}
          />
        )}

        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <Greeting studentName={student?.name} date={formatDate()} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StudentInfoCard student={student} />
            <AcademicSummaryCard />
            <UpcomingCard />
            <CoursesCard />
            <AnnouncementsCard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
