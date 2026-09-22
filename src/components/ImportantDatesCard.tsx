import React from 'react';
import { Calendar, Send, UploadCloud, Trophy } from 'lucide-react';
import { CompetitionDates } from '../types';

interface ImportantDatesCardProps {
  dates: CompetitionDates;
  language: 'ENG' | 'हिंदी';
}

export const ImportantDatesCard: React.FC<ImportantDatesCardProps> = ({ language }) => {
  return (
    <div className="px-4 py-2">
      <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
        {language === 'ENG' ? 'Important Dates' : 'महत्वपूर्ण तिथियां'}
      </h2>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {/* Row 1: Register Before & Submission Starts */}
        <div className="grid grid-cols-2 divide-x divide-slate-100">
          {/* Cell 1: Register Before */}
          <div className="p-3.5 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#eaf6f6] flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-[#0d6e75]" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-400 block leading-tight">
                {language === 'ENG' ? 'Register Before' : 'पंजीकरण अंतिम तिथि'}
              </span>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 leading-tight">
                10 Aug 26
              </div>
              <div className="text-[11px] text-slate-500 font-medium leading-tight">
                11:50 PM
              </div>
            </div>
          </div>

          {/* Cell 2: Submission Starts */}
          <div className="p-3.5 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#eaf6f6] flex items-center justify-center shrink-0">
              <Send className="w-4 h-4 text-[#0d6e75]" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-400 block leading-tight">
                {language === 'ENG' ? 'Submission Starts' : 'प्रविष्टि आरंभ'}
              </span>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 leading-tight">
                6 Aug 26
              </div>
              <div className="text-[11px] text-slate-500 font-medium leading-tight">
                04:00 AM
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Submission Ends & Result Date */}
        <div className="grid grid-cols-2 divide-x divide-slate-100">
          {/* Cell 3: Submission Ends */}
          <div className="p-3.5 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#eaf6f6] flex items-center justify-center shrink-0">
              <UploadCloud className="w-4 h-4 text-[#0d6e75]" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-400 block leading-tight">
                {language === 'ENG' ? 'Submission Ends' : 'प्रविष्टि अंतिम तिथि'}
              </span>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 leading-tight">
                30 Aug 26
              </div>
              <div className="text-[11px] text-slate-500 font-medium leading-tight">
                11:55 PM
              </div>
            </div>
          </div>

          {/* Cell 4: Result Date */}
          <div className="p-3.5 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#eaf6f6] flex items-center justify-center shrink-0">
              <Trophy className="w-4 h-4 text-[#0d6e75]" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-400 block leading-tight">
                {language === 'ENG' ? 'Result Date' : 'परिणाम घोषणा'}
              </span>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 leading-tight">
                1 Sept 26
              </div>
              <div className="text-[11px] text-slate-500 font-medium leading-tight">
                11:50 PM
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
