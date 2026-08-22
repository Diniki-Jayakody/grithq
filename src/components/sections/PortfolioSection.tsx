import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/typography/SectionLabel'
import { DisplayText } from '@/components/typography/DisplayText'
import { projects } from '@/constants/data'
import { STRINGS } from '@/constants/strings'
import { styles } from '@/styles/styles'
import { useCursorState } from '@/hooks/useCursorState'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

function PortfolioProject({
  project,
  index,
  variant,
}: {
  project: (typeof projects)[0]
  index: number
  variant: 'desktop' | 'mobile'
}) {
  const cardRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const { setCursorState } = useCursorState()
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  useEffect(() => {
    const card = cardRef.current
    const image = imageRef.current
    if (!card || !image || reducedMotion || variant === 'mobile') return

    const ctx = gsap.context(() => {
      gsap.from(card.querySelector('.portfolio-content'), {
        scrollTrigger: { trigger: card, start: 'top 75%' },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.fromTo(
        image.querySelector('img'),
        { scale: 1.15 },
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
  }, [reducedMotion, variant])

  return (
    <article
      ref={cardRef}
      className={`portfolio-project ${variant === 'desktop' ? 'py-16 md:py-20' : 'mb-12'}`}
    >
      <Link
        to={`/portfolio/${project.slug}`}
        className="group block"
        onMouseEnter={() => !isMobile && setCursorState('view-project')}
        onMouseLeave={() => !isMobile && setCursorState('default')}
      >
        <div
          ref={imageRef}
          className={`relative overflow-hidden rounded-sm ${variant === 'desktop' ? 'aspect-[16/9] max-h-[70vh]' : 'aspect-[4/5]'}`}
        >
          <img
            src={project.heroImage}
            alt={project.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-grithq-burgundy/80 via-grithq-burgundy/20 to-transparent" />
          <span className="absolute top-6 left-6 font-display text-[10px] tracking-[0.3em] text-grithq-cream md:top-10 md:left-10">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div
          className={`portfolio-content ${variant === 'desktop' ? 'mt-8 grid gap-8 md:grid-cols-12 md:gap-12' : 'mt-6'}`}
        >
          <div className={variant === 'desktop' ? 'md:col-span-7' : ''}>
            <h3 className="font-display text-[clamp(2rem,5vw,4rem)] font-light tracking-tight text-grithq-burgundy">
              {project.name}
            </h3>
            <p className="mt-2 text-xs tracking-[0.25em] text-grithq-burgundy/50 uppercase">
              {project.category}
            </p>
          </div>
          <div
            className={
              variant === 'desktop' ? 'md:col-span-5 md:flex md:flex-col md:justify-end' : ''
            }
          >
            <p className={styles.bodyTextMutedLight}>{project.shortDescription}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-grithq-burgundy/45">
              <span>{project.location}</span>
              <span className="hidden h-3 w-px bg-grithq-burgundy/20 sm:block" />
              <span>{project.status}</span>
            </div>
            <span className="mt-6 inline-block font-display text-[10px] tracking-[0.35em] text-grithq-deepAccent uppercase transition-colors group-hover:text-grithq-burgundy">
              {STRINGS.portfolio.exploreProject}
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className={`${styles.sectionPortfolio} border-t border-grithq-burgundy/5`}
      aria-labelledby="portfolio-heading"
    >
      <div className={styles.sectionContainer}>
        <SectionLabel number={STRINGS.sections.portfolio.number} variant="light">
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

        <div className="mt-12 md:mt-20">
          {projects.map((project, index) => (
            <PortfolioProject
              key={project.id}
              project={project}
              index={index}
              variant={isMobile ? 'mobile' : 'desktop'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
