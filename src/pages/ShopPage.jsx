import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Grainient from '../components/shared/Grainient'
import { useReducedMotion } from '../hooks/useReducedMotion'
import bookCover from '../assets/book.png'
import './ShopPage.css'

const EASE = [0.22, 1, 0.36, 1]

const ORDER_MAILTO =
  'mailto:namanyadav8125@gmail.com' +
  '?subject=Book Order — Whispers Under My Blanket' +
  "&body=Hi Naman, I'd like to order a copy. Here is my delivery address:" +
  '%0A%0A[Your Name]%0A[Full Address]%0A[City, State, PIN]%0A[Phone Number]'

export default function ShopPage() {
  const reducedMotion = useReducedMotion()

  // Soft fade-up entrance, consistent with the portfolio's hero/sections.
  const fadeUp = (delay = 0, y = 24) => ({
    initial: reducedMotion ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  })

  return (
    <div className="shop-page">
      {/* Grainient gradient background — full-bleed behind the content */}
      <div className="shop-bg" aria-hidden="true">
        <Grainient
          color1="#06B6D4"
          color2="#6366F1"
          color3="#ffffff"
          timeSpeed={reducedMotion ? 0 : 0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      {/* Minimal nav */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      >
        <Link to="/" className="shop-back">
          ← Back to Portfolio
        </Link>
      </motion.div>

      {/* Full-width header band */}
      <header className="shop-banner">
        <div className="shop-banner__inner">
          <motion.p className="shop-eyebrow" {...fadeUp(0.15, 16)}>
            Shop
          </motion.p>
          <motion.h1 className="shop-title" {...fadeUp(0.3, 30)}>
            Whispers Under My Blanket
          </motion.h1>
          <motion.div
            className="shop-rule"
            aria-hidden="true"
            initial={reducedMotion ? false : { opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          />
          <motion.p className="shop-subtitle" {...fadeUp(0.6, 16)}>
            My debut book — now available for order
          </motion.p>
        </div>
      </header>

      {/* Book showcase in the open sky */}
      <section className="shop-book">
        <motion.div
          className="book-stage"
          initial={reducedMotion ? false : { opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
        >
          <img
            className="book-cover"
            src={bookCover}
            alt="Whispers Under My Blanket — book cover by Naman Yadav"
          />
        </motion.div>
        <motion.p className="shop-byline" {...fadeUp(0.75, 16)}>
          Written by Naman Yadav
        </motion.p>
        <motion.a className="order-btn" href={ORDER_MAILTO} {...fadeUp(0.85, 16)}>
          Order Your Copy
        </motion.a>
      </section>
    </div>
  )
}
