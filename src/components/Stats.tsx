import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useSectionParallax } from './Parallax'

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const { ySlow, yMedium, yFast } = useSectionParallax({ target: sectionRef, amplitude: 110 })
  const stats = [
    {
      value: '200+',
      label: 'Brands Transformed',
      description: 'Across industries and markets',
    },
    {
      value: '340%',
      label: 'Average ROI',
      description: 'Within the first 12 months',
    },
    {
      value: '£950M',
      label: 'Client Revenue Generated',
      description: 'Through our campaigns',
    },
    {
      value: '15+',
      label: 'Years of Experience',
      description: 'In strategic marketing',
    },
  ]

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white px-6 py-20 md:px-12">
      <motion.div
        aria-hidden="true"
        style={{ y: ySlow }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.09),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(252,211,77,0.10),transparent_30%)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <motion.div style={{ y: yFast }} className="mb-16 text-center">
          <h2 className="mb-4 font-display text-4xl font-black md:text-5xl">By The Numbers</h2>
          <p className="mx-auto max-w-2xl text-lg text-brand-brown/70">
            Real results from real brands working with us.
          </p>
        </motion.div>

        <motion.div style={{ y: yMedium }} className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-[28px] border border-black/5 bg-brand-cream/60 p-8 text-center shadow-xl shadow-brand-orange/10 transition duration-300 hover:shadow-2xl hover:shadow-brand-orange/15"
            >
              <div className="mb-2 text-5xl font-black text-brand-orange">{stat.value}</div>
              <h3 className="mb-2 text-lg font-black text-brand-brown">{stat.label}</h3>
              <p className="text-sm text-brand-brown/65">{stat.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
