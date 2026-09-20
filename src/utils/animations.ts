import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const INVESTMENT_FOCUS_REVEAL = {
  y: 24,
  opacity: 0,
  duration: 0.55,
  stagger: 0.5,
  ease: 'power3.out',
} as const

export function fadeUp(
  element: HTMLElement | string,
  options?: { delay?: number; duration?: number; y?: number }
) {
  const { delay = 0, duration = 1, y = 60 } = options ?? {}
  return gsap.from(element, {
    y,
    opacity: 0,
    duration,
    delay,
    ease: 'power3.out',
  })
}

export function splitTextReveal(
  container: HTMLElement,
  selector: string,
  options?: { stagger?: number; delay?: number }
) {
  const { stagger = 0.05, delay = 0 } = options ?? {}
  const elements = container.querySelectorAll(selector)
  return gsap.from(elements, {
    y: '100%',
    opacity: 0,
    duration: 0.8,
    stagger,
    delay,
    ease: 'power3.out',
  })
}

export function createScrollTrigger(
  trigger: HTMLElement | string,
  animation: gsap.core.Tween | gsap.core.Timeline,
  options?: Partial<ScrollTrigger.Vars>
) {
  return ScrollTrigger.create({
    trigger,
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    ...options,
    animation,
  })
}

export function cleanupScrollTriggers(scope?: HTMLElement) {
  const triggers = ScrollTrigger.getAll()
  triggers.forEach((t) => {
    if (!scope || (t.trigger && scope.contains(t.trigger as Node))) {
      t.kill()
    }
  })
}
