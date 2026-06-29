import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Lightfall from '../shared/Lightfall'
import Galaxy from '../shared/Galaxy'

// Matched to the design system — keep in sync with globals.css palette.
// Hoisted so the array keeps a stable reference across renders (it's in
// Lightfall's effect deps; a fresh literal each render would re-init the GL context).
const HERO_COLORS = ['#6C63FF', '#00D4FF', '#A78BFA']

// Touch devices have no pointer to drive the streak interaction.
const HAS_FINE_POINTER =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(pointer: fine)').matches

// Lightfall's shader needs WebGL *and* usable high-precision floats in the
// fragment stage. Some low-end Android GPUs lack one or the other, in which
// case Lightfall renders nothing — so we detect that up front and fall back.
function deviceSupportsLightfall() {
  if (typeof document === 'undefined') return true
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!gl) return false
    const hp = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT)
    return Boolean(hp && hp.precision > 0)
  } catch {
    return false
  }
}

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <span className="text-xs tracking-[0.3em] text-[var(--color-muted)] uppercase">
        Scroll
      </span>
      <motion.div
        className="h-10 w-px bg-gradient-to-b from-[var(--color-primary)] to-transparent"
        animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

export default function HeroSection({ reducedMotion }) {
  const bgRef = useRef(null)
  // Start on the fallback only if the device clearly can't run Lightfall.
  const [useFallback, setUseFallback] = useState(() => !deviceSupportsLightfall())

  // Catch the other failure mode: a device that compiles the shader but then
  // loses the context (heavy shader timing out). Switch to the fallback if so.
  useEffect(() => {
    if (useFallback) return
    const canvas = bgRef.current?.querySelector('canvas')
    if (!canvas) return
    const onLost = (e) => {
      e.preventDefault?.()
      setUseFallback(true)
    }
    canvas.addEventListener('webglcontextlost', onLost)
    return () => canvas.removeEventListener('webglcontextlost', onLost)
  }, [useFallback])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Full-bleed background: Lightfall when supported, else a themed Galaxy.
          The CSS base shows only if neither WebGL effect can paint. */}
      <div ref={bgRef} className="hero-bg-fallback absolute inset-0 z-0">
        {useFallback ? (
          <Galaxy
            density={1}
            hueShift={235}
            saturation={0.85}
            glowIntensity={0.45}
            starSpeed={0.3}
            rotationSpeed={0.04}
            twinkleIntensity={0.4}
            mouseInteraction={false}
            mouseRepulsion={false}
            disableAnimation={reducedMotion}
            transparent
          />
        ) : (
          <Lightfall
            colors={HERO_COLORS}
            backgroundColor="#050510"
            speed={reducedMotion ? 0 : 0.6}
            streakCount={6}
            streakWidth={1.2}
            streakLength={1.4}
            glow={1.2}
            density={0.5}
            twinkle={0.8}
            zoom={2.5}
            backgroundGlow={0.4}
            opacity={1}
            mouseInteraction={HAS_FINE_POINTER && !reducedMotion}
            mouseStrength={0.6}
            mouseRadius={0.8}
            mouseDampening={0.12}
          />
        )}
      </div>

      {/* Hero text content on top */}
      <div className="pointer-events-none relative z-10 px-6 text-center">
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Portfolio
        </motion.p>
        <motion.h1
          className="font-display text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-gradient">Naman</span>
          <br />
          <span className="text-[var(--color-text)]">Yadav</span>
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-muted)] sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Full Stack Developer & Software Engineer
        </motion.p>
        <motion.div
          className="mt-8 flex justify-center gap-4 pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <a
            href="#projects"
            className="rounded-full border border-[var(--color-primary)] bg-[var(--color-primary)]/10 px-8 py-3 text-sm font-medium text-[var(--color-text)] backdrop-blur-sm transition-all hover:bg-[var(--color-primary)]/25 hover:shadow-[0_0_30px_var(--glow-primary)]"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-[var(--glass-border)] px-8 py-3 text-sm font-medium text-[var(--color-muted)] backdrop-blur-sm transition-all hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {!reducedMotion && <ScrollIndicator />}

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg)]" />
    </section>
  )
}
