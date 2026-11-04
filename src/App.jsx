import { Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import ErrorBoundary from './components/ErrorBoundary'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import About from './pages/About'
import Appointment from './pages/Appointment'
import Contact from './pages/Contact'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Services from './pages/Services'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-navy-800 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
