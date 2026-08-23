import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

/** Matches the hero timeline point where the landing background begins to appear. */
export const HERO_BACKGROUND_PROGRESS = 0.15

interface HeroScrollContextValue {
  heroBackgroundActive: boolean
  setHeroBackgroundProgress: (progress: number) => void
  resetHeroBackground: () => void
}

const HeroScrollContext = createContext<HeroScrollContextValue>({
  heroBackgroundActive: false,
  setHeroBackgroundProgress: () => {},
  resetHeroBackground: () => {},
})

export function HeroScrollProvider({ children }: { children: ReactNode }) {
  const [heroBackgroundActive, setHeroBackgroundActive] = useState(false)

  const setHeroBackgroundProgress = useCallback((progress: number) => {
    setHeroBackgroundActive(progress >= HERO_BACKGROUND_PROGRESS)
  }, [])

  const resetHeroBackground = useCallback(() => {
    setHeroBackgroundActive(false)
  }, [])

  return (
    <HeroScrollContext.Provider
      value={{ heroBackgroundActive, setHeroBackgroundProgress, resetHeroBackground }}
    >
      {children}
    </HeroScrollContext.Provider>
  )
}

export function useHeroScrollState() {
  return useContext(HeroScrollContext)
}
