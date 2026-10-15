import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { DisplayText } from '@/components/typography/DisplayText'
import { SectionLabel } from '@/components/typography/SectionLabel'
import {
  investmentFocusAreas,
  leadershipProfiles,
} from '@/constants/data'
import { STRINGS } from '@/constants/strings'
import { ROUTES } from '@/constants/links'
import { styles } from '@/styles/styles'
import { ArchitecturalGrid } from '@/components/grid/ArchitecturalGrid'
import { useCursorState } from '@/hooks/useCursorState'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { COLORS } from '@/constants/colors'
import { INVESTMENT_FOCUS_REVEAL } from '@/utils/animations'

gsap.registerPlugin(ScrollTrigger)

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className={`${styles.eyebrowLight} identity-reveal`}>{children}</p>
  )
}

function EmphasizedWeText({ text }: { text: string }) {
  return text.split(/\b(We)\b/).map((part, index) =>
    part === 'We' ? (
      <span key={index} className="font-medium text-grithq-deepAccent">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    ),
  )
}

function InvestmentAreaCell({
  area,
}: {
  area: (typeof investmentFocusAreas)[0]
}) {
  const { setCursorState } = useCursorState()
  const isMobile = useIsMobile()

  return (
    <article className="focus-area min-w-0">
      <div className="overflow-hidden">
        <div className="aspect-[4/3]">
          <img
            src={area.image}
            alt={`${area.title} investment focus`}
            loading="lazy"
            className={`h-full w-full ${area.imageClassName}`}
          />
        </div>
      </div>
      <p className="mt-5 font-display text-[10px] tracking-[0.3em] text-grithq-burgundy md:text-xs">
        {area.number}
      </p>
      <h4 className={`${styles.investmentFocusTitle} mt-3`}>
        {area.title}
      </h4>
      <p className={`mt-3 max-w-sm ${styles.bodyTextMutedLight}`}>
        {area.description}
      </p>
      <Link
        to={area.href}
        className="group mt-5 inline-flex min-h-11 items-center gap-2 font-display text-sm text-grithq-burgundy transition-colors duration-300 hover:text-grithq-deepAccent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grithq-mauve/70 focus-visible:ring-offset-2 focus-visible:ring-offset-grithq-offwhite"
        onMouseEnter={() => !isMobile && setCursorState('open')}
        onMouseLeave={() => !isMobile && setCursorState('default')}
      >
        {STRINGS.identity.investmentFocus.explore}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          strokeWidth={1.5}
        />
      </Link>
    </article>
  )
}

