export interface Judge {
  name: string;
  role: string;
  title: string;
  experience: string;
  avatarUrl: string;
  introVideoUrl: string;
  bio: string;
}

export interface CompetitionDates {
  registerBefore: string;
  submissionStarts: string;
  submissionEnds: string;
  resultDate: string;
}

export interface PreviousWinner {
  id: string;
  name: string;
  rank: string;
  rankNumber: number;
  avatarUrl: string;
  videoUrl: string;
  danceStyle: string;
}

export interface JudgingParameter {
  title: string;
  weightage: number;
  description: string;
}

export interface RewardItem {
  rank: number;
  position: string;
  amount: number;
  badgeType: 'gold' | 'silver' | 'bronze' | 'star';
}

export interface Testimonial {
  id: string;
  userName: string;
  userRole: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl: string;
}

export interface Competition {
  _id: string;
  title: string;
  category: string;
  tags: string[];
  prizePool: number;
  entryFee: number;
  totalSpots: number;
  bookedSpots: number;
  judge: Judge;
  dates: CompetitionDates;
  previousWinners: PreviousWinner[];
  about: {
    short: string;
    full: string;
    highlights: string[];
  };
  judgingParameters: JudgingParameter[];
  rulesAndEligibility: string[];
  rewards: RewardItem[];
  disclaimer: string;
  referral: {
    code: string;
    url: string;
    rewardPerSignup: number;
  };
  testimonials: Testimonial[];
  status: 'registration_open' | 'submission_open' | 'submission_ended' | 'results_declared';
}

export interface UserSubmission {
  id?: string;
  submittedAt: string;
  videoUrl: string;
  title: string;
  danceStyle: string;
  notes?: string;
  fileSizeMb?: number;
}

export interface UserRegistration {
  _id: string;
  competitionId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  amountPaid: number;
  paymentId: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  registeredAt: string;
  submission?: UserSubmission;
}

export interface ConcurrencyTestResult {
  totalRequested: number;
  successful: number;
  failedSpotsFull: number;
  alreadyRegistered: number;
  initialSpotsBooked: number;
  finalSpotsBooked: number;
  totalSpots: number;
  logs: string[];
}
