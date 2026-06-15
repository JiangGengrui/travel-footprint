import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ImageGalleryProps {
  images: string[]
  className?: string
}

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' as const } },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.2 } },
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelectedIndex(index)
  const closeLightbox = () => setSelectedIndex(null)

  const goToPrev = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null
      return prev === 0 ? images.length - 1 : prev - 1
    })
  }, [images.length])

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null
      return prev === images.length - 1 ? 0 : prev + 1
    })
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, goToPrev, goToNext])

  if (!images || images.length === 0) return null

  return (
    <>
      <motion.div
        className={cn('grid grid-cols-1 md:grid-cols-2 gap-4', className)}
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      >
        {images.map((src, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow"
            onClick={() => openLightbox(index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={src}
                alt={`旅行照片 ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeLightbox}
          >
            {/* 关闭按钮 */}
            <button
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 hover:bg-white/20 hover:text-white transition-all"
              onClick={closeLightbox}
              aria-label="关闭"
            >
              <X size={24} />
            </button>

            {/* 桌面端左右箭头 */}
            {images.length > 1 && (
              <>
                <button
                  className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 hover:bg-white/20 hover:text-white transition-all"
                  onClick={(e) => {
                    e.stopPropagation()
                    goToPrev()
                  }}
                  aria-label="上一张"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 hover:bg-white/20 hover:text-white transition-all"
                  onClick={(e) => {
                    e.stopPropagation()
                    goToNext()
                  }}
                  aria-label="下一张"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            {/* 图片 */}
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedIndex}
                src={images[selectedIndex]}
                alt={`旅行照片 ${selectedIndex + 1}`}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg select-none"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                draggable={false}
              />
            </AnimatePresence>

            {/* 移动端底部箭头 */}
            {images.length > 1 && (
              <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-6">
                <button
                  className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 hover:bg-white/20 hover:text-white transition-all"
                  onClick={(e) => {
                    e.stopPropagation()
                    goToPrev()
                  }}
                  aria-label="上一张"
                >
                  <ChevronLeft size={24} />
                </button>
                <span className="text-white/70 text-sm tabular-nums">
                  {selectedIndex + 1} / {images.length}
                </span>
                <button
                  className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 hover:bg-white/20 hover:text-white transition-all"
                  onClick={(e) => {
                    e.stopPropagation()
                    goToNext()
                  }}
                  aria-label="下一张"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}