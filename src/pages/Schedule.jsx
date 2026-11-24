/* Schedule: dusk band with day picker; venues across, times down (list on phones) (WEB-2.2.4) */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFestivalData } from "../api/festivalApi.js";
import VenueChip from "../components/VenueChip.jsx";
import { DataGate, EmptyState, StatusLabel, usePageTitle } from "../components/common.jsx";
import { FESTIVAL_DAYS, LONG_DATE, formatDate, formatTime, isFamilyFriendly, venueStyle } from "../lib/festival.js";

export default function Schedule() {
  usePageTitle("Schedule");
  const fest = useFestivalData();
  const [day, setDay] = useState("2027-08-13");
  const [familyOnly, setFamilyOnly] = useState(false);

  return (
    <>
      {/* ===== Dusk band ===== */}
      <section className="dusk-band" aria-labelledby="sched-title">
        <div className="container">
          <p className="eyebrow" style={{ color: "var(--dusk-muted)" }}>August 12 – 22, 2027</p>
          <h1 id="sched-title" className="page-title">Festival schedule</h1>
          <div className="day-tabs" role="group" aria-label="Choose a day">
            {FESTIVAL_DAYS.map(d => (
              <button key={d} type="button" className="day-tab" aria-pressed={d === day} onClick={() => setDay(d)}>
                <span className="day-dow">{formatDate(d, { weekday: "short" })}</span>
                <span className="day-num">{formatDate(d, { day: "numeric" })}</span>
              </button>
            ))}
          </div>
          <div className="sched-bar">
            <h2 id="day-heading" className="day-heading" aria-live="polite">{formatDate(day, LONG_DATE)}</h2>
            <label className="check"><input type="checkbox" checked={familyOnly} onChange={e => setFamilyOnly(e.target.checked)} /> Family friendly only</label>
          </div>
        </div>
      </section>

      {/* ===== Grid ===== */}
      <section className="container" aria-labelledby="day-heading">
        <DataGate loading={fest.loading} error={fest.error} onRetry={fest.retry}>
          {fest.performances && <DayGrid fest={fest} day={day} familyOnly={familyOnly} />}
        </DataGate>
      </section>
    </>
  );
}

function DayGrid({ fest, day, familyOnly }) {
  const todays = fest.performances.filter(p =>
    p.performance_date === day && (!familyOnly || isFamilyFriendly(fest.showById[p.show_id])));

  if (!todays.length) {
    return (
      <div style={{ padding: "1.5rem 0 3rem" }}>
        <EmptyState title="Nothing scheduled yet for this day">
          <p>The full 2027 schedule loads from the API in a later release. Try Friday, August 13.</p>
        </EmptyState>
      </div>
    );
  }

  const times = [...new Set(todays.map(p => p.start_time))].sort();
  return (
    <div className="sched" style={{ "--cols": fest.venues.length }}>
      <div className="sched-corner" aria-hidden="true"></div>
      {fest.venues.map(v => (
        <div key={v.venue_id} className={`sched-head v${venueStyle(v.venue_id).n}`}>{venueStyle(v.venue_id).short}</div>
      ))}
      {times.map(t => [
        <div key={t} className="sched-time">{formatTime(t)}</div>,
        ...fest.venues.map(v => {
          const p = todays.find(x => x.start_time === t && x.venue_id === v.venue_id);
          if (!p) return <div key={t + v.venue_id} className="sched-cell is-empty" aria-hidden="true"></div>;
          const show = fest.showById[p.show_id];
          return (
            <div key={p.performance_id} className={`sched-cell v${venueStyle(v.venue_id).n}`}>
              <span className="cell-time">{formatTime(t)}</span>
              <Link to={`/shows/${show.show_id}`}>{show.title}</Link>
              <span className="cell-venue"><VenueChip venueId={v.venue_id} /></span>
              <StatusLabel performance={p} venue={v} />
            </div>
          );
        })
      ])}
    </div>
  );
}
