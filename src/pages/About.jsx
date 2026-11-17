/* About: festival story and contact (placeholder copy for the Product Owner) */
import { PageHeader, usePageTitle } from "../components/common.jsx";

export default function About() {
  usePageTitle("About");
  return (
    <div className="container">
      <PageHeader eyebrow="About the festival" title="Our story" />
      <div className="prose">
        <p className="lede">IndyFringe is Indianapolis's annual fringe theatre festival: dozens of productions from local, national and international artists across six stages in the Mass Ave Cultural District.</p>
        <p>Fringe festivals began in Edinburgh in 1947, when eight companies showed up uninvited and performed on the edges, or fringe, of the official festival. The idea spread around the world: open, affordable and unjuried, so new voices get a stage.</p>
        <p>PLACEHOLDER: the Product Owner will replace this section with final copy about the 2027 festival.</p>

        <h2>Contact</h2>
        <p>PLACEHOLDER contact details for the fictional 2027 festival:</p>
        <ul>
          <li>Box office: 719 E. St. Clair St., Indianapolis, IN 46202</li>
          <li>Email: <a href="mailto:boxoffice@example.com">boxoffice@example.com</a></li>
          <li>Phone: (317) 555-0100</li>
        </ul>

        <h2>About this site</h2>
        <p>This site is a fictional class project built by TechWave Solutions (DevOps Group 9) for Purdue MIS 58710. It uses public details from the 2026 IndyFringe program, with dates moved to 2027. It is not affiliated with IndyFringe, and no tickets are sold or saved.</p>
      </div>
    </div>
  );
}
