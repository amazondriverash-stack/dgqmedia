import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useSectionParallax } from './Parallax'

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const { ySlow, yMedium, scaleLift } = useSectionParallax({ target: sectionRef, amplitude: 60 })

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cta-title"
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-20 md:px-12"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: ySlow }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.25),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(252,211,77,0.10),transparent_32%)]"
      />
      <div className="relative mx-auto max-w-4xl">
        <motion.div style={{ y: yMedium, scale: scaleLift }} className="text-center">
          <h2
            id="cta-title"
            className="mb-6 font-display text-4xl font-black text-white md:text-5xl"
          >
            Ready to Transform Your Brand?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400">
            Let's talk about your goals. We'll show you how strategic creativity and performance
            marketing can drive real growth for your business.
          </p>
          <motion.div
            style={{ y: yMedium }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <a
              href="#booking"
              className="group relative inline-flex overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 px-8 py-4 font-bold uppercase tracking-widest text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/50"
            >
              <span className="relative z-10">Book a Call</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </a>
            <a
              href="#solutions"
              className="rounded-lg border-2 border-slate-400 px-8 py-4 font-bold uppercase tracking-widest text-slate-400 transition-colors duration-300 hover:border-white hover:text-white"
            >
              See Our Work
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
