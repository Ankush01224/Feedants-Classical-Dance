import React from 'react';
import { Trophy, Medal, Star, Info } from 'lucide-react';
import { RewardItem } from '../types';

interface RewardsSectionProps {
  rewards: RewardItem[];
  disclaimer: string;
  language: 'ENG' | 'हिंदी';
}

export const RewardsSection: React.FC<RewardsSectionProps> = ({
  rewards,
  disclaimer,
  language
}) => {
  const getBadgeIcon = (badgeType: string) => {
    switch (badgeType) {
      case 'gold':
        return <Trophy className="w-4 h-4 text-amber-500 fill-amber-500/20" />;
      case 'silver':
        return <Medal className="w-4 h-4 text-slate-400 fill-slate-300/30" />;
      case 'bronze':
        return <Medal className="w-4 h-4 text-amber-700 fill-amber-700/20" />;
      default:
        return <Star className="w-4 h-4 text-[#0d6e75]" />;
    }
  };

  return (
    <div className="px-4 py-3 bg-white">
      {/* Header */}
      <div className="flex items-baseline gap-1.5 mb-2.5">
        <h2 className="text-xs sm:text-[13px] font-bold text-slate-900">
          {language === 'ENG' ? 'Rewards' : 'पुरस्कार'}
        </h2>
        <span className="text-[11px] text-slate-500 font-medium">
          {language === 'ENG' ? '(All Positions)' : '(सभी स्थान)'}
        </span>
      </div>

      {/* Rewards List */}
      <div className="space-y-2">
        {rewards.map((reward) => (
          <div
            key={reward.rank}
            className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-5 flex items-center justify-center">
                {getBadgeIcon(reward.badgeType)}
              </div>
              <span className="text-xs sm:text-[13px] font-semibold text-slate-800">
                {language === 'ENG'
                  ? reward.position
                  : reward.rank === 1
                  ? 'प्रथम विजेता'
                  : reward.rank === 2
                  ? 'द्वितीय विजेता'
                  : reward.rank === 3
                  ? 'तृतीय विजेता'
                  : `${reward.rank}वां स्थान`}
              </span>
            </div>

            <div className="text-xs sm:text-[13px] font-extrabold text-[#0d6e75] tracking-tight">
              ₹ {reward.amount}
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer Box */}
      <div className="mt-3.5 bg-[#eaf6f6] rounded-xl p-2.5 flex items-start gap-2 border border-[#cbebec]">
        <Info className="w-4 h-4 text-[#0d6e75] shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-700 leading-snug font-medium">
          {language === 'ENG'
            ? disclaimer
            : 'अस्वीकरण: केवल भुगतान करने वाले प्रतिभागियों की प्रविष्टियों पर ही निर्णय लिया जाएगा।'}
        </p>
      </div>
    </div>
  );
};
