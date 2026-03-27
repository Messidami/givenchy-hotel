import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

// Layout Components
import Navbar from './components/Navbar'
import Topbar from './components/Topbar'
import BookingModal from './components/BookingModal'
import WhatsApp from './components/WhatsApp'
import PageLoader from './components/PageLoader'

// Page Components
import HomePage from './pages/HomePage'
import RoomsPage from './pages/RoomsPage'
import AboutPage from './pages/AboutPage'
import DiningPage from './pages/DiningPage'
import AmenitiesPage from './pages/AmenitiesPage'
import EventsPage from './pages/EventsPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  const [page, setPage] = useState('home')
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // 1. IMPROVED NAVIGATION: Support Browser Back Button
  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state && e.state.page) {
        setPage(e.state.page)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (p) => {
    setPage(p)
    // Push to history so "Back" works
    window.history.pushState({ page: p }, '', p === 'home' ? '/' : `/${p}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 2. PAGE MAPPING
  const openModal = () => setModalOpen(true)
  
  const pages = {
    home: <HomePage navigate={navigate} openModal={openModal} />,
    rooms: <RoomsPage navigate={navigate} openModal={openModal} />,
    about: <AboutPage navigate={navigate} openModal={openModal} />,
    dining: <DiningPage navigate={navigate} openModal={openModal} />,
    amenities: <AmenitiesPage navigate={navigate} openModal={openModal} />,
    events: <EventsPage navigate={navigate} openModal={openModal} />,
    gallery: <GalleryPage navigate={navigate} openModal={openModal} />,
    contact: <ContactPage navigate={navigate} openModal={openModal} />,
  }

  return (
    <>
      {/* 3. EXPERIENCE WRAPPERS */}
      {loading && <PageLoader onDone={() => setLoading(false)} />}
      
      <Toaster 
        position="bottom-center" 
        toastOptions={{ 
          style: { 
            background: '#1a1a1a', 
            color: '#fff', 
            borderLeft: '3px solid #c8a951', 
            fontSize: '12px', 
            letterSpacing: '1px',
            borderRadius: '0px'
          } 
        }} 
      />

      <Topbar />
      
      <Navbar 
        currentPage={page} 
        navigate={navigate} 
        openModal={openModal} 
      />

      {/* 4. DYNAMIC CONTENT AREA */}
      <main style={{ minHeight: '80vh' }}>
        {pages[page] || pages.home}
      </main>

      {/* 5. OVERLAYS */}
      {modalOpen && <BookingModal onClose={() => setModalOpen(false)} />}
      <WhatsApp />
      
      {/* Footer can go here if shared across all pages */}
    </>
  )
}