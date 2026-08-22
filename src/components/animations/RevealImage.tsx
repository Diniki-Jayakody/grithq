import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useCursorState } from '@/hooks/useCursorState'

gsap.registerPlugin(ScrollTrigger)

interface RevealImageProps {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  cursorType?: 'explore' | 'view-project'
}

export function RevealImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  cursorType = 'explore',
}: RevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const reducedMotion = useReducedMotion()
  const { setCursorState } = useCursorState()

  useEffect(() => {
    const container = containerRef.current
    const image = imageRef.current
    if (!container || !image || reducedMotion) return

    gsap.set(image, { scale: 1.2 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.from(container, {
      clipPath: 'inset(100% 0% 0% 0%)',
      duration: 1.2,
      ease: 'power3.inOut',
    }).to(
      image,
      { scale: 1, duration: 1.4, ease: 'power2.out' },
      '-=0.8'
    )

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [reducedMotion, src])

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${containerClassName}`}
      onMouseEnter={() => setCursorState(cursorType)}
      onMouseLeave={() => setCursorState('default')}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    </div>
  )
}
