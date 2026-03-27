import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FadeIn, StaggerIn, staggerItem, SectionHeader, Footer } from '../components/index.jsx'
import bg1 from "../assets/images/bg1.jpg";
import bg2 from "../assets/images/bg2.jpg";
import bg3 from "../assets/images/bg3.jpg";
import { WineSection } from './OtherPages.jsx'

import executiveImg from "../assets/rooms/executive.jpg";
import mastersImg from "../assets/rooms/masters.jpg";
import kingsImg from "../assets/rooms/kings.jpg";

const SLIDES = [
  { bg: bg1, label: 'Welcome to Givenchy' },
  { bg: bg2, label: 'World-Class Amenities' },
  { bg: bg3, label: 'Luxurious Suites' },
];

const ROOMS = [
  { title: 'Executive Room', cat: 'Standard', price: '₦30,000', badge: 'Available', badgeDark: false, img: executiveImg, feats: ['AC', 'Smart TV', 'Free Wi-Fi', 'Luxury Bed'] },
  { title: 'Masters Room', cat: 'Premium', price: '₦60,000', badge: 'Popular', badgeDark: true, img: mastersImg, feats: ['King Bed', 'Mini Bar', 'City View', 'Wi-Fi'] },
  { title: 'Kings Suite', cat: 'Luxury Suite', price: '₦100,000', badge: 'Luxury', badgeDark: false, img: kingsImg, feats: ['Butler', 'Penthouse', 'Jacuzzi', 'Wi-Fi'] },
]

const AMENITIES = [
  { icon: '🏊', title: 'Swimming Pool', text: 'Temperature-controlled, open 6am–10pm daily' },
  { icon: '💆', title: 'Spa & Wellness', text: 'Expert therapists, full treatment range' },
  { icon: '🏋️', title: 'Fitness Center', text: 'Modern gym equipment, open 24 hours' },
  { icon: '🍽️', title: 'Restaurant', text: 'Nigerian & international cuisine daily' },
  { icon: '🍸', title: 'Rooftop Bar', text: 'Cocktails & panoramic Awka skyline views' },
  { icon: '🎤', title: 'Event Center', text: 'Outdoor venue, up to 500 guests' },
  { icon: '✈️', title: 'Airport Shuttle', text: 'Complimentary transfers, 24/7' },
  { icon: '📶', title: 'Free Wi-Fi', text: 'High-speed internet throughout' },
]

const TESTIMONIALS = [
  { initials: 'EO', name: 'Emeka Okonkwo', loc: 'Lagos, Nigeria', text: '"Absolutely breathtaking. The Kings Suite exceeded every expectation — the staff treated us like royalty from arrival to checkout."' },
  { initials: 'AN', name: 'Adaeze Nwosu', loc: 'Enugu, Nigeria', text: '"The rooftop bar is incredible. Watched the Awka sunset with the best cocktail in Nigeria. Already planning our return visit!"' },
  { initials: 'CE', name: 'Chukwudi Eze', loc: 'Abuja, Nigeria', text: '"Hosted our company conference here. World-class facilities, outstanding food, impeccable service for our 3-day corporate event."' },
]

const INSTA = [
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80',
  'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=300&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&q=80',
]

