import React from 'react';
import { Wifi, Battery } from 'lucide-react';

export const StatusBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-slate-800 text-xs font-semibold select-none">
      <span className="font-semibold tracking-tight text-[13px]">9:41</span>
      <div className="flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9zm0 2c3.87 0 7 3.13 7 7 0 1.55-.5 2.98-1.35 4.14L12 19.68l-5.65-3.54C5.5 15.02 5 13.59 5 12c0-3.87 3.13-7 7-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
        <Battery className="w-4 h-4 stroke-[2.2]" />
      </div>
    </div>
  );
};
