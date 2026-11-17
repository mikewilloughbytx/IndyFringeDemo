/* Show detail: description, warnings, performances with venue access notes (WEB-2.2.3, 2.3.3) */
import { Link, useParams } from "react-router-dom";
import { useFestivalData } from "../api/festivalApi.js";
import VenueChip from "../components/VenueChip.jsx";
import { DataGate, EmptyState, PageHeader, StatusLabel, usePageTitle } from "../components/common.jsx";
import { byStart, formatDate, formatTime, isFamilyFriendly } from "../lib/festival.js";

export default function ShowDetail() {
  const { showId } = useParams();
  const fest = useFestivalData();
  const show = fest.showById?.[showId];
  usePageTitle(show ? show.title : "Show details");

  return (
    <div className="container">
      <DataGate loading={fest.loading} error={fest.error}>
        {!show ? (
          <div style={{ paddingBottom: "3rem" }}>
            <PageHeader title="Show not found" />
            <EmptyState title="We couldn't find that show"><p><Link to="/shows">Browse all shows</Link></p></EmptyState>
          </div>
        ) : (
          <ShowBody show={show} fest={fest} />
        )}
      </DataGate>
    </div>
  );
}

function ShowBody({ show, fest }) {
  const company = fest.companyById[show.company_id];
  const perfs = fest.performances.filter(p => p.show_id === show.show_id).sort(byStart);

  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumb"><Link to="/shows">Shows</Link> / {show.title}</nav>
      <div className="detail-grid">
        <div>
          <h1 className="page-title">{show.title}</h1>
          <p className="lede">{company?.name} · {company?.hometown}</p>
          <p className="ticket-meta">
            <span className="genre-tag">{show.genre}</span>
            <span className="genre-tag">{show.age_rating}</span>
            <span className="genre-tag">{show.runtime_minutes} min</span>
            {isFamilyFriendly(show) && <span className="genre-tag family">Family friendly</span>}
          </p>
          <p>{show.description}</p>
          <div className="notice">
            <p className="notice-title">Content warnings</p>
            <p>{show.content_warnings || "None listed."}</p>
          </div>
          <p className="price-note">Tickets ${show.ticket_price} (shown for information; reservations are free in this demo).</p>
        </div>

        <aside className="perf-panel" aria-labelledby="perf-heading">
          <h2 id="perf-heading" className="panel-title">Performances</h2>
          <ul className="perf-list">
            {perfs.map(p => {
              const venue = fest.venueById[p.venue_id];
              const when = `${formatDate(p.performance_date)} · ${formatTime(p.start_time)}`;
              return (
                <li key={p.performance_id} className="perf-row">
                  <div>
                    <p className="perf-when">{when}</p>
                    <p><VenueChip venueId={p.venue_id} /> <StatusLabel performance={p} venue={venue} /></p>
                    <p className="perf-access"><span className="sr-label">Accessibility: </span>{venue.accessibility_notes}</p>
                  </div>
                  {p.status === "scheduled" && (
                    <Link className="btn btn-small" to={`/reserve?performance=${p.performance_id}`}>
                      Reserve<span className="visually-hidden"> {when}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </>
  );
}
