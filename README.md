# AECS Learning Center

The public website, student workspace, and role-aware staff foundation for IELTS, PTE Academic, the Duolingo English Test, and German CEFR programs.

## Product surfaces

The static deployment uses hash routing so every public route works on GitHub Pages:

- Home, Programs, How it works, Enrollment, About, and Contact
- Sign in with password recovery
- Privacy and Terms implementation notes
- Student workspaces with curriculum, practice, assessment, progress, resources, support, settings, and profile areas
- Instructor/admin operations shell with explicit API connection states

The contact form intentionally does not transmit personal data until an AECS enquiry endpoint is configured.

## Authentication API

Set `VITE_AUTH_API_URL` to the HTTPS origin of the AECS account service. The frontend expects server-issued, HttpOnly session cookies and these JSON endpoints:

- `GET /session` → `{ "user": UserAccount }` when authenticated
- `POST /login` with `{ "email", "password" }` → `{ "user": UserAccount }`
- `POST /password-reset` with `{ "email" }` → a generic successful response whether or not the address exists
- `POST /logout` → any successful 2xx response

`UserAccount.role` may be `student`, `instructor`, or `admin`. Missing roles default to the student workspace for backwards compatibility. Staff roles are routed to the operations shell, but every staff read and mutation must still be authorized server-side.

Requests use `credentials: "include"`. The API must use an explicit CORS origin, secure cookies, CSRF protection, server-side program authorization, rate limiting, and audit logging. Passwords and session tokens are never stored by this frontend.

Without `VITE_AUTH_API_URL`, the public SaaS website remains available while sign-in and password recovery return clear configuration errors instead of granting unsecured access.

## Local development

```bash
npm ci
npm run dev
```

## Verification

```bash
npm test
npm run typecheck
npm run build
```

The design contract and tokens are documented in [design.md](./design.md) and [tokens.css](./tokens.css).
