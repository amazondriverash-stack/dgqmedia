import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = {
  calls: [
    { month: 'Week 1', value: 11 },
    { month: 'Week 2', value: 13 },
    { month: 'Week 3', value: 16 },
    { month: 'Week 4', value: 21 },
  ],
  traffic: [
    { month: 'Week 1', value: 10 },
    { month: 'Week 2', value: 24 },
    { month: 'Week 3', value: 31 },
    { month: 'Week 4', value: 49 },
  ],
  roi: [
    { month: 'Week 1', value: 2 },
    { month: 'Week 2', value: 3 },
    { month: 'Week 3', value: 4 },
    { month: 'Week 4', value: 7 },
  ],
}

export default function InteractiveGraph() {
  const [activeTab, setActiveTab] = useState<'calls' | 'traffic' | 'roi'>('calls')

  const tabs = [
    { key: 'calls', label: 'Calls', badge: '+21% booked calls' },
    { key: 'traffic', label: 'Traffic', badge: '+42% qualified visits' },
    { key: 'roi', label: 'ROI', badge: '+315% revenue' },
  ] as const

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-[28px] bg-white/80 p-6 shadow-2xl shadow-brand-orange/15 ring-1 ring-black/5 backdrop-blur"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-orange/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-brand-amber/15 blur-3xl" />

      <div className="relative mb-6 flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-brown/55">
            Interactive graph
          </p>
          <h3 className="font-display text-xl font-black tracking-tight text-brand-brown">
            Watch the system compound
          </h3>
        </div>
        <span className="shrink-0 rounded-full bg-brand-brown px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-brand-cream shadow-sm ring-1 ring-black/5">
          {tabs.find((t) => t.key === activeTab)?.badge}
        </span>
      </div>

      <div className="relative mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={[
              'rounded-full px-4 py-2 text-sm font-bold ring-1 ring-black/5 transition-all',
              activeTab === tab.key
                ? 'bg-brand-orange text-brand-brown shadow-sm'
                : 'bg-white/70 text-brand-brown/70 hover:bg-brand-orange/10',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative h-64 rounded-[22px] bg-white/70 ring-1 ring-black/5">
        <div className="pointer-events-none absolute inset-0 rounded-[22px] opacity-60 [background-image:linear-gradient(to_right,rgba(69,26,3,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(69,26,3,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data[activeTab]}>
            <defs>
              <linearGradient id="dgqLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="60%" stopColor="#f59a2e" />
                <stop offset="100%" stopColor="#fcd34d" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 6" stroke="rgba(69,26,3,0.14)" />
            <XAxis
              dataKey="month"
              stroke="rgba(69,26,3,0.45)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="rgba(69,26,3,0.45)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={28}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '16px',
                boxShadow: '0 18px 40px -18px rgba(249, 115, 22, 0.35)',
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#dgqLine)"
              strokeWidth={3}
              dot={{ fill: '#f59a2e', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="relative mt-6 grid grid-cols-3 gap-4 border-t border-black/5 pt-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-brown/45">
            Peak
          </p>
          <p className="text-lg font-black text-brand-brown">+49%</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-brown/45">
            Average
          </p>
          <p className="text-lg font-black text-brand-brown">+31%</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-brown/45">
            Trend
          </p>
          <p className="text-lg font-black text-brand-orange">↗ Upward</p>
        </div>
      </div>
    </motion.div>
  )
}
