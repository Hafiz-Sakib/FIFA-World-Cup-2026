import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy, Users, CalendarDays, Globe, Search, ChevronRight,
  Zap, MapPin, Clock, Flame, Star, ArrowRight,
} from "lucide-react";
import fixtures from "../data/fixtures.json";
import MatchCard from "../components/MatchCard";
import FlagIcon from "../components/FlagIcon";
import { getAllTeams } from "../utils/countryUtils";
import { sortByDateTime } from "../utils/dateUtils";

/* ── Constants ─────────────────────────────────────────── */
const TOURNAMENT_START = "2026-06-12"; // BDT date of first match
const TOURNAMENT_END   = "2026-07-20"; // BDT date after final

const GROUP_STAGE = fixtures.filter(
  (f) => !["Round of 32","Round of 16","Quarter-Final","Semi-Final","Third Place","Final"].includes(f.group),
);
const TEAM_COUNT = getAllTeams().length;
const GROUPS = [...new Set(GROUP_STAGE.map((f) => f.group))].sort();
const GROUP_TEAMS = {};
GROUP_STAGE.forEach((f) => {
  if (!GROUP_TEAMS[f.group]) GROUP_TEAMS[f.group] = new Set();
  if (f.team1 && f.team1 !== "TBD") GROUP_TEAMS[f.group].add(f.team1);
  if (f.team2 && f.team2 !== "TBD") GROUP_TEAMS[f.group].add(f.team2);
});

function getTodayBDT() {
  // Returns "YYYY-MM-DD" in UTC+6
  const now = new Date();
  const bdt = new Date(now.getTime() + 6 * 60 * 60 * 1000);
  return bdt.toISOString().slice(0, 10);
}

function getCountdown(targetDateStr) {
  const now = new Date();
  const target = new Date(targetDateStr + "T00:00:00+06:00");
  const diff = target - now;
  if (diff <= 0) return null;
  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

/* ── Animated Counter ───────────────────────────────────── */
function AnimCounter({ value, duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [value, duration]);
  return <>{display}</>;
}

/* ── Floating Particles ─────────────────────────────────── */
function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 6,
      duration: Math.random() * 8 + 6,
      opacity: Math.random() * 0.4 + 0.1,
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle-dot"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
      {/* Soccer ball icons */}
      {[0,1,2,3].map((i) => (
        <div
          key={`ball-${i}`}
          className="particle-ball"
          style={{
            left: `${15 + i * 22}%`,
            animationDelay: `${i * 2.5}s`,
            animationDuration: `${12 + i * 3}s`,
            fontSize: `${14 + i * 4}px`,
          }}
        >
          ⚽
        </div>
      ))}
    </div>
  );
}

/* ── Countdown Block ────────────────────────────────────── */
function CountdownBox({ label, value }) {
  return (
    <div className="countdown-box">
      <div className="countdown-num">
        {String(value).padStart(2, "0")}
      </div>
      <div className="countdown-label">{label}</div>
    </div>
  );
}

