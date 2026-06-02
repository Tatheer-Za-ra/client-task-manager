# Client Handover

## Project Details

- Project name: Client Task Manager
- Production URL: `TODO: add production URL`
- GitHub repository: `TODO: add GitHub repo URL`
- Supabase project: `TODO: add Supabase project name or URL`
- Deployment platform: Vercel
- Database: Supabase managed PostgreSQL

## Client Usage Guide

1. Open the production URL.
2. Sign up with an email and password.
3. Log in.
4. Open the task dashboard.
5. Create a task with a title, optional description, status, and due date.
6. Edit task details when needed.
7. Filter tasks by status.
8. Delete tasks that are no longer needed.
9. Log out when finished.

## Demo Account Placeholder

- Demo email: `TODO: add demo email if needed`
- Demo password: `TODO: share securely, not in GitHub`

Do not store real passwords in this file if the repository is public or shared with people who should not have access.

## What The Client Can Do

- Use the deployed task manager.
- Create and manage their own user account.
- Manage personal tasks.
- Request small feature changes.
- View deployment status in Vercel if access is granted.

## What The Developer Maintains

Depending on the maintenance agreement, the developer may handle:

- Bug fixes
- Dependency updates
- Small feature additions
- Supabase schema updates
- Vercel deployment checks
- GitHub Actions CI failures

Ongoing support should be agreed separately after handover.

## Security Notes

- `.env.local` must never be committed.
- Supabase `service_role` keys must never be used in frontend code.
- Supabase RLS must stay enabled.
- Client account access should belong to the client, not only the developer.
- Demo passwords should be shared through a secure private channel.

## Final Handover Checklist

- Production URL is working.
- GitHub repository access is handed over.
- Vercel project access is handed over.
- Supabase project access is handed over.
- Client knows where environment variables are stored.
- Client has reviewed `README.md`.
- Client has reviewed `DEPLOYMENT.md`.
- Client has reviewed `MAINTENANCE.md`.
- Signup, login, logout, and protected dashboard are tested.
- Create, edit, delete, and filter task flows are tested.
- RLS user isolation is tested with two accounts.
