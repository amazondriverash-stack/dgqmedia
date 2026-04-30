import { motion } from 'framer-motion'
import { AlertCircle, ArrowRight, EyeOff, TrendingDown } from 'lucide-react'
import { useRef } from 'react'
import detectiveDuck from '../assets/1777378650.png'
import { useSectionParallax } from './Parallax'

const problems = [
  {
    icon: TrendingDown,
    category: 'Website',
    title: 'Lost Revenue',
    description:
      'People land on the site, hesitate for a second, and disappear because the offer, proof, and next step are not doing enough work.',
    impact: 'You are paying for attention that never becomes a call.',
  },
  {
    icon: EyeOff,
    category: 'Visibility',
    title: 'Invisible Online',
    description:
      'You might be great offline, but if Maps, search, and reviews are thin, local buyers do not even realize you are in the running.',
    impact: 'The market assumes louder competitors are better options.',
  },
  {
    icon: AlertCircle,
    category: 'Traffic',
    title: 'Wasted Traffic',
    description:
      'Ads, social, and referrals can send visits your way, but weak routing and no follow-up loop means high-intent traffic goes cold fast.',
    impact: 'Good demand leaks out before your team can close it.',
  },
]

const metrics = [
  { value: '3', label: 'Common leaks we usually find first' },
  { value: '7 days', label: 'To spot the fastest conversion fixes' },
  { value: '1 system', label: 'Website, visibility, and follow-up working together' },
]

export default function Problems() {
  const sectionRef = useRef<HTMLElement>(null)
  const { ySlow, yMedium, yFast } = useSectionParallax({ target: sectionRef, amplitude: 70 })

  return (
    <section
      ref={sectionRef}
      id="strategy"
      aria-labelledby="problems-title"
      className="relative overflow-hidden bg-brand-brown px-6 py-20 text-brand-cream md:px-12"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: ySlow }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(252,211,77,0.08),transparent_28%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          style={{ y: yMedium }}
          className="mb-7 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"
        >
          <div className="flex justify-center lg:justify-start">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/15 backdrop-blur">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-orange/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-brand-amber/15 blur-3xl" />
              <img
                src={detectiveDuck}
                alt="A duck detective inspecting leaks with a magnifying glass"
                className="mx-auto w-full max-w-[420px] scale-x-[-1] rounded-[22px] object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="max-w-md space-y-4 lg:pl-6">
            <p className="text-balance font-display text-2xl font-black leading-[1.05] tracking-tight text-brand-cream sm:text-3xl">
              The leaks are usually visible—you just need the right lens.
            </p>
          </div>
        </motion.div>

        <div className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <motion.div style={{ y: yMedium }} className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cream/60">
              Why growth stalls
            </p>
            <h2
              id="problems-title"
              className="max-w-3xl font-display text-4xl font-black tracking-tight text-brand-cream md:text-5xl"
            >
              Most local businesses do not have a lead problem.
              <span className="block text-brand-orange">They have a leakage problem.</span>
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-brand-cream/70">
              Traffic shows up, interest exists, and referrals happen. Growth slows down when the
              site, visibility, and follow-up flow are not connected tightly enough to turn intent
              into booked work.
            </p>
          </motion.div>

          <motion.div style={{ y: yMedium }} className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur"
              >
                <p className="text-2xl font-black text-brand-cream">{metric.value}</p>
                <p className="mt-1 text-sm leading-relaxed text-brand-cream/60">{metric.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div style={{ y: yMedium }} className="grid gap-6 md:grid-cols-3">
          {problems.map((problem, index) => (
            <motion.article
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.35 }}
              className="bg-white/6 group rounded-[28px] border border-white/10 p-8 shadow-2xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:bg-white/10"
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-orange">
                  {problem.category}
                </span>
                <problem.icon className="h-11 w-11 text-brand-orange" />
              </div>

              <h3 className="text-2xl font-black tracking-tight text-brand-cream">
                {problem.title}
              </h3>
              <p className="text-brand-cream/72 mt-4 text-base leading-relaxed">
                {problem.description}
              </p>

              <div className="border-white/8 mt-6 rounded-2xl border bg-black/10 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-cream/45">
                  Business impact
                </p>
                <p className="text-brand-cream/68 mt-2 text-sm leading-relaxed">{problem.impact}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          style={{ y: yFast }}
          className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[28px] border border-white/10 bg-white/5 px-6 py-6 md:flex-row md:items-center"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-cream/50">
              Next step
            </p>
            <p className="mt-2 max-w-2xl text-lg text-brand-cream/75">
              Once you know where the demand is leaking, the fixes become much more obvious.
            </p>
          </div>

          <a
            href="#solutions"
            className="inline-flex items-center gap-2 rounded-full bg-brand-cream px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-brown transition hover:bg-white"
          >
            See the fix
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
