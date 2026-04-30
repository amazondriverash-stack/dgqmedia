import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Loader2, MailCheck } from 'lucide-react'

type SubmitState = 'idle' | 'sending' | 'sent' | 'error'

type CalendarCell = {
  key: string
  label: number
  inMonth: boolean
  date: Date
}

function pad2(value: number) {
  return String(value).padStart(2, '0')
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1)
}

function formatMonthLabel(date: Date) {
  return date.toLocaleString(undefined, { month: 'long', year: 'numeric' })
}

function toISODate(date: Date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`
}

function buildCalendarCells(monthStart: Date) {
  // Build a 6-week grid starting on Monday.
  const first = startOfMonth(monthStart)
  const monthIndex = first.getMonth()
  const firstDayJs = first.getDay() // 0 Sun ... 6 Sat
  const mondayIndex = (firstDayJs + 6) % 7 // 0 Mon ... 6 Sun
  const gridStart = new Date(first.getFullYear(), first.getMonth(), 1 - mondayIndex)

  const cells: CalendarCell[] = []
  for (let i = 0; i < 42; i += 1) {
    const d = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i)
    const inMonth = d.getMonth() === monthIndex
    cells.push({
      key: toISODate(d),
      label: d.getDate(),
      inMonth,
      date: d,
    })
  }
  return cells
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default function BookingCalendar() {
  const today = useMemo(() => startOfDay(new Date()), [])
  const [viewMonth, setViewMonth] = useState<Date>(() => startOfMonth(today))
  const timeSlots = useMemo(() => ['09:30', '11:00', '13:30', '15:00', '16:30'], [])
  const monthLabel = useMemo(() => formatMonthLabel(viewMonth), [viewMonth])

  const calendarCells = useMemo<CalendarCell[]>(() => buildCalendarCells(viewMonth), [viewMonth])

  const [selectedDate, setSelectedDate] = useState<Date>(() => today)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [goals, setGoals] = useState('')
  const [companyWebsite, setCompanyWebsite] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const canSubmit = useMemo(() => {
    if (submitState === 'sending') return false
    if (!selectedTime) return false
    if (name.trim().length < 2) return false
    if (!isValidEmail(email.trim())) return false
    return true
  }, [email, name, selectedTime, submitState])

  const selectedLabel = useMemo(() => {
    const day = selectedDate.getDate()
    const label = formatMonthLabel(selectedDate)
    return `${label} ${day}`
  }, [selectedDate])

  async function onSubmit() {
    if (!canSubmit) return
    setSubmitState('sending')
    setErrorMessage(null)

    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      const res = await fetch('/api/request-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          goals: goals.trim() || null,
          selectedDateISO: toISODate(selectedDate),
          selectedTime,
          timezone: tz,
          companyWebsite: companyWebsite.trim() || null,
        }),
      })

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(payload?.error || `Request failed (${res.status})`)
      }

      setSubmitState('sent')
    } catch (err) {
      setSubmitState('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"
    >
      <section className="rounded-2xl bg-white/80 p-6 shadow-xl shadow-brand-orange/10 ring-1 ring-black/5 backdrop-blur">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-brown/60">
              Book a slot
            </p>
            <p className="mt-1 text-2xl font-black tracking-tight text-brand-brown">{monthLabel}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={`View previous month before ${monthLabel}`}
              onClick={() => setViewMonth((m) => addMonths(m, -1))}
              className="rounded-xl bg-white/70 p-2 text-brand-brown/70 shadow-sm ring-1 ring-black/5 transition hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Jump to today"
              onClick={() => {
                setViewMonth(startOfMonth(today))
                setSelectedDate(today)
                setSelectedTime(null)
                setSubmitState('idle')
              }}
              className="rounded-xl bg-brand-brown px-3 py-2 text-sm font-semibold text-brand-cream shadow-sm ring-1 ring-black/5 transition hover:bg-brand-brown/95"
            >
              Today
            </button>
            <button
              type="button"
              aria-label={`View next month after ${monthLabel}`}
              onClick={() => setViewMonth((m) => addMonths(m, 1))}
              className="rounded-xl bg-white/70 p-2 text-brand-brown/70 shadow-sm ring-1 ring-black/5 transition hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          aria-label={`Select a date in ${monthLabel}`}
          className="mt-6 grid grid-cols-7 gap-1"
          role="group"
        >
          {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
            <div
              key={day}
              aria-hidden="true"
              className="pb-2 text-center text-[11px] font-semibold text-brand-brown/40"
            >
              {day}
            </div>
          ))}

          {calendarCells.map((cell) => {
            const isSelected = toISODate(selectedDate) === cell.key
            const isToday = toISODate(today) === cell.key
            const isPast = startOfDay(cell.date).getTime() < today.getTime()
            const isDisabled = !cell.inMonth || isPast
            return (
              <button
                key={cell.key}
                type="button"
                onClick={() => {
                  if (isDisabled) return
                  setSelectedDate(cell.date)
                  setSelectedTime(null)
                  setSubmitState('idle')
                }}
                disabled={isDisabled}
                aria-label={`Select ${cell.inMonth ? monthLabel : 'Outside month'} ${cell.label}${isPast ? ', unavailable' : ''}`}
                aria-pressed={isSelected}
                className={[
                  'aspect-square rounded-xl text-sm font-semibold transition',
                  'flex items-center justify-center',
                  isDisabled
                    ? 'text-brand-brown/25'
                    : 'text-brand-brown/70 hover:bg-brand-orange/10',
                  isToday && !isSelected ? 'ring-2 ring-brand-orange/60' : '',
                  isSelected ? 'bg-brand-brown text-brand-cream shadow-sm' : '',
                ].join(' ')}
              >
                {cell.label}
              </button>
            )
          })}
        </div>
      </section>

      <section className="rounded-2xl bg-white/80 p-6 shadow-xl shadow-brand-orange/10 ring-1 ring-black/5 backdrop-blur">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-brown/60">
            Choose a time
          </p>
          <p className="mt-1 text-lg font-black tracking-tight text-brand-brown">
            Pick a day first
          </p>
          <p className="mt-1 text-sm text-brand-brown/60">{selectedLabel}</p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {timeSlots.map((time) => {
            const isSelected = selectedTime === time
            return (
              <button
                key={time}
                type="button"
                onClick={() => {
                  setSelectedTime(time)
                  setSubmitState('idle')
                }}
                aria-label={`Select ${time} on ${selectedLabel}`}
                aria-pressed={isSelected}
                className={[
                  'rounded-xl px-3 py-2 text-sm font-semibold transition',
                  isSelected
                    ? 'bg-brand-orange text-brand-brown shadow-sm'
                    : 'bg-white/70 text-brand-brown/70 ring-1 ring-black/5 hover:bg-brand-orange/10',
                ].join(' ')}
              >
                {time}
              </button>
            )
          })}
        </div>

        <div className="mt-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-1 text-sm font-semibold text-brand-brown/70">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-brown/50">
                Your name
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-white/70 px-3 py-2 text-sm font-medium text-brand-brown ring-1 ring-black/5 placeholder:text-brand-brown/35 focus:outline-none focus:ring-2 focus:ring-brand-orange/50"
                placeholder="Your name"
                autoComplete="name"
              />
            </label>
            <label className="space-y-1 text-sm font-semibold text-brand-brown/70">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-brown/50">
                Email
              </span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-white/70 px-3 py-2 text-sm font-medium text-brand-brown ring-1 ring-black/5 placeholder:text-brand-brown/35 focus:outline-none focus:ring-2 focus:ring-brand-orange/50"
                placeholder="Email"
                type="email"
                autoComplete="email"
              />
            </label>
          </div>

          <label className="space-y-1 text-sm font-semibold text-brand-brown/70">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-brown/50">
              What do you want to achieve?{' '}
              <span className="font-semibold normal-case tracking-normal text-brand-brown/40">
                (optional)
              </span>
            </span>
            <textarea
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              className="min-h-[92px] w-full resize-none rounded-xl bg-white/70 px-3 py-2 text-sm font-medium text-brand-brown ring-1 ring-black/5 placeholder:text-brand-brown/35 focus:outline-none focus:ring-2 focus:ring-brand-orange/50"
              placeholder="What do you want to achieve? (optional)"
            />
          </label>
        </div>

        <div className="mt-5">
          <input
            tabIndex={-1}
            autoComplete="off"
            value={companyWebsite}
            onChange={(e) => setCompanyWebsite(e.target.value)}
            className="hidden"
            aria-hidden="true"
            name="companyWebsite"
          />

          <button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit}
            aria-label={
              canSubmit
                ? `Request appointment for ${selectedLabel} at ${selectedTime ?? ''}`.trim()
                : 'Request appointment after choosing a date/time and entering your details'
            }
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-brown px-5 py-4 text-sm font-black uppercase tracking-[0.22em] text-brand-cream shadow-sm ring-1 ring-black/5 transition hover:bg-brand-brown/95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitState === 'sending' ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
            {submitState === 'sent' ? <MailCheck className="h-5 w-5" /> : null}
            <span>
              {submitState === 'sent'
                ? 'Request sent'
                : submitState === 'sending'
                  ? 'Sending...'
                  : 'Request appointment'}
            </span>
          </button>

          {submitState === 'error' && errorMessage ? (
            <p role="status" className="mt-3 text-sm font-medium text-red-700">
              {errorMessage}
            </p>
          ) : null}

          {submitState === 'sent' ? (
            <p role="status" className="mt-3 text-sm font-medium text-brand-brown/70">
              Got it. We’ll reach out to confirm the time.
            </p>
          ) : null}
        </div>
      </section>
    </motion.div>
  )
}
