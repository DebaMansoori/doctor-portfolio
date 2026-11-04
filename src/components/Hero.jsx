import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, CalendarDays, MapPin, ShieldCheck, Sparkles, Star, Users } from 'lucide-react'
import { doctor } from '../data/doctor'
import { fadeUp, stagger } from '../lib/animations'
import { buttonOutline, buttonPrimary } from '../lib/styles'

/*
 * Badges sit over the hero artwork. Figures are demo placeholders from
 * src/data/doctor.js — the demo note keeps them honest until the clinic confirms them.
 */
const badges = [
  {
    id: 'experience',
    icon: Sparkles,
    value: '15+',
    label: 'Years Experience',
    position: 'top-6 -left-4 sm:-left-8',
    duration: 6.5,
  },
  {
    id: 'satisfaction',
    icon: Star,
    value: '98%',
    label: 'Patient Satisfaction',
    position: 'bottom-10 -right-3 sm:-right-7',
    duration: 5.2,
  },
  {
    id: 'patients',
    icon: Users,
    value: '5,000+',
    label: 'Patients Treated',
    position: 'bottom-24 -left-3 hidden sm:flex',
    duration: 7.4,
  },
]

function FloatingBadge({ badge }) {
  const Icon = badge.icon

  return (
    <motion.div
      variants={fadeUp}
      className={`absolute ${badge.position} z-20`}
      aria-hidden="true"
    >
      {/* Inner layer owns the endless float so the entrance variant above stays clean. */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: badge.duration, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-float backdrop-blur-md"
      >
        <span className="flex size-10 items-center justify-center rounded-xl bg-navy-800 text-white">
          <Icon className="size-5" />
        </span>
        <span className="leading-tight">
          <span className="block font-display text-lg font-bold text-navy-800">{badge.value}</span>
          <span className="block text-xs font-medium text-navy-500">{badge.label}</span>
        </span>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 size-[34rem] rounded-full bg-brand-100/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle,#c3cfdf_1px,transparent_1px)] [background-size:26px_26px]"
      />

      <div className="container-page relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-28">
        <motion.div variants={stagger(0.14)} initial="hidden" animate="visible">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-navy-200/80 bg-white/70 px-4 py-2 text-xs font-semibold text-navy-700 shadow-card backdrop-blur-sm sm:text-[13px]">
              <ShieldCheck className="size-4 text-brand-600" aria-hidden="true" />
              Consultant Neurosurgeon · Now consulting in Kabul
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-7 text-[2.6rem] leading-[1.02] font-bold tracking-tight sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem]"
          >
            Expert Brain &amp; Spine Care
            <span className="block text-brand-600">in Kabul</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-xl text-lg leading-relaxed text-navy-600">
            {doctor.name} provides clear diagnosis, considered treatment planning and ongoing follow-up for brain,
            spine and nerve conditions — so you always know the next step before you leave the clinic.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <Link to="/appointment" className={buttonPrimary}>
              <CalendarDays className="size-4" aria-hidden="true" />
              Request Appointment
            </Link>
            <Link to="/about" className={buttonOutline}>
              Learn More
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-navy-600">
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-brand-600" aria-hidden="true" />
              {doctor.clinic}, {doctor.city}
            </li>
            <li>
              <a href={doctor.phoneHref} className="flex items-center gap-2 font-semibold text-navy-700 hover:text-brand-700">
                <CalendarDays className="size-4 text-brand-600" aria-hidden="true" />
                {doctor.phone}
              </a>
            </li>
          </motion.ul>
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
          initial="hidden"
          animate="visible"
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative overflow-visible">
            <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-[2rem] border border-navy-200/70" aria-hidden="true" />
            <div className="relative aspect-4/5 overflow-hidden rounded-[1.75rem] bg-navy-800 shadow-card-hover">
              <img
                src="/images/hero-neuro-visual.webp"
                width="1024"
                height="1280"
                alt="Abstract clinical illustration of a human brain and spinal column rendered in deep blue tones"
                className="size-full object-cover"
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-800/35 via-transparent to-transparent" aria-hidden="true" />
            </div>

            <motion.div variants={stagger(0.16, 0.55)} initial="hidden" animate="visible">
              {badges.map((badge) => (
                <FloatingBadge key={badge.id} badge={badge} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
