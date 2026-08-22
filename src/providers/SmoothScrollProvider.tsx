import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollContextValue {
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number }) => void
  lenis: Lenis | null
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: () => {},
  lenis: null,
})

export function useLenisScroll() {
  return useContext(SmoothScrollContext)
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const reducedMotion = useReducedMotion()

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: { offset?: number }) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: options?.offset ?? 0 })
      } else if (typeof target === 'string') {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    []
  )

  useEffect(() => {
    if (reducedMotion) {
      ScrollTrigger.refresh()
      return
    }

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
    })

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    const onRefresh = () => lenis.resize()
    ScrollTrigger.addEventListener('refresh', onRefresh)
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.removeEventListener('refresh', onRefresh)
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      lenisRef.current = null
      ScrollTrigger.scrollerProxy(document.documentElement, {})
      ScrollTrigger.refresh()
    }
  }, [reducedMotion])

  return (
    <SmoothScrollContext.Provider value={{ scrollTo, lenis: lenisRef.current }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
