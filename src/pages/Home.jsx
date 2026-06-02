import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Users,
  CalendarDays,
  Globe,
  Search,
  ChevronRight,
  Zap,
} from "lucide-react";
import fixtures from "../data/fixtures.json";
import { getAllTeams } from "../utils/countryUtils";

const GROUP_STAGE = fixtures.filter(
  (f) =>
    ![
      "Round of 32",
      "Round of 16",
      "Quarter-Final",
      "Semi-Final",
      "Third Place",
      "Final",
    ].includes(f.group),
);

// Unique teams count
const TEAM_COUNT = getAllTeams().length;

// Unique groups
const GROUPS = [...new Set(GROUP_STAGE.map((f) => f.group))].sort();

// Upcoming group stage matches (first 6)
const FEATURED = GROUP_STAGE.slice(0, 6);

/**
 * Home – landing page with hero, stats, and quick nav cards.
 */
export default function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/by-team`);
    }
  };

  return (
    <div className="hero-bg min-h-screen">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              width: 600,
              height: 600,
              top: -200,
              left: -100,
              background:
                "radial-gradient(circle, rgba(42,82,152,0.6), transparent)",
            }}
          />
          <div
            className="absolute rounded-full blur-3xl opacity-10"
            style={{
              width: 400,
              height: 400,
              bottom: 0,
              right: -100,
              background:
                "radial-gradient(circle, rgba(201,168,76,0.5), transparent)",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-14 text-center">
          {/* FIFA badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(201,168,76,0.1)",
              border: "1px solid rgba(201,168,76,0.3)",
              color: "#C9A84C",
            }}
          >
            <Zap size={12} /> Official Tournament Fixtures
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-2">
            <span className="gold-text">FIFA World Cup</span>
          </h1>
          <h2
            className="text-5xl md:text-7xl font-bold text-white mb-3"
            style={{ letterSpacing: "-1px" }}
          >
            2026
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-2">
            USA · Canada · Mexico
          </p>
          <p className="text-sm text-gray-500 mb-10">
            All match times in{" "}
            <span style={{ color: "#C9A84C" }}>
              Bangladesh Standard Time (BST / UTC+6)
            </span>
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "#C9A84C" }}
              />
              <input
                type="text"
                className="field-input w-full pl-12 pr-32 py-4 text-sm rounded-2xl"
                placeholder="Search for a team (e.g. Brazil, Germany...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="btn-gold absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 text-sm rounded-xl"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: CalendarDays,
              label: "Total Matches",
              value: fixtures.length,
              color: "#C9A84C",
            },
            {
              icon: Users,
              label: "Participating Teams",
              value: TEAM_COUNT,
              color: "#60a5fa",
            },
            {
              icon: Trophy,
              label: "Groups",
              value: GROUPS.length,
              color: "#34d399",
            },
            {
              icon: Globe,
              label: "Host Countries",
              value: 3,
              color: "#f472b6",
            },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="stat-card px-5 py-5 text-center">
              <Icon size={24} className="mx-auto mb-2" style={{ color }} />
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {value}
              </div>
              <div className="text-xs text-gray-400 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUICK NAV ── */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <h3 className="text-lg font-bold text-white mb-4">Browse Fixtures</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* By Team */}
          <a
            href="/by-team"
            onClick={(e) => {
              e.preventDefault();
              navigate("/by-team");
            }}
            className="glass-card p-6 flex items-center gap-4 cursor-pointer no-underline group"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(42,82,152,0.4), rgba(42,82,152,0.2))",
                border: "1px solid rgba(42,82,152,0.4)",
              }}
            >
              <Users size={22} style={{ color: "#93c5fd" }} />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-white text-base mb-0.5">
                Fixtures by Team
              </div>
              <div className="text-sm text-gray-400">
                Select any of the {TEAM_COUNT} teams to view their full schedule
              </div>
            </div>
            <ChevronRight
              size={18}
              className="flex-shrink-0 text-gray-500 group-hover:text-yellow-400 transition-colors ml-auto"
            />
          </a>

          {/* By Date */}
          <a
            href="/by-date"
            onClick={(e) => {
              e.preventDefault();
              navigate("/by-date");
            }}
            className="glass-card p-6 flex items-center gap-4 cursor-pointer no-underline group"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))",
                border: "1px solid rgba(201,168,76,0.25)",
              }}
            >
              <CalendarDays size={22} style={{ color: "#C9A84C" }} />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-white text-base mb-0.5">
                Fixtures by Date
              </div>
              <div className="text-sm text-gray-400">
                Browse all matches by date — from June 11 to July 19, 2026
              </div>
            </div>
            <ChevronRight
              size={18}
              className="flex-shrink-0 text-gray-500 group-hover:text-yellow-400 transition-colors ml-auto"
            />
          </a>
        </div>
      </section>

      {/* ── GROUPS ── */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h3 className="text-lg font-bold text-white mb-4">Tournament Groups</h3>
        <div className="flex flex-wrap gap-2">
          {GROUPS.map((g) => (
            <span
              key={g}
              className="px-4 py-2 rounded-xl text-sm font-semibold"
              style={{
                background: "rgba(15,22,40,0.85)",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "#e2e8f0",
              }}
            >
              Group {g}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-500">
          12 groups · 4 teams per group · 48 group stage matches total
        </p>
      </section>

      {/* ── HOST VENUES ── */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h3 className="text-lg font-bold text-white mb-4">Host Stadiums</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { name: "MetLife Stadium", city: "New York/NJ", country: "USA" },
            { name: "SoFi Stadium", city: "Los Angeles", country: "USA" },
            { name: "AT&T Stadium", city: "Dallas", country: "USA" },
            { name: "Hard Rock Stadium", city: "Miami", country: "USA" },
            { name: "Levi's Stadium", city: "San Francisco", country: "USA" },
            { name: "Mercedes-Benz Stadium", city: "Atlanta", country: "USA" },
            { name: "Gillette Stadium", city: "Boston", country: "USA" },
            { name: "Arrowhead Stadium", city: "Kansas City", country: "USA" },
            {
              name: "Lincoln Financial Field",
              city: "Philadelphia",
              country: "USA",
            },
            { name: "Estadio Azteca", city: "Mexico City", country: "Mexico" },
            { name: "Estadio BBVA", city: "Monterrey", country: "Mexico" },
            { name: "Estadio Akron", city: "Guadalajara", country: "Mexico" },
            { name: "BMO Field", city: "Toronto", country: "Canada" },
            { name: "BC Place", city: "Vancouver", country: "Canada" },
            { name: "Stade Olympique", city: "Montreal", country: "Canada" },
          ].map((v) => (
            <div
              key={v.name}
              className="px-3 py-2.5 rounded-xl text-xs"
              style={{
                background: "rgba(15,22,40,0.7)",
                border: "1px solid rgba(30,45,74,0.8)",
              }}
            >
              <div className="font-semibold text-white text-xs leading-snug">
                {v.name}
              </div>
              <div className="text-gray-500 mt-0.5">
                {v.city} · {v.country}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
