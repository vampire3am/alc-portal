# AECS Learning Center

The public website and student workspace frontend for IELTS, PTE Academic, the Duolingo English Test, and German CEFR programs.

## Authentication API

Set `VITE_AUTH_API_URL` to the HTTPS origin of the AECS account service. The frontend expects server-issued, HttpOnly session cookies and these JSON endpoints:

- `GET /session` → `{ "user": UserAccount }` when authenticated
- `POST /login` with `{ "email", "password" }` → `{ "user": UserAccount }`
- `POST /logout` → any successful 2xx response

Requests use `credentials: "include"`. The API must use an explicit CORS origin, secure cookies, CSRF protection, server-side program authorization, rate limiting, and audit logging. Passwords and session tokens are never stored by this frontend.

Without `VITE_AUTH_API_URL`, the public SaaS website remains available and sign-in returns a clear configuration error instead of granting unsecured access.

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
