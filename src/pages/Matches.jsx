import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Filter } from "lucide-react";
import matchesData from "../data/matches.json";
import teamsData from "../data/teams.json";
import { formatDate, formatTime } from "../hooks/useDateFormat";

const stages = [
  "All",
  "Group Stage",
  "Round of 32",
  "Round of 16",
  "Quarter Final",
  "Semi Final",
  "Final",
];
const groups = [
  "All",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
];

const statusColor = {
  upcoming: {
    bg: "rgba(59,130,246,0.15)",
    color: "#60a5fa",
    label: "Upcoming",
  },
  live: { bg: "rgba(239,68,68,0.15)", color: "#f87171", label: "LIVE" },
  finished: { bg: "rgba(34,197,94,0.15)", color: "#4ade80", label: "FT" },
};

export default function Matches() {
  const [stageFilter, setStageFilter] = useState("All");
  const [groupFilter, setGroupFilter] = useState("All");
  const [teamFilter, setTeamFilter] = useState("");
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      matchesData.filter((m) => {
        const stageOk = stageFilter === "All" || m.stage === stageFilter;
        const groupOk = groupFilter === "All" || m.group === groupFilter;
        const teamOk =
          !teamFilter ||
          m.homeTeam.id === teamFilter ||
          m.awayTeam.id === teamFilter;
        const searchOk =
          !search ||
          m.homeTeam.name.toLowerCase().includes(search.toLowerCase()) ||
          m.awayTeam.name.toLowerCase().includes(search.toLowerCase()) ||
          m.stadium.toLowerCase().includes(search.toLowerCase()) ||
          m.city.toLowerCase().includes(search.toLowerCase());
        return stageOk && groupOk && teamOk && searchOk;
      }),
    [stageFilter, groupFilter, teamFilter, search],
  );

  // Group by date
  const byDate = useMemo(() => {
    const map = {};
    filtered.forEach((m) => {
      const d = m.date.split("T")[0];
      if (!map[d]) map[d] = [];
      map[d].push(m);
    });
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div className="py-10">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="section-title gold-text mb-2">Fixtures & Results</h1>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            All {matchesData.length} matches · All times in Bangladesh Standard
            Time (BST)
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 mb-6 flex flex-col gap-3"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--color-text-muted)" }}
              />
              <input
                type="text"
                placeholder="Search teams, stadiums..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg text-sm bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-400/50 transition-colors"
                style={{ color: "var(--color-text)" }}
              />
            </div>
            <select
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-400/50"
              style={{ color: "var(--color-text)", minWidth: "140px" }}
            >
              <option value="">All Teams</option>
              {teamsData
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.flag} {t.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-2">
            {stages.map((s) => (
              <button
                key={s}
                onClick={() => setStageFilter(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${stageFilter === s ? "bg-yellow-400/20 text-yellow-400 border border-yellow-400/40" : "border border-white/10 text-slate-400 hover:border-white/20"}`}
              >
                {s}
              </button>
            ))}
          </div>
          {stageFilter === "Group Stage" || stageFilter === "All" ? (
            <div className="flex flex-wrap gap-2">
              {groups.map((g) => (
                <button
                  key={g}
                  onClick={() => setGroupFilter(g)}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-all ${groupFilter === g ? "bg-yellow-400/20 text-yellow-400 border border-yellow-400/40" : "border border-white/10 text-slate-400 hover:border-white/20"}`}
                >
                  {g === "All" ? "All Groups" : `Group ${g}`}
                </button>
              ))}
            </div>
          ) : null}
        </motion.div>

        <p
          className="text-xs mb-5"
          style={{ color: "var(--color-text-muted)" }}
        >
          {filtered.length} matches
        </p>

        {byDate.length === 0 && (
          <div className="text-center py-16 glass-card">
            <div className="text-4xl mb-3">📅</div>
            <p style={{ color: "var(--color-text-muted)" }}>No matches found</p>
          </div>
        )}

        <div className="space-y-8">
          {byDate.map(([date, matches]) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Calendar size={14} style={{ color: "#f59e0b" }} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#f59e0b" }}
                >
                  {formatDate(matches[0].date)}
                </span>
                <div className="flex-1 horizon-line" />
                <span
                  className="text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {matches.length} match{matches.length !== 1 ? "es" : ""}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {matches.map((m) => {
                  const st = statusColor[m.status] || statusColor.upcoming;
                  return (
                    <div
                      key={m.id}
                      className="glass-card p-4 hover:border-yellow-400/20 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="badge badge-gold text-xs">
                            {m.stage === "Group Stage"
                              ? `Group ${m.group}`
                              : m.stage}
                          </span>
                          <span
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
                            style={{ background: st.bg, color: st.color }}
                          >
                            {m.status === "live" && (
                              <span className="live-dot mr-1.5" />
                            )}
                            {st.label}
                          </span>
                        </div>
                        <span
                          className="text-xs"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {formatTime(m.date)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-6">
                        <div className="flex-1 flex flex-col sm:flex-row items-center sm:justify-end gap-2 sm:gap-3">
                          <span className="text-sm font-semibold text-center sm:text-right">
                            {m.homeTeam.name}
                          </span>
                          <span className="text-3xl">{m.homeTeam.flag}</span>
                        </div>
                        <div className="flex-shrink-0 text-center min-w-[60px]">
                          {m.homeScore !== null ? (
                            <div className="font-display text-2xl text-white">
                              {m.homeScore} - {m.awayScore}
                            </div>
                          ) : (
                            <div
                              className="font-bold text-base"
                              style={{ color: "#f59e0b" }}
                            >
                              VS
                            </div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col sm:flex-row items-center sm:justify-start gap-2 sm:gap-3">
                          <span className="text-3xl">{m.awayTeam.flag}</span>
                          <span className="text-sm font-semibold text-center sm:text-left">
                            {m.awayTeam.name}
                          </span>
                        </div>
                      </div>
                      <div
                        className="mt-3 flex items-center gap-1 text-xs"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        <MapPin size={11} /> {m.stadium}, {m.city}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
