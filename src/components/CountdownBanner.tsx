import React, { useState, useEffect } from 'react';
import { Hourglass, Timer } from 'lucide-react';

interface CountdownBannerProps {
  targetDate: string;
  language: 'ENG' | 'हिंदी';
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateTimeLeft(targetDate: string): TimeRemaining {
  const difference = new Date(targetDate).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds, isExpired: false };
}

export const CountdownBanner: React.FC<CountdownBannerProps> = ({ targetDate, language }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="px-4 py-2">
      <div className="bg-[#eaf6f6] rounded-xl px-3 py-2 flex items-center justify-between text-xs border border-[#cbebec]">
        {/* Left: Hourglass & Label */}
        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
          <Hourglass className="w-3.5 h-3.5 text-[#0d6e75]" />
          <span className="text-[11px] sm:text-xs">
            {timeLeft.isExpired
              ? (language === 'ENG' ? 'Registration closed' : 'पंजीकरण बंद')
              : (language === 'ENG' ? 'Registration closes in' : 'पंजीकरण समाप्त')}
          </span>
        </div>

        {/* Center: Dynamic Monospace Digital Clock */}
        <div className="font-mono font-bold text-xs sm:text-[13px] text-[#0d6e75] tracking-wider px-1">
          {timeLeft.isExpired ? (
            <span className="text-rose-600 font-semibold">00d : 00h : 00m : 00s</span>
          ) : (
            `${pad(timeLeft.days)}d : ${pad(timeLeft.hours)}h : ${pad(timeLeft.minutes)}m : ${pad(timeLeft.seconds)}s`
          )}
        </div>

        {/* Right: Hurry up pill */}
        <div className="flex items-center gap-1 text-[#0d6e75] font-semibold text-[11px] sm:text-xs">
          <Timer className="w-3.5 h-3.5" />
          <span>{language === 'ENG' ? 'Hurry up!' : 'जल्दी करें!'}</span>
        </div>
      </div>
    </div>
  );
};
