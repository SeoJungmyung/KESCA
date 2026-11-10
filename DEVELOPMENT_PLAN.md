# KESCA Website — Development Plan

> **Read this first.** This is the single source of truth for building the KESCA website.
> Antigravity (or any developer) should follow this document for stack, folder structure,
> database, API, and features. If anything here conflicts with the sample mockup page,
> follow the decisions from the November 10, 2026 meeting listed in Section 10.

## 1. Project overview

- **Client:** KESCA — Kitchen Exhaust Systems Cleaners Association (volunteer project for Air Advocates; contact: Rob Sweet, info@airadvocates.net).
- **Goal:** A new public website for KESCA. Benchmark: IKECA (https://www.ikeca.org/) — keep a similar, trusted structure, but with a more modern design that is easier to use.
- **Approved:** November 10, 2026 meeting — Rob approved the structure and design ("pretty nice"). The homepage is built with the structure decided in that meeting (Section 10).
- **Proposal:** November 5, 2026 — JavaScript, React.js frontend, Node.js backend.
- **Monorepo:** one repository, two top-level projects: `frontend/` and `backend/`.

## 2. Tech stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend | React 18 + Vite | All component files use **`.js`** (no `.jsx` files). JSX syntax is used inside `.js` files — this is the standard way. |
| UI library | Ant Design (antd) 5.x | Use antd components first (Layout, Menu, Button, Card, Table, Form, Modal, Tabs, List, Breadcrumb, Grid). Custom CSS only when antd cannot do it. |
| Routing | react-router-dom v6 | See route table in Section 9. |
| HTTP | `fetch` (browser built-in) | No axios. One central client (`frontend/src/api/client.js`) used by every feature. |
| Backend | Node.js 20 LTS + Express 4.x | REST JSON API only. No server-rendered pages. |
| Database | MariaDB 10.11+ | Accessed only through Sequelize. Never write raw SQL in controllers. |
| ORM | Sequelize 6.x + sequelize-cli | Models, migrations, seeders. |
| Auth | JSON Web Token (jsonwebtoken) + bcrypt | Token check middleware (Section 7). |
| Dev tools | nodemon, ESLint, Prettier | Same style rules in both projects. |

## 3. Repository layout

```
KESCA/
├── DEVELOPMENT_PLAN.md        # this file
├── README.md                  # how to run the project (keep updated)
├── .gitignore                 # node_modules, .env, dist, build
├── frontend/                  # React app (Section 4)
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── public/                # logo, favicon, static images
│   └── src/
└── backend/                   # Express API (Section 5)
    ├── package.json
    ├── .env.example           # template only — never commit real .env
    └── src/
```

## 4. Frontend structure (React)

```
frontend/src/
├── index.js                   # entry: renders <App />
├── App.js                     # ConfigProvider (antd theme) + router
├── routes/
│   └── AppRoutes.js           # all routes (Section 9)
├── pages/                     # one folder per page
│   ├── Home/
│   │   ├── HomePage.js
│   │   ├── components/        # only used by Home (HeroVideo, Highlights, MapPreview)
│   │   └── HomePage.css
│   ├── About/
│   ├── Standards/
│   ├── Certification/
│   ├── Education/
│   ├── FindAPro/              # certified business directory + maps
│   ├── Events/
│   ├── Gallery/               # Before / After gallery
│   ├── Inquiry/               # customer inquiry board + form
│   ├── Contact/
│   ├── Verify/                # certificate verification
│   └── Admin/                 # login + content management
├── components/
│   ├── common/                # shared: TopBar, Header, Footer, Hero, SectionTitle,
│   │                          # BusinessCard, MapView, Loading, EmptyState
│   └── ...                    # feature components live under their page folder,
│                              # not here, unless shared by 2+ pages
├── api/
│   ├── client.js              # fetch wrapper: base URL from env, JSON, token header,
│   │                          # 401 handling, error normalization
│   ├── auth.js
│   ├── businesses.js
│   ├── certifications.js
│   ├── standards.js
│   ├── courses.js
│   ├── events.js
│   ├── gallery.js
│   └── inquiries.js
├── hooks/                     # useBusinesses, useEvents, useAuth, ...
├── context/
│   └── AuthContext.js         # logged-in user + token (localStorage)
├── utils/
│   ├── format.js              # dates, phone, province names
│   └── validation.js
└── styles/
    ├── theme.js               # antd ConfigProvider tokens (navy primary, large readable text)
    └── global.css
```

### Frontend rules

1. **File extension:** every React file is `.js`. Never create `.jsx` files.
2. **One component per file.** Component name = file name (PascalCase). One folder per page, one folder per feature.
3. **antd first:** always try antd components before writing custom markup/CSS. Theme (colors, font sizes) lives in `styles/theme.js` via `ConfigProvider`.
4. **All API calls go through `api/client.js`** (fetch, `async/await`). Components never call `fetch` directly and never hard-code the API URL — it comes from `VITE_API_URL` (`.env`).
5. **Errors:** the client returns a normalized error; pages show antd `message` / `Result` states, never a blank page.
6. **Mobile first:** every page is designed for a small screen first, then desktop. Large, plain, readable text (one of the "better than IKECA" points).

## 5. Backend structure (Express + Sequelize, MVC)

```
backend/src/
├── server.js                  # entry: starts app on PORT
├── app.js                     # express app: cors, json, routes, error handler
├── config/
│   ├── config.js              # env values: PORT, JWT_SECRET, CORS_ORIGIN
│   └── database.js            # Sequelize connection (MariaDB) from env
├── models/                    # M in MVC — Sequelize models only, no SQL here
│   ├── index.js               # creates Sequelize instance, loads models, associations
│   ├── User.js
│   ├── Business.js
│   ├── Certification.js
│   ├── Standard.js
│   ├── Course.js
│   ├── Enrollment.js
│   ├── Event.js
│   ├── GalleryItem.js
│   ├── Inquiry.js
│   ├── ContentPage.js         # editable page content (slug -> title/body)
│   └── Partner.js
├── controllers/               # C in MVC — request handling, calls services/models
│   ├── authController.js
│   ├── businessController.js
│   ├── certificationController.js
│   ├── standardController.js
│   ├── courseController.js
│   ├── eventController.js
│   ├── galleryController.js
│   ├── inquiryController.js
│   └── adminController.js
├── routes/                    # URL -> controller mapping + middleware
│   ├── authRoutes.js
│   ├── businessRoutes.js
│   ├── certificationRoutes.js
│   ├── standardRoutes.js
│   ├── courseRoutes.js
│   ├── eventRoutes.js
│   ├── galleryRoutes.js
│   ├── inquiryRoutes.js
│   └── adminRoutes.js
├── middlewares/
│   ├── auth.js                # verifies JWT token, attaches req.user (Section 7)
│   ├── adminOnly.js           # requires req.user.role === 'admin'
│   └── errorHandler.js        # single JSON error shape for the whole API
├── services/                  # business logic reused by controllers
│   ├── certificationService.js
│   ├── directoryService.js    # province filter, search, map data
│   └── mailService.js         # inquiry notification e-mail (stub first, wire later)
├── utils/
│   ├── pagination.js
│   ├── validate.js
│   └── upload.js              # image upload (gallery before/after photos)
└── views/                     # V in MVC — response serializers (JSON shapes)
    ├── businessView.js        # what a business object looks like in API responses
    ├── eventView.js
    └── ...                    # one serializer per resource
```

> **MVC note:** this is a JSON API, so there are no server-rendered HTML views.
> The `views/` folder holds response serializers that define exactly which fields
> each resource returns. Controllers never build response objects by hand.

### Backend rules

1. **Controllers are thin:** validate input, call services/models, return via a view serializer. No SQL in controllers.
2. **Models own the schema:** every table is a Sequelize model with validations; changes go through migrations (`npx sequelize-cli migration:generate`), never by hand-editing the database.
3. **One resource = one model + one controller + one route file** (same name).
4. **Errors:** all errors flow to `errorHandler.js` and return `{ "error": { "code", "message" } }` with the right HTTP status.

## 6. Database (MariaDB + Sequelize)

- Create the database once: `CREATE DATABASE kesca CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
- Connection lives only in `backend/src/config/database.js` and reads env vars
  (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`). No credentials in code.
