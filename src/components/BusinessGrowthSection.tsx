import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import businessGrowthIllustration from '../assets/1777020889c27f.png'
import { useSectionParallax } from './Parallax'

const BusinessGrowthSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { ySlow, yMedium, yFast, scaleLift } = useSectionParallax({
    target: sectionRef,
    amplitude: 70,
  })

  return (
    <section
      ref={sectionRef}
      aria-labelledby="growth-title"
      className="relative overflow-hidden bg-cream px-6 py-20 md:px-12"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: ySlow }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.14),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(252,211,77,0.12),transparent_30%)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-10 lg:flex-row">
          {/* Text Content Area */}
          <motion.div
            style={{ y: yMedium }}
            className="space-y-6 text-center lg:w-1/2 lg:text-left"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-brown/60">
              Growth partner
            </p>
            <h2
              id="growth-title"
              className="font-display text-4xl font-black tracking-tight text-brand-brown md:text-5xl"
            >
              Let’s grow your business<span className="text-brand-orange">.</span>
            </h2>
            <p className="text-lg leading-relaxed text-brand-brown/70">
              Strategy, creative, and performance that turns local attention into booked
              calls—without bloated retainers or endless meetings.
            </p>

            <motion.div
              style={{ y: yFast }}
              className="flex flex-col justify-center gap-3 pt-2 sm:flex-row lg:justify-start"
            >
              <a
                href="#booking"
                className="inline-flex items-center justify-center rounded-full bg-brand-brown px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-cream shadow-sm ring-1 ring-black/5 transition hover:bg-brand-brown/95"
              >
                Book a call
              </a>
              <a
                href="#solutions"
                className="inline-flex items-center justify-center rounded-full bg-white/70 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-brown ring-1 ring-black/5 transition hover:bg-white"
              >
                See solutions
              </a>
            </motion.div>
          </motion.div>

          {/* Image Area */}
          <motion.div
            style={{ y: yMedium, scale: scaleLift }}
            className="flex justify-center lg:w-1/2"
          >
            <img
              src={businessGrowthIllustration}
              alt="Business growth illustration"
              className="w-full max-w-md transform rounded-[28px] shadow-2xl shadow-brand-orange/20 ring-1 ring-black/5 transition duration-500 hover:scale-[1.02] lg:max-w-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BusinessGrowthSection
