import { describe, expect, it } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import { doctor } from '../data/doctor'

const renderAt = (path) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)

describe('Routing', () => {
  it('renders the home page hero and stats', async () => {
    renderAt('/')
    expect(await screen.findByRole('heading', { level: 1, name: /expert brain .*kabul/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
    expect(screen.getByText('Specialized Services')).toBeInTheDocument()
  })

  it('renders every route with a level-1 heading', async () => {
    for (const path of ['/about', '/services', '/appointment', '/contact']) {
      const view = render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)
      expect(await within(view.container).findByRole('heading', { level: 1 })).toBeInTheDocument()
      view.unmount()
    }
  })

  it('falls back to a 404 page for unknown routes', async () => {
    renderAt('/neurology-not-found')
    expect(await screen.findByRole('heading', { name: /could not be found/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/')
  })
})

describe('Navbar', () => {
  it('highlights the active link and exposes the mobile menu', async () => {
    const user = userEvent.setup()
    renderAt('/services')

    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    const activeLink = within(nav).getByRole('link', { name: 'Services' })
    expect(activeLink).toHaveAttribute('aria-current', 'page')

    await user.click(within(nav).getByRole('button', { name: /open menu/i }))
    const dialog = await screen.findByRole('dialog', { name: /site menu/i })
    expect(within(dialog).getByRole('link', { name: /contact/i })).toBeInTheDocument()

    await user.keyboard('{Escape}')
    // AnimatePresence keeps the panel mounted until its exit animation finishes.
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(within(nav).getByRole('button', { name: /open menu/i })).toHaveAttribute('aria-expanded', 'false')
  })

  it('keeps the clinic phone number reachable in the footer', async () => {
    renderAt('/')
    const footer = await screen.findByRole('contentinfo')
    expect(within(footer).getByRole('link', { name: doctor.phone })).toHaveAttribute('href', doctor.phoneHref)
  })
})
