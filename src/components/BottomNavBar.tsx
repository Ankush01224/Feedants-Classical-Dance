import React from 'react';
import { Home, Compass, Plus, Trophy, User } from 'lucide-react';

interface BottomNavBarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  language: 'ENG' | 'हिंदी';
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab = 'competitions',
  onTabChange,
  language
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 px-4 py-1.5 flex items-center justify-around z-20 shadow-lg">
      {/* Home */}
      <button
        id="nav-home"
        onClick={() => onTabChange?.('home')}
        className={`flex flex-col items-center gap-0.5 transition-colors cursor-pointer py-1 ${
          activeTab === 'home' ? 'text-[#0d6e75]' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Home className="w-5 h-5 stroke-[1.8]" />
        <span className="text-[10px] font-medium leading-none">
          {language === 'ENG' ? 'Home' : 'होम'}
        </span>
      </button>

      {/* Explore */}
      <button
        id="nav-explore"
        onClick={() => onTabChange?.('explore')}
        className={`flex flex-col items-center gap-0.5 transition-colors cursor-pointer py-1 ${
          activeTab === 'explore' ? 'text-[#0d6e75]' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Compass className="w-5 h-5 stroke-[1.8]" />
        <span className="text-[10px] font-medium leading-none">
          {language === 'ENG' ? 'Explore' : 'खोजें'}
        </span>
      </button>

      {/* Center FAB (+) */}
      <button
        id="nav-fab-create"
        onClick={() => onTabChange?.('create')}
        className="w-10 h-10 rounded-full bg-[#0d6e75] hover:bg-[#0a565c] text-white flex items-center justify-center shadow-md active:scale-95 transition-all -mt-4 cursor-pointer"
        title="Create or Participate"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* Competitions (Active) */}
      <button
        id="nav-competitions"
        onClick={() => onTabChange?.('competitions')}
        className={`flex flex-col items-center gap-0.5 transition-colors cursor-pointer py-1 ${
          activeTab === 'competitions' ? 'text-[#0d6e75]' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Trophy className="w-5 h-5 stroke-[2] fill-[#0d6e75]/20" />
        <span className="text-[10px] font-bold leading-none">
          {language === 'ENG' ? 'Competitions' : 'प्रतियोगिताएं'}
        </span>
      </button>

      {/* Profile */}
      <button
        id="nav-profile"
        onClick={() => onTabChange?.('profile')}
        className={`flex flex-col items-center gap-0.5 transition-colors cursor-pointer py-1 ${
          activeTab === 'profile' ? 'text-[#0d6e75]' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-300">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
            alt="Profile"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-[10px] font-medium leading-none">
          {language === 'ENG' ? 'Profile' : 'प्रोफ़ाइल'}
        </span>
      </button>
    </nav>
  );
};
