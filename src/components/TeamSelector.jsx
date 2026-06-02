import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import FlagIcon from "./FlagIcon";
import { getAllTeams } from "../utils/countryUtils";

/**
 * TeamSelector – searchable dropdown for picking a national team.
 * Props:
 *   selectedTeam: string | null
 *   onSelect: (team: string | null) => void
 */
export default function TeamSelector({ selectedTeam, onSelect }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  const teams = getAllTeams().sort();

  const filtered = query
    ? teams.filter((t) => t.toLowerCase().includes(query.toLowerCase()))
    : teams;

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (team) => {
    onSelect(team);
    setOpen(false);
    setQuery("");
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onSelect(null);
    setQuery("");
  };

  return (
    <div className="relative w-full" ref={ref}>
      {/* Trigger button */}
      <button
        className="field-input w-full flex items-center justify-between gap-3 px-4 py-3 text-sm cursor-pointer"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <div className="flex items-center gap-3 min-w-0">
          {selectedTeam ? (
            <>
              <FlagIcon teamName={selectedTeam} size={28} />
              <span className="font-semibold text-white truncate">
                {selectedTeam}
              </span>
            </>
          ) : (
            <span className="text-gray-400">Select a team...</span>
          )}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {selectedTeam && (
            <button
              onClick={handleClear}
              className="p-0.5 rounded text-gray-400 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          )}
          <ChevronDown
            size={16}
            className="text-gray-400 transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}
          />
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden shadow-2xl fade-in"
          style={{
            background: "#0A0E1A",
            border: "1px solid rgba(201,168,76,0.25)",
          }}
        >
          {/* Search inside dropdown */}
          <div
            className="p-2 border-b"
            style={{ borderColor: "rgba(201,168,76,0.15)" }}
          >
            <input
              autoFocus
              type="text"
              className="field-input w-full px-3 py-2 text-sm"
              placeholder="Search team..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Team list */}
          <div className="overflow-y-auto" style={{ maxHeight: "260px" }}>
            {filtered.length === 0 ? (
              <div className="px-4 py-6 text-center text-gray-500 text-sm">
                No teams found
              </div>
            ) : (
              filtered.map((team) => (
                <button
                  key={team}
                  type="button"
                  onClick={() => handleSelect(team)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors"
                  style={{
                    background:
                      selectedTeam === team
                        ? "rgba(201,168,76,0.12)"
                        : "transparent",
                    color: selectedTeam === team ? "#F0C040" : "#e2e8f0",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedTeam !== team)
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    if (selectedTeam !== team)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  <FlagIcon teamName={team} size={24} />
                  <span className="font-medium">{team}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
