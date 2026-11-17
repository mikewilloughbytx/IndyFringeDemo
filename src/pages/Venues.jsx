/* Venues: color-coded directory with accessibility, parking, directions (WEB-2.3.1, 2.3.3, 2.3.4) */
import { Link } from "react-router-dom";
import { useFestivalData } from "../api/festivalApi.js";
import { DataGate, PageHeader, usePageTitle } from "../components/common.jsx";
import { plural, venueStyle } from "../lib/festival.js";

export default function Venues() {
  usePageTitle("Venues");
  const fest = useFestivalData();

  return (
    <div className="container">
      <PageHeader eyebrow="Venue guide" title="Six stages">
        All six venues are within a short walk on and around Mass Ave. Each has its own color, used everywhere on this site.
      </PageHeader>

      <DataGate loading={fest.loading} error={fest.error}>
        <div className="venue-grid">
          {(fest.venues || []).map(v => {
            const s = venueStyle(v.venue_id);
            const count = fest.performances.filter(p => p.venue_id === v.venue_id).length;
            const maps = `https://www.google.com/maps/dir/?api=1&destination=${v.latitude},${v.longitude}`;
            return (
              <article key={v.venue_id} className={`venue-card v${s.n}`}>
                <div className="venue-band"><span className="venue-num">Venue {s.n}</span></div>
                <div className="venue-body">
                  <h2 className="venue-name">{v.name}</h2>
                  <p className="venue-addr">{v.address}, {v.city}, {v.state} {v.zip_code}</p>
                  <p>{v.blurb}</p>
                  <dl className="venue-facts">
                    <div><dt>Capacity</dt><dd>{plural(v.capacity, "seat")}</dd></div>
                    <div><dt>Accessibility</dt><dd>{v.accessibility_notes}</dd></div>
                    <div><dt>Parking</dt><dd>{v.parking}</dd></div>
                  </dl>
                  <p className="venue-actions">
                    <Link className="btn btn-small" to="/schedule">{plural(count, "performance")}</Link>
                    <a className="text-link" href={maps} target="_blank" rel="noopener noreferrer">
                      Get directions<span className="visually-hidden"> to {v.name} (opens in a new tab)</span>
                    </a>
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </DataGate>
    </div>
  );
}
