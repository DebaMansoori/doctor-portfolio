import { motion } from 'motion/react'
import { ArrowUpRight, Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionTag from '../components/SectionTag'
import { FacebookMark, InstagramMark } from '../components/Icons'
import { doctor, workingHours } from '../data/doctor'
import { fadeUp, stagger, viewOnce } from '../lib/animations'

const mapsHref = 'https://www.google.com/maps/search/?api=1&query=Rifah+Medical+Complex+Kabul'

const cards = [
  {
    icon: MapPin,
    title: 'Clinic address',
    lines: [doctor.clinic, doctor.city],
    href: mapsHref,
    action: 'Open in Google Maps',
    external: true,
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: [doctor.phone],
    href: doctor.phoneHref,
    action: 'Call the clinic',
  },
  {
    icon: Mail,
    title: 'Email',
    lines: [doctor.email, 'Placeholder address — replace once the clinic confirms one'],
    href: doctor.emailHref,
    action: 'Send an email',
  },
]

const socials = [
  { label: doctor.social.facebook.label, href: doctor.social.facebook.href, Mark: FacebookMark },
  { label: doctor.social.instagram.label, href: doctor.social.instagram.href, Mark: InstagramMark },
]

export default function Contact() {
  return (
    <>
      <PageHeader
        tag="Contact"
        icon={Phone}
        title="Reach the clinic"
        intro={`Consultations take place at ${doctor.clinic} in ${doctor.city}. Call during working hours, or send an appointment request and the team will confirm a slot.`}
      />

      <section className="container-page py-16 sm:py-20 lg:py-24" aria-labelledby="contact-cards-heading">
        <motion.div variants={stagger(0.12)} initial="hidden" whileInView="visible" viewport={viewOnce}>
          <motion.h2 variants={fadeUp} id="contact-cards-heading" className="sr-only">
            Contact details
          </motion.h2>

          <motion.div variants={fadeUp} className="grid gap-6 md:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon
              return (
                <article
                  key={card.title}
                  className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-navy-800 text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-lg font-bold">{card.title}</h3>
                  <div className="mt-2.5 space-y-1 text-[15px] text-navy-600">
                    {card.lines.map((line, index) => (
                      <p key={line} className={index === 0 ? 'font-semibold text-navy-800' : 'text-sm'}>
                        {line}
                      </p>
                    ))}
                  </div>
                  <a
                    href={card.href}
                    target={card.external ? '_blank' : undefined}
                    rel={card.external ? 'noreferrer noopener' : undefined}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
                    aria-label={`${card.title}: ${card.action}`}
                  >
                    {card.action}
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </article>
              )
            })}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-navy-100 bg-cream-50 p-7">
              <h3 className="flex items-center gap-2.5 font-display text-lg font-bold">
                <Clock className="size-5 text-brand-600" aria-hidden="true" />
                Working hours
              </h3>
              <dl className="mt-6 space-y-3 text-sm">
                {workingHours.map((entry) => (
                  <div key={entry.days} className="flex items-baseline justify-between gap-4 border-b border-navy-100 pb-3 last:border-0 last:pb-0">
                    <dt className="text-navy-600">{entry.days}</dt>
                    <dd className="font-semibold text-navy-800">{entry.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl border border-navy-100 bg-white p-7 shadow-card">
              <h3 className="font-display text-lg font-bold">Social &amp; messaging</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-navy-600">
                {doctor.social.facebook.label} and {doctor.social.instagram.label} links below are placeholders —
                update them once the clinic publishes official pages.
              </p>
              <ul className="mt-6 flex flex-wrap gap-3">
                {socials.map(({ label, href, Mark }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={label}
                      className="flex items-center gap-2.5 rounded-full border border-navy-200 px-5 py-3 text-sm font-semibold text-navy-800 transition-colors hover:border-navy-400 hover:bg-navy-50"
                    >
                      <Mark className="size-4.5" />
                      {label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={doctor.whatsappHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-2.5 rounded-full bg-navy-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="container-page pb-16 sm:pb-20 lg:pb-24" aria-labelledby="map-heading">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewOnce}
          className="overflow-hidden rounded-[1.75rem] border border-navy-100 shadow-card"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-100 bg-cream-50 px-7 py-5">
            <h2 id="map-heading" className="font-display text-base font-bold">
              Clinic location
            </h2>
            <SectionTag tone="light">Map placeholder</SectionTag>
          </div>

          <div className="relative bg-navy-50">
            <div
              aria-hidden="true"
              className="absolute inset-0 [background-image:linear-gradient(to_right,#c3cfdf_1px,transparent_1px),linear-gradient(to_bottom,#c3cfdf_1px,transparent_1px)] [background-size:48px_48px] opacity-60"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 [background-image:radial-gradient(circle_at_30%_40%,#bfd4fe_0,transparent_45%),radial-gradient(circle_at_75%_70%,#e2e8f1_0,transparent_50%)]"
            />

            <div className="relative flex min-h-75 flex-col items-center justify-center gap-4 p-8 text-center">
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="flex size-14 items-center justify-center rounded-full bg-navy-800 text-white shadow-float"
              >
                <MapPin className="size-7" aria-hidden="true" />
              </motion.span>
              <p className="font-display text-lg font-bold">{doctor.address}</p>
              <p className="max-w-md text-sm text-navy-600">
                An embedded map will appear here once the exact pin coordinates are confirmed with the clinic.
              </p>
              <a
                href={mapsHref}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-1 inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-6 py-3 text-sm font-semibold text-navy-800 transition-colors hover:border-navy-400 hover:bg-navy-50"
              >
                Open directions
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}
