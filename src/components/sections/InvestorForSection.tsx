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
  const viridian = investedBusinesses[4]

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

  if (!flashHealth || !dossiers || !rootstone || !magicUnbound || !viridian) return null

  return (
    <section
      id="investor-for"
      ref={sectionRef}
      className={`${styles.sectionLightBase} ${styles.sectionPadTopCompact} ${styles.sectionPadBottom} border-t border-grithq-burgundy/5`}
      aria-labelledby="investor-for-heading"
    >
      <div className={styles.sectionContainer}>
        <SectionLabel variant="light">
          {STRINGS.sections.investorFor.eyebrow}
        </SectionLabel>
        <div className="investor-for-flow mt-10 grid grid-cols-1 items-start gap-16 md:mt-14 md:grid-cols-12 md:grid-rows-2 md:gap-x-16 md:gap-y-20 lg:gap-x-20 lg:gap-y-28 xl:gap-x-24">
          {/* Top-left */}
          <div className="md:col-span-4 md:col-start-1 md:row-start-1">
            <InvestedProject business={flashHealth} imageClassName="aspect-[16/10]" />
          </div>
          {/* Top-right */}
          <div className="md:col-span-4 md:col-start-9 md:row-start-1">
            <InvestedProject business={dossiers} imageClassName="aspect-[16/10]" />
          </div>
          {/* Center (spans both rows) */}
          <div className="md:col-span-4 md:col-start-5 md:row-span-2 md:row-start-1 md:self-center">
            <InvestedProject business={rootstone} imageClassName="aspect-[3/2]" />
          </div>
          {/* Bottom-left */}
          <div className="md:col-span-4 md:col-start-1 md:row-start-2">
            <InvestedProject business={magicUnbound} imageClassName="aspect-[16/10]" />
          </div>
          {/* Bottom-right */}
          <div className="md:col-span-4 md:col-start-9 md:row-start-2">
            <InvestedProject business={viridian} imageClassName="aspect-[16/10]" />
          </div>
        </div>
      </div>
    </section>
  )
}