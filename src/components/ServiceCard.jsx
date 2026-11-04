import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'
import { fadeUp } from '../lib/animations'
import SectionTag from './SectionTag'

/**
 * Reusable service card. Entrance is orchestrated by a parent stagger container,
 * so always render inside `<motion.div variants={stagger()} whileInView="visible">`.
 */
export default function ServiceCard({ service, learnMoreTo = '/appointment', learnMoreLabel = 'Learn more' }) {
  const Icon = service.icon

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <SectionTag tone="brand">{service.tag}</SectionTag>
        <span
          aria-hidden="true"
          className="font-display text-3xl font-semibold text-navy-100 transition-colors duration-300 group-hover:text-brand-100"
        >
          {service.index}
        </span>
      </div>

      <span className="mt-7 flex size-13 items-center justify-center rounded-2xl bg-navy-800 text-white shadow-float">
        <Icon className="size-6" aria-hidden="true" />
      </span>

      <h3 className="mt-6 text-xl font-bold sm:text-2xl">{service.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-navy-600">{service.description}</p>

      {service.points ? (
        <ul className="mt-6 space-y-2.5 border-t border-navy-100 pt-6">
          {service.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm text-navy-700">
              <Check className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      ) : null}

      <Link
        to={learnMoreTo}
        className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
        aria-label={`${learnMoreLabel}: ${service.title}`}
      >
        {learnMoreLabel}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </motion.article>
  )
}
