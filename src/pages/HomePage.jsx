import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HeroSection from '../components/Hero/HeroSection'
import AboutSection from '../components/About/AboutSection'
import { useReducedMotion } from '../hooks/useReducedMotion'

const SkillsSection = lazy(() => import('../components/Skills/SkillsSection'))
const ExperienceSection = lazy(() => import('../components/Experience/ExperienceSection'))
const ProjectsSection = lazy(() => import('../components/Projects/ProjectsSection'))
const ContactSection = lazy(() => import('../components/Contact/ContactSection'))

function SectionFallback() {
  return <div className="section-padding min-h-[40vh]" aria-hidden />
}

export default function HomePage() {
  const reducedMotion = useReducedMotion()
  const { hash } = useLocation()

  // Scroll to a section when arriving via a hash link (e.g. from another page).
  useEffect(() => {
    if (!hash) return
    const scroll = () => {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
    }
    // Delay lets lazy sections mount before we try to find the target.
    const id = setTimeout(scroll, 120)
    return () => clearTimeout(id)
  }, [hash, reducedMotion])

  return (
    <main>
      <div className="grain-overlay" aria-hidden="true" />
      <HeroSection reducedMotion={reducedMotion} />
      <AboutSection />
      <Suspense fallback={<SectionFallback />}>
        <SkillsSection reducedMotion={reducedMotion} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ExperienceSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ProjectsSection reducedMotion={reducedMotion} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ContactSection reducedMotion={reducedMotion} />
      </Suspense>
    </main>
  )
}
