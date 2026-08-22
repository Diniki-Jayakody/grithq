import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type CursorState = 'default' | 'explore' | 'view-project' | 'open'

interface CursorContextValue {
  cursorState: CursorState
  setCursorState: (state: CursorState) => void
}

export const CursorContext = createContext<CursorContextValue>({
  cursorState: 'default',
  setCursorState: () => {},
})

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorState, setCursorStateRaw] = useState<CursorState>('default')

  const setCursorState = useCallback((state: CursorState) => {
    setCursorStateRaw(state)
  }, [])

  return (
    <CursorContext.Provider value={{ cursorState, setCursorState }}>
      {children}
    </CursorContext.Provider>
  )

}

export function useCursorState() {
  return useContext(CursorContext)
}
