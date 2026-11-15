import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'

/**
 * Spam-protected email.
 *
 * - The address is never in the HTML or the JS bundle as plain text.
 *   It is stored reversed + base64-encoded and only decoded after a real click.
 * - On the page it shows partly hidden (e.g. "hel•••@•••hq.co"), so scrapers
 *   never see a valid address.
 * - Clicking shows a short "verifying" loader, then a popup with the full
 *   address, a Copy button and an Email button (mailto is created only then).
 * - Script-triggered clicks (bots) are ignored: only trusted user events open it.
 *
 * To change the address, run in a terminal:
 *   printf 'new@address.com' | rev | base64
 * and paste the result into ENCODED_EMAIL.
 */
const ENCODED_EMAIL = 'b2MucWh0aXJnQG9sbGVo'
const VERIFY_DELAY_MS = 900

function decodeEmail(encoded: string) {
  return atob(encoded).split('').reverse().join('')
}

type Variant = 'dark' | 'light'
type Stage = 'closed' | 'verifying' | 'revealed'

interface ProtectedEmailProps {
  /** dark = on a dark background (cream text), light = on a light background (burgundy text) */
  variant?: Variant
  className?: string
}

export function ProtectedEmail({ variant = 'dark', className = '' }: ProtectedEmailProps) {
  const [stage, setStage] = useState<Stage>('closed')
  const [email, setEmail] = useState('')
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<number | null>(null)
  const emailBtnRef = useRef<HTMLAnchorElement>(null)

  // Partial preview, built at runtime (never a valid address)
  const preview = (() => {
    const full = decodeEmail(ENCODED_EMAIL)
    const [user = '', domain = ''] = full.split('@')
    return { start: user.slice(0, 3), end: domain.slice(-5) }
  })()

  const textColor =
    variant === 'dark'
      ? 'text-grithq-cream/70 hover:text-grithq-offwhite'
      : 'text-grithq-burgundy/75 hover:text-grithq-burgundy'

  const open = (e: MouseEvent<HTMLButtonElement>) => {
    if (!e.nativeEvent.isTrusted) return // ignore script/bot clicks
    setCopied(false)
    setStage('verifying')
    timerRef.current = window.setTimeout(() => {
      setEmail(decodeEmail(ENCODED_EMAIL))
      setStage('revealed')
    }, VERIFY_DELAY_MS)
  }

  const close = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    setStage('closed')
    setEmail('')
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  // Esc closes, focus the main button when revealed, lock page scroll while open
  useEffect(() => {
    if (stage === 'closed') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (stage === 'revealed') emailBtnRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [stage, close])

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <>
      {/* Partly hidden address — click to reveal */}
      <button
        type="button"
        onClick={open}
        className={`group inline-flex items-center font-display tracking-wide underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grithq-mauve/70 ${textColor} ${className}`}
        aria-label="Show our email address"
        title="Click to show the full email address"
      >
        <span>{preview.start}</span>
        <span className="mx-[0.1em] select-none blur-[3px]" aria-hidden="true">
          xxxx
        </span>
        <span>@</span>
        <span className="mx-[0.1em] select-none blur-[3px]" aria-hidden="true">
          xxxxx
        </span>
        <span>{preview.end}</span>
      </button>

      {/* Popup */}
      {stage !== 'closed' && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-grithq-black/70 px-4 backdrop-blur-sm"
          onClick={close}
          data-lenis-prevent
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="protected-email-title"
            className="w-full max-w-sm border border-grithq-burgundy/10 bg-grithq-offwhite px-6 py-8 text-center shadow-[0_24px_60px_-20px_rgba(10,6,8,0.6)] sm:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <p
              id="protected-email-title"
              className="font-display text-[10px] tracking-[0.3em] text-grithq-mauve uppercase"
            >
              Anti-spam protection
            </p>

            {stage === 'verifying' ? (
              <div className="mt-6 flex flex-col items-center gap-4" role="status" aria-live="polite">
                <span
                  className="h-8 w-8 animate-spin rounded-full border-2 border-grithq-burgundy/15 border-t-grithq-burgundy"
                  aria-hidden="true"
                />
                <p className="text-sm text-grithq-burgundy/60">Verifying you're human…</p>
              </div>
            ) : (
              <div aria-live="polite">
                <p className="mt-4 text-sm text-grithq-burgundy/60">The complete address is</p>
                <p className="mt-2 font-display text-lg font-light break-all text-grithq-burgundy md:text-xl">
                  {email}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    onClick={copy}
                    className="min-h-11 border border-grithq-burgundy/25 px-6 font-display text-xs tracking-[0.2em] text-grithq-burgundy uppercase transition-colors hover:bg-grithq-burgundy/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grithq-mauve/70"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                  <a
                    ref={emailBtnRef}
                    href={`mailto:${email}`}
                    className="inline-flex min-h-11 items-center justify-center bg-grithq-burgundy px-8 font-display text-xs tracking-[0.2em] text-grithq-offwhite uppercase transition-colors hover:bg-grithq-deepAccent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grithq-mauve/70"
                  >
                    Email
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}