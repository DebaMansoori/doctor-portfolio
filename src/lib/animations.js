export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export function stagger(children = 0.12, delay = 0.1) {
  return {
    hidden: { opacity: 1 },
    visible: { hidden: {}, visible: { transition: { staggerChildren: children, delayChildren: delay } } },
  }
}

export const viewOnce = { once: true, margin: '-80px 0px' }
