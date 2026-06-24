import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const sectionLinks = [
  { hash: '#hero', label: 'Home' },
  { hash: '#about', label: 'About' },
  { hash: '#skills', label: 'Skills' },
  { hash: '#experience', label: 'Experience' },
  { hash: '#projects', label: 'Projects' },
  { hash: '#contact', label: 'Contact' },
]

const pageLinks = [
  { to: '/shop', label: 'Shop' },
  { to: '/opinions', label: 'Opinions' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Section links scroll on the home page, or route home (with hash) from elsewhere.
  const handleSection = (hash) => {
    setMobileOpen(false)
    if (location.pathname === '/') {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/${hash}`)
    }
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 glass-nav ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <button
          type="button"
          onClick={() => handleSection('#hero')}
          className="font-display text-lg font-bold tracking-wider text-[var(--color-text)]"
        >
          NY<span className="text-[var(--color-primary)]">.</span>
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {sectionLinks.map((link) => (
            <li key={link.hash}>
              <button
                type="button"
                onClick={() => handleSection(link.hash)}
                className="text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-secondary)]"
              >
                {link.label}
              </button>
            </li>
          ))}
          {pageLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium transition-colors hover:text-[var(--color-secondary)] ${
                  location.pathname === link.to
                    ? 'text-[var(--color-secondary)]'
                    : 'text-[var(--color-muted)]'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-[var(--color-text)] transition-transform ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-[var(--color-text)] transition-opacity ${mobileOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-[var(--color-text)] transition-transform ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-[var(--glass-border)] px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {sectionLinks.map((link) => (
              <li key={link.hash}>
                <button
                  type="button"
                  onClick={() => handleSection(link.hash)}
                  className="text-sm text-[var(--color-muted)]"
                >
                  {link.label}
                </button>
              </li>
            ))}
            {pageLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm ${
                    location.pathname === link.to
                      ? 'text-[var(--color-secondary)]'
                      : 'text-[var(--color-muted)]'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  )
}
