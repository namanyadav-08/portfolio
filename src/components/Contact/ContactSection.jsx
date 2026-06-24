import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'

function Envelope({ reducedMotion }) {
  const groupRef = useRef(null)

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.3
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.1
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.15
  })

  return (
    <group ref={groupRef}>
      <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 1.4, 0.08]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.6}
          roughness={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.7, 0]}>
        <coneGeometry args={[1.1, 0.8, 4]} />
        <meshStandardMaterial
          color="#6C63FF"
          emissive="#6C63FF"
          emissiveIntensity={0.3}
          metalness={0.5}
          roughness={0.4}
          side={2}
        />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[1.8, 0.9]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={0.15}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}

function EnvelopeCanvas({ reducedMotion }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      dpr={[1, 1.5]}
      frameloop={reducedMotion ? 'demand' : 'always'}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} color="#6C63FF" />
      <pointLight position={[3, 3, 3]} intensity={2} color="#00D4FF" />
      <pointLight position={[-2, -1, 2]} intensity={1} color="#6C63FF" />
      <Envelope reducedMotion={reducedMotion} />
    </Canvas>
  )
}

const CONTACT_DETAILS = [
  { label: 'Email', value: 'namanyadav8125@gmail.com', href: 'mailto:namanyadav8125@gmail.com' },
  { label: 'Phone', value: '+91 97556 07657', href: 'tel:+919755607657' },
  { label: 'GitHub', value: 'github.com/namanyadav-08', href: 'https://github.com/namanyadav-08', external: true },
  {
    label: 'LinkedIn',
    value: 'in/naman-yadav',
    href: 'https://www.linkedin.com/in/naman-yadav-5514831a7/',
    external: true,
  },
]

export default function ContactSection({ reducedMotion }) {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="mesh-blob mesh-blob--violet right-0 bottom-0 h-80 w-80" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.div
          className="contact-content order-2 lg:order-1"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-3">Contact</p>
          <h2 className="font-display mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Get in <span className="text-[var(--color-secondary)]">touch</span>
          </h2>
          <p className="mb-10 max-w-md text-[var(--color-muted)]">
            Open to full-stack roles, internships, and freelance work. The quickest way to
            reach me is email — I usually reply within a day.
          </p>

          <ul className="border-t border-[var(--glass-border)]">
            {CONTACT_DETAILS.map((detail) => (
              <li key={detail.label} className="border-b border-[var(--glass-border)]">
                <a
                  href={detail.href}
                  target={detail.external ? '_blank' : undefined}
                  rel={detail.external ? 'noopener noreferrer' : undefined}
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span className="text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
                    {detail.label}
                  </span>
                  <span className="flex items-center gap-2 text-[var(--color-text)] transition-colors group-hover:text-[var(--color-secondary)]">
                    {detail.value}
                    <span
                      aria-hidden
                      className="text-[var(--color-secondary)] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="order-1 flex h-64 items-center justify-center lg:order-2 lg:h-96"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <EnvelopeCanvas reducedMotion={reducedMotion} />
        </motion.div>
      </div>

      <footer className="mx-auto mt-20 max-w-7xl border-t border-[var(--glass-border)] pt-8 text-center text-sm text-[var(--color-muted)]">
        <p>© {new Date().getFullYear()} Naman Yadav. Built with React & Three.js.</p>
      </footer>
    </section>
  )
}
