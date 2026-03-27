import axios from 'axios'

// ============================================================
// DYNAMIC BASE URL (Switch between Local and Live)
// ============================================================
const api = axios.create({
  baseURL: window.location.hostname === 'localhost' 
    ? 'http://localhost:8000/api' 
    : 'https://givenchyluxuryhotelandsuites.com/api/api', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true // Required for Laravel Sanctum if used
})

// ============================================================
// INTERCEPTORS (Security & Debugging)
// ============================================================

// Auto attach token for admin requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('givenchy_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Global error handler & logger
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthorized (401), clear local storage and prep for login
    if (error.response?.status === 401) {
      localStorage.removeItem('givenchy_token')
      localStorage.removeItem('givenchy_user')
    }

    console.error("🚀 API Call Failed:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    })
    return Promise.reject(error)
  }
)

export default api

// ============================================================
// ROOMS & AVAILABILITY
// ============================================================
export const getRooms = () => api.get('/rooms')
export const getRoomById = (id) => api.get(`/rooms/${id}`)
export const checkAvailability = (data) => api.post('/rooms/availability', data)

// ============================================================
// BOOKINGS & RESERVATIONS
// ============================================================
export const createBooking = (data) => api.post('/bookings', data)
export const getBooking = (ref) => api.get(`/bookings/${ref}`)
export const getMyBookings = () => api.get('/my-bookings') // New: for guest history

// ============================================================
// PAYMENTS (Paystack Integration)
// ============================================================
export const initializePayment = (data) => api.post('/payment/initialize', data)
// Verify via reference or transaction ID
export const verifyPayment = (reference) => api.get(`/payment/verify/${reference}`)

// ============================================================
// CONTACT & ENQUIRIES
// ============================================================
export const sendMessage = (data) => api.post('/contact', data)
export const diningReservation = (data) => api.post('/dining/reserve', data)
export const eventEnquiry = (data) => api.post('/events/enquiry', data)
export const subscribeNewsletter = (email) => api.post('/newsletter/subscribe', { email })

// ============================================================
// ADMIN DASHBOARD & MANAGEMENT
// ============================================================
export const adminLogin = (data) => api.post('/auth/login', data)
export const adminLogout = () => api.post('/auth/logout')

export const getDashboard = () => api.get('/dashboard')
export const getRevenueReport = (period = 'month') => api.get(`/dashboard/revenue`, { params: { period } })

// Booking Management
export const getAllBookings = (params) => api.get('/bookings', { params })
export const updateBookingStatus = (id, action) => api.patch(`/bookings/${id}/status`, { action })
export const updatePaymentStatus = (id, status) => api.patch(`/bookings/${id}/payment`, { status })

// Guest & Staff Management
export const getGuests = (params) => api.get('/guests', { params })
export const getStaff = () => api.get('/staff')
export const getMessages = (params) => api.get('/messages', { params })

// Room Management (Admin Only)
export const updateRoomStatus = (id, status) => api.patch(`/rooms/${id}/status`, { status })
export const updateRoomPrice = (id, price) => api.patch(`/rooms/${id}/price`, { price })