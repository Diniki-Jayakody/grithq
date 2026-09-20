import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MenuOverlay } from './MenuOverlay'
import { images } from '@/constants/images'
import { STRINGS } from '@/constants/strings'
import { styles } from '@/styles/styles'
import { useCursorState } from '@/hooks/useCursorState'
import { useHeroScrollState } from '@/hooks/useHeroScrollState'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { setCursorState } = useCursorState()
  const { heroBackgroundActive } = useHeroScrollState()
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const isHome = location.pathname === '/'
  const homeLink = isHome ? '#hero' : '/'
  const navTranslucent = !isHome || heroBackgroundActive

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          navTranslucent ? 'bg-grithq-landing/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav
          className="section-padding flex items-center justify-between py-6 md:py-8"
          aria-label="Main navigation"
        >
          <Link
            to={homeLink}
            className="inline-flex shrink-0 items-center"
            onMouseEnter={() => setCursorState('open')}
            onMouseLeave={() => setCursorState('default')}
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
            onClick={() => setMenuOpen(true)}
            className="font-display text-xs tracking-[0.35em] text-grithq-offwhite/80 transition-colors hover:text-grithq-offwhite md:text-sm"
            aria-expanded={menuOpen}
            aria-controls="menu-overlay"
            onMouseEnter={() => setCursorState('open')}
            onMouseLeave={() => setCursorState('default')}
          >
            {STRINGS.nav.menu}
          </button>
        </nav>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
