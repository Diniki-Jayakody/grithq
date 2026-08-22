import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { contactInfo, grithqOpportunity } from '@/constants/data'
import { STRINGS } from '@/constants/strings'
import { styles } from '@/styles/styles'
import { PageBackLink } from '@/components/navigation/PageBackLink'
import { DisplayText } from '@/components/typography/DisplayText'
import { useLenisScroll } from '@/providers/SmoothScrollProvider'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useCursorState } from '@/hooks/useCursorState'

gsap.registerPlugin(ScrollTrigger)

export function GrithqOpportunity() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollTo } = useLenisScroll()
  const reducedMotion = useReducedMotion()
  const { setCursorState } = useCursorState()
  const hasExternalDrive = grithqOpportunity.driveLink.startsWith('http')

  useEffect(() => {
    scrollTo(0, { offset: 0 })
  }, [scrollTo])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.opportunity-hero-content', {
        y: 48,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.15,
      })

      gsap.fromTo(
        hero.querySelector('.opportunity-hero-img'),
        { scale: 1.1 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )
    }, hero)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <article>
      <section
        ref={heroRef}
        className="relative flex min-h-[70vh] items-end overflow-hidden md:min-h-[85vh]"
      >
        <img
          src={grithqOpportunity.heroImage}
          alt={`${grithqOpportunity.name} building`}
          className="opportunity-hero-img absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-grithq-black via-grithq-black/55 to-grithq-black/20" />

        <div className="opportunity-hero-content relative z-10 w-full section-padding pb-10 pt-28 md:pb-20 md:pt-32">
          <PageBackLink fallback={grithqOpportunity.backHref} variant="dark" />
          <p className="mt-8 font-display text-[10px] tracking-[0.3em] text-grithq-mauve uppercase">
            {STRINGS.opportunity.eyebrow}
          </p>
          <DisplayText as="h1" className="mt-4 text-[clamp(2.25rem,8vw,5.5rem)]">
            {grithqOpportunity.name}
          </DisplayText>
          <p className="mt-4 font-display text-xs tracking-[0.22em] text-grithq-cream/70 uppercase md:text-sm">
            {STRINGS.opportunity.availability}
          </p>
        </div>
      </section>

      <section className="bg-grithq-black section-y">
        <div className={styles.sectionContainer}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="font-display text-xs tracking-[0.4em] text-grithq-mauve uppercase">
                {STRINGS.opportunity.descriptionHeading}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-grithq-cream/65 md:text-lg">
                {grithqOpportunity.description}
              </p>
              <div className="mt-6 space-y-4">
                {grithqOpportunity.overview.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-grithq-cream/50 md:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <h2 className="font-display text-xs tracking-[0.4em] text-grithq-mauve uppercase">
                {STRINGS.opportunity.termsHeading}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="border border-grithq-cream/15 px-6 py-6">
                  <p className="font-display text-[10px] tracking-[0.3em] text-grithq-mauve">
                    {grithqOpportunity.commercialTerms.sale.label}
                  </p>
                  <p className="mt-3 font-display text-xl font-light text-grithq-offwhite md:text-2xl">
                    {grithqOpportunity.commercialTerms.sale.value}
                  </p>
                </div>
                <div className="border border-grithq-cream/15 px-6 py-6">
                  <p className="font-display text-[10px] tracking-[0.3em] text-grithq-mauve">
                    {grithqOpportunity.commercialTerms.rent.label}
                  </p>
                  <p className="mt-3 font-display text-xl font-light text-grithq-offwhite md:text-2xl">
                    {grithqOpportunity.commercialTerms.rent.value}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-20">
            <h2 className="font-display text-xs tracking-[0.4em] text-grithq-mauve uppercase">
              {STRINGS.opportunity.buildingHeading}
            </h2>
            <dl className="mt-6 divide-y divide-grithq-cream/10 border-t border-b border-grithq-cream/10">
              {grithqOpportunity.buildingFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <dt className="text-xs tracking-widest text-grithq-cream/40 uppercase">
                    {fact.label}
                  </dt>
                  <dd className="text-sm break-words text-grithq-cream/75 sm:text-right">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href={grithqOpportunity.driveLink}
              target={hasExternalDrive ? '_blank' : undefined}
              rel={hasExternalDrive ? 'noopener noreferrer' : undefined}
              className={`${styles.ctaButton} w-full px-6 sm:w-auto sm:px-10`}
              onMouseEnter={() => setCursorState('open')}
              onMouseLeave={() => setCursorState('default')}
            >
              <span className="inline-flex items-center gap-2">
                {STRINGS.opportunity.photosCta}
              </span>
            </a>
            <Link
              to={grithqOpportunity.inquiryHref}
              className={`${styles.ctaButton} w-full border-grithq-mauve/40 bg-grithq-mauve/10 px-6 sm:w-auto sm:px-10`}
              onMouseEnter={() => setCursorState('open')}
              onMouseLeave={() => setCursorState('default')}
            >
              {STRINGS.opportunity.inquiryCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-grithq-cream/10 bg-grithq-warm section-y">
        <div className={styles.sectionContainer}>
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-light text-grithq-offwhite">
            {STRINGS.opportunity.inquiryHeading}
          </h2>
          <p className={`mt-4 max-w-xl ${styles.bodyTextMuted}`}>
            {STRINGS.opportunity.inquiryIntro}
          </p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <dt className="font-display text-[10px] tracking-[0.3em] text-grithq-mauve uppercase">
                {STRINGS.opportunity.contactPersonLabel}
              </dt>
              <dd className="mt-2 text-sm text-grithq-cream/70">{contactInfo.contactPerson}</dd>
            </div>
            <div>
              <dt className="font-display text-[10px] tracking-[0.3em] text-grithq-mauve uppercase">
                {STRINGS.opportunity.phoneLabel}
              </dt>
              <dd className="mt-2 text-sm text-grithq-cream/70">{contactInfo.phone}</dd>
            </div>
            <div>
              <dt className="font-display text-[10px] tracking-[0.3em] text-grithq-mauve uppercase">
                {STRINGS.opportunity.emailLabel}
              </dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm text-grithq-cream/70 underline-offset-4 transition-colors hover:text-grithq-offwhite hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grithq-mauve/70"
                >
                  {contactInfo.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-display text-[10px] tracking-[0.3em] text-grithq-mauve uppercase">
                {STRINGS.opportunity.whatsappLabel}
              </dt>
              <dd className="mt-2">
                <a
                  href={contactInfo.whatsapp}
                  className="text-sm text-grithq-cream/70 underline-offset-4 transition-colors hover:text-grithq-offwhite hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grithq-mauve/70"
                >
                  {contactInfo.whatsappDisplay}
                </a>
              </dd>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <dt className="font-display text-[10px] tracking-[0.3em] text-grithq-mauve uppercase">
                {STRINGS.opportunity.locationLabel}
              </dt>
              <dd className="mt-2 text-sm text-grithq-cream/70">{contactInfo.address}</dd>
            </div>
          </dl>

          <Link
            to={grithqOpportunity.inquiryHref}
            className={`${styles.ctaButton} mt-10 w-full px-6 sm:w-auto sm:px-10`}
            onMouseEnter={() => setCursorState('open')}
            onMouseLeave={() => setCursorState('default')}
          >
            {STRINGS.opportunity.inquiryCta}
          </Link>
        </div>
      </section>
    </article>
  )
}
