import React from 'react';
import { Users } from 'lucide-react';
import { Competition } from '../types';

interface MetricsRowProps {
  competition: Competition;
  language: 'ENG' | 'हिंदी';
}

export const MetricsRow: React.FC<MetricsRowProps> = ({ competition, language }) => {
  const spotsLeft = Math.max(0, competition.totalSpots - competition.bookedSpots);
  const bookedPercentage = Math.min(100, Math.round((competition.bookedSpots / competition.totalSpots) * 100));

  return (
    <div className="px-4 py-3 bg-white">
      <div className="grid grid-cols-3 gap-2 items-center">
        {/* Prize Pool */}
        <div>
          <span className="block text-[11px] font-medium text-slate-500 uppercase tracking-wide">
            {language === 'ENG' ? 'Prize Pool' : 'पुरस्कार राशि'}
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-[#0d6e75] tracking-tight">
            ₹ {competition.prizePool.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Entry Fee */}
        <div>
          <span className="block text-[11px] font-medium text-slate-500 uppercase tracking-wide">
            {language === 'ENG' ? 'Entry Fee' : 'प्रवेश शुल्क'}
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            ₹ {competition.entryFee}
          </div>
        </div>

        {/* Remaining Spots */}
        <div className="flex flex-col items-start justify-center pl-1">
          <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#0d6e75] mb-1">
            <Users className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>
              {spotsLeft === 0
                ? (language === 'ENG' ? 'Housefull' : 'सीटें भरी')
                : (language === 'ENG' ? `Only ${spotsLeft} spots left` : `केवल ${spotsLeft} सीटें बची हैं`)}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                spotsLeft === 0 ? 'bg-rose-500' : 'bg-[#0d6e75]'
              }`}
              style={{ width: `${Math.max(5, bookedPercentage)}%` }}
            />
          </div>

          <span className="text-[10px] text-slate-400 font-medium mt-1">
            {competition.bookedSpots} / {competition.totalSpots} {language === 'ENG' ? 'Booked' : 'बुक हुई'}
          </span>
        </div>
      </div>
    </div>
  );
};
