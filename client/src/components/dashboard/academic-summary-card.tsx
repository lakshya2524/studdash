import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AcademicSummaryCard: React.FC = () => {
  return (
    <Card className="col-span-1 transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Academic Summary</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Current Semester</p>
            <p className="text-gray-800 font-medium">Fall 2023</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Enrolled Courses</p>
            <p className="text-gray-800 font-medium">5 courses</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Credit Hours</p>
            <p className="text-gray-800 font-medium">16 hours</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Current GPA</p>
            <p className="text-gray-800 font-medium">3.75</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicSummaryCard;
