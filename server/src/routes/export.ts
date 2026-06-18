import { Router, Request, Response } from 'express';
import db from '../db';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.get('/', (req: Request, res: Response) => {
  try {
    const userId = req.userId!;

    const footprints = db.prepare(
      'SELECT id, province_id, city_id, city_name, visited_at, created_at FROM footprints WHERE user_id = ? ORDER BY created_at DESC'
    ).all(userId);

    const formattedFootprints = (footprints as any[]).map((f) => ({
      id: f.id,
      provinceId: f.province_id,
      cityId: f.city_id,
      cityName: f.city_name,
      visitedAt: f.visited_at,
      createdAt: f.created_at,
    }));

    const diaries = db.prepare(
      'SELECT * FROM diaries WHERE user_id = ? ORDER BY date DESC'
    ).all(userId);

    const formattedDiaries = (diaries as any[]).map((d) => ({
      id: String(d.id),
      provinceId: d.province_id,
      cityId: d.city_id,
      title: d.title,
      content: d.content,
      date: d.date,
      weather: d.weather,
      rating: d.rating,
      tags: d.tags ? JSON.parse(d.tags) : [],
      image: d.image,
      createdAt: d.created_at,
      updatedAt: d.updated_at,
    }));

    res.json({
      success: true,
      data: {
        footprints: formattedFootprints,
        diaries: formattedDiaries,
      },
    });
  } catch (err) {
    console.error('Export error:', err);
    res.status(500).json({ success: false, error: '服务器内部错误' });
  }
});

export default router;