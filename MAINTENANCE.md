# Maintenance Guide

## How To Update The App

1. Create a new Git branch.
2. Make the change locally.
3. Run:

```bash
npm run lint
npm run build
```

4. Commit the change.
5. Open a pull request.
6. Wait for GitHub Actions CI to pass.
7. Merge to `main`.
8. Confirm Vercel deploys successfully.

## How To Add A New Feature Safely

- Keep changes small and focused.
- Reuse existing components and Supabase helpers.
- Keep RLS enabled for user-owned data.
- Keep private keys out of frontend code.
- Test as at least one logged-in user.
- For user data features, test with two users to confirm data separation.

## How To Handle Bugs

1. Reproduce the bug locally.
2. Check browser console errors.
3. Check terminal or Vercel logs.
4. Check Supabase logs if the bug involves auth or database writes.
5. Fix on a branch.
6. Run lint and build.
7. Deploy through the normal GitHub and Vercel workflow.

## How To Check Vercel Deployment Logs

1. Open the Vercel dashboard.
2. Select the project.
3. Open Deployments.
4. Select the latest deployment.
5. Review Build Logs and Runtime Logs.
6. If env vars were changed, redeploy the latest deployment.

## How To Update Supabase Schema Safely

- Back up important data before schema changes.
- Test SQL changes in a development Supabase project first when possible.
- Keep RLS enabled.
- Keep user-owned data policies scoped to `auth.uid() = user_id`.
- Apply SQL changes during a low-traffic period.
- After changes, test signup, login, and all task actions.

## Backup And Export Notes

- Supabase table data can be exported from the Supabase dashboard.
- For client projects, schedule backups according to the client's data importance.
- Before major schema changes, export the `tasks` table.
- Keep SQL migration notes in the repository when schema changes are made.

## Monthly Maintenance Checklist

- Visit the production URL.
- Test signup or login.
- Create, edit, delete, and filter a test task.
- Check Vercel deployment logs.
- Check GitHub Actions for failing workflows.
- Review Supabase project usage and billing limits.
- Review dependency updates, but avoid major upgrades without testing.
- Confirm `.env.local` and private keys are not committed.

## Production Hardening

- Set up custom SMTP for Supabase Auth emails and re-enable email confirmation.

## Common Issues

- Production auth redirect fails: update Supabase Auth URL Configuration.
- Vercel build fails: check environment variables and build logs.
- Task write fails: confirm the user is authenticated and RLS policies exist.
- CI install fails: ensure `package-lock.json` matches `package.json`.
