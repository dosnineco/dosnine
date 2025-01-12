import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';


const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2025-01-29T00:00:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-yellow-300 flex  items-center justify-center space-x-4 py-2 px-4">
      <div className="flex items-center space-x-2">
        <Timer className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-500">Launch in:</span>
      </div>
      
      <div className="text-gray-500 flex space-x-3">
        {[
          { label: 'd', value: timeLeft.days },
          { label: 'h', value: timeLeft.hours },
          { label: 'm', value: timeLeft.minutes },
          { label: 's', value: timeLeft.seconds }
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center">
            <div className="bg-white bg-opacity-10 rounded px-2 py-1">
              <span className="text-sm font-bold text-gray-500">
                {value.toString().padStart(2, '0')}
              </span>
            </div>
            <span className="ml-1 text-xs text-gray-500 opacity-90">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;