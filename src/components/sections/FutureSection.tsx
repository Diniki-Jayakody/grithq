import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DisplayText } from '@/components/typography/DisplayText'
import { ArchitecturalGrid } from '@/components/grid/ArchitecturalGrid'
import { STRINGS } from '@/constants/strings'
import { styles } from '@/styles/styles'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function FutureSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return

    const ctx = gsap.context(() => {
      if (!section.querySelector('.timeline-track')) return

      gsap.from('.timeline-item', {
        scrollTrigger: { trigger: '.timeline-track', start: 'top 75%' },
        x: -60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      })
    }, section)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      id="future"
      ref={sectionRef}
      className="relative section-y bg-grithq-black"
      aria-labelledby="future-heading"
    >
      <ArchitecturalGrid />

      <div className="relative mx-auto max-w-7xl section-padding">

        <DisplayText
          as="h2"
          id="future-heading"
          className="mt-8 text-[clamp(2rem,6vw,5rem)] font-black uppercase"
        >
          {STRINGS.sections.future.heading}
        </DisplayText>

        <p className={`mt-8 max-w-xl ${styles.bodyTextMuted}`}>
          {STRINGS.sections.future.subtext}
        </p>
      </div>
    </section>
  )
}
