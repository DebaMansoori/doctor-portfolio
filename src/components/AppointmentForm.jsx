import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarDays, CircleCheck, Info, Phone, Send, X } from 'lucide-react'
import { buttonPrimary } from '../lib/styles'

const emptyForm = { name: '', phone: '', date: '', method: '', message: '' }

const PHONE_PATTERN = /^\+?[\d][\d\s().-]{6,19}$/

/** Local YYYY-MM-DD, immune to the UTC shift in toISOString(). */
export function toDateInputValue(date) {
  const offset = date.getTimezoneOffset() * 60_000
  return new Date(date.getTime() - offset).toISOString().slice(0, 10)
}

function buildLimits() {
  const today = new Date()
  const max = new Date(today)
  max.setFullYear(today.getFullYear() + 1)
  return { min: toDateInputValue(today), max: toDateInputValue(max) }
}

export function validateAppointment(values) {
  const errors = {}
  const name = values.name.trim()
  const phone = values.phone.trim()
  const { min, max } = buildLimits()

  if (!name) errors.name = 'Please enter the patient name.'
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.'
  else if (name.length > 60) errors.name = 'Name must be 60 characters or fewer.'

  if (!phone) errors.phone = 'Please enter a contact number.'
  else if (!PHONE_PATTERN.test(phone)) errors.phone = 'Use digits only, e.g. +93 78 765 4751.'
  else {
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 9 || digits.length > 15) errors.phone = 'Number should contain 9 to 15 digits.'
  }

  if (!values.date) errors.date = 'Please choose a preferred date.'
  else if (values.date < min) errors.date = 'The preferred date cannot be in the past.'
  else if (values.date > max) errors.date = 'Please choose a date within the next 12 months.'

  if (!values.method) errors.method = 'Choose how the clinic should reach you.'

  if (values.message.length > 500) errors.message = 'Message must be 500 characters or fewer.'

  return errors
}

const fieldClass = (hasError) =>
  `w-full rounded-xl border bg-white px-4 py-3.5 text-[15px] text-navy-800 transition-colors placeholder:text-navy-300 focus:outline-none ${
    hasError ? 'border-red-500 focus:border-red-600' : 'border-navy-200 focus:border-brand-600'
  }`

function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-2 flex items-start gap-1.5 text-sm font-medium text-red-600">
      <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  )
}

export default function AppointmentForm() {
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [request, setRequest] = useState(null)
  const formRef = useRef(null)
  const limits = buildLimits()

  const update = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validateField = (event) => {
    const { name } = event.target
    setErrors((prev) => ({ ...prev, [name]: validateAppointment(values)[name] }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validateAppointment(values)
    setErrors(nextErrors)

    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      setRequest(null)
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setRequest({
      name: values.name.trim(),
      phone: values.phone.trim(),
      date: values.date,
      method: values.method,
    })
    setValues(emptyForm)
  }

  return (
    <div className="relative">
      <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-navy-800">
              Patient name <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={update}
              onBlur={validateField}
              aria-required="true"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
              placeholder="e.g. Ahmad Wali"
              className={fieldClass(Boolean(errors.name))}
            />
            <FieldError id="name-error" message={errors.name} />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-navy-800">
              Phone number <span className="text-red-600">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={update}
              onBlur={validateField}
              aria-required="true"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              placeholder="+93 78 765 4751"
              className={fieldClass(Boolean(errors.phone))}
            />
            <FieldError id="phone-error" message={errors.phone} />
          </div>

          <div>
            <label htmlFor="date" className="mb-2 block text-sm font-semibold text-navy-800">
              Preferred date <span className="text-red-600">*</span>
            </label>
            <input
              id="date"
              name="date"
              type="date"
              min={limits.min}
              max={limits.max}
              value={values.date}
              onChange={update}
              onBlur={validateField}
              aria-required="true"
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? 'date-error' : undefined}
              className={fieldClass(Boolean(errors.date))}
            />
            <FieldError id="date-error" message={errors.date} />
          </div>
        </div>

        <fieldset
          aria-required="true"
          aria-invalid={Boolean(errors.method)}
          aria-describedby={errors.method ? 'method-error' : undefined}
        >
          <legend className="mb-3 text-sm font-semibold text-navy-800">
            How should the clinic contact you? <span className="text-red-600">*</span>
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {['Call', 'WhatsApp'].map((option) => {
              const active = values.method === option
              return (
                <label
                  key={option}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-sm font-semibold transition-colors ${
                    active ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-navy-200 text-navy-700 hover:border-navy-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="method"
                    value={option}
                    checked={active}
                    onChange={update}
                    className="size-4 accent-brand-600"
                  />
                  {option === 'Call' ? (
                    <Phone className="size-4" aria-hidden="true" />
                  ) : (
                    <CalendarDays className="size-4" aria-hidden="true" />
                  )}
                  {option}
                </label>
              )
            })}
          </div>
          <FieldError id="method-error" message={errors.method} />
        </fieldset>

        <div>
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <label htmlFor="message" className="block text-sm font-semibold text-navy-800">
              Message <span className="font-normal text-navy-500">(optional)</span>
            </label>
            <span className={`text-xs font-medium ${values.message.length > 500 ? 'text-red-600' : 'text-navy-400'}`}>
              {values.message.length}/500
            </span>
          </div>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={values.message}
            onChange={update}
            onBlur={validateField}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            placeholder="Briefly describe the symptoms or scans you would like reviewed."
            className={`${fieldClass(Boolean(errors.message))} resize-y`}
          />
          <FieldError id="message-error" message={errors.message} />
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={buttonPrimary}
          >
            <Send className="size-4" aria-hidden="true" />
            Send Request
          </motion.button>
          <p className="text-xs leading-relaxed text-navy-500">
            Front-end demo only — nothing is sent, stored or transmitted.
          </p>
        </div>
      </form>

      <AnimatePresence mode="wait">
        {request ? (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="mt-7 rounded-2xl border border-brand-200 bg-brand-50 p-6"
          >
            <div className="flex items-start gap-4">
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.12, type: 'spring', stiffness: 400, damping: 18 }}
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white"
              >
                <CircleCheck className="size-6" aria-hidden="true" />
              </motion.span>

              <div className="pr-8">
                <h3 className="text-lg font-bold text-navy-800">Request received</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-700">
                  Thank you, {request.name}. Your preferred date is{' '}
                  <strong className="font-semibold">{request.date}</strong> and the clinic will reach you by{' '}
                  <strong className="font-semibold">{request.method.toLowerCase()}</strong> on {request.phone}.
                </p>
                <p className="mt-3 text-xs font-medium text-navy-500">
                  This is a demonstration — no appointment has actually been booked.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setRequest(null)}
                aria-label="Dismiss confirmation"
                className="ml-auto flex size-9 shrink-0 items-center justify-center rounded-full text-navy-500 transition-colors hover:bg-white hover:text-navy-800"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
