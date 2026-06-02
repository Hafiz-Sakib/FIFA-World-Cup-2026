import React from "react";
import { MapPin, Clock, Calendar } from "lucide-react";
import FlagIcon from "./FlagIcon";
import { formatDateCard, formatTime } from "../utils/dateUtils";
import { isKnockoutRound, getGroupColorClass } from "../utils/countryUtils";

/**
 * MatchCard – displays a single FIFA World Cup match.
 * Props:
 *   match: { id, date, time, team1, team2, group, venue, city, country }
 */
export default function MatchCard({ match }) {
  const knockout = isKnockoutRound(match.group);
  const groupColor = getGroupColorClass(match.group);

  const cardClass =
    match.group === "Final"
      ? "glass-card final-card"
      : knockout
        ? "glass-card knockout-card"
        : "glass-card";

  return (
    <div className={`${cardClass} p-4 fade-in`}>
      {/* Header: Group badge + date */}
      <div className="flex items-center justify-between mb-3">
        <span className={`group-badge ${groupColor} border-current`}>
          {match.group === "Round of 32"
            ? "R32"
            : match.group === "Round of 16"
              ? "R16"
              : match.group === "Quarter-Final"
                ? "QF"
                : match.group === "Semi-Final"
                  ? "SF"
                  : match.group === "Third Place"
                    ? "3rd"
                    : match.group === "Final"
                      ? "🏆 FINAL"
                      : `Group ${match.group}`}
        </span>
        <div
          className="flex items-center gap-1 text-gray-400"
          style={{ fontSize: "0.72rem" }}
        >
          <Calendar size={11} />
          <span>{formatDateCard(match.date)}</span>
        </div>
      </div>

      {/* Teams row */}
      <div className="flex items-center justify-between gap-2 py-2">
        {/* Team 1 */}
        <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
          <div className="flag-circle">
            <FlagIcon teamName={match.team1} size={36} />
          </div>
          <span
            className="text-center font-semibold text-sm leading-tight text-white"
            style={{ wordBreak: "break-word", maxWidth: "90px" }}
          >
            {match.team1}
          </span>
        </div>

        {/* VS Badge */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <span className="vs-badge">VS</span>
          {match.group === "Final" && (
            <span style={{ fontSize: "1.1rem" }}>🏆</span>
          )}
        </div>

        {/* Team 2 */}
        <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
          <div className="flag-circle">
            <FlagIcon teamName={match.team2} size={36} />
          </div>
          <span
            className="text-center font-semibold text-sm leading-tight text-white"
            style={{ wordBreak: "break-word", maxWidth: "90px" }}
          >
            {match.team2}
          </span>
        </div>
      </div>

      {/* Divider */}
      <hr className="gold-line my-2.5" />

      {/* Footer: Time + Venue */}
      <div className="flex items-center justify-between gap-2 text-xs text-gray-400 flex-wrap">
        <div className="flex items-center gap-1">
          <Clock
            size={12}
            className="text-fifa-gold flex-shrink-0"
            style={{ color: "#C9A84C" }}
          />
          <span className="font-medium" style={{ color: "#F0C040" }}>
            {formatTime(match.time)}
          </span>
        </div>
        <div className="flex items-center gap-1 text-right">
          <MapPin
            size={12}
            className="flex-shrink-0"
            style={{ color: "#9ca3af" }}
          />
          <span className="truncate" style={{ maxWidth: "160px" }}>
            {match.venue}, {match.city}
          </span>
        </div>
      </div>
    </div>
  );
}
