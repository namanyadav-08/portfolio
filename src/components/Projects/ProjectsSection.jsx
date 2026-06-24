import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from './ProjectCard'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    title: 'RX-Norm — AI Prescription Generator',
    description:
      'LLM-powered prescription system built with LangChain, using the RxNorm API for real-time drug-name validation. Exposes a REST backend for clinical workflow integration.',
    highlight: 'LangChain + RxNorm drug validation',
    tags: ['Python', 'LangChain', 'REST API'],
    year: '2026',
  },
  {
    title: 'Smart Study Scheduler',
    description:
      'MERN-stack, AI-assisted productivity platform that generates personalized study schedules from difficulty, deadlines, and available hours. Auth, REST APIs, and a responsive dashboard.',
    highlight: 'Personalized scheduling engine',
    tags: ['React', 'Node.js', 'MongoDB'],
    year: '2025',
  },
  {
    title: 'Stock Market Prediction',
    description:
      'Built at the national-level Hacksagon IIIT hackathon as a team project. A Streamlit frontend over a machine-learning model, with interactive data visualization.',
    highlight: 'Hacksagon IIIT Hackathon',
    tags: ['Python', 'ML', 'Streamlit'],
    year: 'Hackathon',
  },
]

export default function ProjectsSection({ reducedMotion }) {
  const trackRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    if (reducedMotion) return
    const track = trackRef.current
    const section = sectionRef.current
    if (!track || !section) return

    const ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - window.innerWidth + 120
      if (scrollWidth <= 0) return

      gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden">
      <div className="mesh-blob mesh-blob--lavender -right-24 top-16 h-80 w-80" />
      <div className="section-padding pb-0">
        <motion.div
          className="projects-header mx-auto mb-12 max-w-7xl px-6 md:px-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-3">Selected Work</p>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Projects that <span className="text-[var(--color-primary)]">push limits</span>
          </h2>
        </motion.div>
      </div>

      {reducedMotion ? (
        <div className="section-padding grid gap-6 px-6 md:grid-cols-2 lg:grid-cols-3 md:px-10">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden pb-24">
          <div
            ref={trackRef}
            className="flex w-max gap-6 px-6 md:px-10"
            style={{ willChange: 'transform' }}
          >
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export { PROJECTS }
