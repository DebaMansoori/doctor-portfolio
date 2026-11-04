import { motion } from 'motion/react'
import { fadeUp } from '../lib/animations'

/**
 * One figure in the stats strip. Values come from src/data/doctor.js and are
 * demo placeholders unless `note` says otherwise.
 */
export default function StatCard({ value, label, note, tone = 'light' }) {
  const isDark = tone === 'dark'

  return (
    <motion.div
      variants={fadeUp}
      className={`rounded-2xl border p-6 transition-shadow duration-300 hover:shadow-card ${
        isDark ? 'border-white/10 bg-white/5' : 'border-navy-100 bg-white shadow-card'
      }`}
    >
      <p className={`font-display text-4xl font-bold sm:text-5xl ${isDark ? 'text-white' : 'text-navy-800'}`}>
        {value}
      </p>
      <p className={`mt-2 text-sm font-semibold ${isDark ? 'text-navy-100' : 'text-navy-700'}`}>{label}</p>
      {note ? (
        <p className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
            isDark ? 'bg-white/10 text-navy-200' : 'bg-cream-100 text-navy-500'
          }`}
        >
          {note}
        </p>
      ) : null}
    </motion.div>
  )
}
