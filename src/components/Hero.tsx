import { useMemo, useRef } from 'react'
import BookingCalendar from './BookingCalendar'
import duck from '../assets/company_logo_hero.png'
import { Handshake, MapPin, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSectionParallax } from './Parallax'

type Props = {
  onStartOnboarding?: () => void
}

export default function Hero({ onStartOnboarding }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const { ySlow, yMedium, yFast, scaleLift } = useSectionParallax({
    target: sectionRef,
    amplitude: 110,
  })
  const wavePath = useMemo(
    () =>
      'M0,120 C120,160 220,70 340,105 C460,140 560,220 720,170 C880,120 980,40 1120,80 C1260,120 1380,180 1520,150',
    [],
  )

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative overflow-hidden px-6 pb-16 pt-10 md:px-12 md:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-cream via-[#FFF7E1] to-white" />
      <motion.div
        style={{ y: ySlow }}
        className="hero-grain pointer-events-none absolute inset-0"
      />
      <motion.div
        style={{ y: yMedium }}
        className="pointer-events-none absolute -top-10 left-0 right-0"
      >
        <svg
          aria-hidden="true"
          className="h-44 w-full opacity-25"
          viewBox="0 0 1520 220"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d={wavePath}
            stroke="currentColor"
            strokeWidth="10"
            className="text-brand-orange/40"
          />
          <path
            d={wavePath}
            stroke="currentColor"
            strokeWidth="2"
            className="text-brand-brown/20"
            transform="translate(0 18)"
          />
        </svg>
      </motion.div>

      <div className="relative mx-auto max-w-6xl">
        <header className="flex items-center justify-between">
          <a
            href="#main"
            className="flex items-center rounded-full bg-white/60 px-4 py-2.5 shadow-sm ring-1 ring-brand-orange/10 backdrop-blur"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/5">
              <img src={duck} alt="DGQ logo" className="h-9 w-9 rounded-lg object-cover" />
            </span>
          </a>

          <nav aria-label="Primary" className="flex items-center gap-2">
            <a
              href="#strategy"
              className="rounded-full bg-white/60 px-4 py-2 text-sm font-semibold text-brand-brown shadow-sm ring-1 ring-brand-orange/10 backdrop-blur transition hover:bg-white/80"
            >
              Strategy
            </a>
            <button
              type="button"
              onClick={onStartOnboarding}
              className="rounded-full bg-brand-orange px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-brand-brown shadow-sm ring-1 ring-black/5 transition hover:bg-brand-amber focus:outline-none focus:ring-2 focus:ring-brand-orange/50"
            >
              Start
            </button>
            <a
              href="#booking"
              className="rounded-full bg-brand-brown px-4 py-2 text-sm font-semibold text-brand-cream shadow-sm ring-1 ring-black/5 transition hover:bg-brand-brown/95"
            >
              Book
            </a>
          </nav>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <motion.div style={{ y: yFast }} className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-brown/60">
              DGQ Growth Partner
            </p>

            <h1
              id="hero-title"
              className="text-balance font-display text-5xl font-[850] leading-[0.9] tracking-tight text-brand-brown sm:text-6xl md:text-7xl"
            >
              MORE LEADS.
              <br />
              LESS NOISE<span className="text-brand-orange">.</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-brand-brown/70">
              Playful professionalism for local businesses that want serious growth.
            </p>

            <div id="booking" className="pt-3">
              <BookingCalendar />
            </div>
          </motion.div>

          <div className="lg:pt-10">
            <motion.div
              style={{ y: yMedium, scale: scaleLift }}
              className="group relative mx-auto max-w-[420px] rounded-[28px] bg-white/70 p-4 shadow-2xl shadow-brand-orange/20 ring-1 ring-black/5 backdrop-blur"
            >
              <img
                src={duck}
                alt="DGQ duck mascot"
                className="mx-auto aspect-square w-[90%] rounded-[22px] object-cover"
              />

              <div className="pointer-events-none absolute left-8 top-10 origin-bottom-left scale-95 opacity-0 transition duration-200 ease-out group-hover:scale-100 group-hover:opacity-100">
                <div
                  className={[
                    'relative -rotate-2 overflow-hidden rounded-[22px]',
                    'border-[3px] border-black bg-brand-cream px-4 py-2',
                    'shadow-[5px_5px_0_0_rgba(0,0,0,1)]',
                    'bg-[radial-gradient(circle_at_8px_8px,rgba(69,26,3,0.14)_2px,transparent_2.2px)] bg-[length:14px_14px]',
                  ].join(' ')}
                >
                  <span className="font-display text-sm font-black uppercase tracking-[0.22em] text-brand-brown">
                    QUACK!
                  </span>

                  <span
                    className={[
                      'absolute -left-[10px] top-1/2 h-6 w-6 -translate-y-1/2 rotate-45',
                      'border-b-[3px] border-l-[3px] border-black bg-brand-cream',
                      'bg-[radial-gradient(circle_at_6px_6px,rgba(69,26,3,0.14)_2px,transparent_2.2px)] bg-[length:14px_14px]',
                    ].join(' ')}
                    aria-hidden="true"
                  />

                  <span
                    className={[
                      'pointer-events-none absolute -right-5 -top-4 select-none',
                      'rounded-full bg-brand-orange px-3 py-1',
                      'text-[10px] font-black uppercase tracking-[0.22em] text-brand-brown',
                      'shadow-[3px_3px_0_0_rgba(0,0,0,1)] ring-[3px] ring-black',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    POW
                  </span>
                </div>
              </div>

              <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-brand-orange/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-brand-amber/20 blur-3xl" />
            </motion.div>

            <section aria-labelledby="who-we-are-title" className="mx-auto mt-7 max-w-[420px]">
              <div className="mb-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-brown/55">
                  Who we are
                </p>
                <h2
                  id="who-we-are-title"
                  className="text-lg font-black tracking-tight text-brand-brown"
                >
                  Local partners. Service first. Focused delivery.
                </h2>
              </div>

              <div className="grid gap-3">
                <article
                  aria-label="We’re a local business"
                  className="rounded-[22px] bg-white/70 p-4 shadow-xl shadow-brand-orange/10 ring-1 ring-black/5 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/80"
                >
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange ring-1 ring-brand-orange/20">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-black text-brand-brown">We’re a local business</p>
                      <p className="text-sm leading-relaxed text-brand-brown/70">
                        Built for local companies—because we’re one too.
                      </p>
                    </div>
                  </div>
                </article>

                <article
                  aria-label="Customer service first"
                  className="rounded-[22px] bg-white/70 p-4 shadow-xl shadow-brand-orange/10 ring-1 ring-black/5 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/80"
                >
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange ring-1 ring-brand-orange/20">
                      <Handshake className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-black text-brand-brown">Customer service first</p>
                      <p className="text-sm leading-relaxed text-brand-brown/70">
                        Fast replies, clear next steps, no ghosting.
                      </p>
                    </div>
                  </div>
                </article>

                <article
                  aria-label="We stay focused"
                  className="rounded-[22px] bg-white/70 p-4 shadow-xl shadow-brand-orange/10 ring-1 ring-black/5 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/80"
                >
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange ring-1 ring-brand-orange/20">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-black text-brand-brown">We stay focused</p>
                      <p className="text-sm leading-relaxed text-brand-brown/70">
                        We don’t bite off more than we can chew—limited clients, better work.
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}
