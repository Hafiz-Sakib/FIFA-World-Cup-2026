import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Users, Info } from "lucide-react";
import fixtures from "../data/fixtures.json";
import MatchCard from "../components/MatchCard";
import TeamSelector from "../components/TeamSelector";
import FlagIcon from "../components/FlagIcon";
import { sortByDateTime } from "../utils/dateUtils";
import { getAllTeams } from "../utils/countryUtils";

export default function FixturesByTeam() {
  const location    = useLocation();
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const state = location.state;
    if (!state) return;
    if (state.selectedTeam) {
      setSelectedTeam(state.selectedTeam);
    } else if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      const teams = getAllTeams();
      const match = teams.find((t) => t.toLowerCase().includes(query));
      if (match) setSelectedTeam(match);
    }
  }, [location.state]);

  const teamFixtures = useMemo(() => {
    if (!selectedTeam) return [];
    return sortByDateTime(
      fixtures.filter((f) => f.team1 === selectedTeam || f.team2 === selectedTeam)
    );
  }, [selectedTeam]);

  const groupMatches = teamFixtures.filter(
    (f) => !["Round of 32","Round of 16","Quarter-Final","Semi-Final","Third Place","Final"].includes(f.group)
  );

  return (
    <div className="page-bg" style={{ minHeight: "100vh" }}>
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(22,163,74,0.12)", border: "1px solid rgba(22,163,74,0.28)" }}
            >
              <Users size={20} style={{ color: "#22C55E" }}/>
            </div>
            <h1
              className="text-white"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}
            >
              Fixtures by Team
            </h1>
          </div>
          <p className="text-sm pl-14" style={{ color: "#64748B" }}>
            একটি দল বেছে নিন এবং Bangladesh Standard Time অনুযায়ী তাদের সব ম্যাচ দেখুন।
          </p>
        </div>

        {/* Selector card */}
        <div
          className="p-5 mb-8 rounded-2xl"
          style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <label className="block text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#64748B" }}>
            Select Team
          </label>
          <TeamSelector selectedTeam={selectedTeam} onSelect={setSelectedTeam}/>
        </div>

        {/* Selected team header */}
        {selectedTeam && (
          <div className="mb-6 fade-in">
            <div className="flex items-center gap-4 mb-4">
              <div className="flag-circle" style={{ width: 54, height: 54, borderColor: "rgba(22,163,74,0.35)" }}>
                <FlagIcon teamName={selectedTeam} size={48}/>
              </div>
              <div>
                <h2
                  className="text-white font-bold"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.5rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}
                >
                  {selectedTeam}
                </h2>
                <p className="text-sm" style={{ color: "#64748B" }}>
                  {teamFixtures.length} match{teamFixtures.length !== 1 ? "es" : ""} scheduled
                  {groupMatches.length > 0 && ` · Group ${groupMatches[0].group}`}
                </p>
              </div>
            </div>
            <hr className="gold-line"/>
          </div>
        )}

        {/* Fixtures grid */}
        {selectedTeam && teamFixtures.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamFixtures.map((match, i) => (
              <div key={match.id} className="card-stagger" style={{ animationDelay: `${i * 60}ms` }}>
                <MatchCard match={match}/>
              </div>
            ))}
          </div>
        )}

        {/* No team selected */}
        {!selectedTeam && (
          <div
            className="text-center py-20 rounded-2xl fade-in"
            style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.2)" }}
            >
              <Users size={28} style={{ color: "#22C55E" }}/>
            </div>
            <h3
              className="text-white mb-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.2rem", fontWeight: 700, textTransform: "uppercase" }}
            >
              কোনো দল নির্বাচিত হয়নি
            </h3>
            <p className="text-sm" style={{ color: "#64748B" }}>
              উপরের dropdown থেকে একটি দল বেছে নিন।
            </p>
          </div>
        )}

        {/* No fixtures */}
        {selectedTeam && teamFixtures.length === 0 && (
          <div className="text-center py-16 fade-in">
            <Info size={32} className="mx-auto mb-3" style={{ color: "#475569" }}/>
            <h3 className="text-base font-semibold text-white mb-1">No fixtures found</h3>
            <p className="text-sm" style={{ color: "#64748B" }}>No scheduled matches for {selectedTeam}.</p>
          </div>
        )}
      </div>
    </div>
  );
}
