import React, { useState, useMemo } from "react";
import { CalendarDays, Info } from "lucide-react";
import fixtures from "../data/fixtures.json";
import MatchCard from "../components/MatchCard";
import DateSelector from "../components/DateSelector";
import { groupByDate, formatDate } from "../utils/dateUtils";

export default function FixturesByDate() {
  const [selectedDate, setSelectedDate] = useState(null);
  const groupedFixtures = useMemo(() => groupByDate(fixtures), []);
  const matchesForDate = useMemo(() => {
    if (!selectedDate) return [];
    return groupedFixtures[selectedDate] || [];
  }, [selectedDate, groupedFixtures]);

  return (
    <div className="page-bg" style={{ minHeight: "100vh" }}>
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(22,163,74,0.12)",
                border: "1px solid rgba(22,163,74,0.28)",
              }}
            >
              <CalendarDays size={20} style={{ color: "#22C55E" }} />
            </div>
            <h1
              className="text-white"
              style={{
                fontFamily: "'Barlow Condensed', 'Hind Siliguri', sans-serif",
                fontSize: "clamp(2rem,5vw,3rem)",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Fixtures by Date
            </h1>
          </div>
          <p className="text-sm pl-14" style={{ color: "#64748B" }}>
            একটি তারিখ সিলেক্ট করুন এবং সেদিনের সব ম্যাচ শিডিউল দেখুন,
            বাংলাদেশের সময় অনুযায়ী !
          </p>
        </div>

        {/* Date selector card */}
        <div
          className="p-5 mb-8 rounded-2xl"
          style={{
            background: "var(--card)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <label
            className="block text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#64748B" }}
          >
            Select Date
          </label>
          <DateSelector
            fixtures={fixtures}
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
          />
        </div>

        {/* Selected date header */}
        {selectedDate && (
          <div className="mb-6 fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #15803D, #16A34A)",
                }}
              >
                <CalendarDays size={18} color="#fff" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {formatDate(selectedDate)}
                </h2>
                <p className="text-sm" style={{ color: "#64748B" }}>
                  {matchesForDate.length} match
                  {matchesForDate.length !== 1 ? "es" : ""} scheduled
                </p>
              </div>
            </div>
            <hr className="gold-line" />
          </div>
        )}

        {/* Fixtures grid */}
        {selectedDate && matchesForDate.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchesForDate.map((match, i) => (
              <div
                key={match.id}
                className="card-stagger"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <MatchCard match={match} />
              </div>
            ))}
          </div>
        )}

        {/* Placeholder */}
        {!selectedDate && (
          <div
            className="text-center py-16 rounded-2xl"
            style={{
              background: "var(--card)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="text-5xl mb-4">📅</div>
            <p
              className="text-white text-lg mb-2"
              style={{
                fontFamily: "'Barlow Condensed', 'Hind Siliguri', sans-serif",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Select a Date
            </p>
            <p className="text-sm" style={{ color: "#64748B" }}>
              Use the date picker above to browse fixtures.
            </p>
          </div>
        )}

        {/* No matches for date */}
        {selectedDate && matchesForDate.length === 0 && (
          <div
            className="text-center py-16 rounded-2xl"
            style={{
              background: "var(--card)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="text-5xl mb-4">😔</div>
            <p
              className="text-white text-lg mb-2"
              style={{
                fontFamily: "'Barlow Condensed', 'Hind Siliguri', sans-serif",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              No Matches
            </p>
            <p className="text-sm" style={{ color: "#64748B" }}>
              No matches scheduled for this date.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
