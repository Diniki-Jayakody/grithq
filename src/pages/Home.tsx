import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { HeroOpening } from '@/components/sections/HeroOpening'
import { IdentitySection } from '@/components/sections/IdentitySection'
import { InvestorForSection } from '@/components/sections/InvestorForSection'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { PhilosophySection } from '@/components/sections/PhilosophySection'
import { ImpactSection } from '@/components/sections/ImpactSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { useLenisScroll } from '@/providers/SmoothScrollProvider'

export function Home() {
  const location = useLocation()
  const { scrollTo } = useLenisScroll()

  useEffect(() => {
    if (!location.hash) return
    const frame = requestAnimationFrame(() => {
      scrollTo(location.hash, { offset: -80 })
    })
    return () => cancelAnimationFrame(frame)
  }, [location.hash, scrollTo])

  return (
    <>
      <HeroOpening />
      <IdentitySection />
      <InvestorForSection />
      <PortfolioSection />
      {/* <PhilosophySection /> */}
      <ImpactSection />
      <ContactSection />
    </>
  )
}
