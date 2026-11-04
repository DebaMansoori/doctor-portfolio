import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, CalendarDays, ClipboardList, ScanLine, Users } from 'lucide-react'
import CtaBanner from '../components/CtaBanner'
import Hero from '../components/Hero'
import Reveal from '../components/Reveal'
import SectionTag from '../components/SectionTag'
import ServiceCard from '../components/ServiceCard'
import StatCard from '../components/StatCard'
import { stats } from '../data/doctor'
import { processSteps, services } from '../data/services'
import { fadeUp, stagger, viewOnce } from '../lib/animations'
import { buttonOutline } from '../lib/styles'

const processIcons = { '01': Users, '02': ScanLine, '03': ClipboardList }

function ProcessCard({ step }) {
  const Icon = processIcons[step.index] ?? CalendarDays

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group relative flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between gap-6">
        <SectionTag>{step.tag}</SectionTag>
        <span aria-hidden="true" className="font-display text-5xl leading-none font-bold text-navy-100 transition-colors duration-300 group-hover:text-brand-100">
          {step.index}
        </span>
      </div>

      <span className="mt-8 flex size-13 items-center justify-center rounded-2xl bg-cream-100 text-navy-800 transition-colors duration-300 group-hover:bg-navy-800 group-hover:text-white">
        <Icon className="size-6" aria-hidden="true" />
      </span>

      <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-navy-600">{step.description}</p>
    </motion.article>
  )
}

export default function Home() {
  return (
    <>
      <Hero />

      <section className="container-page py-16 sm:py-20 lg:py-24" aria-labelledby="stats-heading">
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="visible" viewport={viewOnce}>
          <motion.div variants={fadeUp} className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionTag tone="brand" icon={CalendarDays}>
                At a glance
              </SectionTag>
              <h2 id="stats-heading" className="mt-5 text-3xl font-bold sm:text-4xl">
                Care built on experience and follow-up
              </h2>
            </div>
            <p className="max-w-sm text-sm text-navy-500">
              The figures below are layout placeholders until the clinic supplies verified numbers.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-cream-100 py-16 sm:py-20 lg:py-24" aria-labelledby="process-heading">
        <div className="container-page">
          <motion.div variants={stagger(0.12)} initial="hidden" whileInView="visible" viewport={viewOnce}>
            <motion.div variants={fadeUp}>
              <SectionTag tone="navy">How it works</SectionTag>
            </motion.div>
            <motion.h2 variants={fadeUp} id="process-heading" className="mt-6 max-w-3xl text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">
              Three steps from first symptom to a clear plan
            </motion.h2>

            <motion.div variants={fadeUp} className="mt-12 grid gap-6 md:grid-cols-3">
              {processSteps.map((step) => (
                <ProcessCard key={step.index} step={step} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20 lg:py-24" aria-labelledby="services-heading">
        <motion.div variants={stagger(0.12)} initial="hidden" whileInView="visible" viewport={viewOnce}>
          <motion.div variants={fadeUp} className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionTag tone="brand">Services</SectionTag>
              <h2 id="services-heading" className="mt-6 max-w-2xl text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">
                Focused neurosurgical consultations
              </h2>
            </div>
            <Link to="/services" className={`${buttonOutline} shrink-0`}>
              View all services
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.slice(0, 3).map((service) => (
              <ServiceCard key={service.id} service={service} learnMoreTo="/services" learnMoreLabel="View service" />
            ))}
          </motion.div>
        </motion.div>
      </section>

      <Reveal className="bg-white">
        <div className="container-page grid gap-8 border-y border-navy-100 bg-cream-50 py-14 sm:grid-cols-3">
          {[
            { title: 'Bring your scans', text: 'MRI or CT images and reports, even if they were done at another facility.' },
            { title: 'Plain-language answers', text: 'Every finding is explained before any treatment option is discussed.' },
            { title: 'Written plan', text: 'You leave the clinic with a summary you can share with family or other doctors.' },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-base font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{item.text}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <CtaBanner />
    </>
  )
}
