import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Users, Calendar, Layers } from 'lucide-react'
import stadiumsData from '../data/stadiums.json'
import matchesData from '../data/matches.json'
import { formatDate, formatTime } from '../hooks/useDateFormat'

export default function StadiumDetail() {
  const { id } = useParams()
  const stadium = stadiumsData.find(s => s.id === id)

  if (!stadium) return (
    <div className="py-20 text-center page-container">
      <div className="text-5xl mb-4">🏟️</div>
      <p className="text-lg" style={{ color: 'var(--color-text-muted)' }}>Stadium not found</p>
      <Link to="/stadiums" className="btn-primary mt-4 inline-flex items-center gap-2">
        <ArrowLeft size={16} /> Back to Stadiums
      </Link>
    </div>
  )

  const stadiumMatches = matchesData.filter(m => m.stadium === stadium.name)

  const stats = [
    { label: 'Capacity', value: stadium.capacity.toLocaleString(), icon: Users, color: '#f59e0b' },
    { label: 'Matches', value: stadium.matches, icon: Calendar, color: '#60a5fa' },
    { label: 'Built', value: stadium.built, icon: Layers, color: '#4ade80' },
    { label: 'Surface', value: stadium.surface, icon: Layers, color: '#a78bfa' },
  ]

  return (
    <div className="py-10">
      <div className="page-container">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Link to="/stadiums" className="flex items-center gap-2 text-sm hover:text-yellow-400 transition-colors mb-4"
            style={{ color: 'var(--color-text-muted)' }}>
            <ArrowLeft size={16} /> Back to Stadiums
          </Link>
        </motion.div>

        {/* Hero Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-hidden mb-6">
          <div className="h-2" style={{ background: 'linear-gradient(90deg, #f59e0b, #ea580c, #3b82f6)' }} />
          <div className="p-6 sm:p-8 relative">
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse 60% 80% at 20% 50%, rgba(245,158,11,0.05), transparent)'
            }} />
            <div className="relative flex flex-col sm:flex-row items-start gap-5">
              <div className="text-6xl sm:text-7xl">{stadium.flag}</div>
              <div className="flex-1">
                <h1 className="font-display text-3xl sm:text-4xl text-white mb-2">{stadium.name}</h1>
                <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
                  <MapPin size={14} /> {stadium.city}, {stadium.country}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {stadium.description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          {stats.map(s => (
            <div key={s.label} className="glass-card p-4 text-center">
              <div className="font-display text-2xl sm:text-3xl mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Matches at this stadium */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <h2 className="section-title gold-text mb-4">Matches at {stadium.name}</h2>
          {stadiumMatches.length === 0 ? (
            <div className="glass-card p-10 text-center">
              <div className="text-4xl mb-3">📅</div>
              <p style={{ color: 'var(--color-text-muted)' }}>No matches scheduled yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {stadiumMatches.map(m => (
                <div key={m.id} className="glass-card p-4 hover:border-yellow-400/20 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="badge badge-gold text-xs">
                      {m.stage === 'Group Stage' ? `Group ${m.group}` : m.stage}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {formatDate(m.date)} · {formatTime(m.date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-6">
                    <div className="flex-1 flex flex-col sm:flex-row items-center sm:justify-end gap-2">
                      <span className="text-sm font-semibold text-center sm:text-right">{m.homeTeam.name}</span>
                      <span className="text-3xl">{m.homeTeam.flag}</span>
                    </div>
                    <div className="flex-shrink-0 text-center min-w-[60px]">
                      {m.homeScore !== null ? (
                        <div className="font-display text-2xl text-white">{m.homeScore} - {m.awayScore}</div>
                      ) : (
                        <div className="font-bold text-base" style={{ color: '#f59e0b' }}>VS</div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row items-center sm:justify-start gap-2">
                      <span className="text-3xl">{m.awayTeam.flag}</span>
                      <span className="text-sm font-semibold text-center sm:text-left">{m.awayTeam.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
