import { motion } from 'motion/react'
import { fadeUp, stagger } from '../lib/animations'
import SectionTag from './SectionTag'

/** Compact animated header used at the top of every inner page. */
export default function PageHeader({ tag, title, intro, icon, actions, children }) {
  return (
    <section className="border-b border-navy-100 bg-cream-100">
      <motion.div
        className="container-page py-16 sm:py-20 lg:py-24"
        variants={stagger()}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp}>
          <SectionTag tone="brand" icon={icon}>
            {tag}
          </SectionTag>
        </motion.div>

        <motion.h1 variants={fadeUp} className="mt-6 max-w-4xl text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-6xl">
          {title}
        </motion.h1>

        {intro ? (
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-600">
            {intro}
          </motion.p>
        ) : null}

        {actions ? (
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
            {actions}
          </motion.div>
        ) : null}

        {children}
      </motion.div>
    </section>
  )
}
