import { useEffect, useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getProjectBySlug, getAdjacentProjects } from '@/constants/data'
import { STRINGS } from '@/constants/strings'
import { ROUTES } from '@/constants/links'
import { styles } from '@/styles/styles'
import { DisplayText } from '@/components/typography/DisplayText'
import { PageBackLink } from '@/components/navigation/PageBackLink'
import { useCursorState } from '@/hooks/useCursorState'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useLenisScroll } from '@/providers/SmoothScrollProvider'
import { useIsMobile } from '@/hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

export function Project() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  const adjacent = slug ? getAdjacentProjects(slug) : null
  const { setCursorState } = useCursorState()
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const { scrollTo } = useLenisScroll()
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    scrollTo(0, { offset: 0, immediate: true })
    ScrollTrigger.refresh()
  }, [slug, scrollTo])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.project-hero-content', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2,
      })

      gsap.fromTo(
        hero.querySelector('.project-hero-img'),
        { scale: 1.12 },
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
  }, [slug, reducedMotion])

  if (!project) {
    return <Navigate to="/" replace />
  }

  const websiteCopy = STRINGS.project.websiteLink

  return (
    <article>
      <section ref={heroRef} className="relative flex min-h-[70vh] items-end overflow-hidden md:min-h-[85vh]">
        <img
          src={project.heroImage}
          alt={project.name}
          className="project-hero-img absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-grithq-black via-grithq-black/50 to-grithq-black/20" />

        <div className="project-hero-content relative z-10 w-full section-padding pb-12 pt-28 md:pb-24">
          <PageBackLink fallback={ROUTES.portfolio} variant="dark" />
          <span className="mt-8 block font-display text-[10px] tracking-[0.3em] text-grithq-mauve">
            {project.category}
          </span>
          <DisplayText as="h1" className="mt-4 text-[clamp(2.5rem,8vw,6rem)]">
            {project.name}
          </DisplayText>
          <div className="mt-4 flex flex-wrap gap-4 text-[10px] tracking-widest text-grithq-cream/40 uppercase md:mt-6 md:gap-6">
            <span>{project.location}</span>
            <span className="hidden h-3 w-px bg-grithq-cream/20 sm:block" />
            <span>{project.status}</span>
            <span className="hidden h-3 w-px bg-grithq-cream/20 sm:block" />
            <span>{project.year}</span>
          </div>
        </div>
      </section>

      <section className="section-y bg-grithq-black">
        <div className="mx-auto max-w-7xl section-padding">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <h2 className="font-display text-xs tracking-[0.4em] text-grithq-mauve uppercase">
                {STRINGS.project.overview}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-grithq-cream/60 md:text-lg">
                {project.description}
              </p>
              <div className="mt-8 space-y-4">
                {project.overview.map((para) => (
                  <p key={para} className="text-sm leading-relaxed text-grithq-cream/50 md:text-base">
                    {para}
                  </p>
                ))}
              </div>
              {project.websiteHref && (
                <p className="mt-8 text-sm leading-relaxed text-grithq-cream/50 md:text-base">
                  {websiteCopy.before}
                  <a
                    href={project.websiteHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.inlineLinkDark}
                    onMouseEnter={() => !isMobile && setCursorState('open')}
                    onMouseLeave={() => !isMobile && setCursorState('default')}
                  >
                    {websiteCopy.linkLabel}
                  </a>
                  {websiteCopy.after}
                </p>
              )}
            </div>

            <div className="lg:col-span-5">
              <h2 className="font-display text-xs tracking-[0.4em] text-grithq-mauve uppercase">
                {STRINGS.project.keyInformation}
              </h2>
              <dl className="mt-6 space-y-4 border-t border-grithq-cream/10 pt-6">
                {[
                  ['Location', project.location],
                  ['Status', project.status],
                  ['Development Type', project.developmentType],
                  ['Year', project.year],
                  ['Category', project.category],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 border-b border-grithq-cream/5 pb-4">
                    <dt className="text-xs tracking-widest text-grithq-cream/35 uppercase">{label}</dt>
                    <dd className="text-right text-sm text-grithq-cream/70">{value}</dd>
                  </div>
                ))}
              </dl>

              <h2 className="mt-10 font-display text-xs tracking-[0.4em] text-grithq-mauve uppercase">
                {STRINGS.project.vision}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-grithq-cream/55 md:text-base">
                {project.vision}
              </p>
            </div>
          </div>

          {project.gallery.length > 0 && (
            <div className="mt-20 lg:mt-28">
              <h2 className="font-display text-xs tracking-[0.4em] text-grithq-mauve uppercase">
                {STRINGS.project.gallery}
              </h2>
              <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:gap-6">
                {project.gallery.map((image, i) => (
                  <img
                    key={`${project.id}-${i}`}
                    src={image}
                    alt={`${project.name} ${i + 1}`}
                    loading="lazy"
                    className="mb-4 w-full lg:mb-6"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {adjacent && (
        <section className="border-t border-grithq-cream/10 bg-grithq-warm">
          <div className="mx-auto max-w-7xl section-padding py-16 md:py-24">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <div>
                <p className="font-display text-[10px] tracking-[0.3em] text-grithq-cream/35 uppercase">
                  {STRINGS.project.viewing} {project.name}
                </p>
                <p className="mt-3 font-display text-xs tracking-[0.3em] text-grithq-mauve">
                  {STRINGS.project.nextProject}
                </p>
              </div>
              <Link
                to={ROUTES.portfolio}
                className="font-display text-[10px] tracking-[0.3em] text-grithq-cream/30 uppercase transition-colors hover:text-grithq-offwhite"
              >
                {STRINGS.project.viewAllPortfolio}
              </Link>
            </div>

            <Link
              to={adjacent.next.deal?.route ?? ROUTES.project(adjacent.next.slug)}
              className="group mt-8 grid overflow-hidden border border-grithq-cream/10 md:grid-cols-12"
              aria-label={`${STRINGS.project.nextProject}: ${adjacent.next.name}`}
              onMouseEnter={() => setCursorState('view-project')}
              onMouseLeave={() => setCursorState('default')}
            >
              <div className="relative aspect-[16/10] overflow-hidden md:col-span-5 md:aspect-auto md:min-h-[220px]">
                <img
                  src={adjacent.next.heroImage}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col justify-center px-6 py-8 md:col-span-7 md:px-10 md:py-12">
                <span className="text-xs tracking-widest text-grithq-cream/40 uppercase">
                  {adjacent.next.category}
                </span>
                <h3 className="mt-3 font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-light text-grithq-offwhite">
                  {adjacent.next.name}
                </h3>
                <span className="mt-5 inline-block font-display text-[10px] tracking-[0.35em] text-grithq-mauve uppercase">
                  {STRINGS.project.continue}
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}
    </article>
  )
}
