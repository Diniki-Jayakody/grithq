import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/typography/SectionLabel'
import { DisplayText } from '@/components/typography/DisplayText'
import {
  impactPillars,
  impactGallery,
} from '@/constants/data'
import { STRINGS } from '@/constants/strings'
import { styles } from '@/styles/styles'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

export function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  useEffect(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.impact-intro-line', {
        scrollTrigger: { trigger: section, start: 'top 70%' },
        y: isMobile ? 30 : 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      })

      if (section.querySelector('.impact-warm-block')) {
        gsap.from('.impact-warm-block', {
          scrollTrigger: { trigger: '.impact-warm-block', start: 'top 85%' },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        })
      }

      gsap.from('.impact-pillar', {
        scrollTrigger: { trigger: '.impact-pillars', start: 'top 85%' },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      })

      if (section.querySelector('.impact-initiatives')) {
        gsap.from('.impact-initiative', {
          scrollTrigger: { trigger: '.impact-initiatives', start: 'top 85%' },
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
        })
      }

      gsap.from('.impact-gallery-item', {
        scrollTrigger: { trigger: '.impact-gallery', start: 'top 85%' },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
      })
    }, section)

    return () => ctx.revert()
  }, [reducedMotion, isMobile])

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative section-y bg-grithq-impact"
      aria-labelledby="impact-heading"
    >
      <div className={styles.sectionContainer}>
        <SectionLabel number={STRINGS.sections.impact.number}>
          {STRINGS.sections.impact.label}
        </SectionLabel>

        <div className="mt-12 lg:mt-16">
          <DisplayText
            as="h2"
            id="impact-heading"
            className="impact-intro-line text-[clamp(2rem,6vw,5rem)] uppercase"
          >
            {STRINGS.sections.impact.heading}
          </DisplayText>
          <p className="impact-intro-line mt-6 max-w-2xl text-lg leading-relaxed text-grithq-cream/55 md:text-xl">
            {STRINGS.sections.impact.subheading}
          </p>
          <p className="impact-intro-line mt-4 font-display text-[clamp(1.5rem,4vw,2.75rem)] font-light text-grithq-mauve">
            {STRINGS.sections.impact.emphasis}
          </p>
        </div>

        {/* <div
          className="impact-warm-block mt-16 rounded-sm p-8 md:mt-20 md:p-14"
          style={{ backgroundColor: '#2d1522' }}
        >
          <h3 className={styles.eyebrow}>{STRINGS.sections.impact.whyWeGive}</h3>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-grithq-cream/70 md:text-lg">
            GRITHQ believes that building value extends beyond balance sheets. Contributing to
            communities — supporting education, nourishment and opportunity — is integral to who
            we are. This is not CSR. This is conviction.
          </p>
        </div> */}

        <div className="mt-16 md:mt-20">
          <h3 className={styles.eyebrow}>{STRINGS.sections.impact.feedingFutures}</h3>
          <p className={`mt-4 max-w-2xl ${styles.bodyTextMuted}`}>
            A community initiative supporting school children through access to nutritious meals
            and practical assistance. Nourishment enables education. Education enables futures.
          </p>

          <div className="impact-pillars mt-4 grid grid-cols-1 gap-6 border-t border-grithq-cream/10 pt-8 sm:grid-cols-3">
            {impactPillars.map((pillar) => (
              <div key={pillar.id} className="impact-pillar">
                <span className="font-display text-xl font-light text-grithq-offwhite md:text-2xl">
                  {pillar.title}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-grithq-cream/50">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="impact-initiatives mt-12 md:mt-16">
          <h3 className={styles.eyebrow}>{STRINGS.sections.impact.communityInitiatives}</h3>
          <div className="grid mt-3 gap-6 md:grid-cols-3 md:gap-8">
            {communityInitiatives.map((initiative) => (
              <article key={initiative.id} className="impact-initiative group">
                <RevealImage
                  src={initiative.image}
                  alt={initiative.title}
                  containerClassName="aspect-[4/5] md:aspect-[3/4] rounded-sm overflow-hidden"
                />
                <h4 className="mt-4 font-display text-lg font-light text-grithq-offwhite">
                  {initiative.title}
                </h4>
                <p className={`mt-2 ${styles.bodyTextMuted}`}>{initiative.description}</p>
              </article>
            ))}
          </div>
        </div> */}

        <div className="impact-gallery mt-16 md:mt-20">
          <h3 className={styles.eyebrow}>{STRINGS.sections.impact.impactGallery}</h3>
          <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-6">
            {impactGallery.map((item) => (
              <figure
                key={item.id}
                className="impact-gallery-item group mb-4 break-inside-avoid overflow-hidden lg:mb-6"
              >
                <div className="overflow-hidden rounded-sm">
                  <img
                    src={item.src}
                    alt={item.caption}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{
                      aspectRatio:
                        item.aspect === 'portrait'
                          ? '3/4'
                          : item.aspect === 'square'
                            ? '1/1'
                            : '16/10',
                    }}
                  />
                </div>
                <figcaption className="mt-2 text-xs tracking-wide text-grithq-cream/35">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
