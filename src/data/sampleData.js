/* ==========================================================================
   Sample data for the IndyFringe 2027 template
   --------------------------------------------------------------------------
   Every object uses the same field names as the BigQuery tables in the
   `theater_festival` dataset, so Deliverable 1.7 only has to swap these
   arrays for fetch() calls to the festival API (see src/api/festivalApi.js).

   Source: the 2026 IndyFringe program, with dates moved forward to
   Aug 12–22, 2027. Values marked PLACEHOLDER are not in the program
   (capacity, runtime, coordinates, seats_reserved) and will come from
   BigQuery.
   ========================================================================== */

/* ---------- venues ---------- */
export const venues = [
    {
      venue_id: "VEN-001",
      name: "The Basile Theatre at IF",
      address: "719 E. St. Clair St.", city: "Indianapolis", state: "IN", zip_code: "46202",
      capacity: 120, /* PLACEHOLDER */
      accessibility_notes: "Fully accessible through the primary entrance.",
      parking: "Bottleworks Garage is the largest nearby; more spaces at Goodies & Giggles or on Fulton & Davidson St.",
      blurb: "The festival's most historic space: a 1908 church turned flexible theatre and home of IF Theatre's Spotlight Season.",
      latitude: 39.7774, longitude: -86.1462 /* PLACEHOLDER */
    },
    {
      venue_id: "VEN-002",
      name: "The Barnes & Thornburg Blackbox at IF",
      address: "719 E. St. Clair St.", city: "Indianapolis", state: "IN", zip_code: "46202",
      capacity: 62,
      accessibility_notes: "Fully accessible through the primary entrance.",
      parking: "Bottleworks Garage is the largest nearby; more spaces at Goodies & Giggles or on Fulton & Davidson St.",
      blurb: "An intimate 62-seat theatre and IF Theatre's education center.",
      latitude: 39.7774, longitude: -86.1460 /* PLACEHOLDER */
    },
    {
      venue_id: "VEN-003",
      name: "The District Mainstage",
      address: "627 Massachusetts Ave.", city: "Indianapolis", state: "IN", zip_code: "46204",
      capacity: 150, /* PLACEHOLDER */
      accessibility_notes: "Accessible by ramp; limited wheelchair space.",
      parking: "Street parking out front; lots at Block 20 and Penrose on Mass within two blocks.",
      blurb: "Formerly Theatre on the Square, with the district's only permanent raked seating.",
      latitude: 39.7740, longitude: -86.1514 /* PLACEHOLDER */
    },
    {
      venue_id: "VEN-004",
      name: "The District Cabaret (Brian Payne Theatre)",
      address: "627 Massachusetts Ave.", city: "Indianapolis", state: "IN", zip_code: "46204",
      capacity: 70, /* PLACEHOLDER */
      accessibility_notes: "Accessible by ramp and an alternate entrance to the performance space.",
      parking: "Street parking out front; lots at Block 20 and Penrose on Mass within two blocks.",
      blurb: "An intimate storytelling and cabaret room, with an art gallery in the lobby.",
      latitude: 39.7741, longitude: -86.1515 /* PLACEHOLDER */
    },
    {
      venue_id: "VEN-005",
      name: "The Athenaeum Basile Theatre",
      address: "401 E. Michigan St.", city: "Indianapolis", state: "IN", zip_code: "46204",
      capacity: 200, /* PLACEHOLDER */
      accessibility_notes: "Accessible by the elevator entrance at The Rathskeller.",
      parking: "Street parking out front; lots at Block 20 and Penrose on Mass within one block.",
      blurb: "A second-floor theatre in a national historic landmark, original home of the IRT.",
      latitude: 39.7742, longitude: -86.1513 /* PLACEHOLDER */
    },
    {
      venue_id: "VEN-006",
      name: "The Arabian Room at the Murat Shrine",
      address: "502 N. New Jersey St.", city: "Indianapolis", state: "IN", zip_code: "46204",
      capacity: 180, /* PLACEHOLDER */
      accessibility_notes: "Fully accessible; elevator to the second floor just past the restaurant.",
      parking: "Garages at Penrose on Mass and Block 20; more in the Old National Centre lot.",
      blurb: "An elevated room with mixed auditorium and cabaret seating. Enter on the north side, under the mosaic.",
      latitude: 39.7757, longitude: -86.1520 /* PLACEHOLDER */
    }
  ];

  /* ---------- companies ---------- */
  export const companies = [
    { company_id: "CO-001", name: "Disgusting Brothers Company", hometown: "Indianapolis, IN", website: "", description: "" },
    { company_id: "CO-002", name: "Stagequest", hometown: "Indianapolis, IN", website: "", description: "" },
    { company_id: "CO-003", name: "Blue Circus", hometown: "West Lafayette, IN", website: "", description: "" },
    { company_id: "CO-004", name: "Elle Tyler", hometown: "Indianapolis, IN", website: "", description: "" },
    { company_id: "CO-005", name: "Catalyst Repertory", hometown: "Indianapolis, IN", website: "", description: "" },
    { company_id: "CO-006", name: "Dr. Adam Henze", hometown: "Indianapolis, IN", website: "", description: "" },
    { company_id: "CO-007", name: "John Courtney", hometown: "Indianapolis, IN", website: "", description: "" },
    { company_id: "CO-008", name: "Bryan G. Ball", hometown: "Indianapolis, IN", website: "", description: "" },
    { company_id: "CO-009", name: "Player 2 Productions", hometown: "Indianapolis, IN", website: "", description: "" },
    { company_id: "CO-010", name: "Timothy Mooney Repertory Co.", hometown: "Imlay City, MI", website: "", description: "" }
  ];

  /* ---------- shows (runtime_minutes and ticket_price are PLACEHOLDERS) ---------- */
  export const shows = [
    { show_id: "SHW-001", title: "A Bed of Thorns", company_id: "CO-001", genre: "Drama", runtime_minutes: 60, age_rating: "13+", ticket_price: 22,
      content_warnings: "Physical violence, adult language",
      description: "Anne, dutiful daughter to the respectable Fairfaxes, is sleepwalking through life when a beguiling stranger interrupts the tedium. A Gothic spin on a classic fairytale." },
    { show_id: "SHW-002", title: "A New World Coming: Conversations with Cass Elliot", company_id: "CO-002", genre: "Musical", runtime_minutes: 60, age_rating: "13+", ticket_price: 22,
      content_warnings: "Adult/sexual language, drug use, smoke/haze",
      description: "Mama Cass returns for one final, no-holds-barred concert, armed with 52 years of hindsight. A trippy talk-show and rock revival." },
    { show_id: "SHW-003", title: "Are You Gayer Than a Straight Guy?", company_id: "CO-003", genre: "Comedy", runtime_minutes: 50, age_rating: "16+", ticket_price: 22,
      content_warnings: "Adult/sexual language",
      description: "A prideful love letter to game shows and queer culture: community members battle a token straight man in a trivia game of LGBTQ+ history." },
    { show_id: "SHW-004", title: "Female Troubles", company_id: "CO-004", genre: "Musical", runtime_minutes: 55, age_rating: "13+", ticket_price: 22,
      content_warnings: "Adult language",
      description: "Welcome to the metaphysical dry cleaners, where women drop off their troubles for a while. An original musical comedy cabaret." },
    { show_id: "SHW-005", title: "LOLCow", company_id: "CO-005", genre: "Drama", runtime_minutes: 60, age_rating: "16+", ticket_price: 22,
      content_warnings: "Adult language, drug use, physical violence, self harm, flashing lights, smoke/haze",
      description: "A YouTube commentator who prides himself on his trolling rules faces a scandal that exposes the flaws in having rules online." },
    { show_id: "SHW-006", title: "Call of the Void", company_id: "CO-006", genre: "Experimental", runtime_minutes: 50, age_rating: "13+", ticket_price: 22,
      content_warnings: "Adult language, mature themes concerning mental health",
      description: "An embodied remix of poetry, prose and drama about literacy, prison education and the toxic stress teachers face." },
    { show_id: "SHW-007", title: "Father Johnny: I Swear to God", company_id: "CO-007", genre: "Comedy", runtime_minutes: 55, age_rating: "18+", ticket_price: 22,
      content_warnings: "Sexual/adult language",
      description: "Having heard every confession imaginable, Fr. Johnny has material: sharp, observational stand-up from a man of the cloth." },
    { show_id: "SHW-008", title: "Black Obsidian", company_id: "CO-008", genre: "Drama", runtime_minutes: 60, age_rating: "16+", ticket_price: 22,
      content_warnings: "Adult language, flashing lights, depictions of drug use and homophobia",
      description: "A young man grapples with loss, secrecy and societal expectations after the death of his parents." },
    { show_id: "SHW-009", title: "Boy Meets Musical", company_id: "CO-009", genre: "Musical", runtime_minutes: 60, age_rating: "13+", ticket_price: 22,
      content_warnings: "Adult language",
      description: "What happens when 90s sitcom heartthrobs jump from their perfect TV lives into the real world?" },
    { show_id: "SHW-010", title: "Breakneck Midsummer Night's Dream", company_id: "CO-010", genre: "Family", runtime_minutes: 60, age_rating: "All Ages", ticket_price: 22,
      content_warnings: "",
      description: "Shakespeare's beloved comedy as a one-hour romp by just six people. PLACEHOLDER: genre and rating adjusted to demo the Family Friendly filter." }
  ];

  /* ---------- performances (2026 program dates moved to 2027; seats_reserved is PLACEHOLDER) ---------- */
  const perf = (id, show, venue, date, time, reserved, status) => ({
    performance_id: id, show_id: show, venue_id: venue,
    performance_date: date, start_time: time, seats_reserved: reserved, status: status || "scheduled"
  });
  export const performances = [
    perf("PRF-0001", "SHW-002", "VEN-001", "2027-08-12", "20:00", 64),
    perf("PRF-0002", "SHW-009", "VEN-003", "2027-08-12", "20:00", 90),
    perf("PRF-0003", "SHW-004", "VEN-001", "2027-08-13", "20:00", 70),
    perf("PRF-0004", "SHW-006", "VEN-002", "2027-08-13", "18:30", 50),
    perf("PRF-0005", "SHW-008", "VEN-003", "2027-08-13", "18:30", 150, "sold_out"),
    perf("PRF-0006", "SHW-005", "VEN-001", "2027-08-13", "21:30", 30),
    perf("PRF-0007", "SHW-010", "VEN-005", "2027-08-13", "18:30", 40),
    perf("PRF-0008", "SHW-007", "VEN-004", "2027-08-13", "21:30", 55),
    perf("PRF-0009", "SHW-001", "VEN-001", "2027-08-14", "12:30", 20),
    perf("PRF-0010", "SHW-003", "VEN-001", "2027-08-14", "18:30", 101),
    perf("PRF-0011", "SHW-007", "VEN-002", "2027-08-14", "20:00", 61),
    perf("PRF-0012", "SHW-009", "VEN-003", "2027-08-14", "21:30", 75),
    perf("PRF-0013", "SHW-010", "VEN-006", "2027-08-14", "11:00", 60),
    perf("PRF-0014", "SHW-006", "VEN-004", "2027-08-14", "15:30", 0, "cancelled"),
    perf("PRF-0015", "SHW-001", "VEN-001", "2027-08-15", "20:00", 44),
    perf("PRF-0016", "SHW-004", "VEN-001", "2027-08-15", "14:00", 80),
    perf("PRF-0017", "SHW-008", "VEN-003", "2027-08-15", "18:30", 99),
    perf("PRF-0018", "SHW-002", "VEN-005", "2027-08-15", "17:00", 120),
    perf("PRF-0019", "SHW-001", "VEN-001", "2027-08-21", "17:00", 35),
    perf("PRF-0020", "SHW-005", "VEN-002", "2027-08-22", "20:00", 12)
  ];

  /* ---------- synthetic patron + reservation history (for My Reservations) ---------- */
  export const patron = { patron_id: "PAT-00001", email: "patron@example.com", first_name: "Jordan", last_name: "Rivera", favorite_genre: "Comedy" };
  export const reservations = [
    { reservation_id: "RSV-000101", patron_id: "PAT-00001", performance_id: "PRF-0003", quantity: 2, reserved_at: "2027-07-02T14:10:00Z", status: "confirmed", accessibility_request: "" },
    { reservation_id: "RSV-000102", patron_id: "PAT-00001", performance_id: "PRF-0011", quantity: 4, reserved_at: "2027-07-05T09:30:00Z", status: "confirmed", accessibility_request: "Aisle seat, please" },
    { reservation_id: "RSV-000103", patron_id: "PAT-00001", performance_id: "PRF-0014", quantity: 1, reserved_at: "2027-07-08T19:45:00Z", status: "cancelled", accessibility_request: "" }
  ];
