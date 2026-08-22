import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { DisplayText } from '@/components/typography/DisplayText'
import { RevealImage } from '@/components/animations/RevealImage'
import { investmentFocusAreas, leadershipProfiles } from '@/constants/data'
import { images } from '@/constants/images'
import { STRINGS } from '@/constants/strings'
import { styles } from '@/styles/styles'
import { ArchitecturalGrid } from '@/components/grid/ArchitecturalGrid'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className={`${styles.eyebrowLight} identity-reveal`}>{children}</p>
  )
}

function IdentityPrinciple({
  number,
  title,
  text,
}: {
  number: string
  title: string
  text: string
}) {
  return (
    <motion.div
      className="group identity-principle border-t border-grithq-burgundy/15 py-5 md:py-6"
      whileHover={{ x: 6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-start gap-4 md:gap-6">
        <span className="font-display text-[10px] tracking-[0.25em] text-grithq-mauve/70 md:text-xs">
          {number}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xs tracking-[0.2em] text-grithq-burgundy transition-colors duration-300 group-hover:text-grithq-deepAccent md:text-sm">
            {title}
          </h3>
          <p className={`mt-2 ${styles.bodyTextMutedLight}`}>{text}</p>
        </div>
      </div>
    </motion.div>
  )
}

function InvestmentAreaCell({
  area,
  layoutClass,
  isActive,
  isDimmed,
  onActivate,
  onDeactivate,
  showImageOnMobile,
}: {
  area: (typeof investmentFocusAreas)[0]
  layoutClass: string
  isActive: boolean
  isDimmed: boolean
  onActivate: () => void
  onDeactivate: () => void
  showImageOnMobile?: boolean
}) {
  return (
    <motion.article
      className={`focus-area relative overflow-hidden border border-grithq-burgundy/10 ${layoutClass}`}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      tabIndex={0}
      animate={{
        opacity: isDimmed ? 0.55 : 1,
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0" aria-hidden="true">
        <motion.img
          src={area.image}
          alt=""
          className="h-full w-full object-cover"
          animate={{
            scale: isActive ? 1.04 : 1,
            opacity: isActive ? 0.22 : showImageOnMobile ? 0.12 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-grithq-offwhite/88 md:bg-grithq-offwhite/92" />
      </div>

      <div className="relative z-10 flex h-full min-h-[200px] flex-col justify-between p-6 md:min-h-[240px] md:p-8 lg:min-h-[280px] lg:p-10">
        <div>
          <span className="font-display text-[10px] tracking-[0.3em] text-grithq-mauve/80 md:text-xs">
            {area.number}
          </span>
          <motion.h4
            className="mt-3 font-display text-lg font-light leading-tight text-grithq-burgundy md:text-xl lg:text-2xl"
            animate={{ x: isActive ? 4 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {area.title}
          </motion.h4>
          <motion.p
            className={`mt-3 max-w-md ${styles.bodyTextMutedLight}`}
            animate={{ x: isActive ? 4 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.03 }}
          >
            {area.description}
          </motion.p>
        </div>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.3 }}
              className="mt-6 flex items-center gap-2 text-grithq-deepAccent"
              aria-hidden="true"
            >
              <span className="font-display text-[10px] tracking-[0.25em]">EXPLORE</span>
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}

export function IdentitySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const identityImageRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const profile = leadershipProfiles[0]
  const [activeFocusIndex, setActiveFocusIndex] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: identityImageRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? ['0%', '0%'] : ['-4%', '4%'],
  )

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

      gsap.from('.identity-principle', {
        scrollTrigger: { trigger: '.identity-principles', start: 'top 88%' },
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      })

      gsap.from('.focus-area', {
        scrollTrigger: { trigger: '.investment-focus-grid', start: 'top 88%' },
        y: 32,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power3.out',
      })

      gsap.from('.approach-step', {
        scrollTrigger: { trigger: '.investment-approach', start: 'top 90%' },
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
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

  return (
    <section
      id="identity"
      ref={sectionRef}
      className={`${styles.sectionLight} overflow-hidden`}
      aria-labelledby="identity-heading"
    >
      <ArchitecturalGrid variant="light" />

      <div className={styles.sectionContainer}>
        {/* ─── OUR IDENTITY ─────────────────────────────────────────────── */}
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Image — first on mobile */}
          <div
            ref={identityImageRef}
            className="identity-visual relative order-1 lg:order-none lg:col-span-7"
          >
            <div className="relative overflow-hidden">
              <span
                className="pointer-events-none absolute -right-4 top-8 z-0 select-none font-display text-[clamp(5rem,18vw,14rem)] font-black leading-none text-grithq-burgundy/[0.04]"
                aria-hidden="true"
              >
                G
              </span>

              <div className="absolute left-0 top-0 z-10 h-16 w-px bg-grithq-mauve/30 md:h-24" aria-hidden="true" />
              <div className="absolute bottom-8 right-0 z-10 h-px w-16 bg-grithq-mauve/30 md:w-24" aria-hidden="true" />

              <div className="relative overflow-hidden">
                <motion.div style={{ y: imageY }} className="will-change-transform">
                  <RevealImage
                    src={images.projects.grithq}
                    alt="GritHQ commercial architecture — investment and development"
                    containerClassName="aspect-[4/5] md:aspect-[5/6] lg:aspect-[4/5] max-h-[70vh] lg:max-h-[85vh]"
                  />
                </motion.div>
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-grithq-burgundy/20 via-transparent to-grithq-offwhite/10"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-2 flex flex-col justify-center lg:order-none lg:col-span-5">
            <SectionEyebrow>{STRINGS.sections.identity.eyebrow}</SectionEyebrow>

            <DisplayText
              as="h2"
              id="identity-heading"
              className="identity-reveal mt-6 text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.05] text-grithq-burgundy"
            >
              {STRINGS.sections.identity.heading.map((line, i) => (
                <span key={line} className={i > 0 ? 'block' : undefined}>
                  {line}
                </span>
              ))}
            </DisplayText>

            <p className={`identity-reveal mt-6 ${styles.bodyTextMutedLight}`}>
              {STRINGS.sections.identity.subtext}
            </p>

            <div className="identity-principles mt-10 md:mt-12">
              {STRINGS.identity.principles.map((principle) => (
                <IdentityPrinciple
                  key={principle.number}
                  number={principle.number}
                  title={principle.title}
                  text={principle.text}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ─── INVESTMENT FOCUS ─────────────────────────────────────────── */}
        <div className="investment-focus mt-24 md:mt-32 lg:mt-40">
          <div className="max-w-3xl">
            <SectionEyebrow>{focus.eyebrow}</SectionEyebrow>
            <DisplayText
              as="h3"
              className="identity-reveal mt-6 text-[clamp(1.75rem,4.5vw,3.5rem)] text-grithq-burgundy"
            >
              {focus.heading.map((line, i) => (
                <span key={line} className={i > 0 ? 'block' : undefined}>
                  {line}
                </span>
              ))}
            </DisplayText>
            <p className={`identity-reveal mt-6 max-w-2xl ${styles.bodyTextMutedLight}`}>
              {focus.subtext}
            </p>
          </div>

          <div className="investment-focus-grid mt-12 grid gap-px bg-grithq-burgundy/10 md:mt-16 md:grid-cols-12">
            {investmentFocusAreas.map((area, index) => {
              const layoutClasses = [
                'md:col-span-5 md:row-span-1',
                'md:col-span-7',
                'md:col-span-7',
                'md:col-span-5',
              ]
              return (
                <InvestmentAreaCell
                  key={area.id}
                  area={area}
                  layoutClass={layoutClasses[index] ?? ''}
                  isActive={activeFocusIndex === index}
                  isDimmed={activeFocusIndex !== null && activeFocusIndex !== index}
                  onActivate={() => setActiveFocusIndex(index)}
                  onDeactivate={() => setActiveFocusIndex(null)}
                  showImageOnMobile={isMobile}
                />
              )
            })}
          </div>

          {/* Our Approach */}
          <div className="investment-approach mt-16 md:mt-20 lg:mt-24">
            <p className={`${styles.eyebrowLight} identity-reveal`}>{focus.approach.eyebrow}</p>

            <div className="mt-8 hidden items-start gap-0 md:flex">
              {focus.approach.steps.map((step, i) => (
                <div key={step.title} className="approach-step group flex flex-1 items-start">
                  <div className="flex-1 border-t border-grithq-burgundy/15 pt-6 pr-4">
                    <h4 className="font-display text-xs tracking-[0.2em] text-grithq-burgundy transition-colors duration-300 group-hover:text-grithq-deepAccent">
                      {step.title}
                    </h4>
                    <p className={`mt-3 ${styles.bodyTextMutedLight}`}>{step.description}</p>
                  </div>
                  {i < focus.approach.steps.length - 1 && (
                    <div className="flex shrink-0 items-center pt-6" aria-hidden="true">
                      <div className="h-px w-6 bg-grithq-burgundy/20" />
                      <span className="mx-1 font-display text-[10px] text-grithq-mauve/60">→</span>
                      <div className="h-px w-6 bg-grithq-burgundy/20" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-0 md:hidden">
              {focus.approach.steps.map((step, i) => (
                <div key={step.title} className="approach-step">
                  <div className="border-t border-grithq-burgundy/15 py-5">
                    <h4 className="font-display text-xs tracking-[0.2em] text-grithq-burgundy">
                      {step.title}
                    </h4>
                    <p className={`mt-2 ${styles.bodyTextMutedLight}`}>{step.description}</p>
                  </div>
                  {i < focus.approach.steps.length - 1 && (
                    <div className="flex justify-center py-1 text-grithq-mauve/50" aria-hidden="true">
                      ↓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Closing statement */}
          <div className="identity-reveal mt-16 border-t border-grithq-burgundy/10 pt-12 md:mt-20 md:pt-16 lg:mt-24">
            <blockquote className="max-w-3xl">
              <p className="font-display text-[clamp(1.25rem,3vw,2rem)] font-light leading-snug text-grithq-burgundy">
                {focus.closing.statement.map((line, i) => (
                  <span key={line} className={i > 0 ? 'block' : undefined}>
                    {line}
                  </span>
                ))}
              </p>
              <p className={`mt-6 max-w-2xl ${styles.bodyTextMutedLight}`}>
                {focus.closing.supporting}
              </p>
            </blockquote>
            <a
              href={focus.closing.ctaHref}
              className="group mt-8 inline-flex items-center gap-3 font-display text-xs tracking-[0.25em] text-grithq-deepAccent transition-colors duration-300 hover:text-grithq-burgundy"
            >
              {focus.closing.cta}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </a>
          </div>
        </div>

        {/* ─── LEADERSHIP ───────────────────────────────────────────────── */}
        {profile && (
          <div className="leadership-section mt-24 md:mt-32 lg:mt-40">
            <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
              {/* Portrait — first on mobile */}
              <div className="leadership-block order-1 lg:order-none lg:col-span-5 xl:col-span-6">
                <div className="relative overflow-hidden">
                  <div className="absolute left-0 top-0 z-10 h-12 w-px bg-grithq-mauve/30" aria-hidden="true" />
                  <div className="relative aspect-[3/4] max-h-[480px] overflow-hidden md:max-h-[520px] lg:max-h-[600px]">
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

              <div className="leadership-block order-2 flex flex-col justify-center lg:order-none lg:col-span-7 xl:col-span-6">
                <SectionEyebrow>{STRINGS.sections.identity.leadershipEyebrow}</SectionEyebrow>

                <DisplayText
                  as="h3"
                  className="mt-6 text-[clamp(1.75rem,4vw,3rem)] text-grithq-burgundy"
                >
                  {STRINGS.sections.identity.leadershipHeading.map((line, i) => (
                    <span key={line} className={i > 0 ? 'block' : undefined}>
                      {line}
                    </span>
                  ))}
                </DisplayText>

                <div className="mt-10 md:mt-12">
                  <h4 className="font-display text-[clamp(1rem,2.5vw,1.25rem)] tracking-[0.12em] text-grithq-burgundy">
                    {profile.nameDisplay}
                  </h4>
                  <p className={`mt-2 ${styles.eyebrowLight}`}>{profile.role}</p>
                  <p className={`mt-6 max-w-xl ${styles.bodyTextMutedLight}`}>
                    {profile.description}
                  </p>
                </div>

                <div className="leadership-block mt-10 md:mt-12">
                  <div className="inline-block border border-grithq-burgundy/20 bg-grithq-cream/20 px-6 py-5 md:px-8 md:py-6">
                    <p className="font-display text-[10px] tracking-[0.35em] text-grithq-deepAccent md:text-xs">
                      {STRINGS.leadership.boi.organization}
                    </p>
                    <p className="font-display text-[10px] tracking-[0.35em] text-grithq-deepAccent md:text-xs">
                      {STRINGS.leadership.boi.organizationLine2}
                    </p>
                    <div className="my-3 h-px w-full bg-grithq-burgundy/15" aria-hidden="true" />
                    <p className="font-display text-sm tracking-[0.25em] text-grithq-burgundy md:text-base">
                      {STRINGS.leadership.boi.title.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
