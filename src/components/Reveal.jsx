import { motion } from 'motion/react'
import { fadeUp, viewOnce } from '../lib/animations'

/** Scroll-reveal wrapper: fades and lifts its children into view, once per page. */
export default function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const MotionTag = motion[as] ?? motion.div
  return (
    <MotionTag
      className={className}
      variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay } } }}
      initial="hidden"
      whileInView="visible"
      viewport={viewOnce}
    >
      {children}
    </MotionTag>
  )
}
