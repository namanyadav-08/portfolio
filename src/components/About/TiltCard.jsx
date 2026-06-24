import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function TiltCard({ children, className = '' }) {
  const cardRef = useRef(null)

  const handleMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -12
    const rotateY = ((x - centerX) / centerX) * 12
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }, [])

  const handleLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className={`glass relative overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-[0_20px_60px_var(--glow-primary)] ${className}`}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8 }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, var(--color-primary), transparent 60%), radial-gradient(circle at 70% 70%, var(--color-secondary), transparent 60%)',
        }}
      />
      <div className="relative flex aspect-square flex-col items-center justify-center p-8">
        {children}
      </div>
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10"
        style={{ transform: 'translateZ(30px)' }}
      />
    </motion.div>
  )
}
