import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, AlertTriangle, BookOpen } from 'lucide-react';

const UpcomingCard: React.FC = () => {
  // This would typically come from API, using mock data for now
  const upcomingDeadlines = [
    {
      title: 'Project Proposal',
      course: 'CS401',
      dueDate: 'Oct 15, 2023',
      type: 'assignment', // Used for icon selection
    },
    {
      title: 'Midterm Exam',
      course: 'MATH301',
      dueDate: 'Oct 20, 2023',
      type: 'exam',
    },
    {
      title: 'Reading Assignment',
      course: 'ENG210',
      dueDate: 'Oct 22, 2023',
      type: 'reading',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return <AlertTriangle className="text-red-500 mr-3" size={20} />;
      case 'reading':
        return <BookOpen className="text-primary mr-3" size={20} />;
      case 'assignment':
      default:
        return <Calendar className="text-amber-500 mr-3" size={20} />;
    }
  };

  return (
    <Card className="col-span-1 transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Upcoming Deadlines</h3>
        <div className="space-y-4">
          {upcomingDeadlines.map((deadline, index) => (
            <div 
              key={index} 
              className={`flex items-start py-2 ${
                index !== upcomingDeadlines.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              {getIcon(deadline.type)}
              <div>
                <p className="text-gray-800 font-medium">{deadline.title}</p>
                <p className="text-sm text-gray-500">
                  {deadline.course} - Due {deadline.dueDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingCard;
