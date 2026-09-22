import fs from 'fs';
import path from 'path';
import { Competition, UserRegistration, ConcurrencyTestResult } from '../src/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface DatabaseSchema {
  competitions: Competition[];
  registrations: UserRegistration[];
}

const DEFAULT_COMPETITION: Competition = {
  _id: 'feedants-dance-001',
  title: 'Feedants Classical Dance',
  category: 'Dance',
  tags: ['Dance', 'Multi-Win', 'Winners get certificate'],
  prizePool: 1500,
  entryFee: 99,
  totalSpots: 20,
  bookedSpots: 1, // Matches design: 1/20 Booked, Only 19 spots left
  judge: {
    name: 'Manju Dubey',
    role: 'Judge',
    title: 'Professional Kathak Dancer',
    experience: '12+ Years of Experience',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    introVideoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    bio: 'Manju Dubey is a renowned Kathak maestro with over a decade of national performance experience and judge of prime classical arts festivals.'
  },
  dates: {
    // Dynamic target date offset: 1 day, 6 hours, 28 mins, 32 secs from now
    registerBefore: new Date(Date.now() + 110912000).toISOString(),
    submissionStarts: new Date(Date.now() - 3600000 * 48).toISOString(),
    submissionEnds: new Date(Date.now() + 86400000 * 15).toISOString(),
    resultDate: new Date(Date.now() + 86400000 * 20).toISOString()
  },
  previousWinners: [
    {
      id: 'w1',
      name: 'Riya Shah',
      rank: '1st Winner',
      rankNumber: 1,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      danceStyle: 'Kathak'
    },
    {
      id: 'w2',
      name: 'Aarav Mehta',
      rank: '1st Winner',
      rankNumber: 1,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      danceStyle: 'Bharatnatyam'
    },
    {
      id: 'w3',
      name: 'Neha Verma',
      rank: '2nd Winner',
      rankNumber: 2,
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      danceStyle: 'Odissi'
    },
    {
      id: 'w4',
      name: 'Ishita Choudhary',
      rank: '3rd Winner',
      rankNumber: 3,
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      danceStyle: 'Kuchipudi'
    }
  ],
  about: {
    short: 'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent. Express your passion through traditional dance.',
    full: 'Feedants Classical Dance is India\'s premier digital stage celebrating heritage performing arts including Kathak, Bharatnatyam, Odissi, Kathakali, and Mohiniyattam. Participants submit high-definition solo or duet recordings judged by celebrated dance masters. Winners receive national e-certificates, cash rewards delivered within 24 hours, and promotion across our community of 500,000+ art patrons.',
    highlights: [
      'Open to soloists and duets across all age categories',
      'Original choreography or classical repertoires accepted',
      'Video length: 2 to 4 minutes recorded in landscape orientation',
      'Verified performance feedback from Sangeet Natak Akademi certified judges'
    ]
  },
  judgingParameters: [
    {
      title: 'Bhava & Expression',
      weightage: 30,
      description: 'Facial expressions, eye movements (drishti bheda), and emotive connection with the musical narrative.'
    },
    {
      title: 'Tala & Rhythm',
      weightage: 30,
      description: 'Precision of footwork (tatkar/adavour), alignment with laya, and rhythmic stability.'
    },
    {
      title: 'Angashuddhi & Grace',
      weightage: 25,
      description: 'Body posture, clarity of mudras (hastha prayoga), and elegance of transitions.'
    },
    {
      title: 'Costume & Presentation',
      weightage: 15,
      description: 'Authenticity of classical attire, stage lighting, and overall aesthetic poise.'
    }
  ],
  rulesAndEligibility: [
    'Participants can be of any age, nationality, or skill level.',
    'Performance video must be recorded in landscape mode with clear audio.',
    'Maximum allowed video duration is 4 minutes (minimum 1.5 minutes).',
    'No lip-syncing or heavy video editing/morphing is permitted.',
    'Only submissions submitted before the deadline will be evaluated.',
    'Submissions must be accompanied by the participant\'s registered registration ID.'
  ],
  rewards: [
    { rank: 1, position: '1st Winner', amount: 550, badgeType: 'gold' },
    { rank: 2, position: '2nd Winner', amount: 300, badgeType: 'silver' },
    { rank: 3, position: '3rd Winner', amount: 240, badgeType: 'bronze' },
    { rank: 4, position: '4th Winner', amount: 200, badgeType: 'star' },
    { rank: 5, position: '5th Winner', amount: 130, badgeType: 'star' },
    { rank: 6, position: '6th Winner', amount: 80, badgeType: 'star' }
  ],
  disclaimer: 'Disclaimer: Only contributions from paid participants will be considered for judging.',
  referral: {
    code: 'referral123',
    url: 'https://feedants.com/r/referral123',
    rewardPerSignup: 10
  },
  testimonials: [
    {
      id: 't1',
      userName: 'Priya Sundaram',
      userRole: 'Bharatnatyam Performer, Chennai',
      rating: 5,
      comment: 'Feedants provided an incredible platform to showcase my piece. The judges\' constructive feedback helped me sharpen my adavus, and the prize was credited straight to my UPI within 2 hours!',
      date: '2 weeks ago',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
    },
    {
      id: 't2',
      userName: 'Devendra Kulkarni',
      userRole: 'Kathak Disciple, Pune',
      rating: 5,
      comment: 'Very seamless registration and fair judging. Being featured in the previous winners highlight helped me gain real recognition.',
      date: '1 month ago',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150'
    },
    {
      id: 't3',
      userName: 'Ananya Mukherjee',
      userRole: 'Odissi Enthusiast, Kolkata',
      rating: 5,
      comment: 'The countdown and spot tracker made the experience super exciting. Proud to have received my verified certificate of excellence!',
      date: '1 month ago',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
    }
  ],
  status: 'registration_open'
};

