import { venueStyle } from "../lib/festival.js";

/* Venue color + name. Color is never shown without the name. */
export default function VenueChip({ venueId }) {
  const s = venueStyle(venueId);
  return (
    <span className={`venue-chip v${s.n}`}>
      <span className="venue-dot" aria-hidden="true"></span>{s.short}
    </span>
  );
}
