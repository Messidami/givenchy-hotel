import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <AnimatePresence>
      <motion.div
        className="page-loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="loader-logo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          GIVENCHY
        </motion.div>
        <motion.div
          className="loader-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Luxury Hotel and Suites · Awka
        </motion.div>
        <motion.div
          className="loader-bar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
