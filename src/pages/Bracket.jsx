import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Trophy,
  RotateCcw,
  Share2,
  ChevronRight,
  Zap,
  Star,
  ChevronDown,
  Medal,
  Sparkles,
} from "lucide-react";
import { getCountryCode } from "../utils/countryUtils";

/* ─────────────────────────────────────────────
   FLAG HELPER
───────────────────────────────────────────── */
function getFlagUrl(team) {
  if (!team || team === "TBD") return null;
  const code = getCountryCode(team);
  if (!code) return null;
  if (code === "GB-ENG")
    return "https://purecatamphetamine.github.io/country-flag-icons/3x2/GB-ENG.svg";
  if (code === "GB-SCT")
    return "https://purecatamphetamine.github.io/country-flag-icons/3x2/GB-SCT.svg";
  return `https://flagcdn.com/w80/${code.toLowerCase()}.png`;
}

/* ─────────────────────────────────────────────
   INITIAL BRACKET DATA
───────────────────────────────────────────── */
const INITIAL_R32 = [
  { id: "R32_1", t1: "Germany", t2: "Australia", seed1: "1E", seed2: "3D" },
  { id: "R32_2", t1: "France", t2: "Egypt", seed1: "1I", seed2: "3G" },
  { id: "R32_3", t1: "Denmark", t2: "Switzerland", seed1: "2A", seed2: "2B" },
  { id: "R32_4", t1: "Netherlands", t2: "Morocco", seed1: "1F", seed2: "2C" },
  { id: "R32_5", t1: "Colombia", t2: "Croatia", seed1: "2K", seed2: "2L" },
  { id: "R32_6", t1: "Spain", t2: "Austria", seed1: "1H", seed2: "2J" },
  { id: "R32_7", t1: "USA", t2: "Canada", seed1: "1D", seed2: "3B" },
  { id: "R32_8", t1: "Belgium", t2: "South Korea", seed1: "1G", seed2: "3A" },
  { id: "R32_9", t1: "Brazil", t2: "Japan", seed1: "1C", seed2: "2F" },
  { id: "R32_10", t1: "Ecuador", t2: "Senegal", seed1: "2E", seed2: "2I" },
  { id: "R32_11", t1: "Mexico", t2: "Ukraine", seed1: "1A", seed2: "3F" },
  { id: "R32_12", t1: "England", t2: "Norway", seed1: "1L", seed2: "3I" },
  { id: "R32_13", t1: "Argentina", t2: "Uruguay", seed1: "1J", seed2: "2H" },
  { id: "R32_14", t1: "Turkey", t2: "Iran", seed1: "2D", seed2: "2G" },
  { id: "R32_15", t1: "Italy", t2: "Algeria", seed1: "1B", seed2: "3J" },
  { id: "R32_16", t1: "Portugal", t2: "Panama", seed1: "1K", seed2: "3L" },
];

function buildInitialState() {
  const r32 = INITIAL_R32.map((m) => ({ ...m, winner: null }));
  const r16 = [
    { id: "R16_1", t1: null, t2: null, winner: null, from: ["R32_1", "R32_2"] },
    { id: "R16_2", t1: null, t2: null, winner: null, from: ["R32_3", "R32_4"] },
    { id: "R16_3", t1: null, t2: null, winner: null, from: ["R32_5", "R32_6"] },
    { id: "R16_4", t1: null, t2: null, winner: null, from: ["R32_7", "R32_8"] },
    {
      id: "R16_5",
      t1: null,
      t2: null,
      winner: null,
      from: ["R32_9", "R32_10"],
    },
    {
      id: "R16_6",
      t1: null,
      t2: null,
      winner: null,
      from: ["R32_11", "R32_12"],
    },
    {
      id: "R16_7",
      t1: null,
      t2: null,
      winner: null,
      from: ["R32_13", "R32_14"],
    },
    {
      id: "R16_8",
      t1: null,
      t2: null,
      winner: null,
      from: ["R32_15", "R32_16"],
    },
  ];
  const qf = [
    { id: "QF_1", t1: null, t2: null, winner: null, from: ["R16_1", "R16_2"] },
    { id: "QF_2", t1: null, t2: null, winner: null, from: ["R16_3", "R16_4"] },
    { id: "QF_3", t1: null, t2: null, winner: null, from: ["R16_5", "R16_6"] },
    { id: "QF_4", t1: null, t2: null, winner: null, from: ["R16_7", "R16_8"] },
  ];
  const sf = [
    { id: "SF_1", t1: null, t2: null, winner: null, from: ["QF_1", "QF_2"] },
    { id: "SF_2", t1: null, t2: null, winner: null, from: ["QF_3", "QF_4"] },
  ];
  const final_ = [
    { id: "FINAL", t1: null, t2: null, winner: null, from: ["SF_1", "SF_2"] },
  ];
  return { r32, r16, qf, sf, final: final_, champion: null };
}

