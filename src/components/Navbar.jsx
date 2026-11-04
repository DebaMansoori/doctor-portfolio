import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Brain, CalendarDays, Menu, X } from 'lucide-react'
import { doctor, navLinks } from '../data/doctor'
import { buttonPrimary } from '../lib/styles'

function Logo({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="group flex items-center gap-3" aria-label={`${doctor.shortName} — home`}>
      <span className="flex size-11 items-center justify-center rounded-2xl bg-navy-800 text-white shadow-float transition-transform duration-300 group-hover:scale-105">
        <Brain className="size-6" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-[15px] font-bold text-navy-800 sm:text-base">
          {doctor.shortName}
        </span>
        <span className="hidden text-xs font-medium text-navy-500 sm:block">Consultant Neurosurgeon</span>
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100/80 glass-panel">
      <nav className="container-page flex h-18 items-center justify-between gap-4" aria-label="Main navigation">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `group relative block px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive ? 'text-navy-900' : 'text-navy-600 hover:text-navy-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0.5 left-4 h-0.5 w-[calc(100%-2rem)] origin-left rounded-full bg-brand-600 transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link to="/appointment" className={`${buttonPrimary} hidden lg:inline-flex`}>
            <CalendarDays className="size-4" aria-hidden="true" />
            Book Appointment
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex size-11 items-center justify-center rounded-2xl border border-navy-200 bg-white text-navy-800 transition hover:border-navy-400 lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-18 z-40 bg-navy-950/40 lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              key="panel"
              id="mobile-menu"
              role="dialog"
              aria-label="Site menu"
              initial={{ x: '100%', opacity: 0.6 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.6 }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="fixed top-18 right-0 bottom-0 z-40 w-[min(22rem,88vw)] border-l border-navy-100 bg-white p-6 shadow-card-hover lg:hidden"
            >
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.08, duration: 0.35 }}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                          isActive ? 'bg-navy-800 text-white' : 'text-navy-700 hover:bg-navy-50'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <Link to="/appointment" className={`${buttonPrimary} mt-8 w-full`}>
                <CalendarDays className="size-4" aria-hidden="true" />
                Book Appointment
              </Link>

              <div className="mt-8 space-y-1 border-t border-navy-100 pt-6 text-sm text-navy-600">
                <p className="font-semibold text-navy-800">{doctor.clinic}</p>
                <p>{doctor.city}</p>
                <a href={doctor.phoneHref} className="font-semibold text-brand-600 hover:text-brand-700">
                  {doctor.phone}
                </a>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
