import { Resend } from 'resend'

type RequestBody = {
  name?: unknown
  email?: unknown
  goals?: unknown
  selectedDateISO?: unknown
  selectedTime?: unknown
  timezone?: unknown
  companyWebsite?: unknown
}

type ServerlessRequest = {
  method?: string
  body?: unknown
}

type ServerlessResponse = {
  status: (code: number) => ServerlessResponse
  json: (payload: unknown) => void
}

function asString(value: unknown) {
  return typeof value === 'string' ? value : null
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function parseISODate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const [y, m, d] = value.split('-').map((v) => Number(v))
  if (!y || !m || !d) return null
  const date = new Date(y, m - 1, d)
  if (Number.isNaN(date.getTime())) return null
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null
  return date
}

export default async function handler(req: ServerlessRequest, res: ServerlessResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const resendKey = process.env.RESEND_API_KEY
  const toEmail = process.env.BOOKING_TO_EMAIL || 'ducksgquack@gmail.com'
  const fromEmail = process.env.BOOKING_FROM_EMAIL || 'DGQ Booking <booking@resend.dev>'

  if (!resendKey) {
    res.status(500).json({ error: 'Missing RESEND_API_KEY' })
    return
  }
  // BOOKING_TO_EMAIL is optional; defaults to ducksgquack@gmail.com.

  const body = (() => {
    const candidate = req.body
    if (!candidate) return null
    if (typeof candidate === 'string') {
      try {
        return JSON.parse(candidate) as RequestBody
      } catch {
        return null
      }
    }
    return candidate as RequestBody
  })()

  if (!body) {
    res.status(400).json({ error: 'Invalid JSON body' })
    return
  }

  const name = asString(body.name)?.trim() || ''
  const email = asString(body.email)?.trim() || ''
  const goals = asString(body.goals)?.trim() || ''
  const selectedDateISO = asString(body.selectedDateISO)?.trim() || ''
  const selectedTime = asString(body.selectedTime)?.trim() || ''
  const timezone = asString(body.timezone)?.trim() || ''
  const honeypot = asString(body.companyWebsite)?.trim() || ''

  if (honeypot) {
    res.status(200).json({ ok: true })
    return
  }

  if (name.length < 2 || name.length > 120) {
    res.status(400).json({ error: 'Please provide your name.' })
    return
  }
  if (!isValidEmail(email) || email.length > 254) {
    res.status(400).json({ error: 'Please provide a valid email.' })
    return
  }
  const parsedDate = parseISODate(selectedDateISO)
  if (!parsedDate) {
    res.status(400).json({ error: 'Please choose a valid date.' })
    return
  }
  const today = new Date()
  const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const startSelected = new Date(
    parsedDate.getFullYear(),
    parsedDate.getMonth(),
    parsedDate.getDate(),
  )
  if (startSelected.getTime() < startToday.getTime()) {
    res.status(400).json({ error: 'Please choose a future date.' })
    return
  }
  const oneYearFromToday = new Date(
    startToday.getFullYear() + 1,
    startToday.getMonth(),
    startToday.getDate(),
  )
  if (startSelected.getTime() > oneYearFromToday.getTime()) {
    res.status(400).json({ error: 'Please choose a date within the next year.' })
    return
  }
  if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(selectedTime)) {
    res.status(400).json({ error: 'Please choose a valid time.' })
    return
  }
  if (goals.length > 2000) {
    res.status(400).json({ error: 'Goals is too long.' })
    return
  }
  if (timezone.length > 80) {
    res.status(400).json({ error: 'Timezone is invalid.' })
    return
  }

  const resend = new Resend(resendKey)

  const subject = `New strategy call request: ${selectedDateISO} ${selectedTime}`
  const text = [
    'New appointment request',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Requested: ${selectedDateISO} at ${selectedTime}`,
    timezone ? `Timezone: ${timezone}` : null,
    goals ? '' : null,
    goals ? `Goals:\n${goals}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject,
    text,
  })

  if (error) {
    res.status(502).json({ error: 'Failed to send email.' })
    return
  }

  res.status(200).json({ ok: true })
}
