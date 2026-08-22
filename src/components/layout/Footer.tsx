import { Link } from 'react-router-dom'
import { navItems, tagline } from '@/constants/navigation'
import { contactInfo } from '@/constants/data'
import { STRINGS } from '@/constants/strings'
import { useCursorState } from '@/hooks/useCursorState'

export function Footer() {
  const { setCursorState } = useCursorState()

  return (
    <footer className="border-t border-grithq-cream/10 bg-grithq-black section-padding py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Link
              to="/"
              className="font-display text-lg font-semibold tracking-[0.35em] text-grithq-offwhite"
              onMouseEnter={() => setCursorState('open')}
              onMouseLeave={() => setCursorState('default')}
            >
              {STRINGS.brand.name}
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-grithq-cream/50">{tagline}</p>
          </div>

          <div className="md:col-span-3">
            <p className="font-display text-xs tracking-[0.3em] text-grithq-mauve">
              {STRINGS.footer.navigation}
            </p>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/${item.href}`}
                    className="text-sm text-grithq-cream/60 transition-colors hover:text-grithq-offwhite"
                    onMouseEnter={() => setCursorState('open')}
                    onMouseLeave={() => setCursorState('default')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="font-display text-xs tracking-[0.3em] text-grithq-mauve">
              {STRINGS.footer.connect}
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm text-grithq-cream/60 transition-colors hover:text-grithq-offwhite"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex gap-4 pt-2">
                {Object.entries(contactInfo.social).map(([key, href]) => (
                  <a
                    key={key}
                    href={href}
                    className="font-display text-xs tracking-widest text-grithq-cream/40 uppercase transition-colors hover:text-grithq-offwhite"
                    onMouseEnter={() => setCursorState('open')}
                    onMouseLeave={() => setCursorState('default')}
                  >
                    {key}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-grithq-cream/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-grithq-cream/30">
            &copy; {new Date().getFullYear()} {STRINGS.brand.name}. {STRINGS.footer.copyright}
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-grithq-cream/30 transition-colors hover:text-grithq-cream/60"
            >
              {STRINGS.footer.privacy}
            </a>
            <a
              href="#"
              className="text-xs text-grithq-cream/30 transition-colors hover:text-grithq-cream/60"
            >
              {STRINGS.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
