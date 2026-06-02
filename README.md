# Client Task Manager

Client Task Manager is a small client-ready task management app built with Next.js, TypeScript, Tailwind CSS, and Supabase. It supports email/password authentication, a protected dashboard, and per-user task data protected by Supabase Row Level Security.

## Features

- Public home page with login and signup links
- Email/password signup, login, logout, password reset, and update password screens
- Protected dashboard at `/protected`
- Create, edit, delete, and filter tasks
- Task fields for title, description, status, due date, and created date
- User-specific task ownership through `user_id`
- Supabase RLS policies so users can only access their own task rows
- GitHub Actions CI for lint and production build checks
- Vercel-ready deployment workflow

## Tech Stack

- Next.js 16.2.6 with App Router
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase managed PostgreSQL
- Supabase Row Level Security
- Vercel
- GitHub Actions

## Local Setup

Install dependencies:

```bash
npm ci
```

Create your local environment file:

```bash
copy .env.example .env.local
```

Add your Supabase values to `.env.local`.

Run the development server:

```bash
npm run dev
```

On Windows PowerShell, use this if script execution blocks `npm`:

```bash
npm.cmd run dev
```

Open `http://localhost:3000`.

## Environment Variables

The app uses these public Supabase browser variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Use values from Supabase Dashboard > Project Settings > API. Keep `.env.local` private and never commit it. Do not use a Supabase `service_role` key in this frontend app.

## Supabase Overview

Supabase provides authentication and the PostgreSQL database. The `tasks` table stores task records and includes a `user_id` column linked to the authenticated user.

Run `database/schema.sql` in the Supabase SQL Editor to create the table, indexes, and RLS policies. RLS must stay enabled so users can only select, insert, update, and delete rows where `auth.uid() = user_id`.

## Available Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

- `dev`: starts the local development server
- `lint`: runs ESLint
- `build`: creates a production build
- `start`: starts the production server after a build

## Deployment Summary

Deployment target is Vercel. Push the project to GitHub, confirm GitHub Actions passes on `main`, import the repository into Vercel, add the Supabase environment variables, and deploy with Vercel's Next.js auto-detection.

Full deployment steps are in `DEPLOYMENT.md`.

## Folder Structure Summary

```text
client-task-manager/
|-- app/                       # Next.js App Router pages and auth routes
|-- components/                # UI, auth, and task components
|-- lib/                       # Supabase clients, utilities, shared types
|-- database/schema.sql        # Supabase table and RLS setup
|-- .github/workflows/ci.yml   # GitHub Actions CI
|-- .env.example               # Safe environment variable placeholders
|-- README.md                  # Project overview
|-- DEPLOYMENT.md              # Vercel deployment guide
|-- HANDOVER.md                # Client handover guide
`-- MAINTENANCE.md             # Maintenance guide
```

## Common Troubleshooting

- Login redirects fail: check Supabase Auth URL Configuration.
- Build fails in Vercel: confirm Supabase env vars are set in Vercel and redeploy.
- User cannot see tasks: confirm RLS policies are active and `tasks.user_id` matches the authenticated user.
- PowerShell blocks `npm`: use `npm.cmd run dev`, `npm.cmd run lint`, or `npm.cmd run build`.
