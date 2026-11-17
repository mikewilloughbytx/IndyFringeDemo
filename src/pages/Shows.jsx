/* Shows: ticket-stub grid with genre / day / venue / family filters (WEB-2.2.1, 2.2.2) */
import { useMemo, useState } from "react";
import { useFestivalData } from "../api/festivalApi.js";
import ShowCard from "../components/ShowCard.jsx";
import { DataGate, EmptyState, PageHeader, usePageTitle } from "../components/common.jsx";
import { formatDate, isFamilyFriendly, plural, venueStyle } from "../lib/festival.js";

const NO_FILTERS = { genre: "", day: "", venue: "", family: false };

export default function Shows() {
  usePageTitle("Shows");
  const fest = useFestivalData();
  const [f, setF] = useState(NO_FILTERS);
  const set = key => e => setF({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const options = useMemo(() => fest.shows ? {
    genres: [...new Set(fest.shows.map(s => s.genre))].sort(),
    days: [...new Set(fest.performances.map(p => p.performance_date))].sort()
  } : { genres: [], days: [] }, [fest.shows, fest.performances]);

  const list = (fest.shows || []).filter(s => {
    const perfs = fest.performances.filter(p => p.show_id === s.show_id);
    return (!f.genre || s.genre === f.genre)
      && (!f.day || perfs.some(p => p.performance_date === f.day))
      && (!f.venue || perfs.some(p => p.venue_id === f.venue))
      && (!f.family || isFamilyFriendly(s));
  });

  return (
    <div className="container">
      <PageHeader eyebrow="The program" title="All shows">
        Filter by genre, day or venue. The stub on each card shows the age rating and running time.
      </PageHeader>

      {/* ===== Filters ===== */}
      <form className="filters" aria-label="Filter shows" onSubmit={e => e.preventDefault()}>
        <div className="field">
          <label htmlFor="f-genre">Genre</label>
          <select id="f-genre" value={f.genre} onChange={set("genre")}>
            <option value="">All genres</option>
            {options.genres.map(g => <option key={g}>{g}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-day">Day</label>
          <select id="f-day" value={f.day} onChange={set("day")}>
            <option value="">All days</option>
            {options.days.map(d => <option key={d} value={d}>{formatDate(d)}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-venue">Venue</label>
          <select id="f-venue" value={f.venue} onChange={set("venue")}>
            <option value="">All venues</option>
            {(fest.venues || []).map(v => <option key={v.venue_id} value={v.venue_id}>{venueStyle(v.venue_id).short}</option>)}
          </select>
        </div>
        <label className="check"><input type="checkbox" checked={f.family} onChange={set("family")} /> Family friendly</label>
        <button type="button" className="btn btn-small" onClick={() => setF(NO_FILTERS)}>Clear</button>
      </form>

      {/* ===== Results ===== */}
      <DataGate loading={fest.loading} error={fest.error}>
        <p className="result-count" aria-live="polite">{plural(list.length, "show")}</p>
        <div className="card-grid" style={{ paddingBottom: "3rem" }}>
          {list.length ? list.map(show => (
            <ShowCard key={show.show_id} show={show} headingLevel={2}
              company={fest.companyById[show.company_id]}
              firstPerformance={fest.performances.find(p => p.show_id === show.show_id)} />
          )) : (
            <EmptyState title="No shows match those filters"><p>Try another day or venue, or clear the filters.</p></EmptyState>
          )}
        </div>
      </DataGate>
    </div>
  );
}
