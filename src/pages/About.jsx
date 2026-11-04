import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Award,
  CalendarDays,
  Clock,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react'
import CtaBanner from '../components/CtaBanner'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SectionTag from '../components/SectionTag'
import StatCard from '../components/StatCard'
import { doctor, education, highlights, memberships, stats } from '../data/doctor'
import { fadeUp, stagger, viewOnce } from '../lib/animations'
import { buttonOutline, buttonPrimary } from '../lib/styles'

const highlightIcons = { users: Users, shield: ShieldCheck, clock: Clock }

const biography = [
  `${doctor.name} is a ${doctor.title.toLowerCase()} practising at ${doctor.clinic} in ${doctor.city}. Consultations cover headaches, back and neck pain, numbness or weakness in the arms and legs, disc problems, and follow-up after surgery performed elsewhere.`,
  'The clinic approach is deliberately conservative at first: history, examination and imaging are reviewed together, and surgery is only recommended when the findings clearly support it. Where a condition can be managed without an operation, the plan says so.',
  'Appointments are also used for second opinions. Patients who have already been advised to have surgery are welcome to bring their scans for an independent review before they decide.',
]

export default function About() {
  return (
    <>
      <PageHeader
        tag="About the doctor"
        icon={Stethoscope}
        title={doctor.name}
        intro={`${doctor.title} — consulting at ${doctor.clinic}, ${doctor.city}.`}
        actions={
          <>
            <Link to="/appointment" className={buttonPrimary}>
              <CalendarDays className="size-4" aria-hidden="true" />
              Request Appointment
            </Link>
            <Link to="/services" className={buttonOutline}>
              See services
            </Link>
          </>
        }
      />

      <section className="container-page grid items-start gap-12 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-24" aria-labelledby="bio-heading">
        <Reveal>
          <figure className="relative">
            <div className="overflow-hidden rounded-[1.75rem] border border-navy-100 shadow-card">
              <img
                src="/images/about-clinic-visual.webp"
                width="1200"
                height="900"
                loading="lazy"
                decoding="async"
                alt="Neurology diagnostic consultation room with illuminated brain scan films"
                className="aspect-4/3 size-full object-cover"
              />
            </div>
            <figcaption className="mt-4 flex items-center gap-2 text-xs font-medium text-navy-500">
              <MapPin className="size-3.5 text-brand-600" aria-hidden="true" />
              {doctor.clinic}, {doctor.city}. Portrait photo to be added with the doctor's written permission.
            </figcaption>
          </figure>

          <div className="mt-8 rounded-2xl border border-navy-100 bg-cream-50 p-6">
            <h3 className="font-display text-sm font-bold tracking-widest text-navy-800 uppercase">Practice</h3>
            <ul className="mt-4 space-y-3 text-sm text-navy-700">
              <li className="flex gap-2.5">
                <Stethoscope className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                {doctor.title}
              </li>
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                {doctor.address}
              </li>
              <li className="flex gap-2.5">
                <Award className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                Brain, spine and peripheral nerve consultations
              </li>
            </ul>
          </div>
        </Reveal>

        <div>
          <SectionTag tone="brand">Biography</SectionTag>
          <h2 id="bio-heading" className="mt-6 text-3xl font-bold sm:text-4xl">
            A measured approach to neurosurgical care
          </h2>

          <div className="mt-7 space-y-5">
            {biography.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={index * 0.08}>
                <p className="text-[17px] leading-relaxed text-navy-600">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {highlights.map((item) => {
                const Icon = highlightIcons[item.icon] ?? Users
                return (
                  <div key={item.title} className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-navy-800 text-white">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-sm font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-600">{item.text}</p>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-100 py-16 sm:py-20 lg:py-24" aria-labelledby="education-heading">
        <div className="container-page">
          <Reveal className="max-w-3xl">
            <SectionTag tone="navy" icon={GraduationCap}>
              Education &amp; qualifications
            </SectionTag>
            <h2 id="education-heading" className="mt-6 text-3xl font-bold sm:text-4xl">
              Training pathway
            </h2>
            <p className="mt-4 text-navy-600">
              Structure shown for the portfolio layout — institutions and dates are marked pending and must be
              replaced with the doctor's verified CV before publication.
            </p>
          </Reveal>

          <ol className="relative mt-14 space-y-10 border-l border-navy-200 pl-8 sm:pl-10">
            {education.map((item, index) => (
              <motion.li
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px 0px' }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="relative"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[2.6rem] flex size-9 items-center justify-center rounded-full border border-navy-200 bg-white text-navy-800 sm:-left-[3.1rem]"
                >
                  <GraduationCap className="size-4" aria-hidden="true" />
                </span>
                <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <div className="flex flex-wrap items-center gap-3">
                    <SectionTag tone="brand">{item.period}</SectionTag>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-brand-700">{item.institution}</p>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">{item.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20 lg:py-24" aria-labelledby="memberships-heading">
        <motion.div variants={stagger(0.12)} initial="hidden" whileInView="visible" viewport={viewOnce}>
          <motion.div variants={fadeUp} className="max-w-3xl">
            <SectionTag tone="navy" icon={Award}>
              Memberships &amp; career
            </SectionTag>
            <h2 id="memberships-heading" className="mt-6 text-3xl font-bold sm:text-4xl">
              Professional standing
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {memberships.map((item) => (
              <div
                key={item.title}
                className="group h-full rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-cream-100 text-navy-800 transition-colors duration-300 group-hover:bg-navy-800 group-hover:text-white">
                  <Award className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-base font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-navy-800 py-16 text-white sm:py-20" aria-labelledby="about-stats-heading">
        <div className="container-page">
          <motion.div variants={stagger(0.1)} initial="hidden" whileInView="visible" viewport={viewOnce}>
            <motion.h2 variants={fadeUp} id="about-stats-heading" className="text-2xl font-bold text-white sm:text-3xl">
              Practice in numbers
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} tone="dark" />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CtaBanner
        tag="Book a consultation"
        title="Talk through your symptoms with a neurosurgeon"
        text="Send a request with your preferred date, or call the clinic during working hours to arrange a review of your scans."
      />
    </>
  )
}
