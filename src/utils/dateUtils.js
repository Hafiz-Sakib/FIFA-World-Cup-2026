import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);

/**
 * All times in fixtures.json are already in BST (UTC+6).
 * This file provides helpers for display formatting only.
 */

/**
 * Format a fixture date for display
 * e.g. "2026-06-11" → "Thursday, 11 June 2026"
 */
export function formatDate(dateStr) {
  return dayjs(dateStr).format("dddd, D MMMM YYYY");
}

/**
 * Format a fixture date — short form
 * e.g. "2026-06-11" → "11 Jun"
 */
export function formatDateShort(dateStr) {
  return dayjs(dateStr).format("D MMM");
}

/**
 * Format date for card header
 * e.g. "2026-06-11" → "Thu, 11 Jun 2026"
 */
export function formatDateCard(dateStr) {
  return dayjs(dateStr).format("ddd, D MMM YYYY");
}

/**
 * Format time with BST label
 * e.g. "03:00" → "03:00 BST"
 */
export function formatTime(timeStr) {
  return `${timeStr} BST`;
}

/**
 * Get unique sorted dates from fixtures array
 */
export function getUniqueDates(fixtures) {
  const dates = [...new Set(fixtures.map((f) => f.date))];
  return dates.sort();
}

/**
 * Group fixtures by date
 */
export function groupByDate(fixtures) {
  const groups = {};
  fixtures.forEach((f) => {
    if (!groups[f.date]) groups[f.date] = [];
    groups[f.date].push(f);
  });
  // Sort each group by time
  Object.keys(groups).forEach((date) => {
    groups[date].sort((a, b) => a.time.localeCompare(b.time));
  });
  return groups;
}

/**
 * Sort fixtures by date and time chronologically
 */
export function sortByDateTime(fixtures) {
  return [...fixtures].sort((a, b) => {
    const dtA = `${a.date} ${a.time}`;
    const dtB = `${b.date} ${b.time}`;
    return dtA.localeCompare(dtB);
  });
}

/**
 * Day of week abbreviation
 */
export function getDayAbbr(dateStr) {
  return dayjs(dateStr).format("ddd");
}

/**
 * Month name
 */
export function getMonthName(dateStr) {
  return dayjs(dateStr).format("MMMM YYYY");
}

/**
 * Group dates by month for calendar nav
 */
export function groupDatesByMonth(dates) {
  const months = {};
  dates.forEach((d) => {
    const month = dayjs(d).format("MMMM YYYY");
    if (!months[month]) months[month] = [];
    months[month].push(d);
  });
  return months;
}
