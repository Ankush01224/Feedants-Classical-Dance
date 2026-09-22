import React from 'react';
import { Play } from 'lucide-react';
import { Judge } from '../types';

interface JudgeCardProps {
  judge: Judge;
  onPlayIntro: () => void;
  language: 'ENG' | 'हिंदी';
}

export const JudgeCard: React.FC<JudgeCardProps> = ({ judge, onPlayIntro, language }) => {
  return (
    <div className="px-4 py-2">
      <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex items-center justify-between">
        {/* Left: Judge Avatar + Bio */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-14 h-14 rounded-full p-0.5 border-2 border-amber-500 overflow-hidden shadow-xs">
              <img
                src={judge.avatarUrl}
                alt={judge.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <div>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              {language === 'ENG' ? judge.role : 'निर्णायक'}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              {judge.name}
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-tight mt-0.5">
              {judge.title}
            </p>
            <p className="text-[11px] text-slate-400 font-normal leading-tight mt-0.5">
              {judge.experience}
            </p>
          </div>
        </div>

        {/* Right: Intro Video Action */}
        <button
          id="btn-judge-intro-video"
          onClick={onPlayIntro}
          className="flex flex-col items-center justify-center gap-1 group cursor-pointer active:scale-95 transition-transform"
        >
          <div className="w-10 h-10 rounded-full bg-[#e8f6f6] group-hover:bg-[#d6f0f0] flex items-center justify-center transition-colors">
            <Play className="w-4 h-4 fill-[#0d6e75] text-[#0d6e75] ml-0.5" />
          </div>
          <span className="text-[10px] font-semibold text-slate-600 group-hover:text-slate-900">
            {language === 'ENG' ? 'Intro Video' : 'परिचय वीडियो'}
          </span>
        </button>
      </div>
    </div>
  );
};
