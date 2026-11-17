/* Sign in: form layout only. JWT sign-in arrives in Deliverable 1.7. */
import { useNavigate } from "react-router-dom";
import { PageHeader, usePageTitle } from "../components/common.jsx";

export default function SignIn() {
  usePageTitle("Sign in");
  const navigate = useNavigate();

  return (
    <div className="container">
      <PageHeader eyebrow="Patrons" title="Sign in">Sign in to see your reservations and reserve tickets.</PageHeader>
      <div className="two-col">
        <form className="form-card" noValidate onSubmit={e => { e.preventDefault(); navigate("/my-reservations"); }}>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="patron@example.com" />
          </div>
          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" />
          </div>
          <p className="form-error" role="alert"></p>
          <button className="btn btn-cta" type="submit">Sign in</button>
          <p className="hint" style={{ marginTop: "1rem" }}>Preview only: this button opens the sample My Reservations page. Nothing is checked or sent.</p>
        </form>
        <div className="placeholder-box">
          <p><strong>No account needed to browse.</strong> Shows, the schedule and the venue guide are open to everyone.</p>
          <p>Test patron accounts come from the synthetic <code>patrons</code> table and will be listed in the README, not on this page.</p>
        </div>
      </div>
    </div>
  );
}
