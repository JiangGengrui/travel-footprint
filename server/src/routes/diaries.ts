import { Router, Request, Response } from 'express';
import { z } from 'zod';
import db from '../db';
import { authMiddleware } from '../middleware/auth';

const router = Router();

const createDiarySchema = z.object({
  provinceId: z.string().min(1, '省份不能为空'),
  cityId: z.string().min(1, '城市不能为空'),
  title: z.string().optional(),
  content: z.string().min(1, '内容不能为空'),
  date: z.string().min(1, '日期不能为空'),
  weather: z.string().optional(),
  rating: z.number().int().min(0).max(5).default(0),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
});

const updateDiarySchema = z.object({
  provinceId: z.string().optional(),
  cityId: z.string().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  date: z.string().optional(),
  weather: z.string().optional(),
  rating: z.number().int().min(0).max(5).optional(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
});

router.use(authMiddleware);

function formatDiary(row: any) {
  if (!row) return row;
  return {
    id: String(row.id),
    userId: row.user_id,
    provinceId: row.province_id,
    cityId: row.city_id,
    title: row.title,
    content: row.content,
    date: row.date,
    weather: row.weather,
    rating: row.rating,
    tags: row.tags ? JSON.parse(row.tags) : [],
    image: row.image,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

router.get('/', (req: Request, res: Response) => {
  try {
    const { cityId, provinceId, page = '1', limit = '20' } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit as string, 10) || 20));
    const offset = (pageNum - 1) * limitNum;

    let countSql = 'SELECT COUNT(*) as total FROM diaries WHERE user_id = ?';
    let dataSql = 'SELECT * FROM diaries WHERE user_id = ?';
    const params: any[] = [req.userId!];
    const countParams: any[] = [req.userId!];

    if (provinceId) {
      countSql += ' AND province_id = ?';
      dataSql += ' AND province_id = ?';
      countParams.push(provinceId as string);
      params.push(provinceId as string);
    }

    if (cityId) {
      countSql += ' AND city_id = ?';
      dataSql += ' AND city_id = ?';
      countParams.push(cityId as string);
      params.push(cityId as string);
    }

    dataSql += ' ORDER BY date DESC LIMIT ? OFFSET ?';
    params.push(limitNum, offset);

    const { total } = db.prepare(countSql).get(...countParams) as { total: number };
    const rows = db.prepare(dataSql).all(...params);

    res.json({
      success: true,
      data: {
        data: rows.map(formatDiary),
        total,
        page: pageNum,
        limit: limitNum,
      },
    });
  } catch (err) {
    console.error('Get diaries error:', err);
    res.status(500).json({ success: false, error: '服务器内部错误' });
  }
});

router.post('/', (req: Request, res: Response) => {
  try {
    const parsed = createDiarySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, error: parsed.error.errors[0].message });
      return;
    }

    const { provinceId, cityId, title, content, date, weather, rating, tags, image } = parsed.data;

    const result = db.prepare(
      `INSERT INTO diaries (user_id, province_id, city_id, title, content, date, weather, rating, tags, image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      req.userId!,
      provinceId,
      cityId,
      title || null,
      content,
      date,
      weather || null,
      rating,
      tags ? JSON.stringify(tags) : null,
      image || null
    );

    const diary = db.prepare('SELECT * FROM diaries WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({ success: true, data: formatDiary(diary) });
  } catch (err) {
    console.error('Create diary error:', err);
    res.status(500).json({ success: false, error: '服务器内部错误' });
  }
});

router.put('/:id', (req: Request, res: Response) => {
  try {
    const parsed = updateDiarySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, error: parsed.error.errors[0].message });
      return;
    }

    const updates = parsed.data;
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.provinceId !== undefined) {
      fields.push('province_id = ?');
      values.push(updates.provinceId);
    }
    if (updates.cityId !== undefined) {
      fields.push('city_id = ?');
      values.push(updates.cityId);
    }
    if (updates.title !== undefined) {
      fields.push('title = ?');
      values.push(updates.title);
    }
    if (updates.content !== undefined) {
      fields.push('content = ?');
      values.push(updates.content);
    }
    if (updates.date !== undefined) {
      fields.push('date = ?');
      values.push(updates.date);
    }
    if (updates.weather !== undefined) {
      fields.push('weather = ?');
      values.push(updates.weather);
    }
    if (updates.rating !== undefined) {
      fields.push('rating = ?');
      values.push(updates.rating);
    }
    if (updates.tags !== undefined) {
      fields.push('tags = ?');
      values.push(JSON.stringify(updates.tags));
    }
    if (updates.image !== undefined) {
      fields.push('image = ?');
      values.push(updates.image);
    }

    if (fields.length === 0) {
      res.status(400).json({ success: false, error: '没有需要更新的字段' });
      return;
    }

    fields.push('updated_at = datetime(\'now\')');
    values.push(req.params.id, req.userId!);

    const result = db.prepare(
      `UPDATE diaries SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`
    ).run(...values);

    if (result.changes === 0) {
      res.status(404).json({ success: false, error: '日记不存在' });
      return;
    }

    const updated = db.prepare('SELECT * FROM diaries WHERE id = ?').get(req.params.id);

    res.json({ success: true, data: formatDiary(updated) });
  } catch (err) {
    console.error('Update diary error:', err);
    res.status(500).json({ success: false, error: '服务器内部错误' });
  }
});

router.delete('/:id', (req: Request, res: Response) => {
  try {
    const result = db.prepare(
      'DELETE FROM diaries WHERE id = ? AND user_id = ?'
    ).run(req.params.id, req.userId!);

    if (result.changes === 0) {
      res.status(404).json({ success: false, error: '日记不存在' });
      return;
    }

    res.json({ success: true, data: null });
  } catch (err) {
    console.error('Delete diary error:', err);
    res.status(500).json({ success: false, error: '服务器内部错误' });
  }
});

export default router;