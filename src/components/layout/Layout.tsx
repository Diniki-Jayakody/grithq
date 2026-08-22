import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/cursor/CustomCursor'

export function Layout() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
