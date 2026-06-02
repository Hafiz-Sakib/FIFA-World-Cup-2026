import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, Star } from "lucide-react";
import teamsData from "../data/teams.json";

const confederations = [
  "All",
  "UEFA",
  "CONMEBOL",
  "CONCACAF",
  "CAF",
  "AFC",
  "OFC",
];

export default function Teams() {
  const [search, setSearch] = useState("");
  const [confederation, setConfederation] = useState("All");
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wc26_favorites") || "[]");
    } catch {
      return [];
    }
  });

  const toggleFav = (id, e) => {
    e.preventDefault();
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id];
      localStorage.setItem("wc26_favorites", JSON.stringify(next));
      return next;
    });
  };

  const filtered = useMemo(
    () =>
      teamsData.filter((t) => {
        const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
        const matchConf =
          confederation === "All" || t.confederation === confederation;
        return matchSearch && matchConf;
      }),
    [search, confederation],
  );

  return (
    <div className="py-10">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="section-title gold-text mb-2">All Teams</h1>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            48 qualified nations competing for the ultimate prize
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
          <div className="relative flex-1 max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--color-text-muted)" }}
            />
            <input
              type="text"
              placeholder="Search teams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-400/50 transition-colors"
              style={{ color: "var(--color-text)" }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {confederations.map((c) => (
              <button
                key={c}
                onClick={() => setConfederation(c)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${confederation === c ? "bg-yellow-400/20 text-yellow-400 border border-yellow-400/40" : "border border-white/10 text-slate-400 hover:border-white/20"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </motion.div>

        <p
          className="text-xs mb-4"
          style={{ color: "var(--color-text-muted)" }}
        >
          {filtered.length} teams
        </p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.04 } },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
        >
          {filtered.map((team, i) => (
            <motion.div
              key={team.id}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1 },
              }}
            >
              <Link
                to={`/teams/${team.id}`}
                className="glass-card p-4 flex flex-col items-center text-center group hover:border-yellow-400/30 transition-all duration-300 relative block"
              >
                <button
                  onClick={(e) => toggleFav(team.id, e)}
                  className="absolute top-2 right-2 p-1 rounded transition-colors z-10"
                  style={{
                    color: favorites.includes(team.id)
                      ? "#f59e0b"
                      : "rgba(255,255,255,0.2)",
                  }}
                >
                  <Star
                    size={12}
                    fill={favorites.includes(team.id) ? "#f59e0b" : "none"}
                  />
                </button>
                <div className="text-4xl mb-2">{team.flag}</div>
                <div className="text-xs font-semibold leading-tight mb-1 group-hover:text-yellow-400 transition-colors">
                  {team.name}
                </div>
                <div className="badge badge-gold text-xs mb-1">
                  Group {team.group}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  #{team.ranking}
                </div>
                <div
                  className="text-xs mt-1"
                  style={{
                    color: "var(--color-text-muted)",
                    fontSize: "0.65rem",
                  }}
                >
                  {team.confederation}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div
            className="text-center py-20"
            style={{ color: "var(--color-text-muted)" }}
          >
            <div className="text-4xl mb-3">🔍</div>
            <p>No teams found for "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
