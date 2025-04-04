import React from 'react';

interface GreetingProps {
  studentName: string;
  date: string;
}

const Greeting: React.FC<GreetingProps> = ({ studentName, date }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = studentName?.split(' ')[0] || '';

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-medium text-gray-800">
        {`${getGreeting()}, ${firstName}!`}
      </h2>
      <p className="text-gray-500">{date}</p>
    </div>
  );
};

export default Greeting;