export default function HomePage({ navigate, openModal }) {
  const [slide, setSlide] = useState(0)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 5500)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-slides">
          {SLIDES.map((s, i) => (
            <div key={i} className={`hero-slide ${i === slide ? 'active' : ''}`}
              style={{ backgroundImage: `url('${s.bg}')` }} />
          ))}
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-text">
            <motion.div className="hero-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              Awka · Anambra State · Nigeria
            </motion.div>
            <motion.h1 className="hero-h1" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
              Welcome to <em>Givenchy</em><br />Luxury Hotel And Suites
            </motion.h1>
            <motion.p className="hero-p" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
              A 4-star oasis on Nise/Agulu Road, Amawbia — offering 36 elegant rooms,
              world-class dining, rooftop bar, and the finest hospitality in Anambra State.
            </motion.p>
            <motion.div className="hero-btns" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}>
              <button className="btn-gold" onClick={openModal}>Book A Room</button>
              <button className="btn-outline-white" onClick={() => navigate('rooms')}>Explore Suites</button>
            </motion.div>
          </div>
        </div>
        <div className="hero-nav">
          <button onClick={() => setSlide(s => (s - 1 + SLIDES.length) % SLIDES.length)}>‹</button>
          <button onClick={() => setSlide(s => (s + 1) % SLIDES.length)}>›</button>
        </div>
        <div className="hero-dots">
          {SLIDES.map((_, i) => (
            <button key={i} className={`hero-dot ${i === slide ? 'active' : ''}`} onClick={() => setSlide(i)} />
          ))}
        </div>
        <div className="hero-scroll"><span>Scroll</span><div className="scroll-line" /></div>
      </section>

      {/* AVAILABILITY BAR */}
      <div className="avail-bar">
        <div className="avail-inner">
          {[['Check In','date'],['Check Out','date']].map(([l,t]) => (
            <div key={l} className="av-field"><label>{l}</label><input type={t} /></div>
          ))}
          <div className="av-field"><label>Adults</label><select>{[1,2,3,4].map(n=><option key={n}>{n}</option>)}</select></div>
          <div className="av-field"><label>Room Type</label><select><option>Any Room</option><option>Executive Room</option><option>Masters Room</option><option>Kings Suite</option></select></div>
          <button className="av-btn" onClick={() => { openModal(); toast.success('Checking availability...') }}>Check Availability</button>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-row">
        <div className="container">
          <div className="stats-inner">
            {[['55', 'Luxury Rooms'],['4★','Star Rating'],['24h','Front Desk'],['3','Room Types']].map(([n,l]) => (
              <FadeIn key={l}>
                <div className="stat-item"><span className="stat-num">{n}</span><span className="stat-label">{l}</span></div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <FadeIn direction="right">
              <div className="about-imgs">
                <div className="img-zoom about-img-tall"><img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&q=80" alt="Hotel" /></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="img-zoom about-img-sm"><img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80" alt="Room" /></div>
                  <div className="img-zoom about-img-sm"><img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80" alt="Pool" /></div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.15}>
              <span className="sec-label">About Us</span>
              <h2 className="sec-title">A Luxurious Hotel in the Heart of Awka</h2>
              <div className="sec-divider" />
              <p className="sec-p">Givenchy Luxury Hotel and Suites is nestled on Nise/Agulu Road, Amawbia, offering world-class hospitality rooted in the warmth of Anambra culture.</p>
              <p className="sec-p" style={{ marginTop: 12 }}>Each of our 55 rooms and suites is crafted to deliver comfort, elegance, and an unforgettable experience. Located near Nnamdi Azikiwe University and the Anambra State Government House.</p>
              <div className="about-feats">
                {['55 Elegant Rooms & Suites','Rooftop Bar & VIP Lounge','Outdoor Swimming Pool','Spa, Gym & Wellness','Conference & Event Center','24-Hour Room Service'].map(f => (
                  <div key={f} className="af-item"><div className="af-dot" />{f}</div>
                ))}
              </div>
              <button className="btn-gold" onClick={() => navigate('about')}>Learn More</button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ROOM OFFERS */}
      <section className="section bg-gray">
        <div className="container">
          <SectionHeader label="Special Deals" title="Our Room Offers" center />
          <StaggerIn className="offers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginTop: 48 }}>
            {ROOMS.map((r) => (
              <motion.div key={r.title} className="offer-card card-hover" variants={staggerItem}>
                <div className="offer-img img-zoom">
                  <img src={r.img} alt={r.title} />
                </div>
                <div className="offer-body">
                  <div className="offer-tag">{r.cat}</div>
                  <div className="offer-title">{r.title}</div>
                  <ul className="offer-feats">
                    {r.feats.map(f => <li key={f}>{f}</li>)}
                    <li>24-hour room service available</li>
                  </ul>
                  <div className="offer-price">{r.price} <small>/ night</small></div>
                  <button className="btn-gold-sm" onClick={() => { openModal(); toast.success(`${r.title} selected!`) }}>Book Now</button>
                </div>
              </motion.div>
            ))}
          </StaggerIn>
        </div>
      </section>

      {/* PARALLAX */}
      <div className="parallax-section" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80')" }}>
        <div className="container parallax-content">
          <FadeIn><h2>Relax and Enjoy Your Stay in Awka</h2></FadeIn>
          <FadeIn delay={0.15}><p>Experience world-class comfort, warm hospitality, and the vibrant culture of Anambra State — all from one beautiful location on Nise/Agulu Road.</p></FadeIn>
          <FadeIn delay={0.25}><button className="btn-gold" onClick={openModal}>Reserve Your Room Today</button></FadeIn>
        </div>
      </div>

      {/* DINING */}
      <section className="section">
        <div className="container">
          <div className="dining-grid">
            <FadeIn direction="right">
              <div className="dining-img-wrap">
                <img className="dining-main-img" src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80" alt="Dining" />
                <div className="dining-badge"><b>5★</b><small>Dining</small></div>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.15}>
              <span className="sec-label">Culinary Experience</span>
              <h2 className="sec-title">We Serve Fresh and Delicious Food</h2>
              <div className="sec-divider" />
              <p className="sec-p">From authentic Nigerian cuisine to international flavors — our chefs craft every meal with passion and the finest local ingredients.</p>
              <div className="dining-items">
                {[['The Restaurant','Local & International · Open 7am–10pm'],['Rooftop Bar','Cocktails & Views · Open 5pm–2am'],['VIP Bar & Lounge','Private Dining · By Reservation']].map(([n,t]) => (
                  <div key={n} className="dining-item" onClick={() => navigate('dining')}>
                    <div><div className="di-name">{n}</div><div className="di-tag">{t}</div></div>
                    <span className="di-arrow">→</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28 }}>
                <button className="btn-gold" onClick={() => navigate('dining')}>Explore Dining</button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ROOMS */}
      <section className="section bg-gray">
        <div className="container">
          <SectionHeader label="Accommodations" title="Choose a Better Room" center />
          <StaggerIn className="rooms-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginTop: 48 }}>
            {ROOMS.map(r => (
              <motion.div key={r.title} className="room-card card-hover" variants={staggerItem}>
                <div className="rc-img-wrap img-zoom">
                  <img src={r.img} alt={r.title} />
                  <span className={`rc-badge ${r.badgeDark ? 'dark' : ''}`}>{r.badge}</span>
                </div>
                <div className="rc-body">
                  <div className="rc-cat">{r.cat}</div>
                  <div className="rc-title">{r.title}</div>
                  <div className="rc-feats">{r.feats.map(f => <span key={f} className="rc-feat">{f}</span>)}</div>
                  <div className="rc-footer">
                    <div className="rc-price">{r.price} <span>/ night</span></div>
                    <button className="btn-gold-sm" onClick={openModal}>Book Now</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerIn>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <button className="btn-gold" onClick={() => navigate('rooms')}>View All Rooms →</button>
          </div>
        </div>
      </section>

      {/* CTA PHONE */}
      <div className="cta-phone">
        <div className="container">
          <FadeIn><p>For Reservation or Query?</p></FadeIn>
          <FadeIn delay={0.1}><a href="tel:08144800460">0814 480 0460</a></FadeIn>
          <FadeIn delay={0.2}><button className="btn-outline-white" onClick={openModal}>Book Online Now</button></FadeIn>
        </div>
      </div>

      {/* AMENITIES */}
      <section className="section bg-dark">
        <div className="container">
          <SectionHeader label="Facilities" title="World-Class Amenities" center white />
          <StaggerIn className="amen-grid">
            {AMENITIES.map(a => (
              <motion.div key={a.title} className="amen-item" variants={staggerItem}>
                <span className="amen-icon">{a.icon}</span>
                <div className="amen-title">{a.title}</div>
                <div className="amen-text">{a.text}</div>
              </motion.div>
            ))}
          </StaggerIn>
        </div>
      </section>

      

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <SectionHeader label="Guest Reviews" title="What Our Guests Say" center />
          <StaggerIn className="testi-grid">
            {TESTIMONIALS.map(t => (
              <motion.div key={t.name} className="testi-card" variants={staggerItem}>
                <div className="testi-quote">"</div>
                <div className="testi-stars">★★★★★</div>
                <p className="testi-text">{t.text}</p>
                <div className="testi-auth">
                  <div className="testi-av">{t.initials}</div>
                  <div><div className="testi-name">{t.name}</div><div className="testi-loc">{t.loc}</div></div>
                </div>
              </motion.div>
            ))}
          </StaggerIn>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section style={{ paddingBottom: 92 }}>
        <div className="container">
          <SectionHeader label="Follow Us" title="@GivenchyHotelAwka" center />
          <StaggerIn className="insta-grid">
            {INSTA.map((src, i) => (
              <motion.div key={i} className="insta-item" variants={staggerItem}>
                <img src={src} alt={`Gallery ${i}`} />
                <div className="insta-overlay">📷</div>
              </motion.div>
            ))}
          </StaggerIn>
        </div>
      </section>

      {/* NEWSLETTER */}
      <div className="newsletter">
        <div className="container">
          <FadeIn>
            <span className="sec-label" style={{ display: 'block', textAlign: 'center' }}>Stay Updated</span>
            <h2 className="sec-title" style={{ textAlign: 'center' }}>Subscribe to Our Newsletter</h2>
            <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text)', maxWidth: 480, margin: '8px auto 0' }}>
              Get exclusive offers, special rates, and hotel news directly in your inbox.
            </p>
          </FadeIn>
          <div className="nl-form">
            <input type="email" placeholder="Enter your email address..." value={email} onChange={e => setEmail(e.target.value)} />
            <button onClick={() => { toast.success('Subscribed! Thank you.'); setEmail('') }}>Subscribe</button>
          </div>
        </div>
      </div>

      

      {/* LOCATION */}
      <div className="loc-grid">
        <div className="loc-map">
  <div className="loc-pin" />

 <iframe
  className="loc-map-img"
  src="https://www.google.com/maps?q=6.188399,7.050298&hl=en&z=16&output=embed"
  width="100%"
  height="300"
  style={{ border: 0 }}
  loading="lazy"
  title="Givenchy Luxury Hotel & Suites Location"
></iframe>


</div>
        <div className="loc-info">
          <FadeIn>
            <span className="sec-label">Find Us</span>
            <h2 className="sec-title white">Our Location</h2>
            <div className="sec-divider" />
          </FadeIn>
          <div className="loc-items">
            {[['📍','Address','Nise/Agulu Road, Amawbia\nAwka, Anambra State, Nigeria'],['📞','Phone','0814 480 0460'],['✉️','Email','reservation@givenchyluxuryhotelandsuites.com'],['🕐','Hours','Front Desk Open 24 Hours\n7 Days a Week']].map(([icon,label,val]) => (
              <FadeIn key={label}>
                <div className="loc-item">
                  <div className="loc-icon">{icon}</div>
                  <div><span className="loc-label">{label}</span><div className="loc-val">{val}</div></div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      <Footer navigate={navigate} />
    </>
  )
}
