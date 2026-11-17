/* ==========================================================================
   Small shared components: page title hook, status label, empty and
   loading states, page header, decorative hero art
   ========================================================================== */
import { useEffect } from "react";
import { plural, seatsAvailable } from "../lib/festival.js";
import treeline from "../assets/treeline.svg";

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · IndyFringe 2027` : "IndyFringe 2027 · August 12–22, Indianapolis";
  }, [title]);
}

export function StatusLabel({ performance, venue }) {
  if (performance.status === "sold_out") return <span className="status status-soldout">Sold out</span>;
  if (performance.status === "cancelled") return <span className="status status-cancelled">Cancelled</span>;
  return <span className="status">{plural(seatsAvailable(performance, venue), "seat")} left</span>;
}

export function EmptyState({ title, children }) {
  return (
    <div className="empty">
      <p className="empty-title">{title}</p>
      {children}
    </div>
  );
}

/* Loading and error states for every data-driven page (WEB-2.1.5) */
export function DataGate({ loading, error, children }) {
  if (error) return <EmptyState title="Something went wrong"><p>We couldn't load the festival program. Refresh the page or try again in a minute.</p></EmptyState>;
  if (loading) return <p className="result-count" role="status">Loading the program…</p>;
  return children;
}

export function PageHeader({ eyebrow, title, children }) {
  return (
    <header className="page-header">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="page-title">{title}</h1>
      {children && <p className="lede">{children}</p>}
    </header>
  );
}

const BULBS = [[50,20],[130,32],[210,28],[290,12],[370,22],[450,31],[530,22],[610,11],[690,22],[770,31],[850,22],[930,11],[1010,22],[1090,30],[1170,14]];
export function StringLights() {
  return (
    <svg className="lights" viewBox="0 0 1200 56" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 6 Q150 50 300 10 T600 10 T900 10 T1200 6" stroke="#6b6450" strokeWidth="2" fill="none" />
      <g fill="#f8dc84">{BULBS.map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="6" />)}</g>
    </svg>
  );
}

export function Treeline() {
  return <img className="treeline" src={treeline} alt="" />;
}
