/* Shows: ticket-stub grid with title search and genre / day / venue / family filters.
   Filters live in the page address so a filtered list can be bookmarked (WEB-2.2.1, 2.2.2, 2.2.5) */
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useFestivalData } from "../api/festivalApi.js";
import ShowCard from "../components/ShowCard.jsx";
import { DataGate, EmptyState, PageHeader, usePageTitle } from "../components/common.jsx";
import { FESTIVAL_DAYS, formatDate, isFamilyFriendly, plural, venueStyle } from "../lib/festival.js";

export default function Shows() {
  usePageTitle("Shows");
  const fest = useFestivalData();
  const [params, setParams] = useSearchParams();
  const f = {
    q: params.get("q") || "",
    genre: params.get("genre") || "",
    day: params.get("day") || "",
    venue: params.get("venue") || "",
    family: params.get("family") === "true"
  };

  // Update one filter in the address; empty values are removed so links stay short
  const set = key => e => {
    const value = e.target.type === "checkbox" ? (e.target.checked ? "true" : "") : e.target.value;
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    setParams(next, { replace: true });
  };
  const clear = () => setParams({}, { replace: true });

  const genres = useMemo(() => fest.shows ? [...new Set(fest.shows.map(s => s.genre))].sort() : [], [fest.shows]);

  const query = f.q.trim().toLowerCase();
  const list = (fest.shows || []).filter(s => {
    const perfs = fest.performances.filter(p => p.show_id === s.show_id);
    return (!query || s.title.toLowerCase().includes(query))
      && (!f.genre || s.genre === f.genre)
      && (!f.day || perfs.some(p => p.performance_date === f.day))
      && (!f.venue || perfs.some(p => p.venue_id === f.venue))
      && (!f.family || isFamilyFriendly(s));
  });

  return (
    <div className="container">
      <PageHeader eyebrow="The program" title="All shows">
        Search by title or filter by genre, day or venue. The stub on each card shows the age rating and running time.
      </PageHeader>

      {/* ===== Search and filters ===== */}
      <form className="filters" role="search" aria-label="Search and filter shows" onSubmit={e => e.preventDefault()}>
        <div className="field field-search">
          <label htmlFor="f-search">Search by title</label>
          <input id="f-search" type="search" value={f.q} onChange={set("q")} placeholder="For example, Bed of Thorns" />
        </div>
        <div className="field">
          <label htmlFor="f-genre">Genre</label>
          <select id="f-genre" value={f.genre} onChange={set("genre")}>
            <option value="">All genres</option>
            {genres.map(g => <option key={g}>{g}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-day">Day</label>
          <select id="f-day" value={f.day} onChange={set("day")}>
            <option value="">All days</option>
            {FESTIVAL_DAYS.map(d => <option key={d} value={d}>{formatDate(d)}</option>)}
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
        <button type="button" className="btn btn-small" onClick={clear}>Clear filters</button>
      </form>

      {/* ===== Results ===== */}
      <DataGate loading={fest.loading} error={fest.error} onRetry={fest.retry}>
        <p className="result-count" aria-live="polite">{plural(list.length, "show")}</p>
        <div className="card-grid" style={{ paddingBottom: "3rem" }}>
          {list.length ? list.map(show => (
            <ShowCard key={show.show_id} show={show} headingLevel={2}
              company={fest.companyById[show.company_id]}
              firstPerformance={fest.performances.find(p => p.show_id === show.show_id)} />
          )) : (
            <EmptyState title="No shows match these filters">
              <p>Try another title, day or venue.</p>
              <button type="button" className="btn btn-small" onClick={clear}>Clear filters</button>
            </EmptyState>
          )}
        </div>
      </DataGate>
    </div>
  );
}
