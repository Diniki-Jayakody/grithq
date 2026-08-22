import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { philosophyPrinciples } from '@/constants/data'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  useEffect(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return

    const ctx = gsap.context(() => {
      const panels = section.querySelectorAll('.philosophy-panel')

      panels.forEach((panel, i) => {
        if (i < panels.length - 1 && !isMobile) {
          ScrollTrigger.create({
            trigger: panel,
            start: 'top top',
            end: 'bottom top',
            pin: true,
            pinSpacing: false,
          })
        }

        const bg = panel.querySelector('.philosophy-bg img')
        if (bg) {
          gsap.fromTo(
            bg,
            { scale: 1.2 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                start: 'top bottom',
                end: 'bottom top',
                scrub: isMobile ? false : 1.5,
              },
            }
          )
        }

        gsap.from(panel.querySelector('.philosophy-content'), {
          scrollTrigger: {
            trigger: panel,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
          y: isMobile ? 30 : 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        })
      })
    }, section)

    return () => ctx.revert()
  }, [reducedMotion, isMobile])

  return (
    <section
      ref={sectionRef}
      className="relative bg-grithq-dark"
      aria-label="Investment philosophy"
    >
      {philosophyPrinciples.map((principle) => (
        <div
          key={principle.number}
          className="philosophy-panel relative flex min-h-[70vh] items-center overflow-hidden section-padding md:min-h-[85vh] lg:min-h-screen"
        >
          <div className="philosophy-bg pointer-events-none absolute inset-0" aria-hidden="true">
            <img
              src={principle.image}
              alt=""
              className="h-full w-full object-cover opacity-25"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-grithq-dark via-grithq-dark/90 to-grithq-dark/60" />
          </div>

          <div className="philosophy-content relative z-10 mx-auto w-full max-w-7xl">
            <span className="font-display text-[clamp(3.5rem,12vw,9rem)] font-black leading-none text-grithq-plum/40">
              {principle.number}
            </span>
            <h2 className="mt-2 font-display text-[clamp(1.75rem,5vw,4rem)] font-light leading-[0.95] tracking-tight text-grithq-offwhite">
              {principle.title}
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-grithq-cream/55 md:mt-8 md:text-lg">
              {principle.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  )
}
