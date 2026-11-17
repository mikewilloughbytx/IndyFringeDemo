# festival-website

The public website for the fictional **IndyFringe 2027** festival (Aug 12–22, 2027), built by TechWave Solutions, DevOps Group 9, for Purdue MIS 58710. Patrons browse shows, the schedule and venues, sign in, and reserve tickets. Nothing is purchased and new reservations are not saved.

> Status: Deliverable 1.3 scaffold. Every page uses sample data from `src/data/sampleData.js`. Deliverable 1.7 connects it to `festival-api`.

## Team

| Member | Role | Website responsibilities |
|---|---|---|
| Mike Willoughby | Product Owner, developer | Venue Directory (F2.3), First Time page copy, reviews F2.1–F2.2 |
| Kiran Tamvada | Scrum Master, developer | Website pipeline and Cloud Run deployment |
| Eric Rodgers | Developer (API lead) | API the site will call in 1.7 |
| Hunter Janssen | Developer (Website lead) | Website Foundation (F2.1), Show & Schedule Browsing (F2.2) |

## Live site

- Website: _TODO: Cloud Run URL after the first pipeline deploy_
- Internal team demo (not graded): Netlify, built from GitHub `mikewilloughbytx/IndyFringeDemo` using `netlify.toml`. _TODO: add the Netlify URL._
- API: _TODO: festival-api Cloud Run URL_

## Run it locally

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

Open http://localhost:5173.

To use the real API instead of sample data (Deliverable 1.7), copy `.env.example` to `.env.local` and set `VITE_API_BASE_URL`.

To check the production build:

```bash
npm run build
npm run preview
```

## How the code is organized

| Path | What it holds |
|---|---|
| `src/App.jsx` | One route per page |
| `src/components/Layout.jsx` | Header, responsive nav, footer |
| `src/api/festivalApi.js` | The only place pages get data from; swap sample data for API calls here |
| `src/data/sampleData.js` | Sample rows with the same field names as the BigQuery tables |
| `src/lib/festival.js` | Venue colors, family-friendly rule, seats available, date and time formatting |
| `src/pages/` | Home, Shows, Show detail, Schedule, Venues, Sign in, My reservations, Reserve tickets, About, First time, 404 |
| `src/styles.css` | All styles, mobile first |

### Design

The look borrows from the printed 2026 program: paper-and-ink ticket stubs for most pages, a night-woods hero with string lights on Home, and a dusk-colored, color-coded grid on Schedule. Each venue has its own color (set in `src/lib/festival.js` and `src/styles.css`), and the venue name always appears next to it. No IndyFringe logos or artwork are used.

## Tests

_TODO: add the automated check the pipeline runs before deploying (Deliverable 1.3)._

## Deployment

_TODO (Deliverable 1.3): Dockerfile (build with Node, serve `dist/` with nginx, sending unknown paths to `index.html` so the React 404 page works), `.gitlab-ci.yml`, and Workload Identity Federation. Name the service account the pipeline acts as here._

## Test credentials

Test patrons come from the synthetic `patrons` table. _TODO: list the test accounts here in Deliverable 1.7. Never put real secrets in this file._
