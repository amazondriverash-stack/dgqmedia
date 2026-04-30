import { useEffect, useMemo, useRef } from 'react'
import { X } from 'lucide-react'
import { LINKS, googleFormEmbedUrl } from '../config/links'

type Props = {
  open: boolean
  onClose: () => void
  title?: string
}

export default function OnboardingFormModal({
  open,
  onClose,
  title = 'Client onboarding',
}: Props) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const embedUrl = useMemo(() => googleFormEmbedUrl(LINKS.onboardingForm), [])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    const t = window.setTimeout(() => closeButtonRef.current?.focus(), 0)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose, open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        aria-label="Close onboarding form"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl overflow-hidden rounded-[28px] bg-brand-cream shadow-2xl ring-1 ring-black/10">
        <div className="flex items-center justify-between gap-3 border-b border-black/10 bg-white/70 px-5 py-4 backdrop-blur">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-brown/55">
              Get started
            </p>
            <p className="truncate font-display text-lg font-black tracking-tight text-brand-brown">
              {title}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand-brown shadow-sm ring-1 ring-black/5 transition hover:bg-brand-orange/10 focus:outline-none focus:ring-2 focus:ring-brand-orange/50"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="h-[78vh] bg-white">
          <iframe
            title="DGQ onboarding form"
            src={embedUrl}
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  )
}

