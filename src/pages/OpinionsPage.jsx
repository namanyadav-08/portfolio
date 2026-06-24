import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Galaxy from '../components/shared/Galaxy'
import { useReducedMotion } from '../hooks/useReducedMotion'

// Each item: { title, subtitle }  (subtitle = author / creator / artist, optional)
const CATEGORIES = [
  {
    key: 'books',
    label: 'Books',
    emoji: '📚',
    items: [
      { title: 'Gunaho Ka Devta', subtitle: 'Dharamvir Bharati' },
      { title: '10 Judgements That Changed India', subtitle: 'Zia Mody' },
      { title: 'Ramayan Unravelled', subtitle: 'Ami Ganatra' },
      { title: 'Here After', subtitle: 'Amy Lin' },
      { title: 'Pride and Prejudice', subtitle: 'Jane Austen' },
    ],
  },
  {
    key: 'shows',
    label: 'Shows',
    emoji: '📺',
    items: [
      { title: 'Abbott Elementary', subtitle: '' },
      { title: 'Modern Family', subtitle: '' },
      { title: 'The Lincoln Lawyer', subtitle: '' },
      { title: 'The Haunting of Hill House', subtitle: '' },
      { title: 'Game of Thrones', subtitle: '' },
    ],
  },
  {
    key: 'songs',
    label: 'Songs',
    emoji: '🎵',
    items: [
      { title: 'Hate That I Made You Love Me', subtitle: 'Ariana Grande' },
      { title: 'Bairan', subtitle: 'Banjaree' },
      { title: 'TV Off', subtitle: 'Kendrick Lamar' },
      { title: 'Supernatural', subtitle: 'Ariana Grande' },
      { title: 'Luther', subtitle: 'Kendrick Lamar & SZA' },
    ],
  },
]

export default function OpinionsPage() {
  const reducedMotion = useReducedMotion()

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05060f] text-[var(--color-text)]">
      {/* Galaxy cosmic background — fixed full-bleed behind the content */}
      <div className="fixed inset-0 z-0">
        <Galaxy
          density={1.2}
          hueShift={250}
          saturation={0.7}
          glowIntensity={0.45}
          starSpeed={0.3}
          rotationSpeed={0.05}
          twinkleIntensity={0.4}
          repulsionStrength={1.6}
          mouseInteraction={!reducedMotion}
          mouseRepulsion={!reducedMotion}
          disableAnimation={reducedMotion}
          transparent
        />
      </div>

      <div className="section-padding relative z-10">
        <div className="mx-auto max-w-7xl">
          <motion.header
            className="mb-14 text-center"
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label mb-3">Opinions</p>
            <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              My Hottest <span className="text-gradient">Takes</span>
              <span aria-hidden> 🔥</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-[var(--color-muted)]">
              My current top 5 — the books, shows, and songs I can&apos;t stop recommending.
            </p>
          </motion.header>

          <div className="grid gap-6 lg:grid-cols-3">
            {CATEGORIES.map((cat, ci) => (
              <motion.section
                key={cat.key}
                className="glass rounded-2xl p-6 backdrop-blur-xl"
                initial={reducedMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: ci * 0.1 }}
              >
                <h2 className="font-display mb-6 flex items-center gap-2 text-xs tracking-[0.25em] text-[var(--color-secondary)] uppercase">
                  <span aria-hidden className="text-base">
                    {cat.emoji}
                  </span>
                  {cat.label}
                </h2>
                <ol className="space-y-4">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="text-gradient font-display w-7 shrink-0 text-center text-2xl font-bold">
                        {i + 1}
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <p className="font-medium text-[var(--color-text)]">{item.title}</p>
                        {item.subtitle && (
                          <p className="text-sm text-[var(--color-muted)]">{item.subtitle}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.section>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-[var(--color-muted)]">
            Rankings are deeply biased and subject to change without notice.
          </p>

          <div className="mt-10 text-center">
            <Link
              to="/#hero"
              className="text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-secondary)]"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
