import React from 'react';
import { Trophy, CheckCircle2, UserPlus } from 'lucide-react';
import { Competition } from '../types';

interface TitleAndTagsProps {
  competition: Competition;
  isRegistered: boolean;
  onRegisterClick: () => void;
  language: 'ENG' | 'हिंदी';
}

export const TitleAndTags: React.FC<TitleAndTagsProps> = ({
  competition,
  isRegistered,
  onRegisterClick,
  language
}) => {
  return (
    <div className="px-4 pt-2 pb-3">
      {/* Title & Status Badge Row */}
      <div className="flex items-start justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
          {language === 'ENG' ? competition.title : 'फीडएंट्स क्लासिकल डांस'}
        </h1>

        {/* Dynamic Registered / Register Button Badge */}
        {isRegistered ? (
          <div
            id="badge-registered-status"
            className="shrink-0 flex items-center gap-1.5 px-3 py-1 bg-[#e4f5f5] text-[#0d6e75] rounded-full text-xs font-semibold border border-[#c1e9ea]"
          >
            <CheckCircle2 className="w-3.5 h-3.5 fill-[#0d6e75] text-white" />
            <span>{language === 'ENG' ? 'Registered' : 'पंजीकृत'}</span>
          </div>
        ) : (
          <button
            id="badge-not-registered-btn"
            onClick={onRegisterClick}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-full text-xs font-semibold border border-amber-200 cursor-pointer transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5 text-amber-700" />
            <span>{language === 'ENG' ? 'Join Now' : 'भाग लें'}</span>
          </button>
        )}
      </div>

      {/* Tags Row */}
      <div className="flex flex-wrap items-center gap-2 mt-2">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
          {language === 'ENG' ? 'Dance' : 'नृत्य'}
        </span>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
          Multi-Win
        </span>
        <div className="flex items-center gap-1.5 text-xs font-medium text-[#0d6e75]">
          <Trophy className="w-3.5 h-3.5 text-[#0d6e75]" />
          <span>{language === 'ENG' ? 'Winners get certificate' : 'विजेताओं को प्रमाणपत्र'}</span>
        </div>
      </div>
    </div>
  );
};
