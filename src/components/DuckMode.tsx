import { motion } from 'framer-motion'
import { ArrowRight, Eye, Repeat2, Search, Wrench } from 'lucide-react'
import { useRef } from 'react'
import { useSectionParallax } from './Parallax'

const steps = [
  {
    step: '01 / 04',
    title: 'Observe',
    description: 'Baseline the funnel, watch real behavior, and capture intent signals.',
    deliverable: 'Snapshot + recordings + lead flow map',
    icon: Eye,
  },
  {
    step: '02 / 04',
    title: 'Diagnose',
    description: 'Find the top leakage points that keep interest from becoming booked work.',
    deliverable: 'Leak map + fix-first priorities',
    icon: Search,
  },
  {
    step: '03 / 04',
    title: 'Build',
    description: 'Ship the highest-leverage improvements across offer, UX, and visibility.',
    deliverable: 'Quick wins + the next set of compounding fixes',
    icon: Wrench,
  },
  {
    step: '04 / 04',
    title: 'Loop',
    description: 'Turn every win into the next one: reviews, retargeting, and follow-up loops.',
    deliverable: 'Visibility + follow-up system that compounds',
    icon: Repeat2,
  },
]

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

export default function DuckMode() {
  const sectionRef = useRef<HTMLElement>(null)
  const { ySlow, yMedium, yFast } = useSectionParallax({ target: sectionRef, amplitude: 70 })

  return (
    <section
      ref={sectionRef}
      aria-labelledby="duckmode-title"
      className="relative overflow-hidden bg-[#fbfaf7] px-6 py-20 md:px-12"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: ySlow }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(252,211,77,0.10),transparent_30%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <motion.div style={{ y: yFast }} className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-brown/60">
              DGQ Method
            </p>
            <h2
              id="duckmode-title"
              className="font-display text-4xl font-black tracking-tight text-brand-brown md:text-5xl"
            >
              Enter Duck Mode
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-brand-brown/70">
              A simple loop we use to turn local demand into booked calls: observe what is
              happening, diagnose the leaks, ship the fixes, then build the compounding follow-up
              system.
            </p>
          </motion.div>

          <motion.div
            style={{ y: yMedium }}
            className="rounded-[28px] border border-black/5 bg-brand-cream/50 p-6 shadow-xl shadow-brand-orange/10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-brown/55">
              In 7 days you get
            </p>
            <ul className="mt-4 space-y-3 text-brand-brown/75">
              <li className="flex items-start gap-3">
                <span
                  className="mt-1 inline-flex h-2 w-2 rounded-full bg-brand-orange"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed">
                  A clear leak map of what is blocking calls right now.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="mt-1 inline-flex h-2 w-2 rounded-full bg-brand-orange"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed">
                  A fix-first plan with the few changes that move the needle fastest.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="mt-1 inline-flex h-2 w-2 rounded-full bg-brand-orange"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed">
                  A compounding loop so each win fuels the next one.
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          style={{ y: yFast }}
          className="grid gap-4 md:grid-cols-2"
        >
          {steps.map((step) => (
            <motion.article
              key={step.title}
              variants={cardVariants}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="group rounded-[28px] border border-black/5 bg-white p-7 shadow-xl shadow-brand-orange/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-orange/15"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-brown/45">
                    {step.step}
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-brand-brown">
                    {step.title}
                  </h3>
                </div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange ring-1 ring-brand-orange/20">
                  <step.icon className="h-6 w-6" />
                </div>
              </div>

              <p className="text-base leading-relaxed text-brand-brown/70">{step.description}</p>

              <div className="mt-5 rounded-2xl border border-black/5 bg-brand-cream/40 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-brown/45">
                  Deliverable
                </p>
                <p className="mt-2 text-sm leading-relaxed text-brand-brown/70">
                  {step.deliverable}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          style={{ y: yMedium }}
          className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[28px] border border-black/5 bg-brand-brown px-6 py-6 text-brand-cream shadow-2xl shadow-black/10 md:flex-row md:items-center"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-cream/55">
              Ready to run the loop?
            </p>
            <p className="mt-2 max-w-2xl text-lg text-brand-cream/80">
              Book a call and we’ll map your leaks and pick the first fixes worth shipping.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#booking"
              className="inline-flex items-center gap-2 rounded-full bg-brand-cream px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-brown transition hover:bg-white"
            >
              Book a strategy call
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#solutions"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-cream ring-1 ring-white/15 transition hover:bg-white/15"
            >
              See solutions
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
