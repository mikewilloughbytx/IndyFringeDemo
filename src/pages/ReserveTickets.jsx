/* Reserve Tickets: form + confirmation layout. POST /api/v1/reservations arrives in 1.7. */
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useFestivalData } from "../api/festivalApi.js";
import { PageHeader, usePageTitle } from "../components/common.jsx";
import { LONG_DATE, byStart, formatDate, formatTime, plural, seatsAvailable, venueStyle } from "../lib/festival.js";

export default function ReserveTickets() {
  usePageTitle("Reserve tickets");
  const fest = useFestivalData();
  const [params] = useSearchParams();
  const [performanceId, setPerformanceId] = useState(params.get("performance") || "");
  const [qty, setQty] = useState(2);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(null);
  const confirmRef = useRef(null);

  useEffect(() => { if (confirmed) confirmRef.current?.focus(); }, [confirmed]);

  const bookable = (fest.performances || []).filter(p => p.status === "scheduled").sort(byStart);

  function submit(e) {
    e.preventDefault();
    setError("");
    const p = fest.performanceById[performanceId];
    if (!p) return setError("Choose a performance.");
    const left = seatsAvailable(p, fest.venueById[p.venue_id]);
    if (qty > left) return setError(`Only ${plural(left, "seat")} ${left === 1 ? "is" : "are"} left for that performance.`);
    setConfirmed({ p, qty });
  }

  return (
    <div className="container">
      <PageHeader eyebrow="Free reservations · no payment" title="Reserve tickets">
        Pick a performance and how many seats you need. You can reserve up to 6.
      </PageHeader>

      <div className="two-col">
        {/* ===== Form ===== */}
        <form className="form-card" noValidate onSubmit={submit}>
          <div className="form-row">
            <label htmlFor="r-performance">Performance</label>
            <select id="r-performance" value={performanceId} onChange={e => setPerformanceId(e.target.value)}>
              <option value="">Choose a performance</option>
              {fest.showById && bookable.map(p => (
                <option key={p.performance_id} value={p.performance_id}>
                  {fest.showById[p.show_id].title} — {formatDate(p.performance_date)} {formatTime(p.start_time)} · {venueStyle(p.venue_id).short}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="r-qty">Number of tickets</label>
            <select id="r-qty" value={qty} onChange={e => setQty(Number(e.target.value))}>
              {[1, 2, 3, 4, 5, 6].map(n => <option key={n}>{n}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="r-access">Accessibility request <span className="hint">(optional)</span></label>
            <textarea id="r-access" rows="3" maxLength={500} value={notes} onChange={e => setNotes(e.target.value)} aria-describedby="r-access-hint r-count" />
            <p id="r-access-hint" className="hint">
              Tell the venue about wheelchair seating, assisted listening, an aisle seat or anything else you need. Each venue's accessibility notes are on the <Link to="/venues">venue guide</Link>.
            </p>
            <p id="r-count" className="hint">{notes.length} / 500</p>
          </div>
          <p className="form-error" role="alert">{error}</p>
          <button className="btn btn-cta" type="submit">Reserve</button>
        </form>

        {/* ===== Confirmation ===== */}
        <section aria-labelledby="confirm-title">
          <h2 id="confirm-title" className="panel-title">Your confirmation</h2>
          <div ref={confirmRef} tabIndex={-1}>
            {confirmed ? <Confirmation {...confirmed} fest={fest} /> : (
              <div className="placeholder-box">Your confirmation will appear here: show, date, time, venue, number of tickets and a confirmation number.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function Confirmation({ p, qty, fest }) {
  const show = fest.showById[p.show_id];
  const venue = fest.venueById[p.venue_id];
  return (
    <div className="confirm-ticket">
      <div className={`ticket-stub v${venueStyle(p.venue_id).n}`}>
        <span className="stub-rating">×{qty}</span><span className="stub-label">{qty === 1 ? "ticket" : "tickets"}</span>
      </div>
      <div className="ticket-body">
        <p className="eyebrow">Sample confirmation · nothing was saved</p>
        <h3 className="ticket-title">{show.title}</h3>
        <p>{formatDate(p.performance_date, LONG_DATE)} · {formatTime(p.start_time)}</p>
        <p>{venue.name}, {venue.address}</p>
        <p className="res-id">Confirmation RSV-PREVIEW</p>
      </div>
    </div>
  );
}
