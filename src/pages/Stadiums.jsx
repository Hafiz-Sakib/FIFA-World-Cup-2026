import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Users, Calendar, Flag } from 'lucide-react'
import stadiumsData from '../data/stadiums.json'

const countries = ['All', 'USA', 'Canada', 'Mexico']

const countryColors = {
  USA: { bg: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: 'rgba(59,130,246,0.3)' },
  Canada: { bg: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'rgba(239,68,68,0.3)' },
  Mexico: { bg: 'rgba(34,197,94,0.15)', color: '#4ade80', border: 'rgba(34,197,94,0.3)' },
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Stadiums() {
  const [country, setCountry] = useState('All')

  const filtered = country === 'All'
    ? stadiumsData
    : stadiumsData.filter(s => s.country === country)

  return (
    <div className="py-10">
      <div className="page-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="section-title gold-text mb-2">Stadiums</h1>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {stadiumsData.length} world-class venues across USA, Canada & Mexico
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2 mb-8">
          {countries.map(c => (
            <button
              key={c}
              onClick={() => setCountry(c)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${country === c ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/40' : 'border border-white/10 text-slate-400 hover:border-white/20'}`}
            >
              {c}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map(stadium => {
            const col = countryColors[stadium.country] || countryColors.USA
            return (
              <motion.div key={stadium.id} variants={itemVariants}>
                <Link
                  to={`/stadiums/${stadium.id}`}
                  className="glass-card overflow-hidden block group hover:border-yellow-400/30 transition-all duration-300"
                >
                  {/* Header band */}
                  <div className="h-2" style={{ background: 'linear-gradient(90deg, #f59e0b, #ea580c)' }} />

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">{stadium.flag}</div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: col.bg, color: col.color, border: `1px solid ${col.border}` }}>
                        {stadium.country}
                      </span>
                    </div>

                    <h3 className="font-semibold text-base mb-1 group-hover:text-yellow-400 transition-colors">
                      {stadium.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>
                      <MapPin size={11} /> {stadium.city}
                    </div>

                    <p className="text-xs mb-4 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                      {stadium.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-lg p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <div className="font-bold text-sm" style={{ color: '#f59e0b' }}>
                          {stadium.capacity.toLocaleString()}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Capacity</div>
                      </div>
                      <div className="rounded-lg p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <div className="font-bold text-sm" style={{ color: '#60a5fa' }}>{stadium.matches}</div>
                        <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Matches</div>
                      </div>
                      <div className="rounded-lg p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <div className="font-bold text-sm" style={{ color: '#4ade80' }}>{stadium.built}</div>
                        <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Built</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
