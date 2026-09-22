import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from './components/StatusBar';
import { Header } from './components/Header';
import { TitleAndTags } from './components/TitleAndTags';
import { MetricsRow } from './components/MetricsRow';
import { JudgeCard } from './components/JudgeCard';
import { CountdownBanner } from './components/CountdownBanner';
import { ImportantDatesCard } from './components/ImportantDatesCard';
import { PreviousWinnersCarousel } from './components/PreviousWinnersCarousel';
import { TabsSection } from './components/TabsSection';
import { RewardsSection } from './components/RewardsSection';
import { TrustAndFaqSection } from './components/TrustAndFaqSection';
import { ReferralCard } from './components/ReferralCard';
import { TestimonialsRow } from './components/TestimonialsRow';
import { StickyBottomCta } from './components/StickyBottomCta';
import { BottomNavBar } from './components/BottomNavBar';
import {
  VideoModal,
  RegistrationModal,
  SubmissionModal,
  TestimonialsModal,
  RefundPolicyModal
} from './components/Modals';
import { EvaluatorSandbox } from './components/EvaluatorSandbox';
import { Competition, UserRegistration, PreviousWinner, ConcurrencyTestResult } from './types';
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react';

export default function App() {
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // App language state
  const [language, setLanguage] = useState<'ENG' | 'हिंदी'>('ENG');

  // User session state
  const [userId, setUserId] = useState('user_ankush_demo');
  const [isRegistered, setIsRegistered] = useState(true); // Default matches design reference (✓ Registered)
  const [registration, setRegistration] = useState<UserRegistration | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(true);

  // View mode: Mobile frame vs full width
  const [isMobileView, setIsMobileView] = useState(true);
  const [activeNavTab, setActiveNavTab] = useState('competitions');

  // Modals
  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean;
    title: string;
    subtitle?: string;
    videoUrl?: string;
    posterUrl?: string;
    description?: string;
  }>({
    isOpen: false,
    title: '',
    subtitle: '',
    videoUrl: '',
    posterUrl: '',
    description: ''
  });

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isTestimonialsOpen, setIsTestimonialsOpen] = useState(false);
  const [isRefundPolicyOpen, setIsRefundPolicyOpen] = useState(false);

  // Load Competition and User status from Backend
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const compRes = await fetch('/api/competitions/current');
      if (!compRes.ok) throw new Error('Failed to fetch competition details');
      const compData: Competition = await compRes.json();
      setCompetition(compData);

      // Check current user status
      const userRes = await fetch(
        `/api/competitions/${compData._id}/registration-status?userId=${userId}`
      );
      if (userRes.ok) {
        const userData = await userRes.json();
        setIsRegistered(userData.isRegistered);
        setRegistration(userData.registration);
        setHasSubmitted(userData.hasSubmitted);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error communicating with server');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Video triggers
  const handlePlayJudgeIntro = () => {
    if (!competition) return;
    setVideoModal({
      isOpen: true,
      title: `${competition.judge.name} — Intro Video`,
      subtitle: `${competition.judge.title} (${competition.judge.experience})`,
      videoUrl: competition.judge.introVideoUrl,
      posterUrl: competition.judge.avatarUrl,
      description: competition.judge.bio
    });
  };

  const handleSelectWinner = (winner: PreviousWinner) => {
    setVideoModal({
      isOpen: true,
      title: `${winner.name} (${winner.rank})`,
      subtitle: `${winner.danceStyle} Solo Performance`,
      videoUrl: winner.videoUrl,
      posterUrl: winner.avatarUrl,
      description: `Watch ${winner.name}'s prize-winning ${winner.danceStyle} routine evaluated by our grand master judges.`
    });
  };

  const handleWatchPrizeVideo = () => {
    setVideoModal({
      isOpen: true,
      title: 'How Will You Receive Your Prize Money?',
      subtitle: 'Instant Automated Disbursement via UPI & Razorpay',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      description:
        'Once results are officially declared by the jury, cash prizes are transferred straight into your verified bank account or UPI handle within 24 hours.'
    });
  };

  // Concurrency Simulation handler
  const handleRunConcurrencyTest = async (): Promise<ConcurrencyTestResult | null> => {
    if (!competition) return null;
    try {
      const res = await fetch(`/api/competitions/${competition._id}/simulate-concurrency`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usersCount: 20 })
      });
      const result: ConcurrencyTestResult = await res.json();
      await loadData();
      return result;
    } catch (err) {
      console.error('Concurrency test failed', err);
      return null;
    }
  };

  // Reset database handler
  const handleResetDatabase = async () => {
    if (!competition) return;
    try {
      await fetch(`/api/competitions/${competition._id}/admin/reset`, {
        method: 'POST'
      });
      await loadData();
    } catch (err) {
      console.error('Reset failed', err);
    }
  };

  // Toggle user state for testing
  const handleToggleRegistrationState = (registered: boolean, submitted: boolean) => {
    setIsRegistered(registered);
    setHasSubmitted(submitted);
  };

  if (loading && !competition) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-8 h-8 text-teal-400 animate-spin mb-3" />
        <p className="text-sm font-semibold tracking-wide">Connecting to Feedants Backend...</p>
      </div>
    );
  }

  if (error || !competition) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full text-center">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
          <h3 className="font-bold text-slate-900 mb-1">Failed to Load Competition</h3>
          <p className="text-xs text-slate-500 mb-4">{error}</p>
          <button
            onClick={loadData}
            className="w-full bg-[#0d6e75] text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900/90 py-0 sm:py-6 flex items-center justify-center selection:bg-teal-200">
      {/* Evaluator & QA Sandbox Panel */}
      <EvaluatorSandbox
        isRegistered={isRegistered}
        hasSubmitted={hasSubmitted}
        isMobileView={isMobileView}
        onToggleMobileView={() => setIsMobileView(!isMobileView)}
        onToggleRegistrationState={handleToggleRegistrationState}
        onResetDatabase={handleResetDatabase}
        onRunConcurrencyTest={handleRunConcurrencyTest}
        competitionId={competition._id}
      />

      {/* Main Container / Mobile Device Viewport */}
      <main
        className={`w-full bg-white transition-all duration-300 relative overflow-hidden ${
          isMobileView
            ? 'max-w-md sm:rounded-[36px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] sm:border-[8px] sm:border-slate-800'
            : 'max-w-3xl min-h-screen sm:min-h-0 sm:rounded-2xl shadow-2xl'
        }`}
      >
        {/* Mobile Device Speaker Ear-Piece (aesthetic phone chrome) */}
        {isMobileView && (
          <div className="hidden sm:block absolute top-1.5 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-slate-900 rounded-full z-30" />
        )}

        {/* 1. Native Status Bar (9:41, wifi, battery) */}
        <StatusBar />

        {/* 2. Top Header (← Go back, Language ENG/हिंदी) */}
        <Header
          language={language}
          onLanguageChange={setLanguage}
          onBack={() => {}}
        />

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto max-h-[calc(100vh-110px)] sm:max-h-[820px] pb-6 no-scrollbar">
          {/* 3. Title & Tags + Status Badge */}
          <TitleAndTags
            competition={competition}
            isRegistered={isRegistered}
            onRegisterClick={() => setIsRegisterModalOpen(true)}
            language={language}
          />

          {/* 4. Metrics Row (Prize Pool, Entry Fee, Spots Bar) */}
          <MetricsRow
            competition={competition}
            language={language}
          />

          {/* 5. Judge Card (Manju Dubey & Intro Video) */}
          <JudgeCard
            judge={competition.judge}
            onPlayIntro={handlePlayJudgeIntro}
            language={language}
          />

          {/* 6. Dynamic Countdown Banner */}
          <CountdownBanner
            targetDate={competition.dates.registerBefore}
            language={language}
          />

          {/* 7. Important Dates Grid (2x2) */}
          <ImportantDatesCard
            dates={competition.dates}
            language={language}
          />

          {/* 8. Previous Winners Carousel */}
          <PreviousWinnersCarousel
            winners={competition.previousWinners}
            onSelectWinner={handleSelectWinner}
            language={language}
          />

          {/* 9. About, Judging Parameters, Rules & Eligibility Tabs */}
          <TabsSection
            competition={competition}
            language={language}
          />

          {/* 10. Rewards (All Positions) & Disclaimer */}
          <RewardsSection
            rewards={competition.rewards}
            disclaimer={competition.disclaimer}
            language={language}
          />

          {/* 11. FAQ & Trust Cards (Prize Video & Razorpay) */}
          <TrustAndFaqSection
            onWatchPrizeVideo={handleWatchPrizeVideo}
            onOpenRefundPolicy={() => setIsRefundPolicyOpen(true)}
            language={language}
          />

          {/* 12. Referral & Earn Discount */}
          <ReferralCard
            referral={competition.referral}
            language={language}
          />

          {/* 13. Testimonials Row + Ad Banner */}
          <TestimonialsRow
            onOpenTestimonials={() => setIsTestimonialsOpen(true)}
            language={language}
          />

          {/* 14. Sticky Bottom Action Button */}
          <StickyBottomCta
            competition={competition}
            isRegistered={isRegistered}
            hasSubmitted={hasSubmitted}
            onRegisterClick={() => setIsRegisterModalOpen(true)}
            onSubmitClick={() => setIsSubmissionModalOpen(true)}
            language={language}
          />

          {/* Spacer for Bottom Nav Bar */}
          <div className="h-16" />
        </div>

        {/* 15. Bottom Navigation Bar */}
        <BottomNavBar
          activeTab={activeNavTab}
          onTabChange={setActiveNavTab}
          language={language}
        />
      </main>

      {/* Interactive Modals */}
      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal((prev) => ({ ...prev, isOpen: false }))}
        title={videoModal.title}
        subtitle={videoModal.subtitle}
        videoUrl={videoModal.videoUrl}
        posterUrl={videoModal.posterUrl}
        description={videoModal.description}
      />

      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        competition={competition}
        userId={userId}
        onRegistrationSuccess={(newReg) => {
          setIsRegistered(true);
          setRegistration(newReg);
          loadData();
        }}
        language={language}
      />

      <SubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
        competition={competition}
        userId={userId}
        existingSubmission={registration?.submission}
        onSubmissionSuccess={(updatedReg) => {
          setHasSubmitted(true);
          setRegistration(updatedReg);
          loadData();
        }}
        language={language}
      />

      <TestimonialsModal
        isOpen={isTestimonialsOpen}
        onClose={() => setIsTestimonialsOpen(false)}
        testimonials={competition.testimonials}
        language={language}
      />

      <RefundPolicyModal
        isOpen={isRefundPolicyOpen}
        onClose={() => setIsRefundPolicyOpen(false)}
        language={language}
      />
    </div>
  );
}
