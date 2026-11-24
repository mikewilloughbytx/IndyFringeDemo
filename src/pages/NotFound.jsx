/* Custom 404 for any unknown route (nginx sends every path to index.html) */
import { Link } from "react-router-dom";
import { Treeline, usePageTitle } from "../components/common.jsx";

export default function NotFound() {
  usePageTitle("Page not found");
  return (
    <section className="lost" aria-labelledby="lost-title">
      <h1 id="lost-title" className="hero-banner">Lost in the woods</h1>
      <p className="hero-tagline">This page wandered off between shows.</p>
      <p>We couldn't find that page. It may have moved, or the link may be wrong.</p>
      <div className="hero-ctas">
        <Link className="btn btn-cta" to="/">Back to home</Link>
        <Link className="btn btn-ghost-light" to="/shows">Browse shows</Link>
        <Link className="btn btn-ghost-light" to="/schedule">See the schedule</Link>
      </div>
      <Treeline />
    </section>
  );
}
