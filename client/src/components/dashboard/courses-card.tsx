import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const CoursesCard: React.FC = () => {
  // This would typically come from API, using mock data for now
  const courses = [
    {
      code: 'CS401',
      name: 'Advanced Programming',
      credits: 4,
      instructor: 'Dr. Jane Smith',
      schedule: 'Mon/Wed 10:00-11:30',
      grade: 'A',
      gradeColor: 'text-green-600',
    },
    {
      code: 'MATH301',
      name: 'Linear Algebra',
      credits: 3,
      instructor: 'Dr. Robert Johnson',
      schedule: 'Tue/Thu 1:00-2:30',
      grade: 'B+',
      gradeColor: 'text-primary',
    },
    {
      code: 'ENG210',
      name: 'Technical Writing',
      credits: 3,
      instructor: 'Prof. Michael Brown',
      schedule: 'Wed 3:00-6:00',
      grade: 'C',
      gradeColor: 'text-amber-500',
    },
  ];

  return (
    <Card className="col-span-1 lg:col-span-2 transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Current Courses</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Course</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Instructor</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Schedule</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Grade</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-gray-100 hover:bg-gray-50 ${
                    index === courses.length - 1 ? 'border-none' : ''
                  }`}
                >
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-800">
                        {course.code}: {course.name}
                      </p>
                      <p className="text-sm text-gray-500">{course.credits} credits</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-800">{course.instructor}</td>
                  <td className="py-3 px-4 text-gray-800">{course.schedule}</td>
                  <td className={`py-3 px-4 text-right font-medium ${course.gradeColor}`}>
                    {course.grade}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursesCard;
