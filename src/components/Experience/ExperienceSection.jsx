import { motion } from 'framer-motion'

const EXPERIENCE = [
  {
    role: 'Research Intern',
    company: 'IIT Jodhpur',
    points: [
      'Researching graph coloring algorithms accelerated on GPU Tensor Cores.',
      'Implementing and benchmarking CUDA kernels for parallel graph workloads.',
    ],
  },
  {
    role: 'Software & Operations Intern',
    company: 'Tiffy.io',
    points: [
      'Built and maintained business web pages with PHP, MySQL, and Apache/MAMP.',
      'Automated recurring operational workflows to save manual effort.',
    ],
  },
  {
    role: 'Backend Contributor',
    company: 'KajKarma Associates',
    points: [
      'Contributed to an e-commerce site for a diamond-manufacturing client.',
      'Worked across the full SDLC — from requirements to delivery.',
    ],
  },
]

const EDUCATION = [
  {
    title: 'B.Tech, Information Technology',
    place: 'Jabalpur Engineering College',
    score: 'CGPA 8.6 / 10 · SGPA 9.1 (Sem 5)',
  },
  {
    title: 'Class XII (ISC)',
    place: 'Senior Secondary',
    score: '95%',
  },
  {
    title: 'Class X (ICSE)',
    place: 'Secondary',
    score: '96%',
  },
]

const COURSEWORK = [
  'DSA',
  'DBMS',
  'OS',
  'Computer Networks',
  'OOP',
  'Cloud Computing',
  'Web Dev',
  'Generative AI',
  'Swift',
]

const AWARDS = [
  'Qualified GATE 2026 (Computer Science)',
  'Regional Finalist, Gwalior — top among 600+ participants',
  'Head Coordinator, E-Cell, Jabalpur Engineering College',
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="mesh-blob mesh-blob--violet right-0 top-10 h-80 w-80" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-3">Journey</p>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Experience & <span className="text-[var(--color-secondary)]">milestones</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          {/* Experience */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-display mb-6 text-xs tracking-[0.25em] text-[var(--color-secondary)] uppercase">
              Experience
            </h3>
            <div className="space-y-5">
              {EXPERIENCE.map((job) => (
                <div key={job.company} className="glass rounded-2xl p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-display text-lg font-bold">{job.role}</h4>
                    <span className="text-sm font-medium text-[var(--color-primary)]">
                      {job.company}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {job.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2 text-sm leading-relaxed text-[var(--color-muted)]"
                      >
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-secondary)]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education + Awards */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div>
              <h3 className="font-display mb-6 text-xs tracking-[0.25em] text-[var(--color-secondary)] uppercase">
                Education
              </h3>
              <div className="space-y-4">
                {EDUCATION.map((edu) => (
                  <div key={edu.title} className="border-l border-[var(--glass-border)] pl-4">
                    <p className="font-display font-semibold">{edu.title}</p>
                    <p className="text-sm text-[var(--color-muted)]">{edu.place}</p>
                    <p className="mt-1 text-sm font-medium text-[var(--color-primary)]">
                      {edu.score}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {COURSEWORK.map((course) => (
                  <span
                    key={course}
                    className="rounded-full border border-[var(--glass-border)] px-3 py-1 text-xs text-[var(--color-muted)]"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display mb-6 text-xs tracking-[0.25em] text-[var(--color-secondary)] uppercase">
                Awards & Roles
              </h3>
              <ul className="space-y-3">
                {AWARDS.map((award) => (
                  <li
                    key={award}
                    className="flex gap-2 text-sm leading-relaxed text-[var(--color-muted)]"
                  >
                    <span aria-hidden className="text-[var(--color-secondary)]">★</span>
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
