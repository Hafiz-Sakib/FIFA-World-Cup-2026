import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trophy, Users, Calendar, MapPin, ArrowRight, Globe } from 'lucide-react'
import matchesData from '../data/matches.json'
import teamsData from '../data/teams.json'
import stadiumsData from '../data/stadiums.json'
import { formatDate, formatTime } from '../hooks/useDateFormat'

const stats = [
  { label: 'Teams', value: '48', icon: Users, color: '#f59e0b' },
  { label: 'Matches', value: '104', icon: Calendar, color: '#3b82f6' },
  { label: 'Stadiums', value: '16', icon: MapPin, color: '#10b981' },
  { label: 'Groups', value: '12', icon: Globe, color: '#8b5cf6' },
]

const hostCities = [
  { city: 'New York/NJ', country: '🇺🇸', venue: 'MetLife Stadium' },
  { city: 'Los Angeles', country: '🇺🇸', venue: 'SoFi Stadium' },
  { city: 'Dallas', country: '🇺🇸', venue: 'AT&T Stadium' },
  { city: 'Toronto', country: '🇨🇦', venue: 'BMO Field' },
  { city: 'Mexico City', country: '🇲🇽', venue: 'Estadio Azteca' },
  { city: 'Miami', country: '🇺🇸', venue: 'Hard Rock Stadium' },
]

export default function Home() {
  const upcomingMatches = matchesData
    .filter(m => m.status === 'upcoming')
    .slice(0, 6)

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(245, 158, 11, 0.12) 0%, transparent 70%)'
          }} />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10" style={{
            background: 'radial-gradient(circle, #ea580c, transparent 70%)',
            transform: 'translate(30%, -30%)'
          }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10" style={{
            background: 'radial-gradient(circle, #3b82f6, transparent 70%)',
            transform: 'translate(-30%, 30%)'
          }} />
        </div>

        <div className="page-container relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-6xl sm:text-7xl mb-6"
            >
              ⚽
            </motion.div>

            <div className="badge badge-gold mb-4 mx-auto text-xs tracking-widest uppercase">
              Official Tournament Tracker
            </div>

            <h1 className="font-display mb-4" style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              lineHeight: 1,
              letterSpacing: '0.02em',
            }}>
              <span className="shimmer-text">FIFA</span>
              <br />
              <span style={{ color: 'white' }}>WORLD CUP</span>
              <br />
              <span className="shimmer-text">2026</span>
            </h1>

            <p className="text-base sm:text-lg mb-4 max-w-xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              48 nations. 3 host countries. The greatest football tournament ever.
            </p>

            <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
              {['🇺🇸 USA', '🇨🇦 Canada', '🇲🇽 Mexico'].map(c => (
                <span key={c} className="badge badge-gold text-xs">{c}</span>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/groups" className="btn-primary flex items-center gap-2">
                View Groups <ArrowRight size={16} />
              </Link>
              <Link to="/bracket" className="btn-ghost flex items-center gap-2">
                Tournament Bracket <Trophy size={16} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative bottom line */}
        <div className="absolute bottom-0 left-0 right-0 horizon-line" />
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="page-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map(({ label, value, icon: Icon, color }) => (
              <motion.div key={label} variants={itemVariants}>
                <div className="glass-card p-6 text-center group hover:border-yellow-400/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: `${color}20`, color }}>
                    <Icon size={22} />
                  </div>
                  <div className="font-display text-4xl mb-1" style={{ color }}>{value}</div>
                  <div className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>{label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="py-12">
        <div className="page-container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title gold-text">Upcoming Matches</h2>
            <Link to="/matches" className="text-sm flex items-center gap-1 transition-colors hover:text-yellow-400"
              style={{ color: 'var(--color-text-muted)' }}>
              All matches <ArrowRight size={14} />
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {upcomingMatches.map((match) => (
              <motion.div key={match.id} variants={itemVariants}>
                <div className="glass-card p-5 hover:border-yellow-400/20 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="badge badge-gold text-xs">
                      {match.stage === 'Group Stage' ? `Group ${match.group}` : match.stage}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {formatDate(match.date)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex-1 text-center">
                      <div className="text-3xl mb-1">{match.homeTeam.flag}</div>
                      <div className="text-sm font-semibold truncate">{match.homeTeam.name}</div>
                    </div>
                    <div className="flex flex-col items-center flex-shrink-0 px-2">
                      <div className="font-display text-xl" style={{ color: '#f59e0b' }}>VS</div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="text-3xl mb-1">{match.awayTeam.flag}</div>
                      <div className="text-sm font-semibold truncate">{match.awayTeam.name}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} /> {match.city}
                    </span>
                    <span>{formatTime(match.date)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Host Cities */}
      <section className="py-12">
        <div className="page-container">
          <h2 className="section-title gold-text mb-6">Host Cities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {hostCities.map((c, i) => (
              <motion.div
                key={c.city}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <div className="glass-card p-4 text-center hover:border-yellow-400/20 transition-all cursor-default">
                  <div className="text-2xl mb-2">{c.country}</div>
                  <div className="text-sm font-semibold mb-1">{c.city}</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{c.venue}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 sm:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(245, 158, 11, 0.06), transparent)'
            }} />
            <div className="relative z-10">
              <Trophy size={40} className="mx-auto mb-4 text-yellow-400" />
              <h2 className="font-display text-3xl sm:text-5xl mb-4 text-white">
                Who Will Lift The Trophy?
              </h2>
              <p className="text-base mb-6 max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                Follow the complete tournament from the group stage through to the grand final at MetLife Stadium.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/teams" className="btn-primary flex items-center gap-2">
                  <Users size={16} /> Explore Teams
                </Link>
                <Link to="/stadiums" className="btn-ghost flex items-center gap-2">
                  <MapPin size={16} /> View Stadiums
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
