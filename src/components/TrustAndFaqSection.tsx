import React from 'react';
import { Play, ShieldCheck } from 'lucide-react';

interface TrustAndFaqSectionProps {
  onWatchPrizeVideo: () => void;
  onOpenRefundPolicy: () => void;
  language: 'ENG' | 'हिंदी';
}

export const TrustAndFaqSection: React.FC<TrustAndFaqSectionProps> = ({
  onWatchPrizeVideo,
  onOpenRefundPolicy,
  language
}) => {
  return (
    <div className="px-4 py-2">
      <div className="grid grid-cols-2 gap-2.5">
        {/* Left Card: Prize Money Video */}
        <div
          id="card-prize-money-faq"
          onClick={onWatchPrizeVideo}
          className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-2.5 cursor-pointer hover:bg-slate-50 transition-colors active:scale-98"
        >
          <div className="w-9 h-9 rounded-full bg-[#eaf6f6] flex items-center justify-center shrink-0">
            <Play className="w-4 h-4 fill-[#0d6e75] text-[#0d6e75] ml-0.5" />
          </div>
          <div>
            <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">
              {language === 'ENG' ? 'How will you receive prize money?' : 'पुरस्कार राशि कैसे प्राप्त होगी?'}
            </h4>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5 leading-tight">
              {language === 'ENG' ? 'Watch video to know more' : 'अधिक जानने के लिए वीडियो देखें'}
            </p>
          </div>
        </div>

        {/* Right Card: Security & Razorpay */}
        <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-center space-y-1.5">
          {/* Refund Policy */}
          <button
            onClick={onOpenRefundPolicy}
            className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium hover:text-[#0d6e75] text-left transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-700 shrink-0" />
            <span className="truncate">{language === 'ENG' ? 'Refund policy' : 'रिफंड नीति'}</span>
          </button>

          {/* Secure Payments powered by Razorpay */}
          <div className="flex items-center gap-1.5 text-[10px] text-slate-600 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-700 shrink-0" />
            <span className="truncate">
              {language === 'ENG' ? 'Secure payments powered by' : 'सुरक्षित भुगतान'}
            </span>
            <span className="font-bold text-[#0d6e75] italic tracking-tight text-[11px]">
              Razorpay
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
