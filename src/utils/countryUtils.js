/**
 * Maps team/country names to ISO 3166-1 alpha-2 country codes
 * Used with country-flag-icons package for correct flag rendering
 */
export const COUNTRY_CODES = {
  // Group A
  Mexico: "MX",
  Poland: "PL",
  "South Africa": "ZA",
  Cameroon: "CM",

  // Group B
  USA: "US",
  Honduras: "HN",
  Panama: "PA",
  Uruguay: "UY",

  // Group C
  Germany: "DE",
  Japan: "JP",
  Australia: "AU",
  "New Zealand": "NZ",

  // Group D
  France: "FR",
  "Saudi Arabia": "SA",
  Denmark: "DK",
  Peru: "PE",

  // Group E
  Spain: "ES",
  Venezuela: "VE",
  Portugal: "PT",
  Algeria: "DZ",

  // Group F
  Brazil: "BR",
  Serbia: "RS",
  Croatia: "HR",
  "Trinidad and Tobago": "TT",

  // Group G
  Netherlands: "NL",
  Senegal: "SN",
  "South Korea": "KR",
  Nigeria: "NG",

  // Group H
  Argentina: "AR",
  Iran: "IR",
  Morocco: "MA",
  Haiti: "HT",

  // Group I
  England: "GB-ENG",
  Egypt: "EG",
  Colombia: "CO",
  Turkey: "TR",

  // Group J
  Belgium: "BE",
  Ukraine: "UA",
  Switzerland: "CH",
  Mali: "ML",

  // Group K
  Ecuador: "EC",
  "Costa Rica": "CR",
  Hungary: "HU",
  "Côte d'Ivoire": "CI",

  // Group L
  Italy: "IT",
  Cuba: "CU",
  Norway: "NO",
  TBD: null,
};

/**
 * Get ISO code for a team name
 * @param {string} teamName
 * @returns {string|null}
 */
export function getCountryCode(teamName) {
  return COUNTRY_CODES[teamName] || null;
}

/**
 * Get all participating teams (group stage teams only)
 * @returns {string[]}
 */
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

/**
 * Get group label color class
 */
export function getGroupColorClass(group) {
  const map = {
    A: "text-red-400",
    B: "text-orange-400",
    C: "text-yellow-400",
    D: "text-green-400",
    E: "text-teal-400",
    F: "text-cyan-400",
    G: "text-blue-400",
    H: "text-indigo-400",
    I: "text-violet-400",
    J: "text-purple-400",
    K: "text-pink-400",
    L: "text-rose-400",
    "Round of 32": "text-sky-300",
    "Round of 16": "text-cyan-300",
    "Quarter-Final": "text-yellow-300",
    "Semi-Final": "text-orange-300",
    "Third Place": "text-green-300",
    Final: "text-fifa-gold-light",
  };
  return map[group] || "text-gray-400";
}

/**
 * Returns true if group is a knockout round
 */
export function isKnockoutRound(group) {
  return [
    "Round of 32",
    "Round of 16",
    "Quarter-Final",
    "Semi-Final",
    "Third Place",
    "Final",
  ].includes(group);
}
