import { useEffect, useRef } from 'react'
import { useCursorState, type CursorState } from '@/hooks/useCursorState'
import { useIsDesktop } from '@/hooks/useMediaQuery'
import { STRINGS } from '@/constants/strings'

const labels: Record<Exclude<CursorState, 'default'>, string> = {
  explore: STRINGS.cursor.explore,
  'view-project': STRINGS.cursor.viewProject,
  open: STRINGS.cursor.open,
}

export function CustomCursor() {
  const isDesktop = useIsDesktop()
  const { cursorState } = useCursorState()
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!isDesktop) {
      document.body.classList.remove('custom-cursor-active')
      return
    }

    document.body.classList.add('custom-cursor-active')

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', onMove)

    let raf: number
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }

      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [isDesktop])

  if (!isDesktop) return null

  const showLabel = cursorState !== 'default'

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        aria-hidden="true"
      >
        <div
          className={`rounded-full bg-grithq-offwhite transition-all duration-300 ${
            showLabel ? 'h-20 w-20 opacity-0' : 'h-2 w-2 opacity-100'
          }`}
        />
      </div>
      <div
        ref={labelRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        aria-hidden="true"
      >
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-full border border-grithq-offwhite/30 bg-grithq-black/80 backdrop-blur-sm transition-all duration-300 ${
            showLabel ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          <span className="flex h-full w-full items-center justify-center px-2 text-center font-display text-[9px] leading-tight tracking-[0.15em] text-grithq-offwhite uppercase">
            {cursorState !== 'default' ? labels[cursorState] : ''}
          </span>
        </div>
      </div>
    </>
  )
}
