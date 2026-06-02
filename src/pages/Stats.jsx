import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import groupsData from '../data/groups.json'
import teamsData from '../data/teams.json'

// Derive stats from groups data
const allTeams = groupsData.flatMap(g => g.teams)

const topScorers = [...allTeams]
  .sort((a, b) => b.gf - a.gf)
  .slice(0, 10)
  .map(t => ({ name: t.name.length > 8 ? t.name.slice(0, 8) + '…' : t.name, goals: t.gf, flag: t.flag }))

const topWins = [...allTeams]
  .sort((a, b) => b.w - a.w || b.pts - a.pts)
  .slice(0, 10)
  .map(t => ({ name: t.name.length > 8 ? t.name.slice(0, 8) + '…' : t.name, wins: t.w, flag: t.flag }))

const confMap = {}
teamsData.forEach(t => {
  confMap[t.confederation] = (confMap[t.confederation] || 0) + 1
})
const confData = Object.entries(confMap).map(([name, value]) => ({ name, value }))
const CONF_COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#a855f7', '#ef4444', '#f97316']

// Build comparison teams list from top teams
const comparisonTeams = teamsData.slice(0, 12).map(t => {
  const stat = allTeams.find(s => s.id === t.id)
  return { ...t, ...(stat || { mp: 3, w: 1, d: 1, l: 1, gf: 2, ga: 2, gd: 0, pts: 4 }) }
})

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 text-sm" style={{ border: '1px solid rgba(245,158,11,0.3)' }}>
        <p className="font-semibold text-white mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>
        ))}
      </div>
    )
  }
  return null
}

export default function Stats() {
  const [compareA, setCompareA] = useState('BRA')
  const [compareB, setCompareB] = useState('ARG')

  const teamA = comparisonTeams.find(t => t.id === compareA) || comparisonTeams[0]
  const teamB = comparisonTeams.find(t => t.id === compareB) || comparisonTeams[1]

  const radarData = [
    { subject: 'Wins', A: teamA.w, B: teamB.w, full: 3 },
    { subject: 'Goals', A: teamA.gf, B: teamB.gf, full: 10 },
    { subject: 'Clean Sheets', A: Math.max(0, teamA.mp - Math.ceil(teamA.ga / 2)), B: Math.max(0, teamB.mp - Math.ceil(teamB.ga / 2)), full: 3 },
    { subject: 'GD', A: Math.max(0, teamA.gd), B: Math.max(0, teamB.gd), full: 8 },
    { subject: 'Points', A: teamA.pts, B: teamB.pts, full: 9 },
  ]

  const tickStyle = { fill: '#94a3b8', fontSize: 11, fontFamily: 'Hind Siliguri' }

  return (
    <div className="py-10">
      <div className="page-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="section-title gold-text mb-2">Tournament Stats</h1>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Group stage statistics · Charts powered by Recharts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Goals per team */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass-card p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span style={{ color: '#f59e0b' }}>⚽</span> Top 10 – Goals Scored
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={topScorers} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={tickStyle} axisLine={false} tickLine={false} />
                <YAxis tick={tickStyle} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(245,158,11,0.07)' }} />
                <Bar dataKey="goals" name="Goals" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Wins per team */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="glass-card p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span style={{ color: '#22c55e' }}>🏆</span> Top 10 – Wins
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={topWins} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={tickStyle} axisLine={false} tickLine={false} />
                <YAxis tick={tickStyle} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(34,197,94,0.07)' }} />
                <Bar dataKey="wins" name="Wins" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Team comparison radar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass-card p-5">
            <h3 className="font-semibold mb-4">Team Comparison</h3>
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex-1 min-w-[120px]">
                <label className="text-xs mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Team A</label>
                <select
                  value={compareA}
                  onChange={e => setCompareA(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-yellow-400/30 focus:outline-none"
                  style={{ color: '#f59e0b' }}
                >
                  {comparisonTeams.map(t => (
                    <option key={t.id} value={t.id} style={{ background: '#12121a' }}>{t.flag} {t.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 min-w-[120px]">
                <label className="text-xs mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Team B</label>
                <select
                  value={compareB}
                  onChange={e => setCompareB(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-blue-400/30 focus:outline-none"
                  style={{ color: '#60a5fa' }}
                >
                  {comparisonTeams.map(t => (
                    <option key={t.id} value={t.id} style={{ background: '#12121a' }}>{t.flag} {t.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center gap-6 mb-3 text-sm">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#f59e0b' }} />{teamA.flag} {teamA.name}</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#60a5fa' }} />{teamB.flag} {teamB.name}</span>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={tickStyle} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name={teamA.name} dataKey="A" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.25} />
                <Radar name={teamB.name} dataKey="B" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Teams by confederation */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="glass-card p-5">
            <h3 className="font-semibold mb-4">Teams by Confederation</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={confData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {confData.map((entry, index) => (
                    <Cell key={entry.name} fill={CONF_COLORS[index % CONF_COLORS.length]} />
                  ))}
                </Pie>
                <Legend
                  formatter={(value) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{value}</span>}
                />
                <Tooltip
                  formatter={(value, name) => [value + ' teams', name]}
                  contentStyle={{ background: '#12121a', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Summary table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-card overflow-hidden">
          <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <h3 className="font-semibold">All Group Stage Stats</h3>
          </div>
          <div className="table-scroll">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--color-text-muted)' }}>
                  <th className="text-left px-4 py-3 text-xs font-medium">Team</th>
                  <th className="px-3 py-3 text-center text-xs font-medium">MP</th>
                  <th className="px-3 py-3 text-center text-xs font-medium">W</th>
                  <th className="px-3 py-3 text-center text-xs font-medium">D</th>
                  <th className="px-3 py-3 text-center text-xs font-medium">L</th>
                  <th className="px-3 py-3 text-center text-xs font-medium">GF</th>
                  <th className="px-3 py-3 text-center text-xs font-medium">GA</th>
                  <th className="px-3 py-3 text-center text-xs font-medium">GD</th>
                  <th className="px-3 py-3 text-center text-xs font-medium">PTS</th>
                </tr>
              </thead>
              <tbody>
                {[...allTeams].sort((a, b) => b.pts - a.pts || b.gd - a.gd).map((t, i) => (
                  <tr key={t.id + i} className="border-b hover:bg-white/5 transition-colors"
                    style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{t.flag}</span>
                        <span className="font-medium">{t.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>{t.mp}</td>
                    <td className="px-3 py-2.5 text-center text-xs text-green-400">{t.w}</td>
                    <td className="px-3 py-2.5 text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>{t.d}</td>
                    <td className="px-3 py-2.5 text-center text-xs text-red-400">{t.l}</td>
                    <td className="px-3 py-2.5 text-center text-xs">{t.gf}</td>
                    <td className="px-3 py-2.5 text-center text-xs">{t.ga}</td>
                    <td className="px-3 py-2.5 text-center text-xs">
                      {t.gd > 0 ? <span className="text-green-400">+{t.gd}</span>
                        : t.gd < 0 ? <span className="text-red-400">{t.gd}</span>
                        : <span className="text-slate-500">0</span>}
                    </td>
                    <td className="px-3 py-2.5 text-center text-xs font-bold" style={{ color: '#f59e0b' }}>{t.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
