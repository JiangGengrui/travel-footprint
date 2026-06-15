import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Diary {
  id: string;
  date: string;
  content: string;
  tags: string[];
  weather: string;
  rating: number;
}

interface DiaryCardProps {
  diary: Diary;
  className?: string;
}

const weatherEmoji: Record<string, string> = {
  '晴': '☀️',
  '多云': '⛅',
  '雨': '🌧️',
  '雪': '❄️',
};

const TAG_COLORS = [
  'bg-amber-100 text-amber-700',
  'bg-cyan-100 text-cyan-700',
  'bg-emerald-100 text-emerald-700',
  'bg-violet-100 text-violet-700',
  'bg-rose-100 text-rose-700',
  'bg-indigo-100 text-indigo-700',
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

export function DiaryCard({ diary, className = '' }: DiaryCardProps) {
  const [expanded, setExpanded] = useState(false);

  const clampedRating = Math.max(1, Math.min(5, Math.round(diary.rating)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
      className={`bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-5 shadow-lg cursor-pointer select-none ${className}`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Top row: date + weather & rating */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-slate-500 font-medium">
          {formatDate(diary.date)}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-lg" title={diary.weather}>
            {weatherEmoji[diary.weather] ?? diary.weather}
          </span>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={14}
                className={
                  i <= clampedRating
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-300'
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Body: diary content */}
      <p
        className={`text-slate-700 text-sm leading-relaxed whitespace-pre-wrap ${
          expanded ? '' : 'line-clamp-3'
        }`}
      >
        {diary.content}
      </p>
      {!expanded && diary.content.length > 0 && (
        <span className="text-xs text-cyan-500 mt-1 inline-block">
          点击展开全文
        </span>
      )}

      {/* Bottom: tag chips */}
      {diary.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100">
          {diary.tags.map((tag, idx) => (
            <span
              key={tag}
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                TAG_COLORS[idx % TAG_COLORS.length]
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}