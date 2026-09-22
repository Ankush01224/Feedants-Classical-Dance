import React from 'react';
import { UploadCloud, CheckCircle2 } from 'lucide-react';
import { Competition } from '../types';

interface StickyBottomCtaProps {
  competition: Competition;
  isRegistered: boolean;
  hasSubmitted: boolean;
  onRegisterClick: () => void;
  onSubmitClick: () => void;
  language: 'ENG' | 'हिंदी';
}

export const StickyBottomCta: React.FC<StickyBottomCtaProps> = ({
  competition,
  isRegistered,
  hasSubmitted,
  onRegisterClick,
  onSubmitClick,
  language
}) => {
  const spotsLeft = Math.max(0, competition.totalSpots - competition.bookedSpots);

  // Dynamic button state resolution
  if (isRegistered) {
    return (
      <div className="sticky bottom-14 left-0 right-0 p-3 bg-white/95 backdrop-blur-xs border-t border-slate-100 z-10">
        <button
          id="btn-upload-submission"
          onClick={onSubmitClick}
          className="w-full bg-[#0d6e75] hover:bg-[#0a565c] text-white py-2.5 px-4 rounded-xl shadow-md flex flex-col items-center justify-center transition-all active:scale-98 cursor-pointer"
        >
          <span className="text-sm font-bold flex items-center gap-1.5 leading-tight">
            {hasSubmitted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                {language === 'ENG' ? 'View / Edit Submission' : 'प्रविष्टि देखें / बदलें'}
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4 text-white" />
                {language === 'ENG' ? 'Upload Submission' : 'प्रविष्टि अपलोड करें'}
              </>
            )}
          </span>
          <span className="text-[10px] text-teal-100 font-medium tracking-wide mt-0.5">
            {hasSubmitted
              ? (language === 'ENG' ? 'Submitted for Judging' : 'मूल्यांकन के लिए सबमिट किया गया')
              : (language === 'ENG' ? 'Registered' : 'पंजीकृत')}
          </span>
        </button>
      </div>
    );
  }

  // Not Registered states
  if (spotsLeft === 0) {
    return (
      <div className="sticky bottom-14 left-0 right-0 p-3 bg-white/95 backdrop-blur-xs border-t border-slate-100 z-10">
        <button
          id="btn-housefull"
          disabled
          className="w-full bg-slate-300 text-slate-600 py-3 px-4 rounded-xl shadow-xs flex flex-col items-center justify-center cursor-not-allowed"
        >
          <span className="text-sm font-bold leading-tight">
            {language === 'ENG' ? 'Housefull • Registration Closed' : 'सीटें भरी • पंजीकरण समाप्त'}
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            {language === 'ENG' ? 'All 20 spots have been booked' : 'सभी 20 सीटें भर चुकी हैं'}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="sticky bottom-14 left-0 right-0 p-3 bg-white/95 backdrop-blur-xs border-t border-slate-100 z-10">
      <button
        id="btn-register-now-cta"
        onClick={onRegisterClick}
        className="w-full bg-[#0d6e75] hover:bg-[#0a565c] text-white py-2.5 px-4 rounded-xl shadow-md flex items-center justify-between transition-all active:scale-98 cursor-pointer"
      >
        <div className="text-left pl-1">
          <span className="text-sm font-bold block leading-tight">
            {language === 'ENG' ? 'Register Now' : 'अभी पंजीकरण करें'}
          </span>
          <span className="text-[10px] text-teal-100 font-medium">
            {spotsLeft} {language === 'ENG' ? 'spots left • ₹1,500 prize pool' : 'सीटें शेष • ₹1,500 पुरस्कार'}
          </span>
        </div>
        <div className="bg-white/20 px-3 py-1 rounded-lg text-sm font-extrabold tracking-tight">
          ₹ {competition.entryFee}
        </div>
      </button>
    </div>
  );
};
