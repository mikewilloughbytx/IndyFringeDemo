/* First Time at the Fringe (WEB-2.1.3): draft copy owned by the Product Owner */
import { Link } from "react-router-dom";
import { PageHeader, usePageTitle } from "../components/common.jsx";

const STEPS = [
  ["Pick a few shows", "Most shows run under an hour. Browse by genre, day or venue, or turn on Family friendly."],
  ["Reserve your seats", "Reservations are free. Choose a performance and up to 6 tickets."],
  ["Arrive early", "Shows start on time and doors close once they begin. Check the venue guide for parking and accessible entrances."],
  ["Walk to the next one", "All six stages are a short walk apart, so seeing three or four shows in one night is easy."]
];

export default function FirstTime() {
  usePageTitle("First time at the Fringe");
  return (
    <div className="container">
      <PageHeader eyebrow="WEB-2.1.3 · draft copy" title="First time at the Fringe?">Here's how a night at the Fringe works.</PageHeader>
      <div className="prose">
        <ol className="steps">
          {STEPS.map(([title, body]) => (
            <li key={title}><div><h2 style={{ marginTop: 0 }}>{title}</h2><p>{body}</p></div></li>
          ))}
        </ol>
        <p><Link className="btn btn-cta" to="/schedule">See the schedule</Link></p>
      </div>
    </div>
  );
}
