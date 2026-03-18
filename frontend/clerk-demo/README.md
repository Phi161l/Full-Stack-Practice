# Clerk Authentication Study & Experiment

This project explores Clerk authentication using a minimal React + Vite setup to understand the full auth flow without a backend.

**Studied:** signup/login/logout, session management, user data storage, Clerk dashboard, end-to-end auth flow.

**Features:** Signup/Signin pages, UserButton for user state and logout, env variable for publishable key, minimal setup, dashboard exploration.

**Setup:** clone repo, install dependencies, add `.env.local` with `VITE_CLERK_PUBLISHABLE_KEY`, run app.

**Auth Flow:** user enters credentials → Clerk verifies → session created → token returned → browser stores token → user logged in → logout destroys session.

**Key Learnings:** Clerk handles all auth & sessions, frontend-only setup works, dashboard shows users/sessions, env variables must start with VITE_, prebuilt components allow plug-and-play auth.

**Next Steps:** route protection, token verification, integrate backend.

**Reference:** [Clerk React Quickstart](https://clerk.com/docs/react/getting-started/quickstart)