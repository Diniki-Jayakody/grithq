import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { contactInfo, gritHQPropertyData } from '@/constants/data'
import { STRINGS } from '@/constants/strings'
import { styles } from '@/styles/styles'
import { PageBackLink } from '@/components/navigation/PageBackLink'
import { DisplayText } from '@/components/typography/DisplayText'
import { OpportunityInquiryForm } from '@/components/forms/OpportunityInquiryForm'
import { useLenisScroll } from '@/providers/SmoothScrollProvider'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useCursorState } from '@/hooks/useCursorState'

gsap.registerPlugin(ScrollTrigger)

function OpportunityHeading({ children }: { children: ReactNode }) {
  return <h2 className={styles.opportunityHeading}>{children}</h2>
}

export function GrithqOpportunity() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollTo } = useLenisScroll()
  const reducedMotion = useReducedMotion()
  const { setCursorState } = useCursorState()
  const property = gritHQPropertyData

  useEffect(() => {
    window.scrollTo(0, 0)
    scrollTo(0, { offset: 0, immediate: true })
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
    <article className="overflow-x-hidden">
      <section
        ref={heroRef}
        className="relative flex min-h-[58vh] items-end overflow-hidden md:min-h-[72vh]"
      >
        <img
          src={property.heroImage}
          alt={`${property.name} building in Battaramulla`}
          className="opportunity-hero-img absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-grithq-black via-grithq-black/55 to-grithq-black/20" />

        <div className="opportunity-hero-content relative z-10 w-full section-padding pb-10 pt-28 md:pb-16 md:pt-32">
          <PageBackLink fallback={property.backHref} variant="dark" />
          <p className="mt-8 font-display text-[10px] tracking-[0.3em] text-grithq-mauve uppercase">
            {STRINGS.opportunity.eyebrow}
          </p>
          <DisplayText as="h1" className="mt-4 text-[clamp(2.25rem,8vw,5.5rem)]">
            {property.name}
          </DisplayText>
          <p className="mt-4 font-display text-xs tracking-[0.22em] text-grithq-cream/70 uppercase md:text-sm">
            {STRINGS.opportunity.availability}
          </p>
        </div>
      </section>

      <section className={`bg-grithq-black ${styles.opportunitySection}`}>
        <div className={styles.sectionContainer}>
          <OpportunityHeading>{STRINGS.opportunity.termsHeading}</OpportunityHeading>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="border border-grithq-cream/15 px-6 py-6">
              <p className="font-display text-[10px] tracking-[0.3em] text-grithq-mauve uppercase">
                {property.commercialTerms.sale.label}
              </p>
              <p className="mt-3 font-display text-xl font-light text-grithq-offwhite md:text-2xl">
                {property.commercialTerms.sale.value}
              </p>
            </div>
            <div className="border border-grithq-cream/15 px-6 py-6">
              <p className="font-display text-[10px] tracking-[0.3em] text-grithq-mauve uppercase">
                {property.commercialTerms.rent.label}
              </p>
              <p className="mt-3 font-display text-xl font-light text-grithq-offwhite md:text-2xl">
                {property.commercialTerms.rent.value}
              </p>
            </div>
          </div>

          <div className="mt-14 md:mt-16">
            <OpportunityHeading>{STRINGS.opportunity.summaryHeading}</OpportunityHeading>
            <div className="mt-6 max-w-3xl space-y-4">
              {property.executiveSummary.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-grithq-cream/60 md:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-14 md:mt-16">
            <OpportunityHeading>{STRINGS.opportunity.figuresHeading}</OpportunityHeading>
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-grithq-cream/10 pt-6 sm:grid-cols-3 lg:grid-cols-5">
              {property.keyFigures.map((figure) => (
                <div key={figure.label} className="min-w-0">
                  <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-light text-grithq-offwhite">
                    {figure.value}
                  </p>
                  <p className="mt-2 font-display text-[10px] tracking-[0.22em] text-grithq-cream/45">
                    {figure.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`border-t border-grithq-cream/10 bg-grithq-black ${styles.opportunitySection}`}>
        <div className={styles.sectionContainer}>
          <OpportunityHeading>{STRINGS.opportunity.specsHeading}</OpportunityHeading>
          <dl className="mt-6 divide-y divide-grithq-cream/10 border-t border-b border-grithq-cream/10">
            {property.specifications.map((floor) => (
              <div
                key={floor.name}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <dt className="text-xs tracking-widest text-grithq-cream/40 uppercase">
                  {floor.name}
                </dt>
                <dd className="text-sm break-words text-grithq-cream/75 sm:text-right">
                  {floor.details.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
          <p className={`mt-6 max-w-2xl ${styles.bodyTextMuted}`}>
            {property.additionalParking}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {property.floorConfiguration.map((item) => (
              <div key={item.title} className="border border-grithq-cream/10 px-6 py-5">
                <h3 className="font-display text-sm tracking-[0.18em] text-grithq-offwhite uppercase">
                  {item.title}
                </h3>
                <p className={`mt-3 ${styles.bodyTextMuted}`}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`border-t border-grithq-cream/10 bg-grithq-warm ${styles.opportunitySection}`}>
        <div className={styles.sectionContainer}>
          <OpportunityHeading>{STRINGS.opportunity.workspaceHeading}</OpportunityHeading>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {property.workspace.map((item) => (
              <div key={item.title} className="border border-grithq-cream/10 px-6 py-5">
                <h3 className="font-display text-[10px] tracking-[0.28em] text-grithq-mauve uppercase">
                  {item.title}
                </h3>
                <p className="mt-3 font-display text-lg font-light text-grithq-offwhite">
                  {item.value}
                </p>
                {'note' in item && item.note && (
                  <p className="mt-2 text-xs text-grithq-cream/45">{item.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`border-t border-grithq-cream/10 bg-grithq-black ${styles.opportunitySection}`}>
        <div className={styles.sectionContainer}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <OpportunityHeading>{STRINGS.opportunity.featuresHeading}</OpportunityHeading>
              <ul className="mt-6 space-y-3">
                {property.features.map((feature) => (
                  <li
                    key={feature}
                    className="border-b border-grithq-cream/10 pb-3 text-sm leading-relaxed text-grithq-cream/65 last:border-b-0"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              <OpportunityHeading>{STRINGS.opportunity.locationHeading}</OpportunityHeading>
              <dl className="mt-6 space-y-5">
                {property.locationBenefits.map((benefit) => (
                  <div key={benefit.title}>
                    <dt className="font-display text-[10px] tracking-[0.28em] text-grithq-mauve uppercase">
                      {benefit.title}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-grithq-cream/65">
                      {benefit.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-12 border-t border-grithq-cream/10 pt-10">
            <OpportunityHeading>{STRINGS.opportunity.photosHeading}</OpportunityHeading>

            {/* Property Location */}
            <a
              href="https://maps.app.goo.gl/rn2m3xMSUspSxbqA9"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.ctaButton} mt-6 w-full px-6 sm:w-auto sm:px-10`}
              onMouseEnter={() => setCursorState('open')}
              onMouseLeave={() => setCursorState('default')}
            >
              View on Map
            </a>

            {/* Building Photos */}
            <a
              href={property.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.ctaButton} mt-3 w-full px-6 sm:w-auto sm:px-10`}
              onMouseEnter={() => setCursorState('open')}
              onMouseLeave={() => setCursorState('default')}
            >
              {STRINGS.opportunity.photosCta}
            </a>
          </div>

        </div>
      </section>

      <section
        id="inquiry"
        className={`scroll-mt-28 border-t border-grithq-cream/10 bg-grithq-warm ${styles.opportunitySection}`}
      >
        <div className={styles.sectionContainer}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-light text-grithq-offwhite">
                {STRINGS.opportunity.inquiryHeading}
              </h2>
              <p className={`mt-4 max-w-xl ${styles.bodyTextMuted}`}>
                {STRINGS.opportunity.inquiryIntro}
              </p>

              <dl className="mt-8 space-y-5">
                <div>
                  <dt className="font-display text-[10px] tracking-[0.3em] text-grithq-mauve uppercase">
                    {STRINGS.opportunity.contactPersonLabel}
                  </dt>
                  <dd className="mt-2 text-sm text-grithq-cream/70">{contactInfo.contactPerson}</dd>
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
                    {STRINGS.opportunity.locationLabel}
                  </dt>
                  <dd className="mt-2 text-sm text-grithq-cream/70">{contactInfo.address}</dd>
                </div>
              </dl>
            </div>

            <div className="min-w-0 lg:col-span-7">
              <OpportunityInquiryForm />
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
