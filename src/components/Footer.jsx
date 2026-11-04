import { Link } from 'react-router-dom'
import { ArrowUp, Brain, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { doctor, navLinks, workingHours } from '../data/doctor'
import { services } from '../data/services'
import { FacebookMark, InstagramMark } from './Icons'

const socials = [
  { label: doctor.social.facebook.label, href: doctor.social.facebook.href, Mark: FacebookMark },
  { label: doctor.social.instagram.label, href: doctor.social.instagram.href, Mark: InstagramMark },
]

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-navy-200">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="lg:pr-6">
            <Link to="/" className="flex items-center gap-3" aria-label={`${doctor.shortName} — home`}>
              <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-navy-800">
                <Brain className="size-6" aria-hidden="true" />
              </span>
              <span className="font-display text-lg font-bold text-white">{doctor.shortName}</span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-navy-300">{doctor.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-navy-400">
              Outpatient consultations, imaging review and written treatment plans at {doctor.clinic}.
            </p>
            <ul className="mt-6 flex gap-3">
              {socials.map(({ label, href, Mark }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <Mark className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="font-display text-sm font-bold tracking-widest text-white uppercase">Quick Links</h2>
            <ul className="mt-6 space-y-3.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-navy-300 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="font-display text-sm font-bold tracking-widest text-white uppercase">Services</h2>
            <ul className="mt-6 space-y-3.5 text-sm">
              {services.map((service) => (
                <li key={service.id}>
                  <Link to="/services" className="text-navy-300 transition-colors hover:text-white">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-bold tracking-widest text-white uppercase">Contact</h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="size-4 shrink-0 text-brand-400" aria-hidden="true" />
                <span className="text-navy-300">{doctor.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="size-4 shrink-0 text-brand-400" aria-hidden="true" />
                <a href={doctor.phoneHref} className="font-semibold text-white hover:underline">
                  {doctor.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="size-4 shrink-0 text-brand-400" aria-hidden="true" />
                <a href={doctor.emailHref} className="text-navy-300 hover:text-white">
                  {doctor.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="size-4 shrink-0 text-brand-400" aria-hidden="true" />
                <span className="text-navy-300">
                  {workingHours[0].days}
                  <span className="block">{workingHours[0].hours}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {doctor.name}. All rights reserved.
          </p>
          <p className="text-navy-400">
            Student portfolio demo — statistics, email and social links are placeholders, not medical advice.
          </p>
          <a href="#main-content" className="inline-flex items-center gap-2 font-semibold text-navy-300 hover:text-white">
            Back to top
            <ArrowUp className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
