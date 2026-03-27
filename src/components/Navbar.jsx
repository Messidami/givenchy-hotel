import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { label: 'Home', page: 'home' },
  { label: 'Rooms', page: 'rooms' },
  { label: 'About', page: 'about' },
  {
    label: 'Services', page: null,
    children: [
      { label: 'Dining', page: 'dining' },
      { label: 'Amenities', page: 'amenities' },
      { label: 'Events', page: 'events' },
    ]
  },
  { label: 'Gallery', page: 'gallery' },
  { label: 'Contact', page: 'contact' },
]

export default function Navbar({ currentPage, navigate, openModal }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-inner">
            <div className="nav-logo" onClick={() => navigate('home')}>
              <div className="nav-logo-name">Givenchy</div>
              <div className="nav-logo-tag">Luxury Hotel and Suites · Awka</div>
            </div>

            <ul className="nav-menu">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href="#"
                    className={currentPage === item.page ? 'active' : ''}
                    onClick={(e) => { e.preventDefault(); item.page && navigate(item.page) }}
                  >
                    {item.label}{item.children ? ' ▾' : ''}
                  </a>
                  {item.children && (
                    <div className="nav-dropdown">
                      {item.children.map(c => (
                        <a key={c.page} href="#" onClick={(e) => { e.preventDefault(); navigate(c.page) }}>
                          {c.label}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <button className="btn-book-nav" onClick={openModal}>Book A Room</button>

            <button
              className={`hamburger ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-nav-close" onClick={() => setMobileOpen(false)}>✕</button>
        {NAV_ITEMS.map(item =>
          item.children ? item.children.map(c => (
            <a key={c.page} href="#" onClick={(e) => { e.preventDefault(); navigate(c.page); setMobileOpen(false) }}>
              {c.label}
            </a>
          )) : (
            <a key={item.page} href="#" onClick={(e) => { e.preventDefault(); navigate(item.page); setMobileOpen(false) }}>
              {item.label}
            </a>
          )
        )}
        <a href="#" onClick={(e) => { e.preventDefault(); openModal(); setMobileOpen(false) }}
          style={{ color: 'var(--gold)', marginTop: '8px' }}>
          Book A Room →
        </a>
      </div>
    </>
  )
}
