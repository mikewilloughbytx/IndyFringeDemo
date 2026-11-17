/* ==========================================================================
   Festival rules, venue colors and formatting helpers
   ========================================================================== */

/* ---------- Venue colors (scope addition, Nov 17 2026) ----------
   The venues table has no color column, so colors are a website setting
   keyed by venue_id. `n` maps to the .v1 … .v6 classes in styles.css.
   The short name is always shown beside the color. */
export const VENUE_STYLE = {
  "VEN-001": { n: 1, short: "Basile" },
  "VEN-002": { n: 2, short: "Blackbox" },
  "VEN-003": { n: 3, short: "District Mainstage" },
  "VEN-004": { n: 4, short: "District Cabaret" },
  "VEN-005": { n: 5, short: "Athenaeum" },
  "VEN-006": { n: 6, short: "Arabian Room" }
};
const UNKNOWN_VENUE = { n: 0, short: "Venue" };
export const venueStyle = id => VENUE_STYLE[id] || UNKNOWN_VENUE;

export const FESTIVAL_DAYS = Array.from({ length: 11 }, (_, i) => `2027-08-${12 + i}`);

/* seats available = venues.capacity - performances.seats_reserved */
export function seatsAvailable(performance, venue) {
  return Math.max(0, (venue?.capacity ?? 0) - performance.seats_reserved);
}

/* Family friendly rule from Deliverable 1.1 */
export function isFamilyFriendly(show) {
  return show.age_rating === "All Ages" || show.genre === "Family";
}

/* ---------- Formatting ---------- */

/* "1 performance", "3 performances". Pass the plural when it isn't word + "s". */
export function plural(count, word, pluralWord = `${word}s`) {
  return `${count} ${count === 1 ? word : pluralWord}`;
}

export function formatDate(iso, opts = { weekday: "short", month: "short", day: "numeric" }) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", opts);
}
export const LONG_DATE = { weekday: "long", month: "long", day: "numeric" };

export function formatTime(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

export const byStart = (a, b) =>
  (a.performance_date + a.start_time).localeCompare(b.performance_date + b.start_time);
