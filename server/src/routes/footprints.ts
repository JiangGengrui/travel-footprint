import { Router, Request, Response } from 'express';
import { z } from 'zod';
import db from '../db';
import { authMiddleware } from '../middleware/auth';

const router = Router();

const createFootprintSchema = z.object({
  provinceId: z.string().min(1, '省份不能为空'),
  cityId: z.string().min(1, '城市不能为空'),
  cityName: z.string().min(1, '城市名称不能为空'),
  visitedAt: z.string().optional(),
});

router.use(authMiddleware);

function toCamelFootprint(row: any) {
  return {
    id: row.id,
    provinceId: row.province_id,
    cityId: row.city_id,
    cityName: row.city_name,
    visitedAt: row.visited_at,
    createdAt: row.created_at,
  };
}

router.get('/', (req: Request, res: Response) => {
  try {
    const footprints = db.prepare(
      'SELECT id, province_id, city_id, city_name, visited_at, created_at FROM footprints WHERE user_id = ? ORDER BY created_at DESC'
    ).all(req.userId!);

    res.json({ success: true, data: (footprints as any[]).map(toCamelFootprint) });
  } catch (err) {
    console.error('Get footprints error:', err);
    res.status(500).json({ success: false, error: '服务器内部错误' });
  }
});

router.post('/', (req: Request, res: Response) => {
  try {
    const parsed = createFootprintSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, error: parsed.error.errors[0].message });
      return;
    }

    const { provinceId, cityId, cityName, visitedAt } = parsed.data;

    const result = db.prepare(
      'INSERT INTO footprints (user_id, province_id, city_id, city_name, visited_at) VALUES (?, ?, ?, ?, ?)'
    ).run(req.userId!, provinceId, cityId, cityName, visitedAt || null);

    const footprint = db.prepare('SELECT id, province_id, city_id, city_name, visited_at, created_at FROM footprints WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({ success: true, data: toCamelFootprint(footprint) });
  } catch (err) {
    console.error('Create footprint error:', err);
    res.status(500).json({ success: false, error: '服务器内部错误' });
  }
});

router.delete('/:id', (req: Request, res: Response) => {
  try {
    const result = db.prepare(
      'DELETE FROM footprints WHERE id = ? AND user_id = ?'
    ).run(req.params.id, req.userId!);

    if (result.changes === 0) {
      res.status(404).json({ success: false, error: '足迹记录不存在' });
      return;
    }

    res.json({ success: true, data: null });
  } catch (err) {
    console.error('Delete footprint error:', err);
    res.status(500).json({ success: false, error: '服务器内部错误' });
  }
});

export default router;