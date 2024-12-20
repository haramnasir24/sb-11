"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({
  targetDate,
  onComplete,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let newTimeLeft: TimeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else if (!isComplete) {
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
      }

      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timerId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, [targetDate, onComplete, isComplete]);

  return (
    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="w-32 text-center">
          <span className="text-4xl font-bold text-white md:text-6xl">
            {value.toString().padStart(2, "0")}
          </span>
          <span className="mt-2 block text-sm uppercase text-white md:text-lg">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}
