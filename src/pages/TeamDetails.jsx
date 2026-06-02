import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Calendar, Users, MapPin } from "lucide-react";
import teamsData from "../data/teams.json";
import matchesData from "../data/matches.json";
import playersData from "../data/players.json";
import groupsData from "../data/groups.json";
import { formatDate, formatTime } from "../hooks/useDateFormat";

export default function TeamDetails() {
  const { id } = useParams();
  const team = teamsData.find((t) => t.id === id);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wc26_favorites") || "[]");
    } catch {
      return [];
    }
  });
  const [activeTab, setActiveTab] = useState("overview");

  if (!team)
    return (
      <div className="py-20 text-center page-container">
        <div className="text-5xl mb-4">😕</div>
        <p className="text-lg" style={{ color: "var(--color-text-muted)" }}>
          Team not found
        </p>
        <Link
          to="/teams"
          className="btn-primary mt-4 inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Teams
        </Link>
      </div>
    );

  const teamMatches = matchesData.filter(
    (m) => m.homeTeam.id === id || m.awayTeam.id === id,
  );
  const groupData = groupsData.find((g) => g.id === team.group);
  const groupTeamStats = groupData?.teams.find((t) => t.id === id);
  const squad = playersData.filter
    ? playersData.filter((p) => p.teamId === id)
    : [];

  const positions = ["Goalkeeper", "Defender", "Midfielder", "Forward"];
  const byPosition = (pos) => squad.filter((p) => p.position === pos);

  const toggleFav = () => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id];
      localStorage.setItem("wc26_favorites", JSON.stringify(next));
      return next;
    });
  };

  const tabs = ["overview", "squad", "matches"];

  return (
    <div className="py-10">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/teams"
            className="flex items-center gap-2 text-sm hover:text-yellow-400 transition-colors mb-4"
            style={{ color: "var(--color-text-muted)" }}
          >
            <ArrowLeft size={16} /> Back to Teams
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 sm:p-8 mb-6 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 20% 50%, rgba(245,158,11,0.06), transparent)",
            }}
          />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="text-7xl sm:text-8xl">{team.flag}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h1 className="font-display text-3xl sm:text-4xl text-white">
                  {team.name}
                </h1>
                <button
                  onClick={toggleFav}
                  className="p-1.5 rounded-lg transition-colors"
                  style={{
                    color: favorites.includes(id)
                      ? "#f59e0b"
                      : "rgba(255,255,255,0.3)",
                  }}
                >
                  <Star
                    size={18}
                    fill={favorites.includes(id) ? "#f59e0b" : "none"}
                  />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="badge badge-gold">Group {team.group}</span>
                <span className="badge badge-blue">{team.confederation}</span>
                <span className="badge badge-green">FIFA #{team.ranking}</span>
              </div>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                Coach: <span className="text-white">{team.coach}</span>
              </p>
            </div>
            {groupTeamStats && (
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {[
                  { label: "MP", value: groupTeamStats.mp },
                  { label: "W", value: groupTeamStats.w, color: "#22c55e" },
                  { label: "D", value: groupTeamStats.d },
                  { label: "PTS", value: groupTeamStats.pts, color: "#f59e0b" },
                ].map((s) => (
                  <div key={s.label} className="text-center glass-card p-3">
                    <div
                      className="font-display text-2xl"
                      style={{ color: s.color || "white" }}
                    >
                      {s.value}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Tabs */}
        <div
          className="flex gap-1 mb-6 p-1 rounded-xl w-fit"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? "bg-yellow-400/20 text-yellow-400" : "text-slate-400 hover:text-white"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Users size={16} className="text-yellow-400" /> Group{" "}
                {team.group} Standings
              </h3>
              {groupData && (
                <div className="table-scroll">
                  <table className="w-full text-sm">
                    <thead>
                      <tr
                        style={{
                          color: "var(--color-text-muted)",
                          borderBottom: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <th className="text-left py-2 text-xs">Team</th>
                        <th className="px-2 py-2 text-center text-xs">MP</th>
                        <th className="px-2 py-2 text-center text-xs">W</th>
                        <th className="px-2 py-2 text-center text-xs">D</th>
                        <th className="px-2 py-2 text-center text-xs">L</th>
                        <th className="px-2 py-2 text-center text-xs">PTS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...groupData.teams]
                        .sort((a, b) => b.pts - a.pts)
                        .map((t, idx) => (
                          <tr
                            key={t.id}
                            className={`${t.id === id ? "bg-yellow-400/10" : ""} border-b border-white/5`}
                          >
                            <td className="py-2">
                              <Link
                                to={`/teams/${t.id}`}
                                className={`flex items-center gap-2 hover:text-yellow-400 transition-colors ${t.id === id ? "text-yellow-400 font-bold" : ""}`}
                              >
                                <span>{t.flag}</span>
                                <span className="truncate">{t.name}</span>
                                {idx < 2 && (
                                  <span className="text-green-400 text-xs">
                                    ●
                                  </span>
                                )}
                              </Link>
                            </td>
                            <td className="text-center px-2 py-2 text-xs">
                              {t.mp}
                            </td>
                            <td className="text-center px-2 py-2 text-xs text-green-400">
                              {t.w}
                            </td>
                            <td className="text-center px-2 py-2 text-xs">
                              {t.d}
                            </td>
                            <td className="text-center px-2 py-2 text-xs text-red-400">
                              {t.l}
                            </td>
                            <td
                              className="text-center px-2 py-2 text-xs font-bold"
                              style={{ color: "#f59e0b" }}
                            >
                              {t.pts}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Calendar size={16} className="text-yellow-400" /> Upcoming
                Matches
              </h3>
              {teamMatches.length === 0 && (
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  No matches scheduled yet.
                </p>
              )}
              <div className="flex flex-col gap-3">
                {teamMatches.slice(0, 4).map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    <div className="flex-1 text-center">
                      <div className="text-2xl">{m.homeTeam.flag}</div>
                      <div className="text-xs mt-1 truncate">
                        {m.homeTeam.name}
                      </div>
                    </div>
                    <div className="text-center flex-shrink-0">
                      <div
                        className="text-xs font-bold"
                        style={{ color: "#f59e0b" }}
                      >
                        {m.homeScore !== null
                          ? `${m.homeScore} - ${m.awayScore}`
                          : "VS"}
                      </div>
                      <div
                        className="text-xs mt-1"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {formatTime(m.date)}
                      </div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="text-2xl">{m.awayTeam.flag}</div>
                      <div className="text-xs mt-1 truncate">
                        {m.awayTeam.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "squad" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {squad.length === 0 ? (
              <div className="glass-card p-10 text-center">
                <div className="text-4xl mb-3">👕</div>
                <p style={{ color: "var(--color-text-muted)" }}>
                  Squad details coming soon
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {positions.map((pos) => {
                  const players = byPosition(pos);
                  if (!players.length) return null;
                  return (
                    <div key={pos}>
                      <h3 className="font-semibold mb-3 text-yellow-400">
                        {pos}s
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {players.map((p) => (
                          <div
                            key={p.id}
                            className="glass-card p-3 text-center hover:border-yellow-400/30 transition-all"
                          >
                            <div
                              className="w-12 h-12 rounded-full bg-white/10 mx-auto mb-2 flex items-center justify-center font-bold text-lg"
                              style={{ color: "#f59e0b" }}
                            >
                              {p.number || "?"}
                            </div>
                            <div className="text-sm font-semibold truncate">
                              {p.name}
                            </div>
                            <div
                              className="text-xs mt-0.5"
                              style={{ color: "var(--color-text-muted)" }}
                            >
                              {p.club}
                            </div>
                            <div
                              className="text-xs mt-0.5"
                              style={{ color: "var(--color-text-muted)" }}
                            >
                              Age {p.age}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "matches" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-3"
          >
            {teamMatches.map((m) => (
              <div
                key={m.id}
                className="glass-card p-4 hover:border-yellow-400/20 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="badge badge-gold text-xs">
                    {m.stage === "Group Stage" ? `Group ${m.group}` : m.stage}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {formatDate(m.date)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-2xl">{m.homeTeam.flag}</span>
                    <span
                      className={`text-sm font-semibold ${m.homeTeam.id === id ? "text-yellow-400" : ""}`}
                    >
                      {m.homeTeam.name}
                    </span>
                  </div>
                  <div className="text-center px-3">
                    {m.homeScore !== null ? (
                      <span className="font-display text-xl text-white">
                        {m.homeScore} - {m.awayScore}
                      </span>
                    ) : (
                      <span
                        className="text-sm font-bold"
                        style={{ color: "#f59e0b" }}
                      >
                        VS
                      </span>
                    )}
                    <div
                      className="text-xs mt-1"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {formatTime(m.date)}
                    </div>
                  </div>
                  <div className="flex-1 flex items-center gap-2 justify-end">
                    <span
                      className={`text-sm font-semibold ${m.awayTeam.id === id ? "text-yellow-400" : ""}`}
                    >
                      {m.awayTeam.name}
                    </span>
                    <span className="text-2xl">{m.awayTeam.flag}</span>
                  </div>
                </div>
                <div
                  className="mt-2 flex items-center gap-1 text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <MapPin size={10} /> {m.stadium}, {m.city}
                </div>
              </div>
            ))}
            {teamMatches.length === 0 && (
              <div className="glass-card p-10 text-center">
                <p style={{ color: "var(--color-text-muted)" }}>
                  No matches found
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
