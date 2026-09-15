import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/typography/SectionLabel'
import { DisplayText } from '@/components/typography/DisplayText'
import {
  getPrimaryPortfolioProject,
  getSecondaryPortfolioProjects,
  gritHQPropertyData,
  type Project,
} from '@/constants/data'
import { STRINGS } from '@/constants/strings'
import { ROUTES } from '@/constants/links'
import { styles } from '@/styles/styles'
import { useCursorState } from '@/hooks/useCursorState'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

function FeaturedOpportunity({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null)
  const { setCursorState } = useCursorState()
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const href = project.deal?.route ?? ROUTES.grithqOpportunity

  useEffect(() => {
    const card = cardRef.current
    if (!card || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from(card.querySelector('.portfolio-featured-content'), {
        scrollTrigger: { trigger: card, start: 'top 78%' },
        y: 32,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })

      gsap.fromTo(
        card.querySelector('img'),
        { scale: 1.08 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      )
    }, card)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <article ref={cardRef} className="portfolio-project min-w-0">
      <Link
        to={href}
        className="group block"
        onMouseEnter={() => !isMobile && setCursorState('view-project')}
        onMouseLeave={() => !isMobile && setCursorState('default')}
        aria-label={`${project.name}: ${STRINGS.portfolio.viewOpportunity}`}
      >
        <div className="relative overflow-hidden">
          <div className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[2/1] lg:max-h-[56vh]">
            <img
              src={project.heroImage}
              alt={`${project.name} commercial building`}
              loading="lazy"
              className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-grithq-burgundy/85 via-grithq-burgundy/25 to-transparent" />
          <div className="absolute top-5 left-5 md:top-8 md:left-8">
            <span className="font-display text-[10px] tracking-[0.3em] text-grithq-cream">
              {STRINGS.portfolio.currentOpportunity}
            </span>
          </div>
          <div className="portfolio-featured-content absolute right-5 bottom-5 left-5 md:right-8 md:bottom-8 md:left-8">
            <h3 className="font-display text-[clamp(2rem,6vw,4.5rem)] font-light tracking-tight text-grithq-offwhite">
              {project.name}
            </h3>
          </div>
        </div>
      </Link>

      <div className={`${styles.opportunityDealPanel} mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between md:mt-6`}>
        <div>
          <p className={styles.eyebrowLight}>{STRINGS.portfolio.availableFor}</p>
          <p className="mt-2 font-display text-[clamp(1.35rem,3vw,2rem)] font-light tracking-tight text-grithq-burgundy">
            {STRINGS.portfolio.saleRent}
          </p>
          <p className="mt-2 text-xs tracking-[0.12em] text-grithq-burgundy/55">
            {gritHQPropertyData.commercialTerms.sale.label}: {gritHQPropertyData.commercialTerms.sale.value}
            <span className="mx-2 text-grithq-burgundy/25" aria-hidden="true">
              ·
            </span>
            {gritHQPropertyData.commercialTerms.rent.label}: {gritHQPropertyData.commercialTerms.rent.value}
          </p>
        </div>
        <Link
          to={href}
          className={`${styles.ctaButtonLight} min-h-11 w-full px-6 sm:w-auto`}
          onMouseEnter={() => !isMobile && setCursorState('open')}
          onMouseLeave={() => !isMobile && setCursorState('default')}
        >
          {STRINGS.portfolio.viewOpportunity}
        </Link>
      </div>
    </article>
  )
}

function SecondaryProject({
  project,
  imageClassName,
  fill = false,
}: {
  project: Project
  imageClassName: string
  fill?: boolean
}) {
  const { setCursorState } = useCursorState()
  const isMobile = useIsMobile()

  return (
    <article className={`portfolio-secondary min-w-0 ${fill ? 'lg:h-full' : ''}`}>
      <Link
        to={ROUTES.project(project.slug)}
        className={`group block ${fill ? 'lg:flex lg:h-full lg:flex-col' : ''}`}
        onMouseEnter={() => !isMobile && setCursorState('view-project')}
        onMouseLeave={() => !isMobile && setCursorState('default')}
      >
        <div
          className={`relative overflow-hidden ${
            fill
              ? `${imageClassName} lg:min-h-0 lg:flex-1 lg:aspect-auto`
              : imageClassName
          }`}
        >
          <img
            src={project.heroImage}
            alt={project.name}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-grithq-burgundy/45 via-transparent to-transparent" />
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-[clamp(1.2rem,2.4vw,1.75rem)] font-light tracking-tight text-grithq-burgundy">
              {project.name}
            </h3>
            {project.status === 'Under Development' && (
              <p className="mt-2 font-display text-[10px] tracking-[0.28em] text-grithq-deepAccent uppercase">
                {project.status}
              </p>
            )}
            {project.valueStatement && (
              <p className="mt-2 max-w-sm font-display text-sm font-light leading-snug text-grithq-burgundy/70">
                {project.valueStatement}
              </p>
            )}
          </div>
          <span className="mt-1 hidden shrink-0 font-display text-[10px] tracking-[0.28em] text-grithq-mauve uppercase lg:inline">
            {STRINGS.portfolio.viewProject}
          </span>
        </div>
      </Link>
    </article>
  )
}

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const featured = getPrimaryPortfolioProject()
  const secondary = getSecondaryPortfolioProjects()
  const asayaSands = secondary[0]
  const asayaSummit = secondary[1]
  const southBeach = secondary[2]

  useEffect(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.portfolio-secondary', {
        scrollTrigger: { trigger: '.portfolio-secondary-flow', start: 'top 85%' },
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      })
    }, section)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className={`${styles.sectionPortfolio} border-t border-grithq-burgundy/5`}
      aria-labelledby="portfolio-heading"
    >
      <div className={styles.sectionContainer}>
        <SectionLabel variant="light">
          {STRINGS.sections.portfolio.label}
        </SectionLabel>
        <DisplayText
          as="h2"
          id="portfolio-heading"
          className="mt-6 text-[clamp(1.75rem,4vw,3.5rem)] text-grithq-burgundy"
        >
          {STRINGS.sections.portfolio.heading}
        </DisplayText>
        <p className={`mt-4 max-w-lg ${styles.bodyTextMutedLight}`}>
          {STRINGS.sections.portfolio.subtext}
        </p>

        <div className="mt-10 md:mt-12">
          {featured && <FeaturedOpportunity project={featured} />}

          <div className="portfolio-secondary-flow mt-12 md:mt-16 lg:mt-20">
            <div className="grid items-start gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-12">
              {asayaSands && (
                <div className="lg:col-span-7">
                  <SecondaryProject
                    project={asayaSands}
                    imageClassName="aspect-[16/10]"
                  />
                </div>
              )}
              {asayaSummit && (
                <div className="lg:col-span-5 lg:row-span-2">
                  <SecondaryProject
                    project={asayaSummit}
                    imageClassName="aspect-[16/11]"
                    fill
                  />
                </div>
              )}
              {southBeach && (
                <div className="md:col-span-2 lg:col-span-7">
                  <SecondaryProject
                    project={southBeach}
                    imageClassName="aspect-[16/10] sm:aspect-[2/1] lg:aspect-[16/10]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
