import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { STRINGS } from '@/constants/strings'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface LoaderProps {
  onComplete: () => void
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) {
      onComplete()
      return
    }

    const duration = 1200
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const pct = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(pct)

      if (elapsed < duration) {
        requestAnimationFrame(tick)
      } else {
        gsap.to('.loader-screen', {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete,
        })
      }
    }

    requestAnimationFrame(tick)
  }, [onComplete, reducedMotion])

  if (reducedMotion) return null

  return (
    <div
      className="loader-screen fixed inset-0 z-[200] flex flex-col items-center justify-center bg-grithq-black"
      aria-hidden="true"
    >
      <span className="font-display text-2xl font-semibold tracking-[0.5em] text-grithq-offwhite md:text-3xl">
        {STRINGS.loader.label}
      </span>
      <div className="mt-8 h-px w-32 overflow-hidden bg-grithq-cream/10">
        <div
          className="h-full bg-grithq-mauve transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="mt-3 font-display text-[10px] tracking-[0.3em] text-grithq-cream/30">
        {progress}
      </span>
    </div>
  )
}
