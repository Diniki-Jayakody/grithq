import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/typography/SectionLabel'
import { DisplayText } from '@/components/typography/DisplayText'
import { RevealImage } from '@/components/animations/RevealImage'
import {
  developments,
  developmentCategories,
  investmentHighlights,
} from '@/constants/data'
import { STRINGS } from '@/constants/strings'
import { styles } from '@/styles/styles'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function DevelopmentsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.dev-highlight', {
        scrollTrigger: { trigger: '.dev-highlights', start: 'top 85%' },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      })

      gsap.from('.dev-item', {
        scrollTrigger: { trigger: section, start: 'top 70%' },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      })
    }, section)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      id="developments"
      ref={sectionRef}
      className={`${styles.sectionDark} border-t border-grithq-cream/5`}
      aria-labelledby="developments-heading"
    >
      <div className={styles.sectionContainer}>
        <DisplayText
          as="h2"
          id="developments-heading"
          className="mt-6 text-[clamp(1.75rem,4vw,3.5rem)]"
        >
          {STRINGS.sections.developments.heading}
        </DisplayText>
        <p className={`mt-4 max-w-2xl ${styles.bodyTextMuted}`}>
          {STRINGS.sections.developments.subtext}
        </p>

        <div className="dev-highlights mt-12 grid grid-cols-2 gap-6 border-y border-grithq-cream/10 py-10 md:mt-16 md:grid-cols-4 md:gap-8 md:py-12">
          {investmentHighlights.map((item) => (
            <div key={item.id} className="dev-highlight">
              <span className="font-display text-[clamp(1.25rem,3vw,2rem)] font-light text-grithq-offwhite">
                {item.value}
              </span>
              <p className="mt-1 text-[10px] tracking-[0.25em] text-grithq-mauve uppercase">
                {item.label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-grithq-cream/45">{item.description}</p>
            </div>
          ))}
        </div>

        {developmentCategories.map((category) => {
          const items = developments.filter((d) => d.category === category.id)
          if (items.length === 0) return null

          return (
            <div key={category.id} className="mt-16 md:mt-20">
              <h3 className={styles.eyebrow}>{category.label}</h3>

              <div className="mt-8 space-y-12 md:space-y-16">
                {items.map((item, i) => (
                  <article
                    key={item.id}
                    className="dev-item grid items-center gap-8 md:grid-cols-12 md:gap-12"
                  >
                    <div className={`md:col-span-7 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                      <RevealImage
                        src={item.image}
                        alt={item.title}
                        containerClassName={`aspect-[16/10] rounded-sm overflow-hidden ${category.id === 'upcoming' ? 'opacity-90' : ''}`}
                      />
                    </div>
                    <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                      <span className="font-display text-[10px] tracking-[0.3em] text-grithq-cream/30">
                        {item.location} · {item.status}
                      </span>
                      <h4 className="mt-3 font-display text-2xl font-light text-grithq-offwhite md:text-3xl">
                        {item.title}
                      </h4>
                      <p className={`mt-4 ${styles.bodyTextMuted}`}>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
