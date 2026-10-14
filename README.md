# AECS Learning Center portal

A responsive, static demonstration of learning workspaces for IELTS, PTE Academic, the Duolingo English Test, and German CEFR levels.

## Demo boundaries

- Every learner profile is fictional.
- There is no password, account registration, email delivery, or administrative back office in this GitHub Pages build.
- Profile selection is stored only for the current browser session.
- Audio recordings stay in the current tab as temporary object URLs.
- Progress and historical activity are illustrative. The IELTS result is a transparent estimate from attempted sample reading/listening questions, not an official score.

A production learning portal needs a server-backed identity provider, authorization checks, encrypted persistent storage, audit logging, email delivery, and an LMS or assessment service.

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