/* ── Today's Match Section ──────────────────────────────── */
function TodaySection({ navigate }) {
  const today = getTodayBDT();
  const [countdown, setCountdown] = useState(getCountdown(TOURNAMENT_START));

  useEffect(() => {
    if (today < TOURNAMENT_START) {
      const id = setInterval(() => setCountdown(getCountdown(TOURNAMENT_START)), 1000);
      return () => clearInterval(id);
    }
  }, [today]);

  const todayMatches = useMemo(() =>
    sortByDateTime(fixtures.filter((f) => f.date === today)),
    [today]
  );

  // ── State 1: Before tournament ──
  if (today < TOURNAMENT_START) {
    return (
      <section className="max-w-6xl mx-auto px-4 pb-14 animate-section">
        <div className="pre-tournament-banner">
          <div className="pre-tournament-glow" />
          <div className="relative z-10 text-center py-10 px-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-bold tracking-widest uppercase"
              style={{ background: "rgba(0,200,83,0.1)", border: "1px solid rgba(0,200,83,0.3)", color: "#00C853" }}>
              <Zap size={11} /> Tournament Countdown
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
              টুর্নামেন্ট শুরু হতে আর
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              First match: <span style={{ color: "#00E676" }}>11 June 2026</span> — Estadio Azteca, Mexico City
            </p>
            {countdown && (
              <div className="flex items-center justify-center gap-3 md:gap-5 flex-wrap">
                <CountdownBox label="Days"    value={countdown.days} />
                <div className="countdown-sep">:</div>
                <CountdownBox label="Hours"   value={countdown.hours} />
                <div className="countdown-sep">:</div>
                <CountdownBox label="Minutes" value={countdown.minutes} />
                <div className="countdown-sep">:</div>
                <CountdownBox label="Seconds" value={countdown.seconds} />
              </div>
            )}
            <p className="mt-8 text-xs text-gray-500">
              সময় Bangladesh Standard Time (UTC+6) অনুযায়ী
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ── State 2: After tournament ──
  if (today > TOURNAMENT_END) {
    return (
      <section className="max-w-6xl mx-auto px-4 pb-14 animate-section">
        <div className="finished-banner">
          <div className="text-center py-12 px-4 relative z-10">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Tournament Finished!
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              FIFA World Cup 2026 শেষ হয়েছে। সকল ফিক্সচার আর্কাইভ দেখুন।
            </p>
            <button
              onClick={() => navigate("/by-date")}
              className="btn-gold px-6 py-2.5 text-sm rounded-xl inline-flex items-center gap-2"
            >
              <CalendarDays size={15} /> সব ম্যাচ দেখুন
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ── State 3: During tournament ──
  return (
    <section className="max-w-6xl mx-auto px-4 pb-14 animate-section">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="live-dot-wrapper">
            <div className="live-dot" />
            <div className="live-dot-ring" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">
              {todayMatches.length > 0 ? "আজকের ম্যাচ" : "Today's Schedule"}
            </h2>
            <p className="text-xs text-gray-500">
              {new Date().toLocaleDateString("en-GB", { weekday:"long", day:"numeric", month:"long", year:"numeric" })} · BST
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/by-date")}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
          style={{ color: "#00C853", border: "1px solid rgba(0,200,83,0.25)", background: "rgba(0,200,83,0.06)" }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,200,83,0.12)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0,200,83,0.06)"}
        >
          সব তারিখ <ArrowRight size={12} />
        </button>
      </div>

      {todayMatches.length === 0 ? (
        <div className="no-matches-today">
          <div className="text-3xl mb-3">📅</div>
          <p className="text-white font-semibold text-sm mb-1">আজ কোনো ম্যাচ নেই</p>
          <p className="text-gray-500 text-xs">No matches scheduled for today. Check the full schedule below.</p>
          <button
            onClick={() => navigate("/by-date")}
            className="mt-4 btn-gold px-5 py-2 text-xs rounded-xl inline-flex items-center gap-1.5"
          >
            <CalendarDays size={13} /> Full Schedule
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {todayMatches.map((match, i) => (
            <div
              key={match.id}
              className="card-stagger"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <MatchCard match={match} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ── Groups Section ─────────────────────────────────────── */
function GroupsSection({ navigate }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {GROUPS.map((g, gi) => {
        const teams = Array.from(GROUP_TEAMS[g] || []).sort();
        return (
          <div
            key={g}
            className="group-card card-stagger"
            style={{ animationDelay: `${gi * 60}ms` }}
          >
            <div className="group-card-header">Group {g}</div>
            <div className="px-2 py-1.5">
              {teams.map((team) => (
                <button
                  key={team}
                  type="button"
                  onClick={() => navigate("/by-team", { state: { selectedTeam: team } })}
                  className="team-row"
                >
                  <FlagIcon teamName={team} size={18} />
                  <span className="font-medium truncate text-xs">{team}</span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Home Page ──────────────────────────────────────────── */
export default function Home() {
  const [search, setSearch]       = useState("");
  const [scrollY, setScrollY]     = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate("/by-team", { state: { searchQuery: search.trim() } });
  };

  return (
    <div className="hero-bg pitch-lines min-h-screen">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <Particles />

        {/* Glow orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="glow-orb glow-orb-1" />
          <div className="glow-orb glow-orb-2" />
          <div className="glow-orb glow-orb-3" />
        </div>

        <div
          className="relative max-w-6xl mx-auto px-4 pt-16 pb-14 text-center"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          {/* Badge */}
          <div className="hero-badge animate-fade-down">
            <Zap size={11} /> Official Tournament Fixtures
          </div>

          {/* Trophy emoji with pulse */}
          <div className="trophy-icon animate-fade-down" style={{ animationDelay: "0.1s" }}>
            🏆
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-2 animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="gold-text">FIFA World Cup</span>
          </h1>
          <h2
            className="text-5xl md:text-8xl font-black text-white mb-3 animate-fade-up year-text"
            style={{ animationDelay: "0.2s" }}
          >
            2026
          </h2>

          <p className="text-gray-400 text-base md:text-lg mb-1 animate-fade-up" style={{ animationDelay: "0.25s" }}>
            🇺🇸 USA · 🇨🇦 Canada · 🇲🇽 Mexico
          </p>
          <p className="text-sm text-gray-500 mb-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            সব সময়{" "}
            <span style={{ color: "#00C853" }}>Bangladesh Standard Time (UTC+6)</span>{" "}
            অনুযায়ী
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="max-w-xl mx-auto relative animate-fade-up"
            style={{ animationDelay: "0.35s" }}
          >
            <div className="search-wrapper">
              <Search size={18} className="search-icon" style={{ color: "#00C853" }} />
              <input
                type="text"
                className="field-input search-input"
                placeholder="দল খুঁজুন (যেমন Brazil, Germany…)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="btn-gold search-btn">
                খুঁজুন
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── TODAY'S MATCHES ── */}
      <TodaySection navigate={navigate} />

      {/* ── STATS ── */}
      <section className="max-w-6xl mx-auto px-4 pb-12 animate-section">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: CalendarDays, label: "Total Matches",       value: fixtures.length, color: "#00E676", suffix: "" },
            { icon: Users,        label: "Participating Teams", value: TEAM_COUNT,       color: "#69F0AE", suffix: "" },
            { icon: Trophy,       label: "Groups",              value: GROUPS.length,   color: "#00C853", suffix: "" },
            { icon: Globe,        label: "Host Countries",      value: 3,               color: "#B9F6CA", suffix: "" },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="stat-card px-5 py-5 text-center stat-card-anim">
              <div className="stat-icon-wrap" style={{ "--stat-color": color }}>
                <Icon size={20} style={{ color }} />
              </div>
              <div className="text-2xl md:text-3xl font-black text-white mb-1">
                <AnimCounter value={value} />
              </div>
              <div className="text-xs text-gray-400 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUICK NAV ── */}
      <section className="max-w-6xl mx-auto px-4 pb-14 animate-section">
        <h3 className="section-title mb-5">
          <Flame size={17} style={{ color: "#00E676" }} /> Browse Fixtures
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              path: "/by-team",
              icon: Users,
              title: "Fixtures by Team",
              desc: `Select any of the ${TEAM_COUNT} teams to view their full schedule`,
              iconBg: "rgba(0,200,83,0.2)",
              iconBorder: "rgba(0,200,83,0.35)",
              iconColor: "#00E676",
            },
            {
              path: "/by-date",
              icon: CalendarDays,
              title: "Fixtures by Date",
              desc: "Browse all matches by date — from June to July 2026",
              iconBg: "rgba(0,126,51,0.2)",
              iconBorder: "rgba(0,126,51,0.45)",
              iconColor: "#69F0AE",
            },
          ].map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className="nav-card group text-left w-full"
            >
              <div
                className="nav-card-icon"
                style={{ background: item.iconBg, border: `1px solid ${item.iconBorder}` }}
              >
                <item.icon size={22} style={{ color: item.iconColor }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-white text-base mb-0.5">{item.title}</div>
                <div className="text-sm text-gray-400">{item.desc}</div>
              </div>
              <ChevronRight size={18} className="flex-shrink-0 text-gray-500 nav-arrow" />
            </button>
          ))}
        </div>
      </section>

      {/* ── GROUPS ── */}
      <section className="max-w-6xl mx-auto px-4 pb-16 animate-section">
        <h3 className="section-title mb-5">
          <Star size={16} style={{ color: "#00E676" }} /> Tournament Groups
        </h3>
        <GroupsSection navigate={navigate} />
        <p className="mt-4 text-sm text-gray-500">
          12 groups · 4 teams per group · 72 group stage matches total
        </p>
      </section>

      {/* ── HOST VENUES ── */}
      <section className="max-w-6xl mx-auto px-4 pb-20 animate-section">
        <h3 className="section-title mb-5">
          <MapPin size={16} style={{ color: "#00E676" }} /> Host Stadiums
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { name: "MetLife Stadium",         city: "New York/NJ",  country: "🇺🇸" },
            { name: "SoFi Stadium",            city: "Los Angeles",  country: "🇺🇸" },
            { name: "AT&T Stadium",            city: "Dallas",       country: "🇺🇸" },
            { name: "Hard Rock Stadium",       city: "Miami",        country: "🇺🇸" },
            { name: "Levi's Stadium",          city: "San Francisco",country: "🇺🇸" },
            { name: "Mercedes-Benz Stadium",   city: "Atlanta",      country: "🇺🇸" },
            { name: "Gillette Stadium",        city: "Boston",       country: "🇺🇸" },
            { name: "Arrowhead Stadium",       city: "Kansas City",  country: "🇺🇸" },
            { name: "Lincoln Financial Field", city: "Philadelphia", country: "🇺🇸" },
            { name: "Lumen Field",             city: "Seattle",      country: "🇺🇸" },
            { name: "NRG Stadium",             city: "Houston",      country: "🇺🇸" },
            { name: "Estadio Azteca",          city: "Mexico City",  country: "🇲🇽" },
            { name: "Estadio BBVA",            city: "Monterrey",    country: "🇲🇽" },
            { name: "Estadio Akron",           city: "Guadalajara",  country: "🇲🇽" },
            { name: "BMO Field",               city: "Toronto",      country: "🇨🇦" },
            { name: "BC Place",                city: "Vancouver",    country: "🇨🇦" },
          ].map((v, i) => (
            <div
              key={v.name}
              className="venue-card card-stagger"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="font-semibold text-white text-xs leading-snug">{v.name}</div>
              <div className="text-gray-500 text-xs mt-0.5">{v.country} {v.city}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
