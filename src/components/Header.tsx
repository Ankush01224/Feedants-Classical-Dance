import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  language: 'ENG' | 'हिंदी';
  onLanguageChange: (lang: 'ENG' | 'हिंदी') => void;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ language, onLanguageChange, onBack }) => {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white">
      <button
        id="btn-go-back"
        onClick={onBack || (() => alert('Go back clicked'))}
        className="flex items-center gap-1.5 text-slate-900 font-semibold text-sm hover:opacity-80 transition-opacity active:scale-95"
      >
        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        <span>{language === 'ENG' ? 'Go back' : 'पीछे जाएं'}</span>
      </button>

      {/* Language Switcher Pill */}
      <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200 text-xs font-semibold">
        <button
          id="btn-lang-eng"
          onClick={() => onLanguageChange('ENG')}
          className={`px-3 py-1 rounded-full transition-all duration-200 ${
            language === 'ENG'
              ? 'bg-[#0a5257] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          ENG
        </button>
        <button
          id="btn-lang-hi"
          onClick={() => onLanguageChange('हिंदी')}
          className={`px-3 py-1 rounded-full transition-all duration-200 ${
            language === 'हिंदी'
              ? 'bg-[#0a5257] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          हिंदी
        </button>
      </div>
    </header>
  );
};
