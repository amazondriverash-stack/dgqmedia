import type { RefObject } from 'react'
import { useEffect, useMemo, useState } from 'react'
import {
  MotionValue,
  type UseScrollOptions,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

type UseSectionParallaxArgs = {
  /** Attach this ref to the section/container you want to drive parallax from. */
  target: RefObject<HTMLElement | null>
  /** Scroll offsets passed to framer-motion useScroll. */
  offset?: UseScrollOptions['offset']
  /** Parallax amplitude on desktop in px (positive values). */
  amplitude?: number
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return isMobile
}

export function useSectionParallax({
  target,
  offset = ['start end', 'end start'],
  amplitude = 80,
}: UseSectionParallaxArgs) {
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll({ target, offset })

  const scaledAmplitude = useMemo(() => {
    const base = amplitude
    const mobileFactor = isMobile ? 0.55 : 1
    const computed = clamp(base * mobileFactor, 0, 160)
    return reducedMotion ? 0 : computed
  }, [amplitude, isMobile, reducedMotion])

  const ySlow = useTransform(
    scrollYProgress,
    [0, 1],
    [scaledAmplitude * -0.35, scaledAmplitude * 0.35],
  )
  const yMedium = useTransform(
    scrollYProgress,
    [0, 1],
    [scaledAmplitude * -0.6, scaledAmplitude * 0.6],
  )
  const yFast = useTransform(scrollYProgress, [0, 1], [scaledAmplitude * -1, scaledAmplitude * 1])
  const scaleLift = useTransform(scrollYProgress, [0, 0.5, 1], [0.985, 1.01, 0.99])
  const reducedScale = useTransform(scrollYProgress, () => 1)

  return {
    progress: scrollYProgress,
    ySlow,
    yMedium,
    yFast,
    scaleLift: reducedMotion ? reducedScale : scaleLift,
  }
}

export type ParallaxY = MotionValue<number>
