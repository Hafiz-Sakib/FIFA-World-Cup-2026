import React from "react";
import { getCountryCode } from "../utils/countryUtils";

/**
 * Renders a country flag as an SVG image using country-flag-icons.
 * Falls back to a placeholder if the country code is not found.
 */
export default function FlagIcon({ teamName, size = 32, className = "" }) {
  const code = getCountryCode(teamName);

  if (!code) {
    // Placeholder for unknown/TBD teams
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-gray-700 border border-gray-600 ${className}`}
        style={{ width: size, height: size, minWidth: size }}
        title={teamName}
      >
        <span
          style={{
            fontSize: size * 0.38,
            color: "#9ca3af",
            fontWeight: 700,
            fontFamily: "inherit",
          }}
        >
          {teamName ? teamName.slice(0, 2).toUpperCase() : "?"}
        </span>
      </div>
    );
  }

  // country-flag-icons provides SVG flags via CDN URL pattern
  // Format: https://purecatamphetamine.github.io/country-flag-icons/3x2/{CC}.svg
  // For England (GB-ENG) we use GB as fallback
  const svgCode = code === "GB-ENG" ? "GB" : code;

  return (
    <img
      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${svgCode}.svg`}
      alt={`${teamName} flag`}
      title={teamName}
      className={`object-cover rounded-sm ${className}`}
      style={{ width: size, height: size * 0.67, minWidth: size }}
      loading="lazy"
      onError={(e) => {
        e.target.style.display = "none";
      }}
    />
  );
}
