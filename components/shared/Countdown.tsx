'use client';

import { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: string;
}

function calculateTimeLeft(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="flex gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-24 w-20 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (timeLeft.expired) {
    return (
      <div className="rounded-xl bg-gradient-to-r from-[hsl(var(--colorido-pink))] to-[hsl(var(--colorido-orange))] p-6 text-center text-white">
        <p className="font-display text-2xl font-bold">The Fest Has Begun!</p>
      </div>
    );
  }

  const items = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex h-20 w-20 flex-col items-center justify-center rounded-xl glass shadow-lg sm:h-24 sm:w-24"
        >
          <span className="font-display text-2xl font-bold text-gradient sm:text-3xl">
            {String(item.value).padStart(2, '0')}
          </span>
          <span className="text-xs font-medium text-muted-foreground mt-1">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
