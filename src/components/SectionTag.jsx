export default function SectionTag({ children, icon: Icon, tone = 'navy', className = '' }) {
  const tones = {
    navy: 'bg-navy-800 text-white',
    brand: 'bg-brand-50 text-brand-700 ring-1 ring-brand-200',
    light: 'bg-white text-navy-700 ring-1 ring-navy-200',
    onDark: 'bg-white/10 text-white ring-1 ring-white/20',
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase ${tones[tone]} ${className}`}
    >
      {Icon ? <Icon className="size-3.5" aria-hidden="true" /> : null}
      {children}
    </span>
  )
}
