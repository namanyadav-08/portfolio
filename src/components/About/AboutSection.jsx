import { motion } from 'framer-motion'
import TiltCard from './TiltCard'

export default function AboutSection() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="mesh-blob mesh-blob--violet -left-32 top-20 h-96 w-96" />
      <div className="mesh-blob mesh-blob--cyan -right-32 bottom-20 h-80 w-80" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <TiltCard className="mx-auto w-full max-w-md">
          <span className="font-display text-7xl font-bold text-[var(--color-primary)]">NY</span>
          <p className="mt-4 text-center text-sm tracking-widest text-[var(--color-secondary)] uppercase">
            Turning ideas into clean, scalable software
          </p>
          <div className="mt-6 flex gap-3">
            {['React', 'Node.js', 'Java'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--glass-border)] px-3 py-1 text-xs text-[var(--color-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </TiltCard>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-label mb-3">About</p>
          <h2 className="font-display mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            Building reliable,
            <span className="text-[var(--color-primary)]"> scalable software</span>
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-[var(--color-muted)]">
            B.Tech IT student at Jabalpur Engineering College (CGPA 8.6, with a 9.1 SGPA
            in semester 5). Qualified GATE 2026 in Computer Science.
          </p>
          <p className="text-lg leading-relaxed text-[var(--color-muted)]">
            I&apos;m a full-stack developer who enjoys building things end to end — from
            MERN web apps to AI-powered tools with LangChain. Strong on fundamentals
            (DSA, DBMS, OS, networks) and happiest shipping clean, useful products.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              { label: 'Education', value: 'B.Tech IT' },
              { label: 'CGPA', value: '8.6 / 10' },
              { label: 'GATE CS', value: 'Qualified' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs tracking-wider text-[var(--color-secondary)] uppercase">
                  {item.label}
                </p>
                <p className="font-display mt-1 font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
