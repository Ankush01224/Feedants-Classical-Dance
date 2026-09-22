import React, { useState } from 'react';
import { X, Play, Shield, UploadCloud, CheckCircle, Video, CreditCard, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Competition, PreviousWinner, Judge, Testimonial, UserRegistration } from '../types';

/* 1. Video Modal */
export interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  videoUrl?: string;
  posterUrl?: string;
  description?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  videoUrl,
  posterUrl,
  description
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-slate-900 rounded-2xl overflow-hidden max-w-lg w-full text-white shadow-2xl border border-slate-800">
        {/* Header */}
        <div className="p-3.5 flex items-center justify-between border-b border-slate-800">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-white">{title}</h3>
            {subtitle && <p className="text-xs text-teal-400 font-medium">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <video
            controls
            autoPlay
            playsInline
            poster={posterUrl}
            className="w-full h-full object-contain"
            src={videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'}
          >
            Your browser does not support HTML5 video.
          </video>
        </div>

        {/* Description */}
        {description && (
          <div className="p-4 bg-slate-900/90 text-xs text-slate-300 border-t border-slate-800">
            <p>{description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* 2. Registration & Payment Modal */
export interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  competition: Competition;
  userId: string;
  onRegistrationSuccess: (registration: UserRegistration) => void;
  language: 'ENG' | 'हिंदी';
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  competition,
  userId,
  onRegistrationSuccess,
  language
}) => {
  const [userName, setUserName] = useState('Ankush Poonia');
  const [userEmail, setUserEmail] = useState('ankushpoonia4896@gmail.com');
  const [userPhone, setUserPhone] = useState('9876543210');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/competitions/${competition._id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          userName,
          userEmail,
          userPhone: '+91 ' + userPhone,
          amount: competition.entryFee,
          paymentId: 'pay_rzp_' + Math.random().toString(36).substring(2, 10).toUpperCase()
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete registration');
      }

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      onRegistrationSuccess(data.registration);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const spotsLeft = Math.max(0, competition.totalSpots - competition.bookedSpots);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl overflow-hidden max-w-sm w-full shadow-2xl border border-slate-100">
        {/* Header */}
        <div className="p-4 bg-[#0d6e75] text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm sm:text-base">
              {language === 'ENG' ? 'Competition Registration' : 'प्रतियोगिता पंजीकरण'}
            </h3>
            <p className="text-xs text-teal-100">
              {competition.title} • ₹{competition.entryFee}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-teal-100 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Spot Indicator */}
        <div className="bg-amber-50 px-4 py-2 border-b border-amber-100 flex items-center justify-between text-xs text-amber-800 font-medium">
          <span>{spotsLeft} spots remaining</span>
          <span className="text-amber-900 font-bold">Entry: ₹{competition.entryFee}</span>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="p-4 space-y-3.5">
          {error && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0d6e75] focus:ring-1 focus:ring-[#0d6e75]"
              placeholder="e.g. Priya Sharma"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0d6e75] focus:ring-1 focus:ring-[#0d6e75]"
              placeholder="priya@example.com"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              WhatsApp / Mobile Number *
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-xs font-medium">
                +91
              </span>
              <input
                type="tel"
                required
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-r-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0d6e75] focus:ring-1 focus:ring-[#0d6e75]"
                placeholder="9876543210"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
              Payment Gateway (Razorpay Secured)
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 font-semibold transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-[#0d6e75] bg-[#eaf6f6] text-[#0d6e75]'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>UPI / GPay</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 font-semibold transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#0d6e75] bg-[#eaf6f6] text-[#0d6e75]'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Cards / NetBanking</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || spotsLeft === 0}
            className="w-full bg-[#0d6e75] hover:bg-[#0a565c] disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all active:scale-98 shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span>Processing Payment...</span>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                <span>Pay ₹{competition.entryFee} & Confirm Spot</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-slate-400">
            Powered by Razorpay • Instant spot locking • 100% Secure
          </p>
        </form>
      </div>
    </div>
  );
};

/* 3. Upload / Edit Submission Modal */
export interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  competition: Competition;
  userId: string;
  existingSubmission?: any;
  onSubmissionSuccess: (reg: UserRegistration) => void;
  language: 'ENG' | 'हिंदी';
}

export const SubmissionModal: React.FC<SubmissionModalProps> = ({
  isOpen,
  onClose,
  competition,
  userId,
  existingSubmission,
  onSubmissionSuccess,
  language
}) => {
  const [title, setTitle] = useState(existingSubmission?.title || 'Kathak TeenTaal Drut Bandish');
  const [danceStyle, setDanceStyle] = useState(existingSubmission?.danceStyle || 'Kathak');
  const [videoUrl, setVideoUrl] = useState(
    existingSubmission?.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'
  );
  const [notes, setNotes] = useState(
    existingSubmission?.notes || 'TeenTaal 16 beats performance showcasing chakkars and tihai.'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/competitions/${competition._id}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          title,
          danceStyle,
          videoUrl,
          notes
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit entry');
      }

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });

      onSubmissionSuccess(data.registration);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl overflow-hidden max-w-sm w-full shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-[#0d6e75] text-white flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-bold text-sm sm:text-base">
              {existingSubmission ? 'Your Competition Submission' : 'Upload Submission Video'}
            </h3>
            <p className="text-xs text-teal-100">
              Evaluated by Judge {competition.judge.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-teal-100 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3 overflow-y-auto">
          {error && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Performance Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0d6e75]"
              placeholder="e.g. Pure Kathak TeenTaal Piece"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Classical Dance Style *
            </label>
            <select
              value={danceStyle}
              onChange={(e) => setDanceStyle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-[#0d6e75]"
            >
              <option value="Kathak">Kathak</option>
              <option value="Bharatnatyam">Bharatnatyam</option>
              <option value="Odissi">Odissi</option>
              <option value="Kuchipudi">Kuchipudi</option>
              <option value="Kathakali">Kathakali</option>
              <option value="Mohiniyattam">Mohiniyattam</option>
              <option value="Manipuri">Manipuri</option>
              <option value="Sattriya">Sattriya</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Video Link (Google Drive / YouTube / Cloud storage) *
            </label>
            <input
              type="url"
              required
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0d6e75]"
              placeholder="https://drive.google.com/file/... or YouTube link"
            />
          </div>

          {/* Quick upload simulation area */}
          <div className="border border-dashed border-teal-300 bg-teal-50/50 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-teal-50 transition-colors">
            <Video className="w-5 h-5 text-[#0d6e75] mb-1" />
            <span className="text-[11px] font-bold text-slate-800">
              Or drag & drop dance recording (.mp4, .mov)
            </span>
            <span className="text-[10px] text-slate-500">Max size 250MB • HD 1080p recommended</span>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Notes for the Judge (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0d6e75]"
              placeholder="Mention Raga, Tala, Guru lineage, or choreography notes"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0d6e75] hover:bg-[#0a565c] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all active:scale-98 shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span>Saving Entry...</span>
            ) : (
              <>
                <UploadCloud className="w-4 h-4" />
                <span>{existingSubmission ? 'Update Submission' : 'Submit for Judging'}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

/* 4. Testimonials Modal */
export interface TestimonialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonials: Testimonial[];
  language: 'ENG' | 'हिंदी';
}

export const TestimonialsModal: React.FC<TestimonialsModalProps> = ({
  isOpen,
  onClose,
  testimonials,
  language
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl overflow-hidden max-w-sm w-full shadow-2xl border border-slate-100 max-h-[85vh] flex flex-col">
        <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900">
              {language === 'ENG' ? 'Participant Experiences' : 'प्रतिभागियों के अनुभव'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'ENG' ? 'Verified reviews from artists' : 'कलाकारों द्वारा सत्यापित समीक्षाएं'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto">
          {testimonials.map((t) => (
            <div key={t.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2.5 mb-1.5">
                <img
                  src={t.avatarUrl}
                  alt={t.userName}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.userName}</h4>
                  <p className="text-[10px] text-slate-400">{t.userRole}</p>
                </div>
              </div>
              <div className="flex text-amber-400 text-xs mb-1">
                {'★'.repeat(t.rating)}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "{t.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* 5. Refund Policy Modal */
export interface RefundPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'ENG' | 'हिंदी';
}

export const RefundPolicyModal: React.FC<RefundPolicyModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl overflow-hidden max-w-sm w-full shadow-2xl border border-slate-100 p-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#0d6e75]" />
            <h3 className="font-bold text-sm text-slate-900">
              {language === 'ENG' ? 'Feedants Refund Policy' : 'फीडएंट्स रिफंड नीति'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-3 text-xs text-slate-600 space-y-2">
          <p>
            <strong>100% Guaranteed Refund:</strong> If a competition is canceled, rescheduled by more than 7 days, or technical issues prevent video review, your entry fee of ₹99 is refunded instantly to your original payment method.
          </p>
          <p>
            <strong>Withdrawal Policy:</strong> Participants can request a full refund up to 24 hours before the registration closing deadline.
          </p>
          <p>
            <strong>Prize Disbursal:</strong> Cash prizes are transferred directly via UPI or IMPS within 24 hours of result declaration.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-2 bg-[#0d6e75] text-white font-bold py-2 rounded-xl text-xs hover:bg-[#0a565c]"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
