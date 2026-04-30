import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useSectionParallax } from './Parallax'

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const { ySlow, yMedium, yFast } = useSectionParallax({ target: sectionRef, amplitude: 65 })
  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description:
        'We dive deep into your business, market, and audience to uncover opportunities.',
      eyebrow: 'Baseline',
    },
    {
      number: '02',
      title: 'Strategy',
      description:
        'We craft a clear roadmap that aligns with your goals and competitive positioning.',
      eyebrow: 'Plan',
    },
    {
      number: '03',
      title: 'Execution',
      description: 'We create and launch campaigns across channels with precision and creativity.',
      eyebrow: 'Ship',
    },
    {
      number: '04',
      title: 'Optimization',
      description: 'We monitor, measure, and continuously improve results for maximum ROI.',
      eyebrow: 'Compound',
    },
  ]

  return (
    <section
      ref={sectionRef}
      aria-labelledby="process-title"
      className="relative overflow-hidden bg-white px-6 py-20 md:px-12"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: ySlow }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.10),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(252,211,77,0.08),transparent_30%)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="relative mb-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <motion.div style={{ y: yFast }} className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-brown/60">
              How we work
            </p>
            <h2
              id="process-title"
              className="font-display text-4xl font-black tracking-tight text-brand-brown md:text-5xl"
            >
              Our Process
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-brand-brown/70">
              A tight operating rhythm that turns strategy into shipped improvements—and keeps
              compounding the results.
            </p>
          </motion.div>

          <motion.div
            style={{ y: yMedium }}
            className="rounded-[28px] border border-black/5 bg-brand-cream/50 p-6 shadow-xl shadow-brand-orange/10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-brown/55">
              What to expect
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-black/5 bg-white/70 px-4 py-4">
                <p className="text-2xl font-black text-brand-brown">1–2</p>
                <p className="mt-1 text-sm text-brand-brown/65">weekly shipping cycles</p>
              </div>
              <div className="rounded-2xl border border-black/5 bg-white/70 px-4 py-4">
                <p className="text-2xl font-black text-brand-brown">Clear</p>
                <p className="mt-1 text-sm text-brand-brown/65">priorities and owners</p>
              </div>
              <div className="rounded-2xl border border-black/5 bg-white/70 px-4 py-4">
                <p className="text-2xl font-black text-brand-brown">Fast</p>
                <p className="mt-1 text-sm text-brand-brown/65">feedback + iteration</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.ol style={{ y: yFast }} className="relative grid gap-6 lg:gap-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-brand-orange/40 via-brand-orange/10 to-transparent lg:block"
          />

          {steps.map((step) => (
            <li key={step.number} className="relative lg:pl-16">
              <div className="absolute left-0 top-6 hidden lg:block">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
                  <span className="text-xs font-black tracking-widest text-brand-brown">
                    {step.number}
                  </span>
                </div>
              </div>

              <div className="rounded-[28px] border border-black/5 bg-white p-7 shadow-xl shadow-brand-orange/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-brand-orange/15">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-brown/45">
                      {step.eyebrow}
                    </p>
                    <h3 className="text-2xl font-black tracking-tight text-brand-brown">
                      {step.title}
                    </h3>
                  </div>

                  <span className="rounded-full border border-brand-orange/25 bg-brand-orange/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-orange">
                    Step {step.number}
                  </span>
                </div>

                <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-brown/70">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
