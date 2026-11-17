/* My Reservations: reservations → performances → shows → venues for the sample patron */
import { Link } from "react-router-dom";
import { useFestivalData } from "../api/festivalApi.js";
import VenueChip from "../components/VenueChip.jsx";
import { DataGate, EmptyState, usePageTitle } from "../components/common.jsx";
import { LONG_DATE, formatDate, formatTime, venueStyle } from "../lib/festival.js";

export default function MyReservations() {
  usePageTitle("My reservations");
  const fest = useFestivalData();

  return (
    <div className="container">
      <header className="page-header">
        <p className="eyebrow">Signed in as {fest.patron?.first_name} (sample patron)</p>
        <h1 className="page-title">My reservations</h1>
        <p className="lede">Your reservation history. New reservations made in this demo are confirmed but not saved, so they won't appear here.</p>
      </header>

      <DataGate loading={fest.loading} error={fest.error}>
        <div className="res-list">
          {fest.reservations?.length ? fest.reservations.map(r => {
            const p = fest.performanceById[r.performance_id];
            const show = fest.showById[p.show_id];
            return (
              <article key={r.reservation_id} className="res-card">
                <div className={`ticket-stub v${venueStyle(p.venue_id).n}`}>
                  <span className="stub-rating">×{r.quantity}</span><span className="stub-label">{r.quantity === 1 ? "ticket" : "tickets"}</span>
                </div>
                <div className="ticket-body">
                  <h2 className="ticket-title"><Link to={`/shows/${show.show_id}`}>{show.title}</Link></h2>
                  <p>{formatDate(p.performance_date, LONG_DATE)} · {formatTime(p.start_time)}</p>
                  <p><VenueChip venueId={p.venue_id} />{" "}
                    <span className={`status${r.status === "cancelled" ? " status-cancelled" : ""}`}>{r.status[0].toUpperCase() + r.status.slice(1)}</span>
                  </p>
                  <p className="res-id">Confirmation {r.reservation_id}{r.accessibility_request && ` · Request: ${r.accessibility_request}`}</p>
                </div>
              </article>
            );
          }) : (
            <EmptyState title="Plan your first night out"><p><Link to="/schedule">See the schedule</Link></p></EmptyState>
          )}
        </div>
      </DataGate>
    </div>
  );
}
