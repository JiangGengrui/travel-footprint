import { Router, Request, Response } from 'express';
import db from '../db';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.get('/', (req: Request, res: Response) => {
  try {
    const userId = req.userId!;

    const footprintStats = db.prepare(
      'SELECT COUNT(DISTINCT province_id) as provincesVisited, COUNT(*) as citiesVisited FROM footprints WHERE user_id = ?'
    ).get(userId) as { provincesVisited: number; citiesVisited: number };

    const diaryStats = db.prepare(
      'SELECT COUNT(DISTINCT date) as totalDays FROM diaries WHERE user_id = ?'
    ).get(userId) as { totalDays: number };

    const recentFootprint = db.prepare(
      'SELECT province_id FROM footprints WHERE user_id = ? ORDER BY created_at DESC LIMIT 1'
    ).get(userId) as { province_id: string } | undefined;

    res.json({
      success: true,
      data: {
        provincesVisited: footprintStats.provincesVisited,
        citiesVisited: footprintStats.citiesVisited,
        totalDays: diaryStats.totalDays,
        recentProvince: recentFootprint?.province_id || null,
      },
    });
  } catch (err) {
    console.error('Get stats error:', err);
    res.status(500).json({ success: false, error: '服务器内部错误' });
  }
});

export default router;