const DEFAULT_REGISTRATION: UserRegistration = {
  _id: 'reg_feedants_demo_01',
  competitionId: 'feedants-dance-001',
  userId: 'user_ankush_demo',
  userName: 'Ankush Poonia',
  userEmail: 'ankushpoonia4896@gmail.com',
  userPhone: '+91 98765 43210',
  amountPaid: 99,
  paymentId: 'pay_rzp_' + Math.random().toString(36).substring(2, 10).toUpperCase(),
  paymentStatus: 'paid',
  registeredAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  submission: {
    submittedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'Kathak TeenTaal Drut Bandish',
    danceStyle: 'Kathak',
    notes: 'Performed in TeenTaal 16 matras with tatkar chakkars and tihai.'
  }
};

class MongoStore {
  private data: DatabaseSchema;
  private writeLock: Promise<void> = Promise.resolve();

  constructor() {
    this.data = this.load();
  }

  private load(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.competitions && parsed.competitions.length > 0) {
          const comp = parsed.competitions[0];
          // If registerBefore is in the past, refresh it so the countdown is always active
          if (new Date(comp.dates.registerBefore).getTime() <= Date.now()) {
            comp.dates.registerBefore = new Date(Date.now() + 110912000).toISOString();
            comp.dates.submissionEnds = new Date(Date.now() + 86400000 * 10).toISOString();
            comp.dates.resultDate = new Date(Date.now() + 86400000 * 15).toISOString();
            this.saveImmediate(parsed);
          }
          return parsed;
        }
      }
    } catch (err) {
      console.error('Error loading db file, resetting to initial seed:', err);
    }

    const initialData: DatabaseSchema = {
      competitions: [DEFAULT_COMPETITION],
      registrations: [DEFAULT_REGISTRATION]
    };
    this.saveImmediate(initialData);
    return initialData;
  }

  private saveImmediate(data: DatabaseSchema) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing db file:', err);
    }
  }

  // Mutex-protected write operation for atomic MongoDB-like transactional operations
  public async withLock<T>(operation: (db: DatabaseSchema) => Promise<T> | T): Promise<T> {
    let releaseLock: () => void = () => {};
    const newLock = new Promise<void>((resolve) => {
      releaseLock = resolve;
    });

    const previousLock = this.writeLock;
    this.writeLock = newLock;

    try {
      await previousLock;
      const result = await operation(this.data);
      this.saveImmediate(this.data);
      return result;
    } finally {
      releaseLock();
    }
  }

  // Competitions
  public getCompetition(id?: string): Competition | null {
    if (!id || id === 'current' || id === 'feedants-dance-001') {
      return this.data.competitions[0] || null;
    }
    return this.data.competitions.find((c) => c._id === id) || null;
  }

  public updateCompetition(id: string, update: Partial<Competition>): Competition | null {
    const comp = this.getCompetition(id);
    if (!comp) return null;
    Object.assign(comp, update);
    this.saveImmediate(this.data);
    return comp;
  }

  public resetCompetition(id: string = 'feedants-dance-001'): Competition {
    const freshComp = JSON.parse(JSON.stringify(DEFAULT_COMPETITION));
    freshComp.dates.registerBefore = new Date(Date.now() + 110912000).toISOString();
    this.data.competitions = [freshComp];
    this.data.registrations = [JSON.parse(JSON.stringify(DEFAULT_REGISTRATION))];
    this.saveImmediate(this.data);
    return this.data.competitions[0];
  }

  // Registrations
  public getRegistration(competitionId: string, userId: string): UserRegistration | null {
    return (
      this.data.registrations.find(
        (r) => r.competitionId === competitionId && r.userId === userId
      ) || null
    );
  }

  public getAllRegistrations(competitionId: string): UserRegistration[] {
    return this.data.registrations.filter((r) => r.competitionId === competitionId);
  }

  // Atomic Spot Booking with Race Condition protection
  public async atomicRegisterUser(params: {
    competitionId: string;
    userId: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    paymentId: string;
    amount: number;
  }): Promise<{ success: boolean; error?: string; registration?: UserRegistration; spotsLeft: number }> {
    return this.withLock((db) => {
      const comp = db.competitions.find((c) => c._id === params.competitionId) || db.competitions[0];
      if (!comp) {
        return { success: false, error: 'Competition not found', spotsLeft: 0 };
      }

      // Check if already registered
      const existing = db.registrations.find(
        (r) => r.competitionId === comp._id && r.userId === params.userId
      );
      if (existing) {
        return {
          success: true,
          registration: existing,
          spotsLeft: Math.max(0, comp.totalSpots - comp.bookedSpots)
        };
      }

      // Concurrency check: Ensure spots remain
      if (comp.bookedSpots >= comp.totalSpots) {
        return {
          success: false,
          error: 'Housefull! All participation spots have been booked.',
          spotsLeft: 0
        };
      }

      // Atomic increment $inc: { bookedSpots: 1 }
      comp.bookedSpots += 1;

      const newRegistration: UserRegistration = {
        _id: 'reg_' + Math.random().toString(36).substring(2, 9),
        competitionId: comp._id,
        userId: params.userId,
        userName: params.userName,
        userEmail: params.userEmail,
        userPhone: params.userPhone,
        amountPaid: params.amount,
        paymentId: params.paymentId,
        paymentStatus: 'paid',
        registeredAt: new Date().toISOString()
      };

      db.registrations.push(newRegistration);
      return {
        success: true,
        registration: newRegistration,
        spotsLeft: Math.max(0, comp.totalSpots - comp.bookedSpots)
      };
    });
  }

  // Atomic Submission creation/update
  public async saveSubmission(
    competitionId: string,
    userId: string,
    submissionData: {
      title: string;
      danceStyle: string;
      videoUrl: string;
      notes?: string;
      fileSizeMb?: number;
    }
  ): Promise<{ success: boolean; error?: string; registration?: UserRegistration }> {
    return this.withLock((db) => {
      const reg = db.registrations.find(
        (r) => r.competitionId === competitionId && r.userId === userId
      );
      if (!reg) {
        return {
          success: false,
          error: 'You must register for this competition before submitting your entry.'
        };
      }

      reg.submission = {
        id: 'sub_' + Math.random().toString(36).substring(2, 9),
        submittedAt: new Date().toISOString(),
        title: submissionData.title,
        danceStyle: submissionData.danceStyle,
        videoUrl: submissionData.videoUrl,
        notes: submissionData.notes,
        fileSizeMb: submissionData.fileSizeMb || 24.5
      };

      return {
        success: true,
        registration: reg
      };
    });
  }

  // Concurrency Simulation to test race conditions under load
  public async simulateConcurrency(
    competitionId: string,
    simulatedUsersCount: number = 25
  ): Promise<ConcurrencyTestResult> {
    const comp = this.getCompetition(competitionId);
    if (!comp) throw new Error('Competition not found');

    const initialBooked = comp.bookedSpots;
    const logs: string[] = [];
    let successful = 0;
    let failedSpotsFull = 0;
    let alreadyRegistered = 0;

    logs.push(`[CONCURRENCY_TEST] Starting test with ${simulatedUsersCount} simultaneous registration requests.`);
    logs.push(`[CONCURRENCY_TEST] Initial state: ${initialBooked}/${comp.totalSpots} booked. Available: ${comp.totalSpots - initialBooked}`);

    // Fire all promises in parallel simultaneously
    const requests = Array.from({ length: simulatedUsersCount }, (_, i) => {
      const simId = `sim_user_${Date.now()}_${i + 1}`;
      return this.atomicRegisterUser({
        competitionId: comp._id,
        userId: simId,
        userName: `Simulated Participant ${i + 1}`,
        userEmail: `simulated${i + 1}@feedants-test.com`,
        userPhone: `+91 99999 ${10000 + i}`,
        paymentId: `pay_sim_${Math.random().toString(36).substring(2, 8)}`,
        amount: comp.entryFee
      });
    });

    const results = await Promise.all(requests);

    results.forEach((res, index) => {
      if (res.success && res.registration) {
        successful++;
        logs.push(`Req #${index + 1}: Registered successfully. Spots left: ${res.spotsLeft}`);
      } else if (res.error?.includes('Housefull')) {
        failedSpotsFull++;
        logs.push(`Req #${index + 1}: Rejected - Spots full (prevented overselling).`);
      } else {
        alreadyRegistered++;
        logs.push(`Req #${index + 1}: ${res.error}`);
      }
    });

    const finalComp = this.getCompetition(competitionId)!;
    logs.push(`[CONCURRENCY_TEST] Completed. Final booked: ${finalComp.bookedSpots}/${finalComp.totalSpots}. Overbooking prevented.`);

    return {
      totalRequested: simulatedUsersCount,
      successful,
      failedSpotsFull,
      alreadyRegistered,
      initialSpotsBooked: initialBooked,
      finalSpotsBooked: finalComp.bookedSpots,
      totalSpots: finalComp.totalSpots,
      logs
    };
  }
}

export const db = new MongoStore();
