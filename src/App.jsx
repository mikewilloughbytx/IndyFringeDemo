/* ==========================================================================
   Routes: one per required page (Deliverable 1.3) plus First Time and 404
   ========================================================================== */
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Shows from "./pages/Shows.jsx";
import ShowDetail from "./pages/ShowDetail.jsx";
import Schedule from "./pages/Schedule.jsx";
import Venues from "./pages/Venues.jsx";
import SignIn from "./pages/SignIn.jsx";
import MyReservations from "./pages/MyReservations.jsx";
import ReserveTickets from "./pages/ReserveTickets.jsx";
import About from "./pages/About.jsx";
import FirstTime from "./pages/FirstTime.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shows" element={<Shows />} />
        <Route path="shows/:showId" element={<ShowDetail />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="venues" element={<Venues />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="my-reservations" element={<MyReservations />} />
        <Route path="reserve" element={<ReserveTickets />} />
        <Route path="about" element={<About />} />
        <Route path="first-time" element={<FirstTime />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