- Seed data (Phase 1): 6 sample certified businesses across Ontario, 3 certification
  levels, a few standards, courses, events, and gallery items — so every page works
  before real data exists.

### Tables

| Table | Key columns |
|---|---|
| `users` | id, name, email (unique), password_hash, role (`admin` / `business` / `visitor`), created_at |
| `businesses` | id, name, province, city, address, latitude, longitude, phone, email, website, services, certified (boolean), certification_id (FK), created_at |
| `certifications` | id, name, level (`Technician` / `Supervisor` / `Inspector`), description |
| `standards` | id, title, body, category (`cleaning` / `inspection` / `maintenance`) |
| `courses` | id, title, level, description, price_cents, is_free (free course for owners), certification_id (FK) |
| `enrollments` | id, user_id (FK), course_id (FK), paid_by (`owner` / `employer`), status, completed_at |
| `events` | id, title, description, starts_at, ends_at, location, url |
| `gallery_items` | id, title, business_id (FK), before_image_url, after_image_url, latitude, longitude, kml_ref, created_at |
| `inquiries` | id, name, email, phone, message, status (`new` / `answered`), created_at |
| `content_pages` | id, slug (unique, e.g. `about`, `home-hero`), title, body |
| `partners` | id, name, url, logo_url |

## 7. Authentication (login + token middleware)

