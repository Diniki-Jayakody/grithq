import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/typography/SectionLabel'
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

        {/* <div className="timeline-track mt-20 overflow-x-auto hide-scrollbar md:mt-28">
          <div className="flex min-w-max gap-0 border-t border-grithq-cream/10">
            {timelineItems.map((item, i) => (
              <div
                key={item.year}
                className="timeline-item relative min-w-[200px] flex-1 border-r border-grithq-cream/10 px-6 py-10 md:min-w-[250px] md:px-10 md:py-14"
              >
                <span className="font-display text-3xl font-light text-grithq-offwhite md:text-4xl">
                  {item.year}
                </span>
                <p className="mt-2 font-display text-xs tracking-[0.3em] text-grithq-mauve">
                  {item.label}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-grithq-cream/40">
                  {item.description}
                </p>
                {i < timelineItems.length - 1 && (
                  <div
                    className="absolute top-0 right-0 h-full w-px bg-grithq-cream/5"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  )
}
