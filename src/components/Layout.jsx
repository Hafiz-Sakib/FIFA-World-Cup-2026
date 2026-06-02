import React, { useState, useEffect } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Trophy, Users, Calendar, BarChart3, Shield, Home, MapPin, TrendingUp } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/groups', label: 'Groups', icon: BarChart3 },
  { to: '/standings', label: 'Standings', icon: TrendingUp },
  { to: '/bracket', label: 'Bracket', icon: Trophy },
  { to: '/matches', label: 'Matches', icon: Calendar },
  { to: '/teams', label: 'Teams', icon: Shield },
  { to: '/stadiums', label: 'Stadiums', icon: MapPin },
  { to: '/stats', label: 'Stats', icon: Users },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <div className="min-h-screen bg-grid" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10, 10, 15, 0.97)' : 'rgba(10, 10, 15, 0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(245, 158, 11, 0.2)' : '1px solid transparent',
        }}
      >
        <div className="page-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)' }}>
                ⚽
              </div>
              <div className="hidden sm:block">
                <div className="font-display text-lg leading-none" style={{ color: '#f59e0b', letterSpacing: '0.05em' }}>
                  FIFA WC
                </div>
                <div className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>
                  2026
                </div>
              </div>
              <div className="sm:hidden font-display text-xl" style={{ color: '#f59e0b' }}>WC26</div>
            </NavLink>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-yellow-400 bg-yellow-400/10'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <Icon size={14} />
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden"
            style={{
              background: 'rgba(10, 10, 15, 0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
            }}
          >
            <nav className="page-container py-4 grid grid-cols-2 gap-1">
              {navItems.map(({ to, label, icon: Icon }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        isActive
                          ? 'text-yellow-400 bg-yellow-400/10'
                          : 'text-slate-400'
                      }`
                    }
                  >
                    <Icon size={18} />
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 lg:hidden"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="page-container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚽</span>
              <span className="font-display text-lg" style={{ color: '#f59e0b' }}>FIFA World Cup 2026</span>
            </div>
            <div className="text-sm text-center" style={{ color: 'var(--color-text-muted)' }}>
              USA · Canada · Mexico &nbsp;|&nbsp; 48 Teams · 104 Matches
            </div>
            <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              All times in Bangladesh Standard Time (BST)
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
