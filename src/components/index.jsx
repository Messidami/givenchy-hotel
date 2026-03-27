import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

// ===== FADE IN ON SCROLL =====
export function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ===== STAGGER CHILDREN =====
export function StaggerIn({ children, className = '' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        visible: { transition: { staggerChildren: 0.12 } }
      }}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

// ===== SECTION HEADER =====
export function SectionHeader({ label, title, center = false, white = false, children }) {
  return (
    <FadeIn>
      <div className={center ? 'text-center' : ''}>
        <span className="sec-label">{label}</span>
        <h2 className={`sec-title ${white ? 'white' : ''}`}>{title}</h2>
        <div className={`sec-divider ${center ? 'center' : ''}`} />
        {children}
      </div>
    </FadeIn>
  )
}

// ===== PAGE HERO =====
export function PageHero({ bg, label, title, breadcrumb }) {
  return (
    <div className="page-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.68)),url('${bg}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container">
        <div className="page-hero-content">
          <div className="breadcrumb">Home <span>›</span> {breadcrumb}</div>
          <motion.div
            className="page-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {title}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ===== FOOTER =====
export function Footer({ navigate }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo-name">Givenchy</div>
            <span className="footer-logo-tag">Luxury Hotel and Suites · Awka, Nigeria</span>
            <p className="footer-desc">
              A 4-star oasis offering world-class hospitality, 50 elegant rooms, rooftop dining,
              and unforgettable experiences in the heart of Anambra State, Nigeria.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">ig</a>
              <a href="#" aria-label="Twitter">tw</a>
              <a href="#" aria-label="LinkedIn">in</a>
            </div>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Navigation</div>
            <ul>
              {[['home','Home'],['rooms','Rooms & Suites'],['about','About Us'],['dining','Dining'],['gallery','Gallery']].map(([p,l]) => (
                <li key={p}><a href="#" onClick={(e) => { e.preventDefault(); navigate(p) }}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Services</div>
            <ul>
              {[['amenities','Spa & Wellness'],['amenities','Swimming Pool'],['amenities','Fitness Center'],['events','Event Center'],['dining','Rooftop Bar']].map(([p,l],i) => (
                <li key={i}><a href="#" onClick={(e) => { e.preventDefault(); navigate(p) }}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Reservation</div>
            <div className="footer-contact-item"><span className="fci-icon">📞</span><span className="fci-text">0814 480 0460</span></div>
            <div className="footer-contact-item"><span className="fci-icon">✉️</span><span className="fci-text">reservation@givenchyluxuryhotelandsuites.com</span></div>
            <div className="footer-contact-item"><span className="fci-icon">📍</span><span className="fci-text">Nise/Agulu Road, Amawbia, Awka, Anambra State</span></div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© 2025 Givenchy Luxury Hotel and Suites. All Rights Reserved. Awka, Anambra State, Nigeria.</p>
        </div>
      </div>
    </footer>
  )
}

// ===== WHATSAPP =====
export function WhatsApp() {
  return (
    <motion.button
      className="wa-btn"
      onClick={() => window.open('https://wa.me/2348036767006', '_blank')}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2 }}
      aria-label="Chat on WhatsApp"
    >
      💬
    </motion.button>
  )
}

export default WhatsApp
