import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, CalendarDays, Phone } from 'lucide-react'
import { doctor } from '../data/doctor'
import { fadeUp, stagger, viewOnce } from '../lib/animations'
import { buttonOutline, buttonPrimary } from '../lib/styles'
import SectionTag from './SectionTag'

export default function CtaBanner({ title = 'Ready to talk about your symptoms?', text, tag = 'Next step' }) {
  return (
    <section className="container-page py-16 sm:py-20 lg:py-24">
      <motion.div
        variants={stagger(0.13)}
        initial="hidden"
        whileInView="visible"
        viewport={viewOnce}
        className="relative overflow-hidden rounded-[2rem] bg-navy-800 px-7 py-12 shadow-card-hover sm:px-12 sm:py-16 lg:px-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-16 size-80 rounded-full bg-brand-600/25 blur-3xl"
        />

        <div className="relative max-w-3xl">
          <motion.div variants={fadeUp}>
            <SectionTag tone="onDark">{tag}</SectionTag>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mt-6 text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-[2.85rem]">
            {title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg leading-relaxed text-navy-200">
            {text ??
              `Send an appointment request and the clinic will confirm a time by ${doctor.phone} — or call the clinic directly during working hours.`}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
            <Link to="/appointment" className={buttonPrimary}>
              <CalendarDays className="size-4" aria-hidden="true" />
              Request Appointment
            </Link>
            <a href={doctor.phoneHref} className={`${buttonOutline} border-white/25 bg-transparent text-white hover:border-white/50 hover:bg-white/10`}>
              <Phone className="size-4" aria-hidden="true" />
              {doctor.phone}
            </a>
          </motion.div>
        </div>

        <motion.span
          variants={{
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.3 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={viewOnce}
          className="relative mt-10 inline-flex items-center gap-2 text-sm font-semibold text-navy-300"
        >
          Prefer to read first?
          <Link to="/services" className="inline-flex items-center gap-1.5 text-white hover:underline">
            See all services
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </motion.span>
      </motion.div>
    </section>
  )
}
