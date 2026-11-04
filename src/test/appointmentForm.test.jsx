import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppointmentForm, { toDateInputValue, validateAppointment } from '../components/AppointmentForm'

const inDays = (days) => toDateInputValue(new Date(Date.now() + days * 86_400_000))

const validValues = {
  name: 'Ahmad Wali',
  phone: '+93 78 765 4751',
  date: inDays(7),
  method: 'Call',
  message: '',
}

describe('validateAppointment', () => {
  it('accepts a well-formed request with no message', () => {
    expect(validateAppointment(validValues)).toEqual({})
  })

  it('rejects a past date', () => {
    expect(validateAppointment({ ...validValues, date: '2020-01-01' }).date).toMatch(/past/i)
  })

  it('rejects numbers that are not phone digits', () => {
    expect(validateAppointment({ ...validValues, phone: 'call me later' }).phone).toBeTruthy()
  })

  it('requires a contact method', () => {
    expect(validateAppointment({ ...validValues, method: '' }).method).toMatch(/reach you/i)
  })
})

describe('<AppointmentForm />', () => {
  it('shows an inline error for every empty required field on submit', async () => {
    const user = userEvent.setup()
    render(<AppointmentForm />)

    await user.click(screen.getByRole('button', { name: /send request/i }))

    expect(await screen.findByText(/enter the patient name/i)).toBeInTheDocument()
    expect(screen.getByText(/enter a contact number/i)).toBeInTheDocument()
    expect(screen.getByText(/choose a preferred date/i)).toBeInTheDocument()
    expect(screen.getByText(/reach you/i)).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('marks invalid inputs with aria-invalid', async () => {
    const user = userEvent.setup()
    render(<AppointmentForm />)
    const nameInput = screen.getByLabelText(/patient name/i)

    await user.type(nameInput, 'A')
    await user.tab()

    expect(nameInput).toHaveAttribute('aria-invalid', 'true')
    expect(await screen.findByText(/at least 2 characters/i)).toBeInTheDocument()
  })

  it('rejects a date in the past', () => {
    render(<AppointmentForm />)
    const dateInput = screen.getByLabelText(/preferred date/i)

    fireEvent.change(dateInput, { target: { value: '2019-06-01' } })
    fireEvent.blur(dateInput)

    expect(screen.getByText(/cannot be in the past/i)).toBeInTheDocument()
  })

  it('resets the form and shows the demo confirmation when the request is valid', async () => {
    const user = userEvent.setup()
    render(<AppointmentForm />)

    await user.type(screen.getByLabelText(/patient name/i), 'Ahmad Wali')
    await user.type(screen.getByLabelText(/phone number/i), '+93 78 765 4751')
    fireEvent.change(screen.getByLabelText(/preferred date/i), { target: { value: inDays(3) } })
    await user.click(screen.getByRole('radio', { name: /whatsapp/i }))
    await user.type(screen.getByLabelText(/message/i), 'I have an MRI report to review.')
    await user.click(screen.getByRole('button', { name: /send request/i }))

    const status = await screen.findByRole('status')
    expect(status).toHaveTextContent(/request received/i)
    expect(status).toHaveTextContent(/Ahmad Wali/i)
    expect(screen.getByLabelText(/patient name/i)).toHaveValue('')
    expect(screen.getByLabelText(/message/i)).toHaveValue('')
  })

  it('dismisses the confirmation', async () => {
    const user = userEvent.setup()
    render(<AppointmentForm />)

    await user.type(screen.getByLabelText(/patient name/i), 'Sima Rahimi')
    await user.type(screen.getByLabelText(/phone number/i), '0787654751')
    fireEvent.change(screen.getByLabelText(/preferred date/i), { target: { value: inDays(1) } })
    await user.click(screen.getByRole('radio', { name: /call/i }))
    await user.click(screen.getByRole('button', { name: /send request/i }))

    await screen.findByRole('status')
    await user.click(screen.getByRole('button', { name: /dismiss confirmation/i }))

    // AnimatePresence keeps the panel mounted until its exit animation finishes.
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument())
  })
})
