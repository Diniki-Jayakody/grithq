import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems } from '@/constants/navigation'
import { images } from '@/constants/images'
import { STRINGS } from '@/constants/strings'
import { styles } from '@/styles/styles'
import { useCursorState } from '@/hooks/useCursorState'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useLenisScroll } from '@/providers/SmoothScrollProvider'

interface MenuOverlayProps {
  open: boolean
  onClose: () => void
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] as const },
  }),
  exit: { opacity: 0, y: 20, transition: { duration: 0.25 } },
}

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const { setCursorState } = useCursorState()
  const reducedMotion = useReducedMotion()
  const location = useLocation()
  const { scrollTo } = useLenisScroll()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNavClick = (href: string) => {
    onClose()
    if (location.pathname !== '/') return
    setTimeout(() => scrollTo(href, { offset: -80 }), 450)
  }

  const getHref = (href: string) => {
    if (location.pathname !== '/') return `/${href}`
    return href
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-overlay"
          className="fixed inset-0 z-[100] flex flex-col bg-grithq-landing"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          variants={reducedMotion ? undefined : overlayVariants}
          initial={reducedMotion ? false : 'hidden'}
          animate={reducedMotion ? undefined : 'visible'}
          exit={reducedMotion ? undefined : 'exit'}
        >
          <div className="section-padding flex items-center justify-between py-6 md:py-8">
            <Link
              to="/"
              onClick={onClose}
              className="inline-flex shrink-0 items-center"
              aria-label={STRINGS.brand.name}
            >
              <img
                src={images.gritLogo}
                alt={STRINGS.brand.name}
                className={styles.navLogo}
              />
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="font-display text-xs tracking-[0.35em] text-grithq-offwhite/80 transition-colors hover:text-grithq-offwhite md:text-sm"
              aria-label="Close menu"
            >
              {STRINGS.nav.close}
            </button>
          </div>

          <nav className="flex flex-1 items-center section-padding">
            <ul className="w-full space-y-2 md:space-y-4">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  className="overflow-hidden"
                  custom={i}
                  variants={reducedMotion ? undefined : itemVariants}
                  initial={reducedMotion ? false : 'hidden'}
                  animate={reducedMotion ? undefined : 'visible'}
                  exit={reducedMotion ? undefined : 'exit'}
                >
                  {location.pathname === '/' ? (
                    <button
                      type="button"
                      onClick={() => handleNavClick(item.href)}
                      className="group flex w-full items-baseline gap-4 py-2 text-left md:gap-8"
                      onMouseEnter={() => setCursorState('open')}
                      onMouseLeave={() => setCursorState('default')}
                    >
                      <span className="font-display text-xs tracking-widest text-grithq-mauve md:text-sm">
                        {item.number}
                      </span>
                      <span className="font-display text-4xl font-light tracking-tight text-grithq-offwhite transition-transform duration-500 group-hover:translate-x-4 md:text-6xl lg:text-7xl">
                        {item.label.toUpperCase()}
                      </span>
                    </button>
                  ) : (
                    <Link
                      to={getHref(item.href)}
                      onClick={onClose}
                      className="group flex w-full items-baseline gap-4 py-2 md:gap-8"
                      onMouseEnter={() => setCursorState('open')}
                      onMouseLeave={() => setCursorState('default')}
                    >
                      <span className="font-display text-xs tracking-widest text-grithq-mauve md:text-sm">
                        {item.number}
                      </span>
                      <span className="font-display text-4xl font-light tracking-tight text-grithq-offwhite transition-transform duration-500 group-hover:translate-x-4 md:text-6xl lg:text-7xl">
                        {item.label.toUpperCase()}
                      </span>
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
