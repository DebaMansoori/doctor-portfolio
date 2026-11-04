import { Component } from 'react'
import { Stethoscope } from 'lucide-react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Unhandled UI error:', error, info?.componentStack)
  }

  reset = () => this.setState({ hasError: false })

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <section className="container-page py-24 text-center">
        <div className="mx-auto max-w-xl rounded-2xl border border-navy-100 bg-cream-50 p-10 shadow-card">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-navy-800 text-white">
            <Stethoscope className="size-6" aria-hidden="true" />
          </span>
          <h2 className="mt-6 text-2xl font-bold">Something went wrong</h2>
          <p className="mt-3 text-navy-600">
            This part of the site could not be displayed. Reload the page or return to the home page to
            continue.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={this.reset}
              className="rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-700"
            >
              Try again
            </button>
            <a
              href="/"
              className="rounded-full border border-navy-200 px-6 py-3 text-sm font-semibold text-navy-800 transition hover:border-navy-400"
            >
              Back to home
            </a>
          </div>
        </div>
      </section>
    )
  }
}
