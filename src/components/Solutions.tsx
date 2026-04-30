import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import InteractiveGraph from './InteractiveGraph'
import growthDuck from '../assets/1777378829.png'
import { useSectionParallax } from './Parallax'

const solutions = [
  {
    title: 'Local SEO',
    description: 'Top 3 map pack visibility in your city',
    metric: '+54% YOY traffic',
  },
  {
    title: 'Conversion UX',
    description: '21% more booked calls with cleaner flows',
    metric: 'TAP TO FOCUS',
  },
  {
    title: 'Core Web Vitals',
    description: 'Sub-2 second performance tuning sprint',
    metric: 'TAP TO FOCUS',
  },
  {
    title: 'Reviews Engine',
    description: 'Automated review requests with local schema',
    metric: 'TAP TO FOCUS',
  },
]

export default function Solutions() {
  const [activeSolution, setActiveSolution] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const { ySlow, yMedium, yFast } = useSectionParallax({ target: sectionRef, amplitude: 70 })

  return (
    <section
      ref={sectionRef}
      id="solutions"
      aria-labelledby="solutions-title"
      className="relative overflow-hidden bg-[#f5f1e9] py-20"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: ySlow }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.10),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(252,211,77,0.10),transparent_30%)]"
      />
      <div className="container relative mx-auto max-w-7xl px-4">
        <motion.div
          style={{ y: yFast }}
          className="mb-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"
        >
          <div className="max-w-md lg:pr-6">
            <h2
              id="solutions-title"
              className="mb-4 font-display text-4xl font-black tracking-tight text-brown-900"
            >
              Solutions That Compound
            </h2>
            <p className="text-balance text-brown-600">
              Every tactic feeds the next one. The cards below stay tactile, while the graph panel
              shows the system working in real time.
            </p>
          </div>

          <div className="relative hidden items-center justify-center lg:flex">
            <div className="relative w-full max-w-[560px] overflow-hidden rounded-[28px] bg-white/70 p-3 shadow-2xl shadow-brand-orange/15 ring-1 ring-black/5 backdrop-blur">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-orange/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-brand-amber/15 blur-3xl" />
              <img
                src={growthDuck}
                alt="A duck presenting an upward growth chart"
                className="mx-auto w-full rounded-[22px] object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            style={{ y: yMedium }}
            aria-label="Highlighted marketing solutions"
            className="grid grid-cols-2 gap-4"
            role="group"
          >
            {solutions.map((solution, index) => (
              <motion.button
                type="button"
                key={solution.title}
                onClick={() => setActiveSolution(index)}
                whileHover={{ scale: 1.02 }}
                aria-pressed={activeSolution === index}
                aria-label={`${solution.title}: ${solution.description}`}
                className={[
                  'cursor-pointer rounded-2xl p-6 transition-all',
                  activeSolution === index
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-brown-800 hover:bg-beige',
                ].join(' ')}
              >
                <h3 className="mb-2 text-lg font-bold">{solution.title}</h3>
                <p
                  className={[
                    'mb-3 text-sm',
                    activeSolution === index ? 'text-primary-100' : 'text-brown-500',
                  ].join(' ')}
                >
                  {solution.description}
                </p>
                <span
                  className={[
                    'text-xs font-semibold',
                    activeSolution === index ? 'text-white' : 'text-primary-600',
                  ].join(' ')}
                >
                  {solution.metric}
                </span>
              </motion.button>
            ))}
          </motion.div>

          <motion.div style={{ y: yFast }}>
            <InteractiveGraph />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
