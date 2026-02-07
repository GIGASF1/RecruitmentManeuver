# Recruitment Maneuver

A specialty-specific physician recruiting platform built for **Pulmonary & Critical Care Medicine (PCCM)**. Track opportunities, score fit, compare offers, and make confident career decisions.

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **TailwindCSS** + **shadcn/ui** component library
- **Supabase** (Postgres + Auth + Row Level Security)
- **Zustand** for client-side state management
- **Zod** + **React Hook Form** for form validation
- **Lucide React** for icons

## Features (MVP)

### Public Pages
- Marketing home page with value prop and feature sections
- About, How It Works, and Pricing pages

### Authentication
- Email/password signup and login via Supabase Auth
- Protected routes with middleware-based redirects
- Auth callback handler for email confirmation

### Onboarding Wizard (7 steps)
1. **Basics** — Name, training level, years out, start date
2. **Geography** — Preferred states/cities, radius, relocation willingness
3. **Practice Model** — ICU model, call frequency, nocturnist/tele-ICU preferences
4. **Team Support** — Residents, fellows, APPs, RT coverage
5. **Compensation** — Base salary, RVU, bonuses, PTO, CME, malpractice
6. **Must-haves & Dealbreakers** — Free-text lists
7. **Priority Weights** — 0–10 sliders for 9 scoring categories

### Dashboard
- Pipeline summary cards (counts by stage)
- Active tasks list
- Rule-based recommended next actions

### Opportunities
- Filterable list view (search, stage, practice type)
- Comprehensive create/edit form with all PCCM-specific fields
- Multi-select for side-by-side comparison

### Opportunity Detail
- Tabbed view: Details, Fit Score, Notes & Tasks, AI Tools
- **Fit Score** — Deterministic 0–100 score with per-category breakdown
- Attach notes and tasks to specific opportunities
- Stage management (pipeline tracking)

### Compare
- Side-by-side comparison table for 2–4 opportunities
- Score breakdown comparison by category with visual bars
- Best-value highlighting for numeric fields

### Scoring Engine
- 9 weighted categories: Location, Schedule & Call, ICU Model, Team Support, Compensation, Culture, Growth & Leadership, Procedures, Research & Academics
- Each category produces 0–10 based on deterministic rules
- Weighted sum normalized to 0–100
- Dealbreaker detection
- Re-scorable when preferences change

### AI Hooks (Scaffolded)
- `generateInterviewQuestions()` — Mock interview questions
- `summarizeCallNotes()` — Mock note summarization
- `draftNegotiationEmail()` — Mock negotiation email
- UI buttons with "Preview" badges in opportunity detail

### Pricing / Stripe (Scaffolded)
- Pricing page with Passive (Free) and Active ($29/mo) tiers
- Placeholder Stripe integration in `src/lib/stripe.ts`

## Project Structure

```
src/
├── app/
│   ├── (app)/              # Protected app routes
│   │   ├── dashboard/
│   │   ├── opportunities/
│   │   │   ├── [id]/       # Detail page
│   │   │   └── new/        # Create form
│   │   ├── compare/
│   │   ├── onboarding/
│   │   └── settings/
│   ├── (auth)/             # Auth routes
│   │   ├── login/
│   │   ├── signup/
│   │   └── callback/
│   ├── (public)/           # Marketing pages
│   │   ├── about/
│   │   ├── how-it-works/
│   │   └── pricing/
│   ├── layout.tsx
│   ├── page.tsx            # Home/landing page
│   └── globals.css
├── components/
│   ├── layout/             # Navbar, sidebar, footer
│   ├── onboarding/         # 7 wizard step components
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── ai/                 # AI placeholder functions
│   ├── scoring/            # Fit scoring engine
│   ├── supabase/           # Client, server, middleware helpers
│   ├── constants.ts        # US states, procedures, ICU models, etc.
│   ├── stripe.ts           # Stripe placeholder
│   └── utils.ts
├── store/
│   └── app-store.ts        # Zustand store
├── types/
│   └── index.ts            # TypeScript types and constants
└── middleware.ts            # Auth middleware
supabase/
├── schema.sql              # Full database schema with RLS
└── seed.sql                # 3 sample opportunities
```

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### 1. Clone and install

```bash
cd RecruitmentManeuver
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the **SQL Editor** and run the contents of `supabase/schema.sql` to create all tables, RLS policies, and indexes
3. Go to **Authentication > Settings** and configure email confirmations (you can disable them for local development)

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Find these in your Supabase dashboard under **Settings > API**.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Seed sample data (optional)

After creating an account through the app:

1. Find your user UUID in Supabase dashboard under **Authentication > Users**
2. Open `supabase/seed.sql` and replace all `YOUR_USER_ID` with your UUID
3. Run the seed SQL in Supabase's SQL Editor

## Deployment (Vercel)

1. Push to a GitHub repository
2. Import the repo in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy — Vercel will auto-detect Next.js and configure the build

### Supabase Auth Callback URL

In your Supabase dashboard, go to **Authentication > URL Configuration** and add your deployment URL:
- Site URL: `https://your-app.vercel.app`
- Redirect URLs: `https://your-app.vercel.app/callback`

## Security

- All database tables have Row Level Security (RLS) enabled
- Users can only access their own data
- Auth tokens are managed via HTTP-only cookies (Supabase SSR)
- Middleware protects app routes from unauthenticated access
- No secrets are exposed to the client

## Future Roadmap

- [ ] AI-powered fit scoring via Claude API
- [ ] Interview question generation
- [ ] Negotiation email drafting
- [ ] Note summarization
- [ ] Stripe subscription integration
- [ ] Mobile-responsive improvements
- [ ] Export/share comparison reports
- [ ] Multi-specialty support
