import { useRef, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/typography/SectionLabel'
import { DisplayText } from '@/components/typography/DisplayText'
import { investedBusinesses, type InvestedBusiness } from '@/constants/data'
import { STRINGS } from '@/constants/strings'
import { styles } from '@/styles/styles'
import { useCursorState } from '@/hooks/useCursorState'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

function FlowArrow({
  variant,
  className = '',
}: {
  variant: 'right' | 'down' | 'down-left'
  className?: string
}) {
  if (variant === 'down') {
    return (
      <svg
        viewBox="0 0 40 56"
        fill="none"
        aria-hidden="true"
        className={`h-10 w-8 text-grithq-mauve/45 ${className}`}
      >
        <path
          d="M20 3 C 14 18, 28 28, 18 40"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="M12 36 L 18 46 L 26 35"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (variant === 'down-left') {
    return (
      <svg
        viewBox="0 0 180 48"
        fill="none"
        aria-hidden="true"
        className={`h-10 w-40 text-grithq-mauve/40 ${className}`}
      >
        <path
          d="M168 8 C 130 6, 96 36, 28 28"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="M38 20 L 22 29 L 40 36"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 120 36"
      fill="none"
      aria-hidden="true"
      className={`h-8 w-20 text-grithq-mauve/45 md:h-9 md:w-24 ${className}`}
    >
      <path
        d="M4 22 C 28 8, 58 30, 96 16"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M86 10 L 108 16 L 88 26"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function InvestedProject({
  business,
  imageClassName = 'aspect-[16/10]',
}: {
  business: InvestedBusiness
  imageClassName?: string
}) {
  const { setCursorState } = useCursorState()
  const isMobile = useIsMobile()

  return (
    <a
      href={business.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${STRINGS.investorFor.visit} ${business.name}`}
      className="investor-project group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grithq-mauve/70 focus-visible:ring-offset-2 focus-visible:ring-offset-grithq-offwhite"
      onMouseEnter={() => !isMobile && setCursorState('open')}
      onMouseLeave={() => !isMobile && setCursorState('default')}
    >
      <div className={`relative overflow-hidden border border-grithq-burgundy/10 ${imageClassName}`}>
        <img
          src={business.image}
          alt={business.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-grithq-burgundy/25 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 md:mt-4">
        <h3 className="font-display text-[clamp(1.05rem,2.2vw,1.45rem)] font-light tracking-tight text-grithq-burgundy transition-colors duration-300 group-hover:text-grithq-deepAccent">
          {business.name}
        </h3>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-grithq-mauve/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-grithq-deepAccent"
          strokeWidth={1.4}
        />
      </div>
    </a>
  )
}

export function InvestorForSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const flashHealth = investedBusinesses[0]
  const dossiers = investedBusinesses[1]
  const rootstone = investedBusinesses[2]
  const magicUnbound = investedBusinesses[3]

  useEffect(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.investor-project', {
        scrollTrigger: { trigger: '.investor-for-flow', start: 'top 82%' },
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }, section)

    return () => ctx.revert()
  }, [reducedMotion])

  if (!flashHealth || !dossiers || !rootstone || !magicUnbound) return null

  return (
    <section
      id="investor-for"
      ref={sectionRef}
      className={`${styles.sectionLight} border-t border-grithq-burgundy/5`}
      aria-labelledby="investor-for-heading"
    >
      <div className={styles.sectionContainer}>
        <SectionLabel variant="light">
          {STRINGS.sections.investorFor.eyebrow}
        </SectionLabel>
        <DisplayText
          as="h2"
          id="investor-for-heading"
          className={styles.identityFocusHeading}
        >
          {STRINGS.sections.investorFor.heading}
        </DisplayText>
        <p className={`mt-4 max-w-lg ${styles.bodyTextMutedLight}`}>
          {STRINGS.sections.investorFor.subtext}
        </p>

        <div className="investor-for-flow mt-10 grid grid-cols-1 items-start md:mt-12 md:grid-cols-12 md:gap-x-5 lg:gap-x-8">
          <div className="md:col-span-5 md:col-start-1">
            <InvestedProject business={flashHealth} imageClassName="aspect-[16/10]" />
          </div>

          <div className="flex justify-center py-3 md:col-span-2 md:col-start-6 md:h-full md:items-center md:py-0">
            <FlowArrow variant="right" className="hidden md:block" />
            <FlowArrow variant="down" className="md:hidden" />
          </div>

          <div className="md:col-span-5 md:col-start-8 md:mt-14 lg:mt-16">
            <InvestedProject business={dossiers} imageClassName="aspect-[5/3]" />
          </div>

          <div className="flex justify-center py-3 md:col-span-12 md:py-1 lg:py-2">
            <FlowArrow variant="down-left" className="hidden md:block" />
            <FlowArrow variant="down" className="md:hidden" />
          </div>

          <div className="md:col-span-5 md:col-start-2">
            <InvestedProject business={rootstone} imageClassName="aspect-[16/11]" />
          </div>

          <div className="flex justify-center py-3 md:col-span-2 md:col-start-7 md:h-full md:items-center md:py-0">
            <FlowArrow variant="right" className="hidden md:block" />
            <FlowArrow variant="down" className="md:hidden" />
          </div>

          <div className="md:col-span-4 md:col-start-9 md:mt-8 lg:mt-10">
            <InvestedProject business={magicUnbound} imageClassName="aspect-[4/3]" />
          </div>
        </div>
      </div>
    </section>
  )
}
