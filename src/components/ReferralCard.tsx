import React, { useState } from 'react';
import { Megaphone, Check } from 'lucide-react';
import { Competition } from '../types';

interface ReferralCardProps {
  referral: Competition['referral'];
  language: 'ENG' | 'हिंदी';
}

export const ReferralCard: React.FC<ReferralCardProps> = ({ referral, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(referral.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Feedants Classical Dance Competition',
          text: `Join the Feedants Classical Dance competition and win ₹1,500 prize pool! Use my link: ${referral.url}`,
          url: referral.url
        })
        .catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="px-4 py-2">
      <div className="bg-[#eefbf4] rounded-2xl p-3.5 border border-[#c3f0d4] relative">
        <div className="flex items-start gap-2.5">
          {/* Megaphone Icon */}
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
            <Megaphone className="w-4 h-4 text-emerald-600" />
          </div>

          {/* Center Info + Input */}
          <div className="flex-1 min-w-0 pr-1">
            <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight">
              {language === 'ENG' ? 'Refer & Earn more discount' : 'रेफर करें और छूट पाएं'}
            </h4>

            {/* Link & Copy Row */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex-1 bg-white border border-emerald-200 rounded-lg px-2 py-1 text-[11px] text-slate-600 truncate font-mono select-all">
                {referral.url}
              </div>
              <button
                id="btn-copy-referral-link"
                onClick={handleCopy}
                className="shrink-0 bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-800 text-[11px] font-semibold px-2 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>{language === 'ENG' ? 'Copied' : 'कॉपी हुआ'}</span>
                  </>
                ) : (
                  <span>{language === 'ENG' ? 'Copy Link' : 'लिंक कॉपी'}</span>
                )}
              </button>
            </div>
          </div>

          {/* Right Action: Refer Now */}
          <div className="shrink-0 flex flex-col items-center justify-center">
            <button
              id="btn-refer-now"
              onClick={handleShare}
              className="bg-[#0d6e75] hover:bg-[#0b5b61] text-white text-xs font-semibold px-3 py-1.5 rounded-lg active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              {language === 'ENG' ? 'Refer Now' : 'रेफर करें'}
            </button>
            <span className="text-[9px] text-slate-500 font-medium mt-1 text-center max-w-[85px] leading-tight">
              {language === 'ENG' ? 'You earn ' : 'आपको '}
              <strong className="text-slate-800">₹{referral.rewardPerSignup}</strong>
              {language === 'ENG' ? ' for every signup' : ' प्रति साइनअप'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
