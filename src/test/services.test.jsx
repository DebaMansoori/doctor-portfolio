import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import { processSteps, services } from '../data/services'

describe('services data', () => {
  it('defines the four required consultation services', () => {
    expect(services).toHaveLength(4)
    expect(services.map((service) => service.title)).toEqual([
      'Brain Surgery Consultation',
      'Spine Surgery Consultation',
      'Nerve Disorder Assessment',
      'Neurosurgical Evaluation',
    ])
  })

  it('gives every service a unique id, index, tag and icon component', () => {
    const ids = services.map((service) => service.id)
    expect(new Set(ids).size).toBe(ids.length)
    services.forEach((service) => {
      // Lucide v1 icons are forwardRef objects rather than plain functions.
      expect(typeof service.icon).toMatch(/^(function|object)$/)
      expect(service.index).toMatch(/^\d\d$/)
      expect(service.tag).toBeTruthy()
      expect(service.description.length).toBeGreaterThan(40)
    })
  })

  it('lists the three-step patient journey', () => {
    expect(processSteps.map((step) => step.title)).toEqual(['Consultation', 'Diagnosis', 'Treatment Plan'])
  })
})

describe('<ServiceCard />', () => {
  const renderCard = (service = services[0]) =>
    render(
      <MemoryRouter>
        <ServiceCard service={service} learnMoreTo="/appointment" />
      </MemoryRouter>,
    )

  it('renders the tag, title, description and points', () => {
    renderCard()

    expect(screen.getByText('Brain')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Brain Surgery Consultation' })).toBeInTheDocument()
    expect(screen.getByText(/Review of brain imaging/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Learn more: Brain Surgery Consultation' })).toHaveAttribute(
      'href',
      '/appointment',
    )
  })

  it('keeps the decorative index number out of the accessibility tree', () => {
    const { container } = renderCard(services[3])

    expect(screen.getByRole('heading', { name: 'Neurosurgical Evaluation' })).toBeInTheDocument()
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
  })
})