export function IdentitySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const profile = leadershipProfiles[0]
  const { setCursorState } = useCursorState()

  useEffect(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.identity-reveal', {
        scrollTrigger: { trigger: section, start: 'top 78%' },
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
      })

      gsap.from('.focus-area', {
        scrollTrigger: { trigger: '.investment-focus-grid', start: 'top 82%' },
        y: INVESTMENT_FOCUS_REVEAL.y,
        opacity: INVESTMENT_FOCUS_REVEAL.opacity,
        duration: INVESTMENT_FOCUS_REVEAL.duration,
        stagger: INVESTMENT_FOCUS_REVEAL.stagger,
        ease: INVESTMENT_FOCUS_REVEAL.ease,
      })

      gsap.from('.leadership-block', {
        scrollTrigger: { trigger: '.leadership-section', start: 'top 85%' },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }, section)

    return () => ctx.revert()
  }, [reducedMotion, isMobile])

  const focus = STRINGS.identity.investmentFocus
  const identity = STRINGS.sections.identity

  return (
    <section
      id="identity"
      ref={sectionRef}
      className={`${styles.sectionLightBase} ${styles.sectionPadTop} ${styles.sectionPadBottomCompact} overflow-hidden`}
      aria-labelledby="identity-heading"
    >
      <ArchitecturalGrid variant="light" />

      <div className={styles.sectionContainer}>
        {/* ─── OUR IDENTITY ─────────────────────────────────────────────── */}
        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:gap-x-8 lg:gap-x-10">
          <div className="min-w-0">
            <SectionEyebrow>{identity.eyebrow}</SectionEyebrow>
            <DisplayText
              as="h2"
              id="identity-heading"
              className="identity-reveal mt-6 text-[clamp(1.7rem,3.4vw,2.5rem)] leading-[1.2] text-grithq-burgundy"
            >
              {identity.heading.map((line) => (
                <span key={line} className="block md:whitespace-nowrap">
                  <EmphasizedWeText text={line} />
                </span>
              ))}
            </DisplayText>
            <p className={`identity-reveal mt-6 ${styles.bodyTextMutedLight}`}> {identity.subtext} 
            </p>
          </div>

          <div className="identity-reveal min-w-0 md:justify-self-end lg:pt-10">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-1 lg:gap-y-5">
            {STRINGS.identity.grit.letters.map((item, index) => (
                <li key={item.letter} className="flex flex-col gap-2 lg:flex-row lg:items-baseline lg:gap-5">
                  <span className={`${styles.gritLetter} inline-block w-[0.8em] shrink-0 text-center ${
                      index === 0 ? 'bg-grithq-burgundy py-[0.08em] !text-grithq-offwhite' : ''}`}>
                    {item.letter}
                  </span>                 
                  <span className={styles.gritWord}>{item.word}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─── INVESTMENT FOCUS ─────────────────────────────────────────── */}
        <div className="investment-focus mt-16 md:mt-24 lg:mt-28">
          <SectionLabel variant="light">{focus.eyebrow}</SectionLabel>
          <div className="max-w-3xl">
            <p className={`identity-reveal mt-6 max-w-2xl ${styles.bodyTextMutedLight}`}>
              {focus.subtext}
            </p>
          </div>

          <div className="investment-focus-grid mt-10 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3 lg:gap-x-10">
            {investmentFocusAreas.map((area) => (
              <InvestmentAreaCell key={area.id} area={area} />
            ))}
          </div>
        </div>

        {/* ─── LEADERSHIP ───────────────────────────────────────────────── */}
        {profile && (
         <div id="leadership" className="leadership-section mt-16 md:mt-24 lg:mt-28">
          <SectionLabel variant="light">{identity.leadershipEyebrow}</SectionLabel>
          <div className="mt-10 grid items-start gap-8 md:mt-14 lg:grid-cols-12 lg:gap-10 xl:gap-12">
              <div className="leadership-block order-1 lg:order-none lg:col-span-5 xl:col-span-5">
                <div className="relative overflow-hidden">
                  <div className="absolute left-0 top-0 z-10 h-12 w-px bg-grithq-mauve/30" aria-hidden="true" />
                  <div className="relative aspect-[3/4] max-h-[420px] overflow-hidden md:max-h-[480px] lg:max-h-[560px]">
                    <img
                      src={profile.image}
                      alt={`${profile.name}, ${profile.role}`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top grayscale-[20%] contrast-[1.02]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-grithq-burgundy/30 via-transparent to-grithq-burgundy/10"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              <div className="leadership-block order-2 flex flex-col justify-start lg:order-none lg:col-span-7 xl:col-span-7">
              

                <div className="mt-10 md:mt-12">
                  <div className="flex flex-wrap items-center gap-3">
                    <h4 className="font-display text-[clamp(1rem,2.5vw,1.25rem)] tracking-[0.12em] text-grithq-burgundy">
                      {profile.nameDisplay}
                    </h4>
                    <a
                      href={profile.linkedinHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={STRINGS.leadership.linkedinLabel}
                      className={styles.linkedinIconButton}
                      style={{ color: COLORS.linkedin }}
                      onMouseEnter={() => setCursorState('open')}
                      onMouseLeave={() => setCursorState('default')}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className="h-5 w-5"
                      >
                        <path
                          d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="4"
                          cy="4"
                          r="2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className={`mt-8 max-w-xl space-y-5 md:mt-10 ${styles.letterBody}`}>
                  {STRINGS.leadership.biography.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
