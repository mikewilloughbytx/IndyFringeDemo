/* ==========================================================================
   Layout: skip link, header with responsive nav, page outlet, footer
   ========================================================================== */
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { VENUE_STYLE } from "../lib/festival.js";
import VenueChip from "./VenueChip.jsx";

const NAV_LINKS = [
  { to: "/shows", label: "Shows" },
  { to: "/schedule", label: "Schedule" },
  { to: "/venues", label: "Venues" },
  { to: "/first-time", label: "First time?" },
  { to: "/about", label: "About" },
  // Sign-in isn't functional until 1.7, so both links show for now (WEB-2.1.1)
  { to: "/signin", label: "Sign in" },
  { to: "/my-reservations", label: "My reservations" }
];

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu and return to the top on every page change
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="IndyFringe 2027, August 12–22, 2027, home">
          <span className="brand-mark">IndyFringe</span><span className="brand-year">2027</span>
          <span className="brand-dates">· August 12–22, 2027</span>
        </Link>
        <button className="menu-toggle" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(o => !o)}>
          <span className="menu-bars" aria-hidden="true"></span><span className="menu-label">Menu</span>
        </button>
        <nav id="primary-nav" className={`primary-nav${open ? " is-open" : ""}`} aria-label="Main">
          <ul>
            {NAV_LINKS.map(l => <li key={l.to}><NavLink to={l.to}>{l.label}</NavLink></li>)}
            <li><Link className="btn btn-cta" to="/reserve">Reserve tickets</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">IndyFringe 2027</p>
          <p>Thursday, August 12 – Sunday, August 22, 2027<br />Mass Ave Cultural District, Indianapolis</p>
          <p><Link to="/reserve">Reserve tickets</Link> · <Link to="/schedule">Full schedule</Link> · <Link to="/about">Contact</Link></p>
        </div>
        <div>
          <p className="footer-heading">Six stages</p>
          <ul className="footer-venues">
            {Object.keys(VENUE_STYLE).map(id => <li key={id}><VenueChip venueId={id} /></li>)}
          </ul>
        </div>
      </div>
      <div className="container footer-note">
        <p>A fictional class project by TechWave Solutions (DevOps Group 9, Purdue MIS 58710). Show and venue details come from the public 2026 IndyFringe program. Not affiliated with or endorsed by IndyFringe. No tickets are sold or saved.</p>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <Header />
      <main id="main" tabIndex={-1}><Outlet /></main>
      <Footer />
    </>
  );
}
