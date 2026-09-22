import React from 'react';
import { MessageSquareText, ChevronRight, Megaphone } from 'lucide-react';

interface TestimonialsRowProps {
  onOpenTestimonials: () => void;
  language: 'ENG' | 'हिंदी';
}

export const TestimonialsRow: React.FC<TestimonialsRowProps> = ({
  onOpenTestimonials,
  language
}) => {
  return (
    <div className="px-4 py-2 space-y-3">
      {/* Hear From Our Users card */}
      <div
        id="card-hear-from-users"
        onClick={onOpenTestimonials}
        className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors active:scale-98"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
            <MessageSquareText className="w-4 h-4 text-slate-700" />
          </div>
          <div>
            <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight">
              {language === 'ENG' ? 'Hear From Our Users' : 'हमारे प्रतिभागियों से सुनें'}
            </h4>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">
              {language === 'ENG'
                ? 'See what participants say about Feedants'
                : 'देखें कि प्रतिभागी फीडएंट्स के बारे में क्या कहते हैं'}
            </p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400" />
      </div>

      {/* Ad Here Banner */}
      <div className="border border-dashed border-slate-200 rounded-xl py-2 px-4 flex items-center justify-center gap-2 text-slate-400 text-xs font-medium bg-slate-50/50">
        <Megaphone className="w-3.5 h-3.5 stroke-[1.8]" />
        <span>{language === 'ENG' ? 'Ad Here' : 'विज्ञापन स्थान'}</span>
      </div>
    </div>
  );
};