/* ─────────────────────────────────────────────
   TEAM SLOT
───────────────────────────────────────────── */
function TeamSlot({
  team,
  isWinner,
  onClick,
  isTBD,
  seed,
  size = "md",
  justPicked,
}) {
  const flagUrl = getFlagUrl(team);
  const sz = {
    xs: {
      wrap: "py-1 px-1.5 gap-1",
      flag: 14,
      text: "text-[10px]",
      seed: "text-[8px]",
    },
    sm: {
      wrap: "py-1 px-2 gap-1.5",
      flag: 18,
      text: "text-xs",
      seed: "text-[9px]",
    },
    md: {
      wrap: "py-1.5 px-2.5 gap-2",
      flag: 22,
      text: "text-xs",
      seed: "text-[10px]",
    },
    lg: {
      wrap: "py-2 px-3 gap-2.5",
      flag: 26,
      text: "text-sm",
      seed: "text-[10px]",
    },
    xl: {
      wrap: "py-2.5 px-3 gap-3",
      flag: 30,
      text: "text-sm font-semibold",
      seed: "text-xs",
    },
  }[size];

  return (
    <button
      onClick={onClick}
      disabled={!team || isTBD || !onClick}
      className={`
        w-full flex items-center ${sz.wrap} rounded-lg relative overflow-hidden
        transition-all duration-200 group team-slot
        ${justPicked ? "team-slot-flash" : ""}
        ${
          isWinner
            ? "winner-slot border border-green-500/50"
            : team && !isTBD
              ? "bg-white/5 border border-white/8 hover:bg-green-600/15 hover:border-green-500/40 cursor-pointer hover:shadow-[0_0_8px_rgba(34,197,94,0.2)]"
              : "bg-white/3 border border-white/5 cursor-default opacity-50"
        }
      `}
      title={team ? `Pick ${team} as winner` : "TBD"}
    >
      {isWinner && (
        <div className="absolute inset-0 winner-glow-bg pointer-events-none" />
      )}

      {/* Flag */}
      <div
        className="flex-shrink-0 rounded overflow-hidden shadow-sm"
        style={{ width: sz.flag, height: sz.flag * 0.67, minWidth: sz.flag }}
      >
        {flagUrl ? (
          <img
            src={flagUrl}
            alt={team}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full bg-slate-700 flex items-center justify-center"
            style={{ fontSize: sz.flag * 0.35 }}
          >
            <span className="text-slate-400 font-bold">
              {team ? team.slice(0, 2).toUpperCase() : "?"}
            </span>
          </div>
        )}
      </div>

      {/* Name */}
      <span
        className={`flex-1 text-left truncate ${sz.text} font-medium leading-tight
        ${isWinner ? "text-green-300" : team && !isTBD ? "text-slate-200 group-hover:text-white" : "text-slate-500"}`}
      >
        {team || "TBD"}
      </span>

      {/* Seed */}
      {seed && (
        <span className={`flex-shrink-0 ${sz.seed} text-slate-500 font-mono`}>
          {seed}
        </span>
      )}

      {/* Winner check */}
      {isWinner && (
        <div className="flex-shrink-0 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center ml-1 winner-badge">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path
              d="M1.5 4L3 5.5L6.5 2"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────
   MATCH CARD
───────────────────────────────────────────── */
function MatchCard({ match, onPick, size = "md", justPickedId }) {
  const { t1, t2, winner, id } = match;
  const canPick = t1 && t2 && t1 !== "TBD" && t2 !== "TBD";
  const isFlash = justPickedId === id;

  return (
    <div
      className={`relative rounded-xl overflow-hidden transition-all duration-300 match-card
        ${isFlash ? "match-flash" : ""}
        ${canPick ? "shadow-lg" : "opacity-70"}
        ${winner ? "shadow-[0_4px_20px_rgba(34,197,94,0.18)]" : ""}
      `}
      style={{
        background: "rgba(7, 36, 58, 0.92)",
        border: winner
          ? "1px solid rgba(34,197,94,0.38)"
          : "1px solid rgba(255,255,255,0.07)",
        minWidth:
          size === "xl" ? 160 : size === "lg" ? 145 : size === "xs" ? 100 : 120,
      }}
    >
      <div className="flex flex-col p-1 gap-0.5">
        <TeamSlot
          team={t1}
          isWinner={winner === t1}
          onClick={canPick ? () => onPick(id, t1) : null}
          isTBD={!t1}
          seed={match.seed1}
          size={size}
          justPicked={isFlash && winner === t1}
        />
        <div className="flex items-center gap-1 px-2">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-[8px] text-slate-600 font-bold tracking-widest">
            VS
          </span>
          <div className="flex-1 h-px bg-white/5" />
        </div>
        <TeamSlot
          team={t2}
          isWinner={winner === t2}
          onClick={canPick ? () => onPick(id, t2) : null}
          isTBD={!t2}
          seed={match.seed2}
          size={size}
          justPicked={isFlash && winner === t2}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHAMPION DISPLAY
───────────────────────────────────────────── */
function ChampionDisplay({ champion }) {
  const flagUrl = getFlagUrl(champion);
  return (
    <div className="flex flex-col items-center gap-3 px-2">
      <div
        className="relative flex items-center justify-center w-16 h-16 rounded-2xl champion-trophy"
        style={{
          background:
            "linear-gradient(135deg, #92400e, #d97706, #fbbf24, #d97706)",
          boxShadow: champion
            ? "0 0 40px rgba(245,158,11,0.7), 0 0 80px rgba(245,158,11,0.35)"
            : "0 0 20px rgba(245,158,11,0.2)",
        }}
      >
        <Trophy size={30} color="#fff" strokeWidth={1.5} />
        {champion && (
          <div
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
            style={{ animation: "pulse 2s infinite" }}
          >
            <Star size={10} color="#fff" fill="#fff" />
          </div>
        )}
      </div>

      <div
        className="rounded-2xl overflow-hidden text-center champion-card"
        style={{
          background: champion
            ? "linear-gradient(135deg, rgba(245,158,11,0.18), rgba(34,197,94,0.12))"
            : "rgba(7,36,58,0.8)",
          border: champion
            ? "1px solid rgba(245,158,11,0.45)"
            : "1px dashed rgba(255,255,255,0.1)",
          minWidth: 130,
          padding: "12px 16px",
          boxShadow: champion ? "0 8px 32px rgba(245,158,11,0.25)" : "none",
          transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <div className="text-[10px] text-amber-400 uppercase tracking-widest font-bold mb-2">
          🏆 Champion
        </div>
        {champion ? (
          <div className="champion-reveal">
            {flagUrl && (
              <div
                className="mx-auto mb-2 rounded-lg overflow-hidden shadow-lg"
                style={{ width: 64, height: 43 }}
              >
                <img
                  src={flagUrl}
                  alt={champion}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}
            <div
              className="text-white font-bold"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "1.1rem",
                letterSpacing: "0.05em",
                textShadow: "0 0 20px rgba(245,158,11,0.6)",
              }}
            >
              {champion}
            </div>
            <div className="flex justify-center gap-0.5 mt-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={8}
                  fill="#f59e0b"
                  color="#f59e0b"
                  style={{ animation: `starPop 0.4s ${i * 0.08}s ease both` }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-slate-500 text-xs">
            Make your
            <br />
            predictions!
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SVG BRACKET CONNECTORS
───────────────────────────────────────────── */
function BracketSVGConnectors({ side, count, matchHeight, matchGap }) {
  // count = number of matches in this column
  // pairs: [0,1], [2,3], etc. → outputs to next round
  const pairs = Math.floor(count / 2);
  const totalH = count * matchHeight + (count - 1) * matchGap;
  const w = 28;

  return (
    <svg
      width={w}
      height={totalH}
      style={{ flexShrink: 0, overflow: "visible" }}
    >
      {Array.from({ length: pairs }).map((_, pi) => {
        const i1 = pi * 2;
        const i2 = pi * 2 + 1;
        const y1 = i1 * (matchHeight + matchGap) + matchHeight / 2;
        const y2 = i2 * (matchHeight + matchGap) + matchHeight / 2;
        const yMid = (y1 + y2) / 2;

        if (side === "right") {
          return (
            <g key={pi}>
              <line
                x1={0}
                y1={y1}
                x2={w * 0.6}
                y2={y1}
                stroke="rgba(34,197,94,0.35)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1={w * 0.6}
                y1={y1}
                x2={w * 0.6}
                y2={y2}
                stroke="rgba(34,197,94,0.35)"
                strokeWidth="1.5"
              />
              <line
                x1={w * 0.6}
                y1={y2}
                x2={0}
                y2={y2}
                stroke="rgba(34,197,94,0.35)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1={w * 0.6}
                y1={yMid}
                x2={w}
                y2={yMid}
                stroke="rgba(34,197,94,0.5)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          );
        } else {
          return (
            <g key={pi}>
              <line
                x1={w}
                y1={y1}
                x2={w * 0.4}
                y2={y1}
                stroke="rgba(34,197,94,0.35)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1={w * 0.4}
                y1={y1}
                x2={w * 0.4}
                y2={y2}
                stroke="rgba(34,197,94,0.35)"
                strokeWidth="1.5"
              />
              <line
                x1={w * 0.4}
                y1={y2}
                x2={w}
                y2={y2}
                stroke="rgba(34,197,94,0.35)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1={w * 0.4}
                y1={yMid}
                x2={0}
                y2={yMid}
                stroke="rgba(34,197,94,0.5)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          );
        }
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   ROUND COLUMN (desktop)
───────────────────────────────────────────── */
function RoundCol({
  label,
  color,
  matches,
  onPick,
  size,
  matchHeight,
  matchGap,
  justPickedId,
}) {
  return (
    <div className="flex flex-col">
      <div className="text-center mb-2" style={{ height: 20 }}>
        <span
          style={{
            fontSize: "0.58rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: color || "#64748b",
            fontWeight: 700,
            fontFamily: "'Barlow Condensed', sans-serif",
          }}
        >
          {label}
        </span>
      </div>
      <div className="flex flex-col" style={{ gap: matchGap }}>
        {matches.map((m) => (
          <div key={m.id} style={{ height: matchHeight }}>
            <MatchCard
              match={m}
              onPick={onPick}
              size={size}
              justPickedId={justPickedId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROGRESS BAR
───────────────────────────────────────────── */
function ProgressBar({ state }) {
  const total = 31;
  const picked = [
    ...state.r32,
    ...state.r16,
    ...state.qf,
    ...state.sf,
    ...state.final,
  ].filter((m) => m.winner).length;
  const pct = Math.round((picked / total) * 100);

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full progress-bar transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-slate-400 font-mono whitespace-nowrap">
        {picked}/{total}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE ACCORDION ROUND
───────────────────────────────────────────── */
function MobileRound({
  label,
  matches,
  onPick,
  isOpen,
  onToggle,
  colorClass,
  justPickedId,
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden mb-3 mobile-round"
      style={{
        background: "rgba(7,36,58,0.88)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <button
        className="w-full flex items-center justify-between px-4 py-3"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold uppercase tracking-widest ${colorClass}`}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              letterSpacing: "0.15em",
            }}
          >
            {label}
          </span>
          <span className="text-[10px] text-slate-500">
            ({matches.filter((m) => m.winner).length}/{matches.length} picked)
          </span>
        </div>
        <ChevronDown
          size={16}
          className={`text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="px-3 pb-3 grid grid-cols-2 gap-2 accordion-body">
          {matches.map((m) => (
            <MatchCard
              key={m.id}
              match={m}
              onPick={onPick}
              size="xs"
              justPickedId={justPickedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SHARE MODAL
───────────────────────────────────────────── */
function ShareModal({ state, onClose }) {
  const picked = [
    ...state.r32,
    ...state.r16,
    ...state.qf,
    ...state.sf,
    ...state.final,
  ].filter((m) => m.winner).length;

  const lines = [
    `🏆 My FIFA WC 2026 Predictions (${picked}/31)`,
    ``,
    state.champion
      ? `👑 Champion: ${state.champion}`
      : "👑 Champion: Not yet picked",
    state.sf[0].winner && state.sf[1].winner
      ? `🥈 Finalists: ${state.final[0].t1 || "?"} vs ${state.final[0].t2 || "?"}`
      : "",
    ``,
    `Make your predictions at FIFA WC 2026 Bracket!`,
  ]
    .filter((l) => l !== undefined)
    .join("\n");

  const handleCopy = () => {
    navigator.clipboard?.writeText(lines).catch(() => {});
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      onClick={onClose}
    >
      <div
        className="rounded-2xl p-6 max-w-sm w-full modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(7,36,58,0.98)",
          border: "1px solid rgba(34,197,94,0.3)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Share2 size={18} className="text-green-400" />
          <h3 className="text-white font-bold text-lg">Share Predictions</h3>
        </div>
        <pre className="text-slate-300 text-xs bg-white/5 rounded-xl p-3 whitespace-pre-wrap mb-4 font-mono">
          {lines}
        </pre>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 py-2 rounded-xl text-sm font-semibold text-white transition-all"
            style={{
              background: "rgba(34,197,94,0.2)",
              border: "1px solid rgba(34,197,94,0.3)",
            }}
          >
            Copy Text
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN BRACKET PAGE
───────────────────────────────────────────── */
export default function Bracket() {
  const [state, setState] = useState(buildInitialState);
  const [openRound, setOpenRound] = useState("r32");
  const [justPickedId, setJustPickedId] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  // Trigger confetti when champion set
  useEffect(() => {
    if (state.champion) {
      setConfettiActive(true);
      setTimeout(() => setConfettiActive(false), 3000);
    }
  }, [state.champion]);

  const handlePick = useCallback((matchId, winner) => {
    setState((prev) => {
      const ns = {
        r32: prev.r32.map((m) => ({ ...m })),
        r16: prev.r16.map((m) => ({ ...m })),
        qf: prev.qf.map((m) => ({ ...m })),
        sf: prev.sf.map((m) => ({ ...m })),
        final: prev.final.map((m) => ({ ...m })),
        champion: prev.champion,
      };

      const allMatches = [
        ...ns.r32,
        ...ns.r16,
        ...ns.qf,
        ...ns.sf,
        ...ns.final,
      ];

      function cascadeClear(mId, removedTeam) {
        const nextRounds = [ns.r16, ns.qf, ns.sf, ns.final];
        for (const round of nextRounds) {
          for (const nm of round) {
            if (!nm.from) continue;
            const idx = nm.from.indexOf(mId);
            if (idx === -1) continue;
            const slot = idx === 0 ? "t1" : "t2";
            if (nm[slot] === removedTeam) {
              const prevW = nm.winner;
              nm[slot] = null;
              nm.winner = null;
              if (prevW) cascadeClear(nm.id, prevW);
            }
          }
        }
        if (mId === "FINAL") ns.champion = null;
      }

      function advanceWinner(mId, w) {
        const nextRounds = [ns.r16, ns.qf, ns.sf, ns.final];
        for (const round of nextRounds) {
          for (const nm of round) {
            if (!nm.from) continue;
            const idx = nm.from.indexOf(mId);
            if (idx === -1) continue;
            const slot = idx === 0 ? "t1" : "t2";
            nm[slot] = w;
          }
        }
        if (mId === "FINAL") ns.champion = w;
      }

      const match = allMatches.find((m) => m.id === matchId);
      if (!match) return ns;
      const prevWinner = match.winner;

      if (prevWinner === winner) {
        match.winner = null;
        cascadeClear(matchId, prevWinner);
        return ns;
      }
      if (prevWinner) cascadeClear(matchId, prevWinner);
      match.winner = winner;
      advanceWinner(matchId, winner);
      return ns;
    });

    setJustPickedId(matchId);
    setTimeout(() => setJustPickedId(null), 700);
  }, []);

  const handleReset = useCallback(() => {
    setState(buildInitialState());
  }, []);

  // Heights for SVG connectors
  const R32_H = 72,
    R32_GAP = 6;
  const R16_H = 72,
    R16_GAP = 6;
  const QF_H = 76,
    QF_GAP = 8;
  const SF_H = 80,
    SF_GAP = 8;

  const totalPicked = [
    ...state.r32,
    ...state.r16,
    ...state.qf,
    ...state.sf,
    ...state.final,
  ].filter((m) => m.winner).length;

  const mobileRounds = [
    {
      key: "r32",
      label: "Round of 32",
      matches: state.r32,
      color: "text-sky-400",
    },
    {
      key: "r16",
      label: "Round of 16",
      matches: state.r16,
      color: "text-cyan-400",
    },
    {
      key: "qf",
      label: "Quarter-Final",
      matches: state.qf,
      color: "text-teal-400",
    },
    {
      key: "sf",
      label: "Semi-Final",
      matches: state.sf,
      color: "text-green-400",
    },
    {
      key: "final",
      label: "Final",
      matches: state.final,
      color: "text-amber-400",
    },
  ];

  return (
    <div className="min-h-screen bracket-page">
      {/* Confetti */}
      {confettiActive && <ConfettiEffect />}

      {/* Share modal */}
      {showShare && (
        <ShareModal state={state} onClose={() => setShowShare(false)} />
      )}

      <div className="max-w-[1700px] mx-auto px-3 pt-6 pb-8">
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-1 h-7 rounded-full"
                style={{
                  background: "linear-gradient(180deg, #22c55e, #16a34a)",
                }}
              />
              <div>
                <h1
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
                    fontWeight: 800,
                    letterSpacing: "0.04em",
                    color: "#fff",
                    lineHeight: 1,
                  }}
                >
                  KNOCKOUT BRACKET
                </h1>
                <p className="text-slate-400 text-xs mt-0.5">
                  Click teams to predict winners · selections cascade
                  automatically
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="hidden md:block" style={{ minWidth: 190 }}>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-semibold">
                Predictions — {totalPicked}/31
              </div>
              <ProgressBar state={state} />
            </div>

            <button
              onClick={() => setShowShare(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all btn-share"
            >
              <Share2 size={13} /> Share
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all btn-reset"
            >
              <RotateCcw size={13} /> Reset
            </button>
          </div>
        </div>

        {/* Mobile progress */}
        <div className="md:hidden mb-4">
          <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-semibold">
            Predictions — {totalPicked}/31
          </div>
          <ProgressBar state={state} />
        </div>

        {/* ── DESKTOP BRACKET (≥1024px) ── */}
        <div className="hidden lg:block overflow-x-auto pb-4">
          <div className="flex items-start" style={{ minWidth: 1300, gap: 0 }}>
            {/* LEFT: R32 (8 matches) */}
            <RoundCol
              label="Round of 32"
              color="#38bdf8"
              matches={state.r32.slice(0, 8)}
              onPick={handlePick}
              size="xs"
              matchHeight={R32_H}
              matchGap={R32_GAP}
              justPickedId={justPickedId}
            />

            <BracketSVGConnectors
              side="right"
              count={8}
              matchHeight={R32_H}
              matchGap={R32_GAP}
            />

            {/* LEFT: R16 (4 matches) */}
            <RoundCol
              label="Round of 16"
              color="#22d3ee"
              matches={state.r16.slice(0, 4)}
              onPick={handlePick}
              size="sm"
              matchHeight={R16_H}
              matchGap={R32_H * 2 + R32_GAP - R16_H}
              justPickedId={justPickedId}
            />

            <BracketSVGConnectors
              side="right"
              count={4}
              matchHeight={R16_H}
              matchGap={R32_H * 2 + R32_GAP - R16_H}
            />

            {/* LEFT: QF (2 matches) */}
            <RoundCol
              label="Quarter-Final"
              color="#2dd4bf"
              matches={state.qf.slice(0, 2)}
              onPick={handlePick}
              size="sm"
              matchHeight={QF_H}
              matchGap={R16_H * 2 + (R32_H * 2 + R32_GAP) - R16_H - QF_H}
              justPickedId={justPickedId}
            />

            <BracketSVGConnectors
              side="right"
              count={2}
              matchHeight={QF_H}
              matchGap={R16_H * 2 + (R32_H * 2 + R32_GAP) - R16_H - QF_H}
            />

            {/* LEFT: SF (1 match) */}
            <div className="flex flex-col" style={{ marginTop: 20 }}>
              <div className="text-center mb-2">
                <span
                  style={{
                    fontSize: "0.58rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#4ade80",
                    fontWeight: 700,
                    fontFamily: "'Barlow Condensed', sans-serif",
                  }}
                >
                  Semi-Final
                </span>
              </div>
              <div style={{ height: SF_H }}>
                <MatchCard
                  match={state.sf[0]}
                  onPick={handlePick}
                  size="sm"
                  justPickedId={justPickedId}
                />
              </div>
            </div>

            {/* Arrow to Final */}
            <div className="flex items-center" style={{ marginTop: 40 }}>
              <svg width={36} height={40} style={{ overflow: "visible" }}>
                <line
                  x1={0}
                  y1={20}
                  x2={30}
                  y2={20}
                  stroke="rgba(251,191,36,0.5)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <polygon
                  points="30,15 36,20 30,25"
                  fill="rgba(251,191,36,0.5)"
                />
              </svg>
            </div>

            {/* CENTER: FINAL + CHAMPION */}
            <div
              className="flex flex-col items-center gap-3"
              style={{ marginTop: 20, minWidth: 165 }}
            >
              <div className="text-center">
                <span
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#fbbf24",
                    fontWeight: 800,
                    fontFamily: "'Barlow Condensed', sans-serif",
                  }}
                >
                  ⚽ Final
                </span>
              </div>
              <MatchCard
                match={state.final[0]}
                onPick={handlePick}
                size="md"
                justPickedId={justPickedId}
              />
              <ChampionDisplay champion={state.champion} />
            </div>

            {/* Arrow from Final */}
            <div className="flex items-center" style={{ marginTop: 40 }}>
              <svg width={36} height={40} style={{ overflow: "visible" }}>
                <line
                  x1={6}
                  y1={20}
                  x2={36}
                  y2={20}
                  stroke="rgba(251,191,36,0.5)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <polygon points="6,15 0,20 6,25" fill="rgba(251,191,36,0.5)" />
              </svg>
            </div>

            {/* RIGHT: SF */}
            <div className="flex flex-col" style={{ marginTop: 20 }}>
              <div className="text-center mb-2">
                <span
                  style={{
                    fontSize: "0.58rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#4ade80",
                    fontWeight: 700,
                    fontFamily: "'Barlow Condensed', sans-serif",
                  }}
                >
                  Semi-Final
                </span>
              </div>
              <div style={{ height: SF_H }}>
                <MatchCard
                  match={state.sf[1]}
                  onPick={handlePick}
                  size="sm"
                  justPickedId={justPickedId}
                />
              </div>
            </div>

            <BracketSVGConnectors
              side="left"
              count={2}
              matchHeight={QF_H}
              matchGap={R16_H * 2 + (R32_H * 2 + R32_GAP) - R16_H - QF_H}
            />

            {/* RIGHT: QF */}
            <RoundCol
              label="Quarter-Final"
              color="#2dd4bf"
              matches={state.qf.slice(2, 4)}
              onPick={handlePick}
              size="sm"
              matchHeight={QF_H}
              matchGap={R16_H * 2 + (R32_H * 2 + R32_GAP) - R16_H - QF_H}
              justPickedId={justPickedId}
            />

            <BracketSVGConnectors
              side="left"
              count={4}
              matchHeight={R16_H}
              matchGap={R32_H * 2 + R32_GAP - R16_H}
            />

            {/* RIGHT: R16 */}
            <RoundCol
              label="Round of 16"
              color="#22d3ee"
              matches={state.r16.slice(4, 8)}
              onPick={handlePick}
              size="sm"
              matchHeight={R16_H}
              matchGap={R32_H * 2 + R32_GAP - R16_H}
              justPickedId={justPickedId}
            />

            <BracketSVGConnectors
              side="left"
              count={8}
              matchHeight={R32_H}
              matchGap={R32_GAP}
            />

            {/* RIGHT: R32 */}
            <RoundCol
              label="Round of 32"
              color="#38bdf8"
              matches={state.r32.slice(8, 16)}
              onPick={handlePick}
              size="xs"
              matchHeight={R32_H}
              matchGap={R32_GAP}
              justPickedId={justPickedId}
            />
          </div>
        </div>

        {/* ── TABLET (768–1023px) ── */}
        <div className="hidden md:block lg:hidden overflow-x-auto pb-4">
          <div className="flex gap-2" style={{ minWidth: 860 }}>
            {[
              {
                label: "R32 (1–8)",
                matches: state.r32.slice(0, 8),
                color: "#38bdf8",
                size: "xs",
              },
              {
                label: "R16 (1–4)",
                matches: state.r16.slice(0, 4),
                color: "#22d3ee",
                size: "xs",
              },
              {
                label: "QF (1–2)",
                matches: state.qf.slice(0, 2),
                color: "#2dd4bf",
                size: "xs",
              },
              {
                label: "SF",
                matches: state.sf.slice(0, 1),
                color: "#4ade80",
                size: "xs",
              },
            ].map(({ label, matches, color, size }) => (
              <div
                key={label}
                className="flex flex-col gap-1.5"
                style={{ minWidth: 118 }}
              >
                <div
                  className="text-center text-[10px] font-bold uppercase tracking-widest mb-1"
                  style={{
                    color,
                    fontFamily: "'Barlow Condensed', sans-serif",
                  }}
                >
                  {label}
                </div>
                {matches.map((m) => (
                  <MatchCard
                    key={m.id}
                    match={m}
                    onPick={handlePick}
                    size={size}
                    justPickedId={justPickedId}
                  />
                ))}
              </div>
            ))}

            <div
              className="flex flex-col items-center gap-2"
              style={{ minWidth: 140 }}
            >
              <div
                className="text-[10px] font-bold uppercase tracking-widest text-amber-400"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                ⚽ Final
              </div>
              <MatchCard
                match={state.final[0]}
                onPick={handlePick}
                size="xs"
                justPickedId={justPickedId}
              />
              <ChampionDisplay champion={state.champion} />
            </div>

            {[
              {
                label: "SF",
                matches: state.sf.slice(1, 2),
                color: "#4ade80",
                size: "xs",
              },
              {
                label: "QF (3–4)",
                matches: state.qf.slice(2, 4),
                color: "#2dd4bf",
                size: "xs",
              },
              {
                label: "R16 (5–8)",
                matches: state.r16.slice(4, 8),
                color: "#22d3ee",
                size: "xs",
              },
              {
                label: "R32 (9–16)",
                matches: state.r32.slice(8, 16),
                color: "#38bdf8",
                size: "xs",
              },
            ].map(({ label, matches, color, size }) => (
              <div
                key={label}
                className="flex flex-col gap-1.5"
                style={{ minWidth: 118 }}
              >
                <div
                  className="text-center text-[10px] font-bold uppercase tracking-widest mb-1"
                  style={{
                    color,
                    fontFamily: "'Barlow Condensed', sans-serif",
                  }}
                >
                  {label}
                </div>
                {matches.map((m) => (
                  <MatchCard
                    key={m.id}
                    match={m}
                    onPick={handlePick}
                    size={size}
                    justPickedId={justPickedId}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── MOBILE (<768px) ── */}
        <div className="md:hidden">
          <div className="flex justify-center mb-5">
            <ChampionDisplay champion={state.champion} />
          </div>
          {mobileRounds.map((r) => (
            <MobileRound
              key={r.key}
              label={r.label}
              matches={r.matches}
              onPick={handlePick}
              isOpen={openRound === r.key}
              onToggle={() => setOpenRound(openRound === r.key ? null : r.key)}
              colorClass={r.color}
              justPickedId={justPickedId}
            />
          ))}
        </div>

        {/* Tip */}
        <div
          className="mt-4 flex items-center gap-2 text-xs text-slate-500 justify-center"
          style={{ opacity: 0.65 }}
        >
          <Zap size={10} />
          <span>
            Click any team to pick as winner · click again to deselect · winners
            cascade forward automatically
          </span>
        </div>
      </div>

      <BracketStyles />
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONFETTI
───────────────────────────────────────────── */
function ConfettiEffect() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 1.5,
    duration: 2 + Math.random() * 2,
    color: ["#22c55e", "#fbbf24", "#38bdf8", "#f472b6", "#a78bfa"][
      Math.floor(Math.random() * 5)
    ],
    size: 4 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: "-20px",
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
function BracketStyles() {
  return (
    <style>{`
      .bracket-page {
        background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(22,163,74,0.08) 0%, transparent 70%), #001b2a;
      }

      /* Winner slot */
      .winner-slot {
        background: linear-gradient(90deg, rgba(34,197,94,0.22), rgba(34,197,94,0.06)) !important;
        box-shadow: 0 0 10px rgba(34,197,94,0.18);
      }
      .winner-glow-bg {
        background: linear-gradient(90deg, rgba(34,197,94,0.12), transparent);
      }
      .winner-badge {
        animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1);
      }

      /* Match flash on pick */
      @keyframes matchFlash {
        0%   { transform: scale(1); box-shadow: 0 0 0 rgba(34,197,94,0); }
        40%  { transform: scale(1.035); box-shadow: 0 0 22px rgba(34,197,94,0.55); }
        100% { transform: scale(1); box-shadow: 0 4px 20px rgba(34,197,94,0.18); }
      }
      .match-flash { animation: matchFlash 0.55s cubic-bezier(0.34,1.56,0.64,1); }

      /* Team slot flash */
      @keyframes slotFlash {
        0%  { background: rgba(34,197,94,0.35); }
        100%{}
      }
      .team-slot-flash { animation: slotFlash 0.6s ease; }

      @keyframes badgePop {
        0%   { transform: scale(0); }
        70%  { transform: scale(1.3); }
        100% { transform: scale(1); }
      }

      /* Accordion */
      .accordion-body {
        animation: slideDown 0.25s cubic-bezier(0.34,1.56,0.64,1);
      }
      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      /* Progress */
      .progress-bar {
        background: linear-gradient(90deg, #16a34a, #22c55e, #4ade80);
        background-size: 200% 100%;
        animation: shimmer 2s infinite linear;
      }
      @keyframes shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      /* Champion */
      .champion-reveal {
        animation: championReveal 0.6s cubic-bezier(0.34,1.56,0.64,1);
      }
      @keyframes championReveal {
        from { opacity: 0; transform: scale(0.7) translateY(8px); }
        to   { opacity: 1; transform: scale(1) translateY(0); }
      }
      .champion-trophy {
        transition: box-shadow 0.5s ease;
      }

      @keyframes starPop {
        from { opacity: 0; transform: scale(0) rotate(-30deg); }
        to   { opacity: 1; transform: scale(1) rotate(0); }
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%       { opacity: 0.7; transform: scale(1.15); }
      }

      /* Confetti */
      @keyframes confettiFall {
        0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
        80%  { opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }

      /* Modal */
      .modal-backdrop {
        background: rgba(0,0,0,0.6);
        backdrop-filter: blur(4px);
        animation: fadeIn 0.2s ease;
      }
      .modal-content {
        animation: modalIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
      }
      @keyframes modalIn {
        from { opacity: 0; transform: scale(0.85) translateY(20px); }
        to   { opacity: 1; transform: scale(1) translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }

      /* Buttons */
      .btn-share {
        background: rgba(34,197,94,0.1);
        border: 1px solid rgba(34,197,94,0.25);
        color: #4ade80;
      }
      .btn-share:hover {
        background: rgba(34,197,94,0.2);
        transform: translateY(-1px);
      }
      .btn-reset {
        background: rgba(239,68,68,0.1);
        border: 1px solid rgba(239,68,68,0.25);
        color: #f87171;
      }
      .btn-reset:hover {
        background: rgba(239,68,68,0.2);
        transform: translateY(-1px);
      }

      /* Match card hover */
      .match-card:hover {
        transform: translateY(-1px);
      }
    `}</style>
  );
}
