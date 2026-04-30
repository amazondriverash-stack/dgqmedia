type TickerItem = {
  id: string
  text: string
}

const items: TickerItem[] = [
  { id: 'fuel-1', text: '48-hour audit → clear growth plan' },
  { id: 'fuel-2', text: 'Local SEO + reviews engine (map pack focus)' },
  { id: 'fuel-3', text: 'Conversion UX fixes that boost booked calls' },
  { id: 'fuel-4', text: 'Core Web Vitals tuning (speed = leads)' },
]

export default function TopTicker() {
  const track = [...items, ...items]

  return (
    <div
      className="sticky top-0 z-[60] border-b border-black/10 bg-brand-brown text-brand-cream"
      aria-label="Information ticker"
    >
      <div className="relative overflow-hidden">
        <div
          className={[
            'ticker-track flex w-max items-center gap-6 py-2',
            'text-xs font-black uppercase tracking-[0.22em]',
          ].join(' ')}
        >
          {track.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="flex items-center gap-6">
              <span className="opacity-95">{item.text}</span>
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-amber" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
