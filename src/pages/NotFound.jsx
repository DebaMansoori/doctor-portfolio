import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Brain, Home } from 'lucide-react'
import { buttonPrimary } from '../lib/styles'

export default function NotFound() {
  return (
    <section className="container-page py-24 text-center sm:py-32">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-navy-800 text-white">
          <Brain className="size-7" aria-hidden="true" />
        </span>
        <p className="mt-8 font-display text-6xl font-bold text-navy-800">404</p>
        <h1 className="mt-3 text-2xl font-bold">This page could not be found</h1>
        <p className="mx-auto mt-4 max-w-md text-navy-600">
          The page you are looking for has moved or never existed. Return to the home page to continue.
        </p>
        <Link to="/" className={`${buttonPrimary} mt-9`}>
          <Home className="size-4" aria-hidden="true" />
          Back to home
        </Link>
      </motion.div>
    </section>
  )
}
