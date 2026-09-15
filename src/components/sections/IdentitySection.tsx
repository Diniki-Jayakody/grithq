import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { DisplayText } from '@/components/typography/DisplayText'
import {
  investmentFocusAreas,
  leadershipProfiles,
  leadershipCredentials,
  identityVisual,
} from '@/constants/data'
import { STRINGS } from '@/constants/strings'
import { ROUTES } from '@/constants/links'
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

function InvestmentAreaCell({
  area,
  layoutClass,
  isActive,
  isDimmed,
  onActivate,
  onDeactivate,
}: {
  area: (typeof investmentFocusAreas)[0]
  layoutClass: string
  isActive: boolean
  isDimmed: boolean
  onActivate: () => void
  onDeactivate: () => void
}) {
  return (
    <motion.article
      className={`focus-area relative overflow-hidden border border-grithq-burgundy/10 ${layoutClass}`}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      animate={{
        opacity: isDimmed ? 0.72 : 1,
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0">
        <motion.img
          src={area.image}
          alt={`${area.title} investment focus`}
          className="h-full w-full object-cover"
          animate={{
            scale: isActive ? 1.06 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="absolute inset-0 bg-grithq-offwhite"
          animate={{ opacity: isActive ? 0.52 : 0.68 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-grithq-burgundy/25 via-transparent to-grithq-burgundy/10" aria-hidden="true" />
      </div>

      <div className="relative z-10 flex h-full min-h-[180px] flex-col justify-between p-6 md:min-h-[220px] md:p-8 lg:min-h-[250px] lg:p-10">
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
      </div>
    </motion.article>
  )
}

export function IdentitySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const profile = leadershipProfiles[0]
  const [activeFocusIndex, setActiveFocusIndex] = useState<number | null>(null)

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
        scrollTrigger: { trigger: '.investment-focus-grid', start: 'top 88%' },
        y: 32,
        opacity: 0,
        duration: 0.85,
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
  const identity = STRINGS.sections.identity

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
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          <div className="min-w-0 lg:col-span-6">
            <SectionEyebrow>{identity.eyebrow}</SectionEyebrow>
            <DisplayText
              as="h2"
              id="identity-heading"
              className={`identity-reveal ${styles.identityFocusHeading}`}
            >
              {identity.heading.map((line, i) => (
                <span key={line} className={i > 0 ? 'block' : undefined}>
                  {line}
                </span>
              ))}
            </DisplayText>
            <p className={`identity-reveal mt-6 max-w-2xl ${styles.bodyTextMutedLight}`}>
              {identity.subtext}
            </p>
          </div>

          <div className="identity-reveal min-w-0 lg:col-span-6">
            <div className="relative overflow-hidden border border-grithq-burgundy/10">
              <div className="aspect-[4/5] max-h-[420px] overflow-hidden md:max-h-[480px] lg:max-h-[560px]">
                <img
                  src={identityVisual.image}
                  alt={identityVisual.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-grithq-burgundy/35 via-transparent to-grithq-burgundy/10"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ─── INVESTMENT FOCUS ─────────────────────────────────────────── */}
        <div className="investment-focus mt-16 md:mt-24 lg:mt-28">
          <div className="max-w-3xl">
            <SectionEyebrow>{focus.eyebrow}</SectionEyebrow>
            <DisplayText
              as="h3"
              className={`identity-reveal ${styles.identityFocusHeading}`}
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

          <div className="investment-focus-grid mt-10 grid gap-px bg-grithq-burgundy/10 md:mt-14 md:grid-cols-12">
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
                />
              )
            })}
          </div>

          <div className="identity-reveal mt-14 border-t border-grithq-burgundy/10 pt-10 md:mt-16 md:pt-14">
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
              className="group mt-8 inline-flex items-center gap-3 font-display text-xs tracking-[0.25em] text-grithq-deepAccent transition-colors duration-300 hover:text-grithq-burgundy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grithq-mauve/70 focus-visible:ring-offset-2 focus-visible:ring-offset-grithq-offwhite"
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
          <div id="leadership" className="leadership-section mt-16 md:mt-24 lg:mt-28">
            <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
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
                <SectionEyebrow>{identity.leadershipEyebrow}</SectionEyebrow>

                <DisplayText
                  as="h3"
                  className={styles.identityFocusHeading}
                >
                  {identity.leadershipHeading.map((line, i) => (
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

                <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12">
                  {leadershipCredentials.map((credential) => (
                    <div key={credential.id} className={styles.credentialBlock}>
                      <p className="font-display text-[10px] tracking-[0.35em] text-grithq-deepAccent md:text-xs">
                        {credential.role}
                      </p>
                      <div className="my-3 h-px w-full bg-grithq-burgundy/15" aria-hidden="true" />
                      <p className="font-display text-sm tracking-[0.18em] text-grithq-burgundy md:text-base">
                        {credential.organization}
                      </p>
                      {credential.organizationLine2 && (
                        <p className="mt-1 font-display text-[10px] tracking-[0.28em] text-grithq-burgundy/70 md:text-xs">
                          {credential.organizationLine2}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <Link
                  to={ROUTES.messageFromMangala}
                  className="group mt-10 inline-flex items-center gap-3 font-display text-xs tracking-[0.22em] text-grithq-deepAccent transition-colors duration-300 hover:text-grithq-burgundy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grithq-mauve/70 focus-visible:ring-offset-2 focus-visible:ring-offset-grithq-offwhite md:mt-12"
                >
                  {STRINGS.leadership.messageCta}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
