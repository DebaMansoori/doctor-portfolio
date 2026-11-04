import { motion } from 'motion/react'
import { CalendarCheck, CalendarDays, Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import AppointmentForm from '../components/AppointmentForm'
import PageHeader from '../components/PageHeader'
import SectionTag from '../components/SectionTag'
import { doctor, workingHours } from '../data/doctor'
import { fadeUp, stagger, viewOnce } from '../lib/animations'

const infoItems = [
  {
    icon: MapPin,
    label: 'Clinic',
    value: doctor.address,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: doctor.phone,
    href: doctor.phoneHref,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Same number, message any time',
    href: doctor.whatsappHref,
  },
]

export default function Appointment() {
  return (
    <>
      <PageHeader
        tag="Appointment"
        icon={CalendarDays}
        title="Request a consultation"
        intro="Tell the clinic who you are, the best number to reach you and a preferred date. The team confirms the appointment slot by phone or WhatsApp."
      />

      <section className="container-page grid items-start gap-10 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:py-24">
        <motion.aside
          variants={stagger(0.11)}
          initial="hidden"
          whileInView="visible"
          viewport={viewOnce}
          className="lg:sticky lg:top-28"
          aria-label="Clinic contact details"
        >
          <motion.div variants={fadeUp} className="rounded-2xl border border-navy-100 bg-cream-50 p-7 shadow-card">
            <SectionTag tone="navy" icon={CalendarCheck}>
              Visit the clinic
            </SectionTag>

            <ul className="mt-7 space-y-5">
              {infoItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.label} className="flex gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-white">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold tracking-widest text-navy-500 uppercase">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel="noreferrer noopener"
                          className="mt-1 block text-[15px] font-semibold text-navy-800 hover:text-brand-700"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="mt-1 block text-[15px] font-semibold text-navy-800">{item.value}</span>
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 rounded-2xl border border-navy-100 bg-white p-7 shadow-card">
            <h2 className="flex items-center gap-2.5 font-display text-base font-bold">
              <Clock className="size-5 text-brand-600" aria-hidden="true" />
              Clinic hours
            </h2>
            <dl className="mt-5 space-y-3 text-sm">
              {workingHours.map((entry) => (
                <div key={entry.days} className="flex items-baseline justify-between gap-4 border-b border-navy-100 pb-3 last:border-0 last:pb-0">
                  <dt className="text-navy-600">{entry.days}</dt>
                  <dd className="font-semibold text-navy-800">{entry.hours}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs leading-relaxed text-navy-500">
              Appointment requests are answered during working hours. Emergency symptoms such as sudden weakness,
              seizures or loss of consciousness need hospital care immediately — do not wait for a reply.
            </p>
          </motion.div>
        </motion.aside>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewOnce}
          className="rounded-2xl border border-navy-100 bg-white p-7 shadow-card sm:p-9"
        >
          <SectionTag tone="brand">Appointment form</SectionTag>
          <h2 className="mt-6 text-2xl font-bold sm:text-3xl">Patient details</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-navy-600">
            Fields marked with <span className="font-semibold text-red-600">*</span> are required. This is a
            front-end demonstration — no data leaves your browser.
          </p>

          <div className="mt-9">
            <AppointmentForm />
          </div>
        </motion.div>
      </section>
    </>
  )
}
