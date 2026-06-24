import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'

const ShopPage = lazy(() => import('./pages/ShopPage'))
const OpinionsPage = lazy(() => import('./pages/OpinionsPage'))

function PageFallback() {
  return <div className="min-h-screen" aria-hidden />
}

// The Shop page has its own light theme and minimal nav, so the dark
// portfolio navbar is hidden there.
const NAVLESS_ROUTES = ['/shop']

export default function App() {
  const { pathname } = useLocation()
  const showNav = !NAVLESS_ROUTES.includes(pathname)

  return (
    <>
      {showNav && <Navbar />}
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/opinions" element={<OpinionsPage />} />
        </Routes>
      </Suspense>
    </>
  )
}
