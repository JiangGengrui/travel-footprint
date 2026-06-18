import { Router, Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import db from '../db';
import { signToken } from '../utils/jwt';
import { authMiddleware } from '../middleware/auth';

const router = Router();

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: '请求过于频繁，请稍后再试' },
});

const registerSchema = z.object({
  email: z.string().email('邮箱格式不正确'),
  password: z.string().min(6, '密码至少6位').max(64, '密码最多64位'),
  nickname: z.string().min(1, '昵称不能为空').max(20, '昵称最多20位'),
});

const loginSchema = z.object({
  email: z.string().email('邮箱格式不正确'),
  password: z.string().min(1, '密码不能为空'),
});

function formatZodError(error: z.ZodError): string {
  return error.errors.map((e) => e.message).join('; ');
}

router.post('/register', authLimiter, (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, error: formatZodError(parsed.error) });
      return;
    }

    const { email, password, nickname } = parsed.data;

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      res.status(409).json({ success: false, error: '该邮箱已被注册' });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = db.prepare(
      'INSERT INTO users (email, nickname, password) VALUES (?, ?, ?)'
    ).run(email, nickname, hashedPassword);

    const userId = result.lastInsertRowid as number;
    const token = signToken(userId);

    res.json({
      success: true,
      data: {
        token,
        user: { id: userId, email, nickname },
      },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ success: false, error: '服务器内部错误' });
  }
});

router.post('/login', authLimiter, (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, error: formatZodError(parsed.error) });
      return;
    }

    const { email, password } = parsed.data;

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as {
      id: number;
      email: string;
      nickname: string;
      password: string;
    } | undefined;

    if (!user) {
      res.status(401).json({ success: false, error: '邮箱或密码错误' });
      return;
    }

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      res.status(401).json({ success: false, error: '邮箱或密码错误' });
      return;
    }

    const token = signToken(user.id);

    res.json({
      success: true,
      data: {
        token,
        user: { id: user.id, email: user.email, nickname: user.nickname },
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, error: '服务器内部错误' });
  }
});

router.get('/me', authMiddleware, (req: Request, res: Response) => {
  try {
    const user = db.prepare(
      'SELECT id, email, nickname, avatar, created_at FROM users WHERE id = ?'
    ).get(req.userId!) as {
      id: number;
      email: string;
      nickname: string;
      avatar: string | null;
      created_at: string;
    } | undefined;

    if (!user) {
      res.status(404).json({ success: false, error: '用户不存在' });
      return;
    }

    res.json({ success: true, data: user });
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ success: false, error: '服务器内部错误' });
  }
});

export default router;