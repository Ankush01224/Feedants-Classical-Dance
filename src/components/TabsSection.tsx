import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Award } from 'lucide-react';
import { Competition } from '../types';

interface TabsSectionProps {
  competition: Competition;
  language: 'ENG' | 'हिंदी';
}

export const TabsSection: React.FC<TabsSectionProps> = ({ competition, language }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'judging' | 'rules'>('about');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="px-4 py-3 bg-white mt-1 border-t border-slate-100">
      {/* Tab Navigation Header */}
      <div className="flex border-b border-slate-200">
        <button
          id="tab-btn-about"
          onClick={() => setActiveTab('about')}
          className={`pb-2.5 px-1 mr-5 text-xs sm:text-[13px] font-bold transition-all relative ${
            activeTab === 'about'
              ? 'text-[#0d6e75] border-b-2 border-[#0d6e75]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {language === 'ENG' ? 'About Competition' : 'प्रतियोगिता के बारे में'}
        </button>

        <button
          id="tab-btn-judging"
          onClick={() => setActiveTab('judging')}
          className={`pb-2.5 px-1 mr-5 text-xs sm:text-[13px] font-bold transition-all relative ${
            activeTab === 'judging'
              ? 'text-[#0d6e75] border-b-2 border-[#0d6e75]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {language === 'ENG' ? 'Judging Parameters' : 'मूल्यांकन मानदंड'}
        </button>

        <button
          id="tab-btn-rules"
          onClick={() => setActiveTab('rules')}
          className={`pb-2.5 px-1 text-xs sm:text-[13px] font-bold transition-all relative ${
            activeTab === 'rules'
              ? 'text-[#0d6e75] border-b-2 border-[#0d6e75]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {language === 'ENG' ? 'Rules & Eligibility' : 'नियम व पात्रता'}
        </button>
      </div>

      {/* Tab Content */}
      <div className="py-3">
        {activeTab === 'about' && (
          <div>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              {competition.about.short}
            </p>

            {isExpanded && (
              <div className="mt-3 space-y-2.5 pt-2 border-t border-slate-100 text-xs sm:text-[13px] text-slate-600 leading-relaxed animate-fadeIn">
                <p>{competition.about.full}</p>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mt-2">
                  <h4 className="font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5 text-xs">
                    <Award className="w-3.5 h-3.5 text-[#0d6e75]" />
                    {language === 'ENG' ? 'Competition Highlights' : 'मुख्य विशेषताएं'}:
                  </h4>
                  <ul className="space-y-1">
                    {competition.about.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-slate-600 text-xs">
                        <span className="text-[#0d6e75] font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <button
              id="btn-toggle-view-more"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-xs font-semibold text-[#0d6e75] flex items-center gap-1 hover:underline cursor-pointer py-1"
            >
              <span>{isExpanded ? (language === 'ENG' ? 'View less' : 'कम देखें') : (language === 'ENG' ? 'View more' : 'अधिक देखें')}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        )}

        {activeTab === 'judging' && (
          <div className="space-y-2.5">
            <p className="text-xs text-slate-500 mb-2">
              {language === 'ENG'
                ? 'Submissions are scored out of 100 points based on the following criteria:'
                : 'प्रविष्टियों का मूल्यांकन 100 अंकों में से निम्नलिखित मानदंडों पर किया जाएगा:'}
            </p>
            {competition.judgingParameters.map((param, index) => (
              <div
                key={index}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-2"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{param.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                    {param.description}
                  </p>
                </div>
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-[#e8f6f6] text-[#0d6e75] font-bold text-[11px]">
                  {param.weightage}%
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="space-y-2">
            <ul className="space-y-2">
              {competition.rulesAndEligibility.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0d6e75] shrink-0 mt-0.5" />
                  <span className="leading-snug">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
