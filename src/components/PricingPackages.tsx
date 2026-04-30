const whatsappNumber = '447544930009'
const whatsappMessage = "Hi DGQ Media — I'd like a quote for a website/brand package."

type PackageTier = {
  name: string
  priceFrom: string
  highlight?: string
  bullets: string[]
}

const tiers: PackageTier[] = [
  {
    name: 'Duckling Launch',
    priceFrom: '£995',
    bullets: [
      'Up to 5 pages',
      'Template-customised design',
      'Mobile responsive',
      'Basic SEO',
      'Standard support',
    ],
  },
  {
    name: 'Golden Goose Growth',
    priceFrom: '£1995',
    highlight: 'Best Value',
    bullets: [
      'Up to 10 pages',
      'Custom design & UI',
      'Advanced SEO & analytics',
      'Content management system',
      'E-commerce integration',
      'Premium support',
    ],
  },
  {
    name: 'Elite Empire',
    priceFrom: '£3995',
    bullets: [
      'Unlimited pages',
      'Bespoke design & branding',
      'Comprehensive strategy',
      'Full e-commerce & CRM',
      'High-performance hosting',
      'Dedicated account manager',
    ],
  },
]

function whatsappHref() {
  const text = encodeURIComponent(whatsappMessage)
  return `https://wa.me/${whatsappNumber}?text=${text}`
}

export default function PricingPackages() {
  return (
    <section
      aria-labelledby="packages-title"
      className="relative overflow-hidden bg-brand-brown px-6 py-20 text-brand-cream md:px-12"
    >
      <div className="pointer-events-none absolute inset-0 opacity-90 [background:radial-gradient(circle_at_20%_15%,rgba(249,115,22,0.26)_0%,transparent_46%),radial-gradient(circle_at_80%_20%,rgba(252,211,77,0.18)_0%,transparent_44%),radial-gradient(circle_at_60%_95%,rgba(0,0,0,0.45)_0%,transparent_52%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="h-px w-28 bg-gradient-to-r from-brand-orange/40 via-brand-amber to-brand-orange/40" />
            <h2
              id="packages-title"
              className="font-display text-3xl font-black uppercase tracking-tight text-brand-cream sm:text-4xl"
            >
              Premium Web &amp; Brand Packages
            </h2>
            <p className="max-w-2xl text-sm font-semibold uppercase tracking-[0.22em] text-brand-cream/70">
              Built for local businesses that want serious growth.
            </p>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brand-cream px-5 py-3 text-xs font-black uppercase tracking-[0.22em] text-brand-brown shadow-[6px_6px_0_0_rgba(0,0,0,1)] ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:bg-white"
            >
              Call / WhatsApp
            </a>
            <a
              href={`tel:+${whatsappNumber}`}
              className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.22em] text-brand-cream shadow-[6px_6px_0_0_rgba(0,0,0,0.8)] transition hover:bg-white/15"
            >
              Call
            </a>
          </div>
        </div>

        <div
          className="grid gap-6 md:grid-cols-3"
          role="group"
          aria-label="Premium web and brand packages"
        >
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={[
                'relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5',
                'shadow-[10px_12px_0_0_rgba(0,0,0,1)] ring-1 ring-black/10 backdrop-blur',
                tier.highlight ? 'md:-translate-y-2' : '',
              ].join(' ')}
            >
              <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.16)_0%,transparent_44%)]" />

              {tier.highlight ? (
                <div className="absolute left-1/2 top-4 -translate-x-1/2">
                  <span className="rounded-full bg-brand-orange px-4 py-1 text-[11px] font-black uppercase tracking-[0.26em] text-brand-brown shadow-[4px_4px_0_0_rgba(0,0,0,1)] ring-1 ring-black/10">
                    {tier.highlight}
                  </span>
                </div>
              ) : null}

              <div className="relative px-7 pb-8 pt-10">
                <h3 className="text-center font-display text-2xl font-black uppercase tracking-tight text-brand-cream">
                  {tier.name}
                </h3>

                <div className="mt-5 rounded-[18px] border border-black/10 bg-brand-cream px-5 py-4 text-brand-brown shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
                  <div className="flex items-end justify-between gap-3">
                    <span className="text-xs font-black uppercase tracking-[0.22em] text-brand-brown/70">
                      From
                    </span>
                    <span className="text-4xl font-black tracking-tight">{tier.priceFrom}</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-sm text-brand-cream/85">
                  {tier.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-amber"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 md:hidden">
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full rounded-full bg-brand-cream px-6 py-4 text-center text-xs font-black uppercase tracking-[0.22em] text-brand-brown shadow-[6px_6px_0_0_rgba(0,0,0,1)] ring-1 ring-black/10"
                  >
                    Call / WhatsApp
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 rounded-[28px] border border-white/10 bg-white/5 px-6 py-6 text-center shadow-[10px_12px_0_0_rgba(0,0,0,1)] ring-1 ring-black/10 backdrop-blur md:flex-row md:justify-between md:text-left">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-cream/75">
            All quotes are subject to final scope &amp; requirements. Contact for custom solutions.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noreferrer"
              className="w-full rounded-full bg-brand-cream px-6 py-4 text-center text-xs font-black uppercase tracking-[0.22em] text-brand-brown shadow-[6px_6px_0_0_rgba(0,0,0,1)] ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:bg-white sm:w-auto"
            >
              Call / WhatsApp
            </a>
            <a
              href={`tel:+${whatsappNumber}`}
              className="w-full rounded-full border border-white/15 bg-white/10 px-6 py-4 text-center text-xs font-black uppercase tracking-[0.22em] text-brand-cream shadow-[6px_6px_0_0_rgba(0,0,0,0.8)] transition hover:bg-white/15 sm:w-auto"
            >
              Call
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
