type RequestBody = {
  name?: unknown
  email?: unknown
  goals?: unknown
  selectedDateISO?: unknown
  selectedTime?: unknown
  timezone?: unknown
  companyWebsite?: unknown
}

function json(payload: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(payload), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...(init?.headers ?? {}),
    },
    ...init,
  })
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

async function sendResendEmail({
  apiKey,
  from,
  to,
  replyTo,
  subject,
  text,
}: {
  apiKey: string
  from: string
  to: string
  replyTo: string
  subject: string
  text: string
}) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: replyTo,
      subject,
      text,
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Resend error (${res.status}): ${body}`)
  }
}

export const onRequestOptions: PagesFunction = async () => {
  // Useful if the browser ever preflights; same-origin requests won't need it.
  return new Response(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'content-type',
      'access-control-max-age': '86400',
    },
  })
}

export const onRequestPost: PagesFunction<{
  RESEND_API_KEY?: string
  BOOKING_TO_EMAIL?: string
  BOOKING_FROM_EMAIL?: string
}> = async ({ request, env }) => {
  const resendKey = env.RESEND_API_KEY
  const toEmail = env.BOOKING_TO_EMAIL || 'ducksgquack@gmail.com'
  const fromEmail = env.BOOKING_FROM_EMAIL || 'DGQ Booking <booking@resend.dev>'

  if (!resendKey) {
    return json({ error: 'Missing RESEND_API_KEY' }, { status: 500 })
  }

  let body: RequestBody | null = null
  try {
    body = (await request.json()) as RequestBody
  } catch {
    body = null
  }

  if (!body) {
    return json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const name = asString(body.name)?.trim() || ''
  const email = asString(body.email)?.trim() || ''
  const goals = asString(body.goals)?.trim() || ''
  const selectedDateISO = asString(body.selectedDateISO)?.trim() || ''
  const selectedTime = asString(body.selectedTime)?.trim() || ''
  const timezone = asString(body.timezone)?.trim() || ''
  const honeypot = asString(body.companyWebsite)?.trim() || ''

  if (honeypot) {
    return json({ ok: true }, { status: 200 })
  }

  if (name.length < 2 || name.length > 120) {
    return json({ error: 'Please provide your name.' }, { status: 400 })
  }
  if (!isValidEmail(email) || email.length > 254) {
    return json({ error: 'Please provide a valid email.' }, { status: 400 })
  }
  const parsedDate = parseISODate(selectedDateISO)
  if (!parsedDate) {
    return json({ error: 'Please choose a valid date.' }, { status: 400 })
  }
  const today = new Date()
  const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const startSelected = new Date(
    parsedDate.getFullYear(),
    parsedDate.getMonth(),
    parsedDate.getDate(),
  )
  if (startSelected.getTime() < startToday.getTime()) {
    return json({ error: 'Please choose a future date.' }, { status: 400 })
  }
  const oneYearFromToday = new Date(
    startToday.getFullYear() + 1,
    startToday.getMonth(),
    startToday.getDate(),
  )
  if (startSelected.getTime() > oneYearFromToday.getTime()) {
    return json({ error: 'Please choose a date within the next year.' }, { status: 400 })
  }
  if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(selectedTime)) {
    return json({ error: 'Please choose a valid time.' }, { status: 400 })
  }
  if (goals.length > 2000) {
    return json({ error: 'Goals is too long.' }, { status: 400 })
  }
  if (timezone.length > 80) {
    return json({ error: 'Timezone is invalid.' }, { status: 400 })
  }

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

  try {
    await sendResendEmail({
      apiKey: resendKey,
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject,
      text,
    })
  } catch {
    return json({ error: 'Failed to send email.' }, { status: 502 })
  }

  return json({ ok: true }, { status: 200 })
}