1. `POST /api/auth/register` — name, email, password (bcrypt hash, min 8 chars, role defaults to `visitor`).
2. `POST /api/auth/login` — email + password → on success returns `{ token, user }`.
   Token is a JWT signed with `JWT_SECRET`, `expiresIn: "7d"`, payload `{ userId, role }`.
3. **Middleware `middlewares/auth.js`** — every protected route uses it. It reads
   `Authorization: Bearer <token>`, verifies the JWT, loads the user, and sets
   `req.user`. Missing/invalid/expired token → `401`.
4. **Middleware `middlewares/adminOnly.js`** — runs after `auth.js`, allows only `role === 'admin'`.
5. Frontend: token in `localStorage`, attached by `api/client.js` on every request.
   `AuthContext` holds the logged-in user; `/admin/*` routes are protected and
   redirect to `/admin/login` when there is no valid token. On `401`, log out.

## 8. API endpoints

Base URL: `http://localhost:5000/api` in development (from `VITE_API_URL`).

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/auth/register` | — | create account |
| POST | `/auth/login` | — | log in, returns JWT |
| GET | `/auth/me` | token | current user |
| GET | `/businesses?province=&q=&certified=` | — | directory list (filter + search + pagination) |
| GET | `/businesses/:id` | — | one business |
| POST / PUT / DELETE | `/businesses[/:id]` | admin | manage directory |
| GET | `/businesses/map?type=certified\|licensed` | — | map pins (lat/lng) for the two maps |
| GET | `/certifications` | — | certification levels |
| GET | `/standards` | — | standards list (with linked courses) |
| GET | `/courses` | — | courses (free flag visible) |
| POST | `/courses/:id/enroll` | token | enroll in a course |
| GET | `/events` | — | upcoming events + news |
| GET | `/gallery` | — | Before/After items (with GPS) |
| POST | `/gallery` | admin | upload a Before/After item (images) |
| POST | `/inquiries` | — | public inquiry form (saved to DB) |
| GET | `/inquiries` | admin | inquiry board |
| GET | `/verify/:code` | — | verify a certificate |
| GET | `/content/:slug` | — | editable page content |
| PUT | `/content/:slug` | admin | edit page content |
| GET | `/partners` | — | partner links |

## 9. Pages / routes (frontend)

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Video hero → About → Education & Certification → small certified-business map → Contact Us |
| `/about` | About KESCA | who KESCA is, what it does |
| `/standards` | Standards | cleaning / inspection / maintenance standards; hover a standard → its courses and directory |
| `/certification` | Certification | 3 levels + 4-step path to get certified |
| `/education` | Education | courses, free course for owners, employee training |
| `/find-a-pro` | Find a Pro / Find certified companies | directory + two maps (certified locations, licensed contractors), province filter, search |
| `/events` | Events & News | upcoming events list |
| `/gallery` | Installation Gallery | Before/After photos with business + GPS |
| `/inquiry` | Customer Inquiry | form (saved) + inquiry board preview |
| `/contact` | Contact Us | contact form + details |
| `/verify` | Verify a Certificate | check a certificate code |
| `/admin/login` | Admin login | JWT login |
| `/admin` | Admin | edit content, businesses, courses, events, gallery, inquiries |

## 10. Decisions from the November 10, 2026 meeting (must follow)

These override the older proposal text and the sample mockup wherever they differ.

1. **Top bar:** remove the word **"Membership"** — "Find a Pro" covers it.
2. **Menu order:** **Find a Pro** sits between **Standards** and **Certification**.
3. **Top bar buttons:** **"Find certified companies"** and **"Get certified"**.
4. **Education button is required** — education is the biggest selling point.
5. **Consumer view:** the button that finds certified **restaurants** must stand out — ordinary visitors rarely click anything else.
6. **Two maps:** one for certified locations, one for licensed contractors.
7. **Standards:** hovering a standard shows related content (courses, directory).
8. **Gallery:** include it; it can connect to KML files (latitude/longitude, GPS positions).
9. **"Find a Pro" button** is currently hard to see — move it higher and make it prominent.
10. **Upcoming Events** is needed (public awareness).
11. **KESCA direction (not IKECA):** IKECA only sells membership/education and does not guarantee the cleaning was done. KESCA must actually enforce a **preventative maintenance code**. Before/After photos are the proof that grease was removed (they cannot be faked — GPS and time differ). Emphasize the economic payback of maintenance: saving electricity, saving repair costs, preventing food-poisoning lawsuits, reducing fire risk.
12. **Scope:** beyond kitchen exhaust — refrigeration and walk-in coolers, grease traps, dryer exhaust, bathroom exhaust, supply (make-up air) systems.
13. **Do not sell membership as the goal.** The goal is to gather industry people (even ~25) and set the industry standard; government will follow. Consumer demand for certified restaurants pushes uncertified ones to get certified.
14. **Rob's own logo and emailed content must be kept.** Do not replace them with new copy without asking Rob.
15. **Fonts:** Rob did not like the fonts chosen in the mockup — propose font options and let Rob choose, do not keep the mockup fonts as final.
16. **Video:** homepage opens with a short, high-quality, easy-to-understand video titled **"A video about The Dangers of Not Air Ventilating the Kitchen"** — it shows what KESCA does and sparks customers' interest. It is **not** a hero/ad video and **not** a documentary about hazardous substances. **The video itself is to be made and sent by Rob** — until it arrives, show the storyboard/placeholder, never a fake video.
17. **Partners:** clear links to Friendly Green Giant, Air Advocates, and Slumlord Patrol.

## 11. Features checklist

- [ ] Homepage in the Section 9 order, with the video area (placeholder until Rob sends the video)
- [ ] Certified business directory with province filter, search, and two maps
- [ ] Map pins from `latitude`/`longitude`; KML import for gallery/business locations
- [ ] Before/After gallery with image upload (admin) and GPS display
- [ ] Education & certification: 3 levels, 4-step path, free owner course, paid employee training, certificate verification
- [ ] Events & news (upcoming first)
- [ ] Inquiry form saved to DB + admin inquiry board
- [ ] Admin login (JWT) and content editing (pages, businesses, courses, events, gallery)
- [ ] Partner links; Contact page; responsive mobile-first layout; large readable text
- [ ] SEO basics: page titles, meta descriptions, semantic HTML

## 12. Coding conventions

- **`.js` only, never `.jsx`.** JSX syntax inside `.js` is standard and required.
- **One component per file**, PascalCase file names, one folder per page / feature / component group.
- **antd first** — prefer antd components; theme tokens in `frontend/src/styles/theme.js`.
- **fetch only** — all requests through `api/client.js`; `async/await`; central error handling.
- **Naming:** files `camelCase.js` for utils/hooks, `PascalCase.js` for components; API routes `kebab-case` plural nouns.
- **No secrets in git:** `.env` is git-ignored; only `.env.example` is committed. Never commit passwords, tokens, or JWT secrets.
- **Git:** work on feature branches (`feat/homepage`, `feat/directory`, `fix/auth`); small commits, English commit messages; `main` always runs.
- **Language:** code, comments, and user-facing site text are in **English** (plain, simple English — Rob is not computer-savvy). This plan is in English for the same reason.

## 13. Environment & running the project

Prerequisites: Node.js 20 LTS, npm, MariaDB 10.11+.

```bash
# database (run once)
mysql -u root -p -e "CREATE DATABASE kesca CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# backend
cd backend
cp .env.example .env          # then fill in DB_* and JWT_SECRET
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run dev                   # nodemon, http://localhost:5000, GET /api/health -> { ok: true }

