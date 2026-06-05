import React from "react";
import { Trophy, Zap, CalendarDays, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="mt-16 relative overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,14,22,0.99)" }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(22,163,74,0.45), transparent)" }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-20 -translate-y-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(22,163,74,0.05) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #15803D, #16A34A)" }}
              >
                <Trophy size={20} color="#fff" strokeWidth={2.5}/>
              </div>
              <div>
                <div
                  className="text-white tracking-wide"
                  style={{ fontFamily: "'Barlow Condensed', 'Hind Siliguri', sans-serif", fontSize: "1rem", fontWeight: 700, letterSpacing: "0.04em" }}
                >
                  FIFA World Cup 2026
                </div>
                <div className="text-xs" style={{ color: "#475569" }}>Fixture Tracker · Bangladesh Time</div>
              </div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#475569" }}>
              All match times displayed in Bangladesh Standard Time (UTC+6).
              The ultimate fixture companion for the 2026 World Cup.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: "#64748B", fontWeight: 600 }}
            >Navigation</h4>
            <div className="space-y-3">
              {[
                { to: "/",        label: "Home",           icon: Trophy       },
                { to: "/by-team", label: "Fixtures by Team", icon: Users      },
                { to: "/by-date", label: "Fixtures by Date", icon: CalendarDays},
              ].map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to} to={to}
                  className="flex items-center gap-2 text-sm transition-colors no-underline"
                  style={{ color: "#475569" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#22C55E"}
                  onMouseLeave={e => e.currentTarget.style.color = "#475569"}
                >
                  <Icon size={13}/> {label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Hosts */}
          <div>
            <h4
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: "#64748B", fontWeight: 600 }}
            >Host Nations</h4>
            <div className="space-y-3">
              {[
                { flag: "🇺🇸", country: "United States", venues: "11 venues" },
                { flag: "🇲🇽", country: "Mexico",         venues: "3 venues"  },
                { flag: "🇨🇦", country: "Canada",         venues: "2 venues"  },
              ].map((h) => (
                <div key={h.country} className="flex items-center gap-3">
                  <span className="text-base">{h.flag}</span>
                  <span className="text-sm" style={{ color: "#94A3B8" }}>{h.country}</span>
                  <span className="text-xs" style={{ color: "#475569" }}>· {h.venues}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }}/>

        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs" style={{ color: "#475569" }}>
          <span>© 2026 FIFA World Cup Fixture Tracker. Personal use only.</span>
          <div className="flex items-center gap-1.5">
            Made with{" "}
            <span style={{ color: "#ef4444", fontSize: "1rem" }}>❤️</span>{" "}
            by{" "}
            <a
              href="https://hafizsakib.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#22C55E",
                fontWeight: 700,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#4ADE80"}
              onMouseLeave={e => e.currentTarget.style.color = "#22C55E"}
            >
              Mohammad Hafizur Rahman Sakib
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={11} style={{ color: "#22C55E" }}/>
            <span>All times in Bangladesh Standard Time (UTC+6)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
