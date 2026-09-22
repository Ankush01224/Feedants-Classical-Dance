import React from 'react';
import { Play } from 'lucide-react';
import { PreviousWinner } from '../types';

interface PreviousWinnersCarouselProps {
  winners: PreviousWinner[];
  onSelectWinner: (winner: PreviousWinner) => void;
  language: 'ENG' | 'हिंदी';
}

export const PreviousWinnersCarousel: React.FC<PreviousWinnersCarouselProps> = ({
  winners,
  onSelectWinner,
  language
}) => {
  return (
    <div className="py-2">
      <div className="px-4 mb-2">
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          {language === 'ENG' ? 'Previous Winners' : 'पूर्व विजेता'}
        </h2>
      </div>

      {/* Horizontal Scrollable Row */}
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar scroll-smooth">
        {winners.map((winner) => (
          <div
            key={winner.id}
            id={`winner-card-${winner.id}`}
            onClick={() => onSelectWinner(winner)}
            className="flex-shrink-0 w-28 group cursor-pointer active:scale-95 transition-transform"
          >
            {/* Card Thumbnail */}
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden shadow-xs border border-slate-100 bg-slate-100">
              <img
                src={winner.avatarUrl}
                alt={winner.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors" />

              {/* Play Button Overlay */}
              <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-[#0d6e75]/90 text-white flex items-center justify-center shadow-md">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
            </div>

            {/* Winner Info */}
            <div className="mt-1.5 px-0.5">
              <h4 className="text-xs font-bold text-slate-900 truncate">
                {winner.name}
              </h4>
              <p className="text-[11px] font-semibold text-[#0d6e75] truncate">
                {winner.rank}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
