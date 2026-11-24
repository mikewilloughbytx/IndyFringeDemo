/* Venue detail: address, capacity, accessibility, directions and the venue's
   performances grouped by day, with a day filter kept in the address (WEB-2.3.2, 2.3.3, 2.3.4) */
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useFestivalData } from "../api/festivalApi.js";
import VenueChip from "../components/VenueChip.jsx";
import { DataGate, EmptyState, PageHeader, StatusLabel, usePageTitle } from "../components/common.jsx";
import { FESTIVAL_DAYS, LONG_DATE, byStart, formatDate, formatTime, plural } from "../lib/festival.js";

export default function VenueDetail() {
  const { venueId } = useParams();
  const fest = useFestivalData();
  const venue = fest.venueById?.[venueId];
  usePageTitle(venue ? venue.name : "Venue details");

  return (
    <div className="container">
      <DataGate loading={fest.loading} error={fest.error} onRetry={fest.retry}>
        {!venue ? (
          <div style={{ paddingBottom: "3rem" }}>
            <PageHeader title="Venue not found" />
            <EmptyState title="We couldn't find that venue"><p><Link to="/venues">See all venues</Link></p></EmptyState>
          </div>
        ) : (
          <VenueBody venue={venue} fest={fest} />
        )}
      </DataGate>
    </div>
  );
}

function VenueBody({ venue, fest }) {
  const [params, setParams] = useSearchParams();
  const day = params.get("day") || "";
  const maps = `https://www.google.com/maps/dir/?api=1&destination=${venue.latitude},${venue.longitude}`;

  const perfs = fest.performances
    .filter(p => p.venue_id === venue.venue_id && (!day || p.performance_date === day))
    .sort(byStart);
  const days = [...new Set(perfs.map(p => p.performance_date))];

  function chooseDay(e) {
    const next = new URLSearchParams(params);
    if (e.target.value) next.set("day", e.target.value); else next.delete("day");
    setParams(next, { replace: true });
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumb"><Link to="/venues">Venues</Link> / {venue.name}</nav>
      <div className="detail-grid">
        {/* ===== Venue facts ===== */}
        <div>
          <p><VenueChip venueId={venue.venue_id} /></p>
          <h1 className="page-title">{venue.name}</h1>
          <p className="lede">{venue.address}, {venue.city}, {venue.state} {venue.zip_code}</p>
          {venue.blurb && <p>{venue.blurb}</p>}
          <dl className="venue-facts">
            <div><dt>Capacity</dt><dd>{plural(venue.capacity, "seat")}</dd></div>
            <div><dt>Accessibility</dt><dd>{venue.accessibility_notes || "No notes yet. Ask the box office."}</dd></div>
            {venue.parking && <div><dt>Parking</dt><dd>{venue.parking}</dd></div>}
          </dl>
          <p>
            <a className="btn btn-small" href={maps} target="_blank" rel="noopener noreferrer">
              Get directions<span className="visually-hidden"> to {venue.name} (opens Google Maps in a new tab)</span>
            </a>
          </p>
        </div>

        {/* ===== Performances by day ===== */}
        <section className="perf-panel" aria-labelledby="venue-perf-heading">
          <h2 id="venue-perf-heading" className="panel-title">Performances</h2>
          <div className="panel-field">
            <label htmlFor="v-day">Day</label>
            <select id="v-day" value={day} onChange={chooseDay}>
              <option value="">All days</option>
              {FESTIVAL_DAYS.map(d => <option key={d} value={d}>{formatDate(d)}</option>)}
            </select>
          </div>
          <p className="result-count" aria-live="polite">{plural(perfs.length, "performance")}</p>

          {days.length ? days.map(d => (
            <section key={d} aria-labelledby={`day-${d}`}>
              <h3 id={`day-${d}`} className="perf-day">{formatDate(d, LONG_DATE)}</h3>
              <ul className="perf-list">
                {perfs.filter(p => p.performance_date === d).map(p => {
                  const show = fest.showById[p.show_id];
                  return (
                    <li key={p.performance_id} className="perf-row">
                      <div>
                        <p className="perf-when">{formatTime(p.start_time)}</p>
                        <p><Link to={`/shows/${show.show_id}`}>{show.title}</Link></p>
                        <p><StatusLabel performance={p} venue={venue} /></p>
                      </div>
                      {p.status === "scheduled" && (
                        <Link className="btn btn-small" to={`/reserve?performance=${p.performance_id}`}>
                          Reserve<span className="visually-hidden"> {show.title}, {formatDate(d)} {formatTime(p.start_time)}</span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )) : (
            <EmptyState title={day ? "Nothing at this venue that day" : "No performances listed yet"}>
              <p>{day ? "Try another day, or choose All days." : <Link to="/schedule">See the full schedule</Link>}</p>
            </EmptyState>
          )}
        </section>
      </div>
    </>
  );
}
