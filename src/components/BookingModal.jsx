import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { createBooking } from '../services/api'

export default function BookingModal({ onClose, selectedRoom }) {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      roomType: selectedRoom?.type || 'executive',
      adults:   '1',
      children: '0',
    }
  })

  const [submitting, setSubmitting] = useState(false)

  const checkIn  = watch('checkIn')
  const checkOut = watch('checkOut')
  const roomType = watch('roomType')

  const getRoomPrice = () => {
    const prices = { executive: 30000, masters: 60000, kings_suite: 100000 }
    return prices[roomType] || 30000
  }

  const getNights = () => {
    if (!checkIn || !checkOut) return 0
    const diff = new Date(checkOut) - new Date(checkIn)
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
  }

  const nights   = getNights()
  const price    = getRoomPrice()
  const subtotal = price * nights
  const discount = subtotal * 0.05
  const total    = subtotal - discount

  const onSubmit = async (data) => {
    if (!data.checkIn || !data.checkOut) {
      toast.error('Please select check-in and check-out dates.')
      return
    }
    if (new Date(data.checkOut) <= new Date(data.checkIn)) {
      toast.error('Check-out must be after check-in.')
      return
    }
    if (nights < 1) {
      toast.error('Minimum stay is 1 night.')
      return
    }

    setSubmitting(true)
    const toastId = toast.loading('Confirming your booking...')

    try {
      const res = await createBooking({
        first_name:       data.firstName,
        last_name:        data.lastName,
        email:            data.email,
        phone:            data.phone,
        room_type:        data.roomType,
        check_in:         data.checkIn,
        check_out:        data.checkOut,
        adults:           parseInt(data.adults) || 1,
        children:         parseInt(data.children) || 0,
        special_requests: data.requests || '',
        source:           'website',
      })

      toast.dismiss(toastId)
      toast.success(`🎉 Booking confirmed! Ref: ${res.data.booking_ref}`)
      onClose()

    } catch (error) {
      toast.dismiss(toastId)
      const errors     = error.response?.data?.errors
      const firstError = errors ? Object.values(errors)[0]?.[0] : null
      toast.error(
        firstError ||
        error.response?.data?.message ||
        'Booking failed. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          className="modal-box"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <button className="modal-close" onClick={onClose}>✕</button>
          <div className="modal-title">Book A Room</div>
          <div className="modal-sub">Givenchy Luxury Hotel and Suites · Awka</div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-grid">

              {/* ROOM TYPE */}
              <div className="form-field full">
                <label>Room Type</label>
                <select {...register('roomType', { required: true })}>
                  <option value="executive">Executive Room — ₦30,000/night</option>
                  <option value="masters">Masters Room — ₦60,000/night</option>
                  <option value="kings_suite">Kings Suite — ₦100,000/night</option>
                </select>
              </div>

              {/* DATES */}
              <div className="form-field">
                <label>Check In Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  {...register('checkIn', { required: true })}
                />
              </div>
              <div className="form-field">
                <label>Check Out Date</label>
                <input
                  type="date"
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  {...register('checkOut', { required: true })}
                />
              </div>

              {/* GUESTS */}
              <div className="form-field">
                <label>Adults</label>
                <select {...register('adults')}>
                  <option value="1">1 Adult</option>
                  <option value="2">2 Adults</option>
                  <option value="3">3 Adults</option>
                  <option value="4">4 Adults</option>
                </select>
              </div>
              <div className="form-field">
                <label>Children</label>
                <select {...register('children')}>
                  <option value="0">No Children</option>
                  <option value="1">1 Child</option>
                  <option value="2">2 Children</option>
                  <option value="3">3 Children</option>
                </select>
              </div>

              {/* PRICE SUMMARY */}
              {nights > 0 && (
                <div className="form-field full" style={{ background:'rgba(200,169,81,0.08)', border:'1px solid rgba(200,169,81,0.2)', padding:'14px 16px', borderRadius:4 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'#999', marginBottom:6 }}>
                    <span>Room rate per night</span>
                    <span>₦{price.toLocaleString()}</span>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'#999', marginBottom:6 }}>
                    <span>{nights} night{nights > 1 ? 's' : ''}</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'#22c55e', marginBottom:8 }}>
                    <span>Direct booking discount (5%)</span>
                    <span>- ₦{discount.toLocaleString()}</span>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, color:'#c8a951', fontWeight:700, borderTop:'1px solid rgba(200,169,81,0.2)', paddingTop:8 }}>
                    <span>Total</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* GUEST INFO */}
              <div className="form-field">
                <label>First Name</label>
                <input type="text" placeholder="First name"
                  {...register('firstName', { required: true })} />
              </div>
              <div className="form-field">
                <label>Last Name</label>
                <input type="text" placeholder="Last name"
                  {...register('lastName', { required: true })} />
              </div>
              <div className="form-field">
                <label>Email Address</label>
                <input type="email" placeholder="your@email.com"
                  {...register('email', { required: true })} />
              </div>
              <div className="form-field">
                <label>Phone Number</label>
                <input type="tel" placeholder="0814 000 0000"
                  {...register('phone', { required: true })} />
              </div>

              {/* SPECIAL REQUESTS */}
              <div className="form-field full">
                <label>Special Requests (Optional)</label>
                <textarea rows={3} placeholder="Any special requests or preferences..."
                  {...register('requests')} />
              </div>

              {/* SUBMIT */}
              <div className="form-field full">
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={submitting}
                >
                  {submitting ? '⏳ Processing...' : '✓ Confirm Booking →'}
                </button>
              </div>

            </div>
          </form>

          <p className="form-note">
            Free cancellation up to 48hrs before check-in · Direct booking saves 5%
          </p>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}