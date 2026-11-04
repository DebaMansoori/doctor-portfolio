import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, CalendarDays, ClipboardList, ShieldCheck, Stethoscope } from 'lucide-react'
import CtaBanner from '../components/CtaBanner'
import PageHeader from '../components/PageHeader'
import SectionTag from '../components/SectionTag'
import ServiceCard from '../components/ServiceCard'
import { doctor } from '../data/doctor'
import { services } from '../data/services'
import { fadeUp, stagger, viewOnce } from '../lib/animations'
import { buttonOutline, buttonPrimary } from '../lib/styles'

const preparation = [
  {
    icon: ClipboardList,
    title: 'Before the visit',
    text: 'Write down when symptoms started, what makes them better or worse, and any medicines already tried.',
  },
  {
    icon: Stethoscope,
    title: 'During the consultation',
    text: 'A neurological examination, a review of any imaging you bring, and a discussion of what the findings mean.',
  },
  {
    icon: ShieldCheck,
    title: 'After the visit',
    text: 'A written plan with the recommended next step, tests to arrange, and the warning signs that need urgent care.',
  },
]

export default function Services() {
  return (
    <>
      <PageHeader
        tag="Medical services"
        icon={Stethoscope}
        title="Neurosurgical care, explained step by step"
        intro="Four focused consultation services covering the brain, spine, peripheral nerves and second-opinion review. Each one ends with a written plan rather than a verbal summary."
        actions={
          <>
            <Link to="/appointment" className={buttonPrimary}>
              <CalendarDays className="size-4" aria-hidden="true" />
              Request Appointment
            </Link>
            <a href={doctor.phoneHref} className={buttonOutline}>
              Call {doctor.phone}
            </a>
          </>
        }
      />

      <section className="container-page py-16 sm:py-20 lg:py-24" aria-labelledby="all-services-heading">
        <motion.div variants={stagger(0.13)} initial="hidden" whileInView="visible" viewport={viewOnce}>
          <motion.div variants={fadeUp} className="max-w-3xl">
            <SectionTag tone="brand">What is offered</SectionTag>
            <h2 id="all-services-heading" className="mt-6 text-3xl font-bold sm:text-4xl">
              Consultation services
            </h2>
            <p className="mt-4 text-navy-600">
              Surgery itself is arranged separately once a diagnosis is confirmed and the clinic has the required
              facilities. These services cover the assessment stage.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                learnMoreTo="/appointment"
                learnMoreLabel="Book this consultation"
              />
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-navy-800 py-16 text-white sm:py-20 lg:py-24" aria-labelledby="prepare-heading">
        <div className="container-page">
          <motion.div variants={stagger(0.12)} initial="hidden" whileInView="visible" viewport={viewOnce}>
            <motion.div variants={fadeUp}>
              <SectionTag tone="onDark">Patient preparation</SectionTag>
              <h2 id="prepare-heading" className="mt-6 text-3xl font-bold text-white sm:text-4xl">
                What to expect at each stage
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12 grid gap-6 md:grid-cols-3">
              {preparation.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-7">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-navy-800">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-lg font-bold text-white">
                      {String(index + 1).padStart(2, '0')} · {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy-200">{item.text}</p>
                  </div>
                )
              })}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12 flex flex-wrap items-center gap-4">
              <Link
                to="/appointment"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-navy-800 transition-transform hover:-translate-y-0.5"
              >
                Request an appointment
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <p className="text-sm text-navy-300">{doctor.clinic} · {doctor.city}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CtaBanner
        tag="Still deciding?"
        title="Bring your scans for a second opinion"
        text="Imaging review and a written summary are available as an outpatient consultation, so you can decide without pressure."
      />
    </>
  )
}
