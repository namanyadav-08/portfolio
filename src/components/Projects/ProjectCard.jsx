import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null)

  const handleMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
  }, [])

  const handleLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'
  }, [])

  return (
    <motion.article
      ref={cardRef}
      className="project-card glass group relative min-w-[320px] max-w-[380px] shrink-0 overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-[var(--color-primary)]/40 hover:shadow-[0_24px_48px_var(--glow-primary)] sm:min-w-[360px]"
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.2s ease-out, box-shadow 0.3s ease' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="mb-4 flex items-start justify-between">
        <span className="font-display text-5xl font-bold text-[var(--color-primary)]/20">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] tracking-wide text-[var(--color-secondary)] uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-xl font-bold">{project.title}</h3>
        {project.year && (
          <span className="shrink-0 text-xs font-medium text-[var(--color-muted)]">
            {project.year}
          </span>
        )}
      </div>
      <p className="mb-6 text-sm leading-relaxed text-[var(--color-muted)]">
        {project.description}
      </p>
      {project.highlight && (
        <p className="mb-4 rounded-lg border border-[var(--color-secondary)]/20 bg-[var(--color-secondary)]/5 px-3 py-2 text-xs font-medium text-[var(--color-secondary)]">
          {project.highlight}
        </p>
      )}
      <div className="flex items-center gap-2 text-sm text-[var(--color-primary)] opacity-0 transition-opacity group-hover:opacity-100">
        <span>Explore</span>
        <span aria-hidden>→</span>
      </div>
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity group-hover:opacity-100"
        style={{ background: 'var(--glow-primary)' }}
      />
    </motion.article>
  )
}
