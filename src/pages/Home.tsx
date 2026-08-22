import { HeroOpening } from '@/components/sections/HeroOpening'
import { IdentitySection } from '@/components/sections/IdentitySection'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { DevelopmentsSection } from '@/components/sections/DevelopmentsSection'
import { PhilosophySection } from '@/components/sections/PhilosophySection'
import { ImpactSection } from '@/components/sections/ImpactSection'
import { FutureSection } from '@/components/sections/FutureSection'
import { ContactSection } from '@/components/sections/ContactSection'

export function Home() {
  return (
    <>
      <HeroOpening />
      <IdentitySection />
      <PortfolioSection />
      <DevelopmentsSection />
      <PhilosophySection />
      <ImpactSection />
      <FutureSection />
      <ContactSection />
    </>
  )
}
