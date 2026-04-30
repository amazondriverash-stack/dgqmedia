import { useEffect, useRef, useState } from 'react'
import duck from '../assets/company_logo_hero.png'

const QuackButton = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [showBubble, setShowBubble] = useState(false)

  useEffect(() => {
    if (!showBubble) return
    const t = window.setTimeout(() => setShowBubble(false), 1400)
    return () => window.clearTimeout(t)
  }, [showBubble])

  const playQuack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
    setShowBubble(true)
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {showBubble ? (
          <div
            className={[
              'pointer-events-none absolute -top-24 right-0',
              'origin-bottom-right animate-[pop_180ms_ease-out]',
            ].join(' ')}
            aria-hidden="true"
          >
            <div
              className={[
                'relative max-w-[220px] -rotate-2',
                'rounded-[24px] border-[3px] border-black bg-brand-cream px-4 py-3',
                'shadow-[6px_6px_0_0_rgba(0,0,0,1)]',
                // halftone-ish dots
                'bg-[radial-gradient(circle_at_8px_8px,rgba(69,26,3,0.14)_2px,transparent_2.2px)] bg-[length:14px_14px]',
              ].join(' ')}
            >
              <div className="font-display text-base font-black uppercase tracking-tight text-brand-brown">
                Quack!
              </div>
              <div className="mt-1 text-xs font-semibold text-brand-brown/70">
                You found the secret button.
              </div>

              <div
                className={[
                  'absolute -bottom-[10px] right-6 h-6 w-6 rotate-45',
                  'border-b-[3px] border-r-[3px] border-black bg-brand-cream',
                  'bg-[radial-gradient(circle_at_6px_6px,rgba(69,26,3,0.14)_2px,transparent_2.2px)] bg-[length:14px_14px]',
                ].join(' ')}
              />

              <div className="pointer-events-none absolute -left-4 -top-4 select-none rounded-full bg-brand-orange px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-brand-brown shadow-[3px_3px_0_0_rgba(0,0,0,1)] ring-[3px] ring-black">
                POW
              </div>
            </div>
          </div>
        ) : null}

        <button
          onClick={playQuack}
          className={[
            'group relative transform rounded-full border-[3px] border-black',
            'bg-brand-orange px-6 py-4 text-lg font-black uppercase tracking-[0.14em] text-brand-brown',
            'shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition',
            'hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[5px_7px_0_0_rgba(0,0,0,1)]',
            'active:translate-x-0.5 active:translate-y-0.5 active:shadow-[4px_4px_0_0_rgba(0,0,0,1)]',
            'focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-amber/60',
          ].join(' ')}
          aria-label="Quack button"
        >
          <span className="absolute inset-0 rounded-full opacity-70 [background:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55)_0%,transparent_42%)]" />
          <span className="relative inline-flex items-center gap-3">
            <img
              src={duck}
              alt=""
              className="h-8 w-8 rounded-xl object-cover ring-[3px] ring-black"
              aria-hidden="true"
            />
            <span>Quack</span>
          </span>
        </button>
      </div>
      <audio
        ref={audioRef}
        src="https://cdn.freesound.org/previews/418/418509_5632532-lq.mp3"
        preload="auto"
      />
    </>
  )
}

export default QuackButton
