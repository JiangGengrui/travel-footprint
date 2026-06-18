import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import db from './db';
import authRoutes from './routes/auth';
import footprintRoutes from './routes/footprints';
import diaryRoutes from './routes/diaries';
import provinceRoutes from './routes/provinces';
import statsRoutes from './routes/stats';
import exportRoutes from './routes/export';

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'your-secret-key-change-in-production') {
  console.warn('[WARNING] JWT_SECRET 使用默认值，生产环境请设置环境变量');
}

// CORS
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

// Body parsing
app.use(express.json({ limit: '15mb' }));

// Request logging
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Global rate limit: 100 requests per minute
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: '请求过于频繁，请稍后再试' },
});
app.use(globalLimiter);

// Auth routes rate limit: 5 requests per minute
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: '请求过于频繁，请稍后再试' },
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/footprints', footprintRoutes);
app.use('/api/diaries', diaryRoutes);
app.use('/api/provinces', provinceRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/export', exportRoutes);

// Error handling middleware
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ success: false, error: '服务器内部错误' });
  }
);

const server = app.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
  console.log(`[Server] CORS origin: ${CORS_ORIGIN}`);
});

function shutdown(signal: string) {
  console.log(`[Server] ${signal} received, shutting down...`);
  server.close(() => {
    db.close();
    console.log('[Server] Closed');
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 5000);
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

export default app;