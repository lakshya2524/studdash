import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AnnouncementsCard: React.FC = () => {
  // This would typically come from API, using mock data for now
  const announcements = [
    {
      title: 'Campus-Wide System Maintenance',
      date: '2 days ago',
      content: 'IT services will be unavailable this Saturday from 2-4 AM for scheduled maintenance.',
    },
    {
      title: 'Registration for Spring 2024',
      date: '5 days ago',
      content: 'Course registration for the Spring 2024 semester opens on November 1st. Please check your assigned registration time.',
    },
  ];

  return (
    <Card className="col-span-1 transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Announcements</h3>
        {announcements.map((announcement, index) => (
          <div 
            key={index} 
            className={`py-3 ${
              index !== announcements.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-gray-800">{announcement.title}</h4>
              <span className="text-xs text-gray-500">{announcement.date}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{announcement.content}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AnnouncementsCard;
