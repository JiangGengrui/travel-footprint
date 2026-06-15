import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const titleChars = '旅行足迹'.split('');
const subtitle = '记录走过的路，收藏每一次出发。';

/* ---------- floating particles ---------- */
function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 8 + 6,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [p.opacity, p.opacity * 0.3, p.opacity],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Title chars ---------- */
function AnimatedTitle() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  return (
    <motion.h1
      className="text-6xl md:text-8xl font-serif font-bold text-white tracking-[0.15em] select-none"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {titleChars.map((char, i) => (
        <motion.span key={i} className="inline-block" variants={charVariants}>
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
}

/* ---------- main component ---------- */
export default function Landing() {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll down → navigate /map
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        navigate('/map');
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [navigate]);

  return (
    <AnimatePresence>
      <motion.div
        className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 flex flex-col items-center justify-center"
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {/* ---------- floating particles ---------- */}
        <FloatingParticles />

        {/* ---------- parallax layer ---------- */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[1]"
          animate={{ x: mousePos.x, y: mousePos.y }}
          transition={{ type: 'tween', duration: 0.6, ease: 'easeOut' }}
        >
          {/* Decorative gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-teal-500/10 blur-[100px]" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-cyan-500/8 blur-[120px]" />
        </motion.div>

        {/* ---------- main content ---------- */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-4">
          {/* Title */}
          <AnimatedTitle />

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-slate-300 font-light tracking-[0.2em] select-none"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7, ease: 'easeOut' }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* ---------- bottom CTA ---------- */}
        <motion.button
          onClick={() => navigate('/map')}
          className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer select-none bg-transparent border-none outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.6 }}
          aria-label="进入地图"
        >
          <motion.span
            className="text-sm tracking-[0.25em] font-light"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ↓ 开始探索
          </motion.span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}