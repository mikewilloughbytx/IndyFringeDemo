/* Ticket-stub show card. The stub takes the color of the show's first venue. */
import { Link } from "react-router-dom";
import { isFamilyFriendly, venueStyle } from "../lib/festival.js";
import VenueChip from "./VenueChip.jsx";

export default function ShowCard({ show, company, firstPerformance, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  const venueId = firstPerformance?.venue_id;
  return (
    <article className="ticket">
      <div className={`ticket-stub v${venueId ? venueStyle(venueId).n : 0}`}>
        <span className="stub-rating">{show.age_rating}</span>
        <span className="stub-label">{show.runtime_minutes} min</span>
      </div>
      <div className="ticket-body">
        <Heading className="ticket-title"><Link to={`/shows/${show.show_id}`}>{show.title}</Link></Heading>
        {company && <p className="ticket-company">{company.name} · {company.hometown}</p>}
        <p className="ticket-meta">
          <span className="genre-tag">{show.genre}</span>
          {isFamilyFriendly(show) && <span className="genre-tag family">Family friendly</span>}
        </p>
        {venueId && <p className="ticket-venue"><VenueChip venueId={venueId} /></p>}
      </div>
    </article>
  );
}
