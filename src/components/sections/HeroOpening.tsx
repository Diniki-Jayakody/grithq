import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { images } from '@/constants/images'
import { STRINGS } from '@/constants/strings'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { HERO_BACKGROUND_PROGRESS, useHeroScrollState } from '@/hooks/useHeroScrollState'

gsap.registerPlugin(ScrollTrigger)

const LETTERS = ['g', 'r', 'i', 't', 'H', 'Q']

// Mobile groups the same six letters into two words, in order:
// Line 1: grit (letters 0–3), Line 2: HQ (letters 4–5)
const LETTER_ROWS = [
  { word: 'grit', letters: LETTERS.slice(0, 4), startIndex: 0 },
  { word: 'HQ', letters: LETTERS.slice(4), startIndex: 4 },
] as const

const DESKTOP_OFFSETS = [-2.8, -1.7, -0.85, 0.85, 1.7, 2.8]
const MOBILE_OFFSETS_Y = [-0.85, -0.85, -0.85, -0.85, 0.9, 0.9]

const LETTER_CLASS = 'hero-letter inline-block font-display leading-none font-black text-grithq-offwhite'
const LETTER_SHADOW = '0 0 80px rgba(247, 243, 244, 0.12)'

// Desktop size (unchanged)
const DESKTOP_FONT_SIZE = 'clamp(6rem, 12vw, 12rem)'
// Mobile size: scales with the viewport so "grit" stays large on big phones
// and still fits comfortably on small phones (≈320px wide)
const MOBILE_FONT_SIZE = 'clamp(4rem, 24vw, 8rem)'

// FEATURE FLAG
// false = Static landing page (current mode)
// true  = Original animated landing page
const ENABLE_HERO_ANIMATION = false

export function HeroOpening() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const lettersWrapRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const statementRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  const { setHeroBackgroundProgress, resetHeroBackground } = useHeroScrollState()

  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const lettersWrap = lettersWrapRef.current
    const bg = bgRef.current
    const statement = statementRef.current
    const scrollHint = scrollHintRef.current

    if (!section || !pin || !lettersWrap || !bg || !statement) return

    // Both layouts are in the DOM (CSS shows one per breakpoint).
    // Each letter carries data-index (its position in LETTERS) and
    // data-layout ('mobile' | 'desktop'), so offsets always match the letter.
    const letterEls = gsap.utils.toArray<HTMLElement>('.hero-letter', lettersWrap)
    const indexOf = (el: HTMLElement) => Number(el.dataset.index ?? 0)
    const isMobileEl = (el: HTMLElement) => el.dataset.layout === 'mobile'

    // ============================================================
    // STATIC MODE
    // Original animation is preserved below.
    // ============================================================

    if (!ENABLE_HERO_ANIMATION || reducedMotion) {
      gsap.set(letterEls, {
        clearProps: 'transform,opacity',
        opacity: 1,
        rotation: 0,
        x: 0,
        y: 0,
        scale: 1,
      })

      gsap.set(bg, {
        opacity: 0.35,
        scale: 1,
      })

      gsap.set(lettersWrap, {
        clearProps: 'transform',
      })

      gsap.set(statement, {
        opacity: 1,
        y: 0,
      })

      gsap.set(scrollHint, {
        opacity: 1,
      })

      setHeroBackgroundProgress(HERO_BACKGROUND_PROGRESS)

      return () => {
        resetHeroBackground()
      }
    }

    // ============================================================
    // ORIGINAL ANIMATION MODE
    // Set ENABLE_HERO_ANIMATION = true to enable this section.
    // ============================================================

    gsap.set(letterEls, {
      opacity: 1,
      x: (_i: number, el: HTMLElement) =>
        isMobileEl(el) ? 0 : DESKTOP_OFFSETS[indexOf(el)] * 72,
      y: (_i: number, el: HTMLElement) =>
        isMobileEl(el) ? MOBILE_OFFSETS_Y[indexOf(el)] * 24 : 0,
      rotation: 0,
      scale: 1,
    })

    gsap.set(bg, {
      opacity: 0,
      scale: 1.08,
    })

    gsap.set(statement, {
      opacity: 0,
      y: 40,
    })

    gsap.set(scrollHint, {
      opacity: 1,
    })

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
          onUpdate: (self) => {
            setHeroBackgroundProgress(self.progress)
          },
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

    return () => {
      resetHeroBackground()
      ctx.revert()
    }
  }, [
    reducedMotion,
    isMobile,
    setHeroBackgroundProgress,
    resetHeroBackground,
  ])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative bg-grithq-landing"
      aria-label="GRITHQ opening"
    >
      <div
        ref={pinRef}
        className="relative flex h-screen flex-col items-center justify-center overflow-hidden"
      >
        {/* Background image */}
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

        {/* GRITHQ letters */}
        <div
          ref={lettersWrapRef}
          className="relative z-10 w-full max-w-full px-4"
          role="img"
          aria-label="GRITHQ"
        >
          {/* Mobile: two centred word lines — "grit" over "HQ" */}
          <div
            className="flex flex-col items-center justify-center gap-1 sm:gap-2 md:hidden"
            aria-hidden="true"
          >
            {LETTER_ROWS.map((row) => (
              <div
                key={row.word}
                className="flex flex-nowrap items-center justify-center whitespace-nowrap"
              >
                {row.letters.map((letter, offset) => {
                  const index = row.startIndex + offset
                  return (
                    <span
                      key={`m-${index}`}
                      data-index={index}
                      data-layout="mobile"
                      className={LETTER_CLASS}
                      style={{
                        fontSize: MOBILE_FONT_SIZE,
                        lineHeight: 0.92,
                        textShadow: LETTER_SHADOW,
                        transform: 'rotate(0deg)',
                      }}
                    >
                      {letter}
                    </span>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Desktop: original single-line GRITHQ (unchanged) */}
          <div
            className="hidden items-center justify-center md:flex"
            aria-hidden="true"
          >
            {LETTERS.map((letter, i) => (
              <span
                key={`d-${i}`}
                data-index={i}
                data-layout="desktop"
                className={LETTER_CLASS}
                style={{
                  fontSize: DESKTOP_FONT_SIZE,
                  textShadow: LETTER_SHADOW,
                  transform: 'rotate(0deg)',
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Headline and supporting text */}
        <div
          ref={statementRef}
          className="relative z-10 mt-6 px-6 text-center opacity-0 md:mt-8"
        >
          {/* <p className="font-display text-[clamp(0.65rem,2vw,0.85rem)] tracking-[0.45em] text-grithq-cream/50 uppercase">
            {STRINGS.hero.eyebrow}
          </p> */}

          {/* <p className="mt-3 font-display text-[clamp(1rem,3vw,1.35rem)] font-light leading-snug tracking-wide text-grithq-offwhite">
            {STRINGS.hero.headline}
            <br />
            {STRINGS.hero.headlineLine2}
          </p> */}
        </div>

        {/* Scroll hint */}
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