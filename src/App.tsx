import { useState, useCallback, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Layout } from '@/components/layout/Layout'
import { Loader } from '@/components/layout/Loader'
import { Home } from '@/pages/Home'
import { Project } from '@/pages/Project'
import { CursorProvider } from '@/hooks/useCursorState'
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function AnimatedRoutes() {
  const location = useLocation()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reducedMotion ? undefined : { opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="portfolio/:slug" element={<Project />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function AppContent() {
  const [loaded, setLoaded] = useState(false)
  const reducedMotion = useReducedMotion()

  const onLoadComplete = useCallback(() => {
    setLoaded(true)
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true)
    })
  }, [])

  useEffect(() => {
    if (reducedMotion) setLoaded(true)
  }, [reducedMotion])

  return (
    <>
      {!loaded && !reducedMotion && <Loader onComplete={onLoadComplete} />}
      <div className={loaded ? 'opacity-100 transition-opacity duration-500' : 'opacity-0'}>
        <AnimatedRoutes />
      </div>
    </>
  )
}

export default function App() {
  return (
    <CursorProvider>
      <SmoothScrollProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </SmoothScrollProvider>
    </CursorProvider>
  )
}
