/* Home: night-woods hero, featured shows, venue strip, first-timer teaser */
import { Link } from "react-router-dom";
import { useFestivalData } from "../api/festivalApi.js";
import ShowCard from "../components/ShowCard.jsx";
import { DataGate, StringLights, Treeline, usePageTitle } from "../components/common.jsx";
import { VENUE_STYLE } from "../lib/festival.js";

const FEATURED = ["SHW-001", "SHW-004", "SHW-010"];
const VENUE_LABELS = {
  "VEN-001": "The Basile Theatre", "VEN-002": "The Blackbox", "VEN-003": "District Mainstage",
  "VEN-004": "District Cabaret", "VEN-005": "The Athenaeum", "VEN-006": "The Arabian Room"
};

export default function Home() {
  usePageTitle(null);
  const fest = useFestivalData();

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="hero" aria-labelledby="hero-title">
        <StringLights />
        <div className="hero-inner">
          <h1 id="hero-title" className="hero-banner">IndyFringe 2027</h1>
          <p className="hero-tagline">Eleven days. Six stages. Every kind of story.</p>
          <p className="hero-dates">August 12 – 22, 2027</p>
          <div className="hero-ctas">
            <Link className="btn btn-cta" to="/schedule">See the schedule</Link>
            <Link className="btn btn-ghost-light" to="/reserve">Reserve tickets</Link>
          </div>
        </div>
        <Treeline />
      </section>

      {/* ===== Featured shows ===== */}
      <section className="section section-moss" aria-labelledby="featured-title">
        <div className="container">
          <div className="section-head">
            <h2 id="featured-title" className="section-title">Featured shows</h2>
            <Link to="/shows">All shows</Link>
          </div>
          <DataGate loading={fest.loading} error={fest.error}>
            <div className="card-grid">
              {fest.showById && FEATURED.map(id => fest.showById[id]).filter(Boolean).map(show => (
                <ShowCard key={show.show_id} show={show}
                  company={fest.companyById[show.company_id]}
                  firstPerformance={fest.performances.find(p => p.show_id === show.show_id)} />
              ))}
            </div>
          </DataGate>
        </div>
      </section>

      {/* ===== Venue strip ===== */}
      <section className="section" aria-labelledby="venues-title">
        <div className="container">
          <div className="section-head">
            <h2 id="venues-title" className="section-title">Six stages on Mass Ave</h2>
            <Link to="/venues">Venue guide</Link>
          </div>
          <p>Every venue has its own color. Look for it on show cards, the schedule and your reservations.</p>
          <div className="venue-strip">
            {Object.entries(VENUE_STYLE).map(([id, s]) => (
              <Link key={id} className={`v${s.n}`} to="/venues"><span>Venue {s.n}</span>{VENUE_LABELS[id]}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== First-timers ===== */}
      <section className="section" aria-labelledby="first-title">
        <div className="container">
          <div className="section-head"><h2 id="first-title" className="section-title">New to the Fringe?</h2></div>
          <p className="lede">Shows run about an hour, start on time and are close together, so you can see three or four in one night.</p>
          <Link className="btn" to="/first-time">How the Fringe works</Link>
        </div>
      </section>
    </>
  );
}
