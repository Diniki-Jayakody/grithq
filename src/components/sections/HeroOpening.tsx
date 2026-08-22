import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { images } from '@/constants/images'
import { STRINGS } from '@/constants/strings'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

const LETTERS = ['G', 'R', 'I', 'T', 'H', 'Q']

const DESKTOP_OFFSETS = [-2.8, -1.7, -0.85, 0.85, 1.7, 2.8]
const MOBILE_OFFSETS_X = [-0.6, 0.6, -0.6, 0.6, -0.6, 0.6]
const MOBILE_OFFSETS_Y = [-1.1, -1.1, 0, 0, 1.1, 1.1]

export function HeroOpening() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const lettersWrapRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const statementRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const lettersWrap = lettersWrapRef.current
    const bg = bgRef.current
    const statement = statementRef.current
    const scrollHint = scrollHintRef.current
    if (!section || !pin || !lettersWrap || !bg || !statement) return

    const letterEls = gsap.utils.toArray<HTMLElement>('.hero-letter')

    if (reducedMotion) {
      gsap.set(letterEls, { clearProps: 'all', opacity: 1, rotation: 0 })
      gsap.set(bg, { opacity: 0.35 })
      gsap.set(statement, { opacity: 1, y: 0 })
      gsap.set(scrollHint, { opacity: 1 })
      return
    }

    const offsetsX = isMobile ? MOBILE_OFFSETS_X : DESKTOP_OFFSETS
    const offsetsY = isMobile ? MOBILE_OFFSETS_Y : LETTERS.map(() => 0)
    const spread = isMobile ? 28 : 72

    gsap.set(letterEls, {
      opacity: 1,
      x: (i) => (isMobile ? 0 : offsetsX[i] * spread),
      y: (i) => (isMobile ? offsetsY[i] * 24 : 0),
      rotation: 0,
      scale: 1,
    })
    gsap.set(bg, { opacity: 0, scale: 1.08 })
    gsap.set(statement, { opacity: 0, y: 40 })
    gsap.set(scrollHint, { opacity: 1 })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=180%',
          scrub: 0.8,
          pin: pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.to(
        letterEls,
        {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.55,
          stagger: 0.02,
          ease: 'none',
        },
        0
      )

      tl.to(
        bg,
        {
          opacity: 0.5,
          scale: 1,
          duration: 0.45,
          ease: 'none',
        },
        0.15
      )

      tl.to(
        lettersWrap,
        {
          scale: isMobile ? 0.72 : 0.78,
          y: isMobile ? '-8vh' : '-12vh',
          duration: 0.35,
          ease: 'none',
        },
        0.45
      )

      tl.to(
        statement,
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'none',
        },
        0.65
      )

      tl.to(
        scrollHint,
        {
          opacity: 0,
          duration: 0.15,
          ease: 'none',
        },
        0.5
      )
    }, section)

    return () => ctx.revert()
  }, [reducedMotion, isMobile])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative bg-grithq-black"
      aria-label="GRITHQ opening"
    >
      <div ref={pinRef} className="relative flex h-screen flex-col items-center justify-center overflow-hidden">
        <div
          ref={bgRef}
          className="pointer-events-none absolute inset-0 z-0 opacity-0"
          aria-hidden="true"
        >
          <img
            src={images.landing}
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-grithq-black/65" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 100%, rgba(90,12,61,0.3) 0%, transparent 60%), linear-gradient(to bottom, rgba(10,6,8,0.4) 0%, rgba(10,6,8,0.75) 100%)',
            }}
          />
        </div>

        <div
          ref={lettersWrapRef}
          className={`relative z-10 px-4 ${isMobile ? 'grid grid-cols-2 gap-x-6 gap-y-1 place-items-center' : 'flex items-center justify-center'}`}
          aria-label="GRITHQ"
        >
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              className={`hero-letter font-display leading-none font-black text-grithq-offwhite ${isMobile ? 'text-center' : 'inline-block'}`}
              style={{
                fontSize: isMobile
                  ? 'clamp(3rem, 16vw, 4.5rem)'
                  : 'clamp(4rem, 12vw, 10rem)',
                textShadow: '0 0 80px rgba(247, 243, 244, 0.12)',
                transform: 'rotate(0deg)',
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        <div
          ref={statementRef}
          className="relative z-10 mt-6 px-6 text-center opacity-0 md:mt-8"
        >
          <p className="font-display text-[clamp(0.65rem,2vw,0.85rem)] tracking-[0.45em] text-grithq-cream/50 uppercase">
            {STRINGS.hero.eyebrow}
          </p>
          <p className="mt-3 font-display text-[clamp(1rem,3vw,1.35rem)] font-light leading-snug tracking-wide text-grithq-offwhite">
            {STRINGS.hero.headline}
            <br />
            {STRINGS.hero.headlineLine2}
          </p>
        </div>

        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 md:bottom-12"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="font-display text-[10px] tracking-[0.45em] text-grithq-cream/40">
              {STRINGS.hero.scrollHint}
            </span>
            <div className="h-10 w-px bg-gradient-to-b from-grithq-cream/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
