export const COUNTRY_CODES = {
  // Group A
  Mexico: "MX", "South Africa": "ZA", "South Korea": "KR", Czechia: "CZ",
  // Group B
  Canada: "CA", "Bosnia-Herzegovina": "BA", Qatar: "QA", Switzerland: "CH",
  // Group C
  Brazil: "BR", Morocco: "MA", Haiti: "HT", Scotland: "GB-SCT",
  // Group D
  USA: "US", Paraguay: "PY", Australia: "AU", Turkey: "TR",
  // Group E
  Germany: "DE", Curacao: "CW", "Ivory Coast": "CI", Ecuador: "EC",
  // Group F
  Netherlands: "NL", Japan: "JP", Sweden: "SE", Tunisia: "TN",
  // Group G
  Belgium: "BE", Egypt: "EG", Iran: "IR", "New Zealand": "NZ",
  // Group H
  Spain: "ES", "Cape Verde": "CV", "Saudi Arabia": "SA", Uruguay: "UY",
  // Group I
  France: "FR", Senegal: "SN", Iraq: "IQ", Norway: "NO",
  // Group J
  Argentina: "AR", Algeria: "DZ", Austria: "AT", Jordan: "JO",
  // Group K
  Portugal: "PT", Congo: "CG", Uzbekistan: "UZ", Colombia: "CO",
  // Group L
  England: "GB-ENG", Croatia: "HR", Ghana: "GH", Panama: "PA",
  // Extra / fallback
  TBD: null,
};

export function getCountryCode(teamName) {
  return COUNTRY_CODES[teamName] || null;
}

export function getAllTeams() {
  return Object.keys(COUNTRY_CODES).filter(
    (t) =>
      t !== "TBD" &&
      !t.startsWith("Winner") &&
      !t.startsWith("Loser") &&
      !t.startsWith("1") &&
      !t.startsWith("2") &&
      !t.startsWith("3rd"),
  );
}

export function getGroupColorClass(group) {
  const map = {
    A: "text-emerald-400",
    B: "text-green-300",
    C: "text-teal-400",
    D: "text-cyan-400",
    E: "text-sky-400",
    F: "text-blue-400",
    G: "text-violet-400",
    H: "text-purple-400",
    I: "text-fuchsia-400",
    J: "text-rose-400",
    K: "text-orange-400",
    L: "text-yellow-300",
    "Round of 32": "text-sky-300",
    "Round of 16": "text-cyan-300",
    "Quarter-Final": "text-teal-300",
    "Semi-Final": "text-green-300",
    "Third Place": "text-emerald-300",
    Final: "text-green-400",
  };
  return map[group] || "text-gray-400";
}

export function isKnockoutRound(group) {
  return [
    "Round of 32", "Round of 16", "Quarter-Final",
    "Semi-Final", "Third Place", "Final",
  ].includes(group);
}
