import { Router, Request, Response } from 'express';
import { db } from '../db';

export const competitionRouter = Router();

// Helper to compute live lifecycle status based on dates
function computeLifecycleStatus(dates: {
  registerBefore: string;
  submissionStarts: string;
  submissionEnds: string;
  resultDate: string;
}) {
  const now = new Date().getTime();
  const regClose = new Date(dates.registerBefore).getTime();
  const subStart = new Date(dates.submissionStarts).getTime();
  const subEnd = new Date(dates.submissionEnds).getTime();
  const results = new Date(dates.resultDate).getTime();

  if (now > results) {
    return 'results_declared';
  } else if (now > subEnd) {
    return 'submission_ended';
  } else if (now > regClose) {
    return 'submission_open';
  } else {
    return 'registration_open';
  }
}

// 1. Get current competition details
competitionRouter.get('/current', (req: Request, res: Response) => {
  try {
    const comp = db.getCompetition();
    if (!comp) {
      return res.status(404).json({ error: 'No active competition found' });
    }

    const spotsLeft = Math.max(0, comp.totalSpots - comp.bookedSpots);
    const computedStatus = computeLifecycleStatus(comp.dates);

    res.json({
      ...comp,
      spotsLeft,
      computedStatus,
      isHousefull: spotsLeft === 0
    });
  } catch (err: any) {
    console.error('Error fetching competition:', err);
    res.status(500).json({ error: 'Failed to load competition details' });
  }
});

// 2. Get competition by ID
competitionRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const comp = db.getCompetition(req.params.id);
    if (!comp) {
      return res.status(404).json({ error: 'Competition not found' });
    }
    const spotsLeft = Math.max(0, comp.totalSpots - comp.bookedSpots);
    res.json({
      ...comp,
      spotsLeft,
      isHousefull: spotsLeft === 0
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 3. Check User Registration & Submission Status
competitionRouter.get('/:id/registration-status', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req.query.userId as string) || 'user_ankush_demo';
    const comp = db.getCompetition(id);

    if (!comp) {
      return res.status(404).json({ error: 'Competition not found' });
    }

    const registration = db.getRegistration(comp._id, userId);

    res.json({
      isRegistered: !!registration,
      registration,
      hasSubmitted: !!registration?.submission,
      submission: registration?.submission || null
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to check registration status' });
  }
});

// 4. Atomic Spot Booking / Registration
competitionRouter.post('/:id/register', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, userName, userEmail, userPhone, paymentId, amount } = req.body;

    // Strict input validations
    if (!userName || typeof userName !== 'string' || userName.trim().length < 2) {
      return res.status(400).json({ error: 'Full name must be at least 2 characters long' });
    }
    if (!userEmail || !userEmail.includes('@')) {
      return res.status(400).json({ error: 'Valid email address is required' });
    }
    if (!userPhone || userPhone.trim().length < 7) {
      return res.status(400).json({ error: 'Valid phone number is required' });
    }

    const comp = db.getCompetition(id);
    if (!comp) {
      return res.status(404).json({ error: 'Competition not found' });
    }

    // Atomic spot booking with concurrency safety
    const result = await db.atomicRegisterUser({
      competitionId: comp._id,
      userId: userId || 'user_' + Math.random().toString(36).substring(2, 9),
      userName: userName.trim(),
      userEmail: userEmail.trim().toLowerCase(),
      userPhone: userPhone.trim(),
      paymentId: paymentId || 'pay_rzp_mock_' + Math.random().toString(36).substring(2, 8),
      amount: amount || comp.entryFee
    });

    if (!result.success) {
      return res.status(409).json({
        error: result.error,
        spotsLeft: result.spotsLeft
      });
    }

    res.status(201).json({
      message: 'Registration confirmed successfully!',
      registration: result.registration,
      spotsLeft: result.spotsLeft,
      competition: db.getCompetition(comp._id)
    });
  } catch (err: any) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
});

// 5. Upload / Update Submission
competitionRouter.post('/:id/submissions', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, title, danceStyle, videoUrl, notes } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    if (!title || title.trim().length < 3) {
      return res.status(400).json({ error: 'Submission title must be at least 3 characters' });
    }
    if (!danceStyle) {
      return res.status(400).json({ error: 'Please specify your classical dance style' });
    }
    if (!videoUrl || videoUrl.trim().length < 5) {
      return res.status(400).json({ error: 'Valid video URL or upload file reference required' });
    }

    const comp = db.getCompetition(id);
    if (!comp) {
      return res.status(404).json({ error: 'Competition not found' });
    }

    const result = await db.saveSubmission(comp._id, userId, {
      title: title.trim(),
      danceStyle: danceStyle.trim(),
      videoUrl: videoUrl.trim(),
      notes: notes?.trim() || ''
    });

    if (!result.success) {
      return res.status(403).json({ error: result.error });
    }

    res.json({
      message: 'Submission uploaded successfully! Our judges will evaluate your entry.',
      registration: result.registration
    });
  } catch (err: any) {
    console.error('Submission error:', err);
    res.status(500).json({ error: 'Failed to process submission' });
  }
});

// 6. Concurrency Simulation Endpoint
competitionRouter.post('/:id/simulate-concurrency', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usersCount = Number(req.body.usersCount) || 20;
    const comp = db.getCompetition(id);
    if (!comp) {
      return res.status(404).json({ error: 'Competition not found' });
    }

    const result = await db.simulateConcurrency(comp._id, usersCount);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Concurrency test failed' });
  }
});

// 7. Admin / Evaluator: Reset to initial state
competitionRouter.post('/:id/admin/reset', (req: Request, res: Response) => {
  try {
    const comp = db.resetCompetition(req.params.id);
    res.json({ message: 'Competition state reset to default seed', competition: comp });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to reset state' });
  }
});

// 8. Admin / Evaluator: Override Dates or Spots
competitionRouter.patch('/:id/admin/override-state', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { dates, bookedSpots, totalSpots, status } = req.body;
    const comp = db.getCompetition(id);
    if (!comp) return res.status(404).json({ error: 'Competition not found' });

    const updates: any = {};
    if (dates) updates.dates = { ...comp.dates, ...dates };
    if (typeof bookedSpots === 'number') updates.bookedSpots = Math.max(0, bookedSpots);
    if (typeof totalSpots === 'number') updates.totalSpots = Math.max(1, totalSpots);
    if (status) updates.status = status;

    const updated = db.updateCompetition(comp._id, updates);
    res.json({ message: 'Updated successfully', competition: updated });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to override state' });
  }
});

// 9. Get all participants
competitionRouter.get('/:id/participants', (req: Request, res: Response) => {
  try {
    const comp = db.getCompetition(req.params.id);
    if (!comp) return res.status(404).json({ error: 'Competition not found' });
    const list = db.getAllRegistrations(comp._id);
    res.json({ total: list.length, participants: list });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve participants' });
  }
});
