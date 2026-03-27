import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { FadeIn, StaggerIn, staggerItem, SectionHeader, PageHero, Footer } from '../components/index.jsx'
import { diningReservation, eventEnquiry, sendMessage } from '../services/api'

// Assets
import executiveImg from "../assets/rooms/executive.jpg"
import mastersImg from "../assets/rooms/masters.jpg"
import kingsImg from "../assets/rooms/kings.jpg"
import restaurantImg from "../assets/dining/restaurant.jpg"
import rooftopImg from "../assets/dining/rooftop.jpg"
import vipImg from "../assets/dining/vip.jpg"

const WHATSAPP = '2348036767006'

// ========= SHARED WINE SECTION (EXPORTED) =========
export function WineSection() {
  const wines = [
    {
      name: 'Givenchy Sweet Red',
      desc: 'Our signature in-house wine. Smooth, rich and perfectly balanced — crafted exclusively for Givenchy guests.',
      img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80',
      badge: 'Signature',
    },
    {
      name: 'Givenchy Dry Red',
      desc: 'A bold and elegant dry red wine with deep fruit notes. Perfect for dinner and special occasions.',
      img: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80',
      badge: 'Premium',
    },
    {
      name: 'Givenchy Rosé',
      desc: 'Light, refreshing and delicate. Our rosé is perfect for celebrations and rooftop evenings.',
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      badge: 'Popular',
    },
  ]

  const orderWine = (wineName) => {
    const msg = encodeURIComponent(`Hello Givenchy Hotel! I would like to order: ${wineName}.`)
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank')
  }

  return (
    <section className="section wine-section-alt" style={{ background: '#0a0a0a', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <SectionHeader label="Cellar Collection" title="Givenchy Exclusive Wines" center>
          <p className="sec-p" style={{ margin: '0 auto' }}>
            Experience our exclusive in-house wine collection, curated for the discerning palate.
          </p>
        </SectionHeader>

        <StaggerIn className="wine-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, marginTop: 48 }}>
          {wines.map(w => (
            <motion.div key={w.name} className="wine-card" variants={staggerItem} style={{ background: '#111', borderRadius: 8, overflow: 'hidden', border: '1px solid #222' }}>
              <div className="img-zoom" style={{ height: 350, position: 'relative' }}>
                <img src={w.img} alt={w.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 20, right: 20, background: 'var(--gold)', color: '#000', padding: '4px 12px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{w.badge}</div>
              </div>
              <div style={{ padding: 24, textAlign: 'center' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: '#fff', marginBottom: 12 }}>{w.name}</h4>
                <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6, marginBottom: 24 }}>{w.desc}</p>
                <button className="btn-gold-sm" onClick={() => orderWine(w.name)} style={{ width: '100%' }}>
                  Order via WhatsApp
                </button>
              </div>
            </motion.div>
          ))}
        </StaggerIn>
      </div>
    </section>
  )
}

// ========= DINING PAGE (RE-DESIGNED) =========
export function DiningPage({ navigate }) {
  const [activeVenue, setActiveVenue] = useState(null)
  const { register, handleSubmit, reset } = useForm()
  const [submitting, setSubmitting] = useState(false)

  const venues = [
    { 
        img: restaurantImg, 
        tag: '7:00 AM — 10:00 PM', 
        title: 'The Grand Restaurant', 
        type: 'restaurant', 
        desc: 'A culinary journey featuring authentic Nigerian flavors and international classics.' 
    },
    { 
        img: rooftopImg, 
        tag: '5:00 PM — 2:00 AM', 
        title: 'Cloud 9 Rooftop Bar', 
        type: 'rooftop_bar', 
        desc: 'Sip premium cocktails under the stars with the most breathtaking view of the Awka skyline.' 
    },
    { 
        img: vipImg, 
        tag: 'By Reservation Only', 
        title: 'The Onyx VIP Lounge', 
        type: 'vip_bar', 
        desc: 'An intimate, high-security space for business leaders and private celebrations.' 
    },
  ]

  const onReserve = async (data) => {
    setSubmitting(true)
    try {
      await diningReservation({ ...data, venue: activeVenue.type, party_size: parseInt(data.party_size) })
      toast.success('Your table reservation has been requested. We will contact you shortly.')
      reset(); setActiveVenue(null)
    } catch (err) {
      toast.error('Reservation failed. Please check your connection.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHero bg="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80" label="Epicurean Excellence" title="Dining & Spirits" breadcrumb="Dining" />
      
      <section className="section bg-dark">
        <div className="container">
          <SectionHeader label="Our Culinary Venues" title="Exceptional Tastes" center />
          
          <StaggerIn style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 30, marginTop: 50 }}>
            {venues.map(v => (
              <motion.div key={v.title} className="venue-card-alt" variants={staggerItem} style={{ background: '#161616', border: '1px solid #222', borderRadius: '4px' }}>
                <div className="img-zoom" style={{ height: 280, overflow: 'hidden' }}>
                  <img src={v.img} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 30 }}>
                  <span style={{ color: 'var(--gold)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2 }}>{v.tag}</span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, margin: '10px 0', color: '#fff' }}>{v.title}</h3>
                  <p style={{ color: '#999', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>{v.desc}</p>
                  <button className="btn-outline-gold" onClick={() => setActiveVenue(v)}>Book This Venue</button>
                </div>
              </motion.div>
            ))}
          </StaggerIn>

          {/* RESERVATION OVERLAY/SECTION */}
          {activeVenue && (
            <FadeIn>
              <div style={{ marginTop: 60, background: '#111', border: '1px solid var(--gold)', padding: 40, borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}>
                    <div>
                        <h3 className="white">Reserve Table at {activeVenue.title}</h3>
                        <p style={{ color: 'var(--gold)' }}>Fill the details below to secure your spot.</p>
                    </div>
                    <button onClick={() => setActiveVenue(null)} className="btn-close">✕</button>
                </div>
                <form onSubmit={handleSubmit(onReserve)} className="form-grid">
                  <div className="form-field"><label>Full Name</label><input {...register('name', { required: true })} /></div>
                  <div className="form-field"><label>Phone</label><input type="tel" {...register('phone', { required: true })} /></div>
                  <div className="form-field"><label>Date</label><input type="date" {...register('date', { required: true })} /></div>
                  <div className="form-field"><label>Party Size</label><input type="number" {...register('party_size', { required: true })} /></div>
                  <div className="form-field full">
                    <button type="submit" className="btn-gold" disabled={submitting}>
                        {submitting ? 'Processing...' : 'Confirm Request'}
                    </button>
                  </div>
                </form>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      <WineSection />
      <Footer navigate={navigate} />
    </>
  )
}

// ========= ROOMS PAGE =========
export function RoomsPage({ navigate, openModal }) {
  const rooms = [
    { title:'Executive Room', cat:'Standard · Executive', price:'30,000', type:'executive', badge:'Available', img:executiveImg, feats:['AC','TV','Free Wi-Fi','24h Service'] },
    { title:'Masters Room', cat:'Premium · Masters Level', price:'60,000', type:'masters', badge:'Most Popular', img:mastersImg, feats:['King Bed','Mini Bar','City View','Wi-Fi'] },
    { title:'Kings Suite', cat:'Luxury · Suite Level', price:'100,000', type:'kings_suite', badge:'Luxury', img:kingsImg, feats:['Butler','Sitting Area','Jacuzzi','Wi-Fi'] },
  ]
  return (
    <>
      <PageHero bg="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=80" label="Accommodations" title="Rooms & Suites" breadcrumb="Rooms" />
      <section className="section bg-light">
        <div className="container">
          <SectionHeader label="Stay With Us" title="Refined Comfort" center />
          <StaggerIn style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:24, marginTop:48 }}>
            {rooms.map(r => (
              <motion.div key={r.title} className="room-card card-hover" variants={staggerItem}>
                <div className="rc-img-wrap img-zoom"><img src={r.img} alt={r.title} /><span className="rc-badge">{r.badge}</span></div>
                <div className="rc-body">
                  <div className="rc-cat">{r.cat}</div>
                  <div className="rc-title">{r.title}</div>
                  <div className="rc-price">₦{r.price} <span>/ night</span></div>
                  <button className="btn-gold-sm" onClick={() => openModal({ type:r.type, title:r.title })}>Book Now</button>
                </div>
              </motion.div>
            ))}
          </StaggerIn>
        </div>
      </section>
      <Footer navigate={navigate} />
    </>
  )
}

// ========= ABOUT PAGE =========
export function AboutPage({ navigate }) {
  return (
    <>
      <PageHero bg="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1400&q=80" label="Our Story" title="About Us" breadcrumb="About" />
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <FadeIn direction="right">
              <div className="about-imgs">
                <div className="img-zoom about-img-tall"><img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&q=80" alt="Hotel" /></div>
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  <div className="img-zoom about-img-sm"><img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80" alt="Pool" /></div>
                  <div className="img-zoom about-img-sm"><img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80" alt="Restaurant" /></div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.15}>
              <span className="sec-label">Our Story</span>
              <h2 className="sec-title">A 4-Star Oasis in Awka</h2>
              <p className="sec-p">Givenchy Luxury Hotel and Suites stands as a beacon of hospitality in Anambra State. With 55 beautifully designed rooms, we offer a sanctuary of comfort and style for both business and leisure travellers.</p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2, margin:'30px 0' }}>
                {[['55','Rooms'],['4★','Rated'],['24h','Service']].map(([n,l]) => (
                  <div key={l} style={{ background:'var(--gray)', padding:20, textAlign:'center' }}>
                    <div style={{ fontSize:32, color:'var(--gold)', fontWeight:700 }}>{n}</div>
                    <div style={{ fontSize:10, textTransform:'uppercase' }}>{l}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      <Footer navigate={navigate} />
    </>
  )
}

// ========= AMENITIES PAGE =========
export function AmenitiesPage({ navigate }) {
  const items = [
    { img:'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', title:'🏊 Swimming Pool', tag:'Open 6am-10pm' },
    { img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', title:'💆 Spa & Wellness', tag:'Licensed Therapists' },
    { img:'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80', title:'🎤 Event Center', tag:'Up to 500 Guests' },
  ]
  return (
    <>
      <PageHero bg="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&q=80" title="Amenities" breadcrumb="Amenities" />
      <section className="section">
        <div className="container">
          <StaggerIn style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:24 }}>
            {items.map(a => (
              <motion.div key={a.title} className="offer-card" variants={staggerItem}>
                <div className="offer-img img-zoom"><img src={a.img} alt={a.title} /></div>
                <div className="offer-body">
                  <div className="offer-tag">{a.tag}</div>
                  <div className="offer-title">{a.title}</div>
                </div>
              </motion.div>
            ))}
          </StaggerIn>
        </div>
      </section>
      <Footer navigate={navigate} />
    </>
  )
}

// ========= EVENTS PAGE =========
export function EventsPage({ navigate }) {
  const { register, handleSubmit, reset } = useForm()
  const onSubmit = async (data) => {
    try { await eventEnquiry(data); toast.success('Enquiry Sent!'); reset(); }
    catch { toast.error('Error.'); }
  }
  return (
    <>
      <PageHero bg="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1400&q=80" title="Events & Meetings" breadcrumb="Events" />
      <section className="section bg-light">
        <div className="container" style={{ maxWidth: 700 }}>
          <SectionHeader title="Plan Your Event" center />
          <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
            <div className="form-field full"><label>Name</label><input {...register('name')} /></div>
            <div className="form-field"><label>Date</label><input type="date" {...register('date')} /></div>
            <div className="form-field"><label>Guests</label><input type="number" {...register('guests')} /></div>
            <button type="submit" className="btn-gold full">Send Enquiry</button>
          </form>
        </div>
      </section>
      <Footer navigate={navigate} />
    </>
  )
}

// ========= GALLERY PAGE =========
export function GalleryPage({ navigate }) {
  const imgs = ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80','https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80','https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80','https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80']
  return (
    <>
      <PageHero bg="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1400&q=80" title="Gallery" breadcrumb="Gallery" />
      <section className="section"><div className="container"><StaggerIn className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>{imgs.map((src, i) => (<motion.div key={i} className="gal-item" variants={staggerItem}><img src={src} alt="Gallery" /></motion.div>))}</StaggerIn></div></section>
      <Footer navigate={navigate} />
    </>
  )
}

// ========= CONTACT PAGE =========
export function ContactPage({ navigate }) {
  const { register, handleSubmit, reset } = useForm()
  const onSubmit = async (data) => { try { await sendMessage(data); toast.success('Sent!'); reset(); } catch { toast.error('Error.'); } }
  return (
    <>
      <PageHero bg="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&q=80" title="Contact" breadcrumb="Contact" />
      <section className="section"><div className="container" style={{ maxWidth: 600 }}><form onSubmit={handleSubmit(onSubmit)} className="form-grid"><div className="form-field full"><label>Name</label><input {...register('name')} /></div><div className="form-field full"><label>Message</label><textarea rows={5} {...register('message')} /></div><button type="submit" className="btn-gold full">Send Message</button></form></div></section>
      <Footer navigate={navigate} />
    </>
  )
}