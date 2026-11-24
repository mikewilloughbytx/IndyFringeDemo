/* ==========================================================================
   Data access layer
   --------------------------------------------------------------------------
   Pages never import sample data directly; they call useFestivalData().
   Deliverable 1.3: returns the sample data in src/data/sampleData.js.
   Deliverable 1.7: set VITE_API_BASE_URL and replace loadFestival() with
   fetch() calls to the festival API (/api/v1/venues, /shows, ...).
   ========================================================================== */
import { useEffect, useMemo, useState } from "react";
import * as sample from "../data/sampleData.js";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function loadFestival() {
  // TODO (1.7): if API_BASE_URL is set, fetch each collection from the API.
  return {
    venues: sample.venues,
    companies: sample.companies,
    shows: sample.shows,
    performances: sample.performances,
    patron: sample.patron,
    reservations: sample.reservations
  };
}

/* Loads everything once and adds id lookups, so pages can join
   performances → shows → venues the same way the SQL will. */
export function useFestivalData() {
  const [state, setState] = useState({ data: null, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    loadFestival()
      .then(data => alive && setState({ data, error: null }))
      .catch(error => {
        // Details go to the console for developers; visitors see a friendly message (WEB-2.1.5)
        console.error("Could not load festival data", error);
        if (alive) setState({ data: null, error });
      });
    return () => { alive = false; };
  }, [attempt]);

  // Called by the Retry button: show the loading state again, then reload
  const retry = () => { setState({ data: null, error: null }); setAttempt(a => a + 1); };

  const lookups = useMemo(() => {
    if (!state.data) return null;
    const index = (list, key) => Object.fromEntries(list.map(x => [x[key], x]));
    return {
      venueById: index(state.data.venues, "venue_id"),
      showById: index(state.data.shows, "show_id"),
      companyById: index(state.data.companies, "company_id"),
      performanceById: index(state.data.performances, "performance_id")
    };
  }, [state.data]);

  return {
    loading: !state.data && !state.error,
    error: state.error,
    retry,
    ...(state.data || {}),
    ...(lookups || {})
  };
}
