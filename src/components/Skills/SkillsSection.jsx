import { motion } from 'framer-motion'

const CATEGORIES = [
  { title: 'Languages', skills: ['Java', 'C', 'Python', 'JavaScript', 'SQL'] },
  { title: 'Frontend', skills: ['HTML', 'CSS', 'React.js'] },
  { title: 'Backend', skills: ['Node.js', 'Express', 'MongoDB'] },
  { title: 'Tools & Concepts', skills: ['Git', 'GitHub', 'Postman', 'DSA', 'OOP'] },
]

export default function SkillsSection({ reducedMotion }) {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="mesh-blob mesh-blob--cyan left-1/2 top-0 h-64 w-64 -ml-32" />
      <div className="mesh-blob mesh-blob--violet -left-24 bottom-10 h-72 w-72" />
      <div className="mesh-blob mesh-blob--lavender -right-20 bottom-0 h-64 w-64" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="skills-header mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-3">Expertise</p>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Skills & <span className="text-[var(--color-secondary)]">toolkit</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-muted)]">
            The languages, frameworks, and tools I reach for to build full-stack products.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {CATEGORIES.map((category, i) => (
            <motion.div
              key={category.title}
              className="glass rounded-2xl p-6 transition-colors hover:border-[var(--color-primary)]/40"
              initial={reducedMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <h3 className="font-display mb-4 text-xs tracking-[0.25em] text-[var(--color-secondary)] uppercase">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="cursor-default rounded-full border border-[var(--glass-border)] bg-white/[0.03] px-4 py-1.5 text-sm text-[var(--color-text)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:shadow-[0_0_18px_var(--glow-primary)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