# frontend (new terminal)
cd frontend
cp .env.example .env          # set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev                   # Vite, http://localhost:5173
```

`backend/.env.example`:

```
PORT=5000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=kesca
DB_PASSWORD=
DB_NAME=kesca
JWT_SECRET=
CORS_ORIGIN=http://localhost:5173
```

## 14. Development phases (work in this order)

1. **Phase 0 — Skeleton:** repo layout (Section 3), `package.json` files, `.gitignore`, `README.md`, `.env.example` files. Both apps start (`/api/health` OK, frontend shows "Hello KESCA").
2. **Phase 1 — Backend skeleton:** `config/database.js`, all models, migrations, seed data, auth (`register`/`login`/`me`), `auth.js` + `adminOnly.js` middleware, `errorHandler.js`.
3. **Phase 2 — Frontend skeleton:** Vite + React + antd, `ConfigProvider` theme, routing, layout (TopBar/Header/Footer), `api/client.js`, `AuthContext`.
4. **Phase 3 — Public pages:** Home (with video placeholder) → About → Standards → Certification → Education → Find a Pro → Events → Gallery → Inquiry → Contact → Verify.
5. **Phase 4 — Features:** directory filters + two maps, gallery upload, inquiry board, certificate verification, KML import.
6. **Phase 5 — Admin:** login, content editing, business/course/event/gallery/inquiry management.
7. **Phase 6 — Polish:** responsive check on phone + desktop, SEO, accessibility, no console errors, README updated, deploy prep.

## 15. Deployment (undecided — confirm with Rob first)

- Domain, hosting, and passwords are **not decided yet** (November 10: not discussed).
  **Do not buy a domain or hosting, and do not deploy to a public URL, before Rob confirms.**
- Suggested shape (for discussion, not a decision): frontend as a static build; backend as one Node.js service; MariaDB managed or self-hosted. Keep `VITE_API_URL` configurable so the frontend can point at any backend host.

## 16. Definition of done

- Every route in Section 9 renders without errors; API endpoints in Section 8 return the documented shapes.
- Admin routes reject requests without a valid token; the frontend redirects to login.
- Maps show real pins from the database; directory filters work; inquiry form saves and appears in the admin board.
- The site is usable on a phone (single column, readable text, no horizontal scroll).
- `README.md` explains setup in under 10 steps.

## 17. References

- Sample mockup page (design reference only, not the real site):
  https://muse.ai/s/kesca-sample-page-xvu6cuaxfxm5xwxp/tyLMN36Sa9xtSMwm7zAS8H0xYC9F0pzTByfZWwgaSK8
- IKECA benchmark: https://www.ikeca.org/
- Proposal sent November 5, 2026 (React.js frontend, Node.js backend).
- Meeting notes: November 3, November 8, November 10, 2026 (structure, top-bar, and direction decisions).
- Contact: Rob Sweet, Air Advocates, info@airadvocates.net.
