# Deployment Guide

Deployment target: Vercel only.

This project does not use Docker, Docker Compose, Kubernetes, Helm, VPS deployment, Railway, Render, or container deployment.

## Project Links

- Production URL: https://client-task-manager-omega.vercel.app/
- GitHub Repo: [Tatheer-Za-ra/client-task-manager](https://github.com/Tatheer-Za-ra/client-task-manager)
- Supabase Project: https://supabase.com/dashboard/project/ztzhkqzwrjjehocgoigx

## GitHub Repository Preparation

1. Confirm `.env.local` is not committed.
2. Confirm `.env.example` contains placeholders only.
3. Confirm `database/schema.sql` is committed.
4. Confirm `.github/workflows/ci.yml` is committed.
5. Run checks locally:

```bash
npm run lint
npm run build
```

6. Push the project to the `main` branch.
7. Confirm GitHub Actions CI passes.

## GitHub Actions CI

The CI workflow runs on pushes and pull requests to `main`.

It runs:

```bash
npm ci
npm run lint
npm run build
```

Do not deploy or merge client-facing changes if CI is failing.

## Required Vercel Environment Variables

Add these in Vercel Project Settings > Environment Variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Use the production Supabase project values. Do not add a Supabase `service_role` key to Vercel for this frontend app.

## Vercel Import Steps

1. Open Vercel.
2. Choose Add New > Project.
3. Import the GitHub repository.
4. Select the `client-task-manager` project root if Vercel asks.
5. Keep Framework Preset as Next.js.
6. Install command: `npm ci` or `npm install`.
7. Build command: `npm run build`.
8. Output settings: no manual output directory is needed. Vercel auto-detects Next.js.
9. Add the required Supabase environment variables.
10. Click Deploy.

## Supabase Production Checks

1. Run `database/schema.sql` in the production Supabase SQL Editor.
2. Confirm Row Level Security is enabled on `public.tasks`.
3. Confirm policies exist for select, insert, update, and delete.
4. Enable email/password authentication.
5. Add URLs in Authentication > URL Configuration:
   - Site URL: `https://client-task-manager-omega.vercel.app/`
   - Redirect URL: `https://client-task-manager-omega.vercel.app/auth/confirm`
   - Local redirect URL for development: `http://localhost:3000/auth/confirm`

## Supabase Auth Email Note

For this portfolio demo, email confirmation is disabled to avoid built-in email provider rate limits during testing. For real production, enable email confirmation and configure a custom SMTP provider before public launch.

## Post-Deployment Testing Checklist

- Home page loads.
- Signup works.
- Login works.
- Logout works.
- Logged-out users are redirected away from `/protected`.
- Logged-in users can open `/protected`.
- User can create a task.
- User can edit a task.
- User can delete a task.
- User can filter tasks by status.
- A second test user cannot see the first user's tasks.
- Browser refresh keeps the user session.
- Vercel deployment logs show no build errors.

## Common Deployment Issues And Fixes

- Vercel build cannot find env vars: add both Supabase variables in Vercel and redeploy.
- Auth confirmation redirects to the wrong URL: update Supabase Auth URL Configuration.
- Task queries fail with permission errors: confirm RLS policies exist and `user_id` matches `auth.uid()`.
- CI fails at `npm ci`: commit the matching `package-lock.json`.
- Local PowerShell blocks `npm`: use `npm.cmd run lint` or `npm.cmd run build`.

## Rollback

If a deployment breaks production:

1. Open Vercel Deployments.
2. Select the last working deployment.
3. Promote it to production.
4. Fix and test locally before deploying again.
