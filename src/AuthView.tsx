import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpenCheck,
  FileCheck2,
  Headphones,
  ShieldCheck,
  Target,
} from 'lucide-react';
import { useAuth } from './AuthContext';

export const AuthView: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formState, setFormState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState('loading');
    setMessage('');
    const result = await login(email.trim(), password);
    if (!result.ok) {
      setMessage(result.message ?? 'Sign-in was unsuccessful.');
      setFormState('error');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      <header className="sticky top-0 z-30 border-b border-[var(--color-rule)] bg-[var(--color-paper)]">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="AECS Learning Center home">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[var(--color-ink)] font-display text-sm font-bold text-white">ALC</span>
            <span className="min-w-0">
              <span className="block whitespace-nowrap font-display text-sm font-semibold tracking-tight sm:text-base">AECS Learning Center</span>
              <span className="hidden text-xs text-[var(--color-muted)] sm:block">Language test preparation</span>
            </span>
          </a>
          <a href="#access" className="alc-button-primary px-3 sm:px-4">
            Sign in <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </header>

      <main id="top">
        <section className="lumen-hero">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-12 sm:px-6 sm:pb-28 sm:pt-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,.85fr)] lg:items-center lg:gap-16">
            <div>
              <p className="alc-label">00 · learning system</p>
              <h1 className="lumen-title mt-5 max-w-[14ch] leading-[.96] tracking-[-.05em]">
                <em>Prepare</em> with a plan that fits your exam.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-ink-2)] sm:text-lg">
                AECS brings lessons, targeted practice, mock-test workflows, and progress tracking into one focused workspace for every enrolled student.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#programs" className="alc-button-primary">Explore programs</a>
                <a href="#access" className="alc-button-secondary">Student sign in</a>
              </div>
            </div>
            <figure className="lumen-apparatus" aria-label="Four AECS programs routed into one assigned student workspace">
              <span className="lumen-beam" aria-hidden="true" />
              <div className="lumen-prism" aria-hidden="true" />
              <span className="lumen-ray [--ray-angle:-18deg] [--ray-color:var(--color-accent)] [--ray-offset:-1.25rem]" aria-hidden="true" />
              <span className="lumen-ray [--ray-angle:-7deg] [--ray-color:var(--color-spectrum-mid)] [--ray-offset:-.25rem]" aria-hidden="true" />
              <span className="lumen-ray [--ray-angle:5deg] [--ray-color:var(--color-accent-2)] [--ray-offset:.75rem]" aria-hidden="true" />
              <span className="lumen-callout lumen-callout--one">programs · 04</span>
              <span className="lumen-callout lumen-callout--two">levels · a1–b2</span>
              <span className="lumen-callout lumen-callout--three">skills · 04–06</span>
              <span className="lumen-callout lumen-callout--four">access · enrolled</span>
            </figure>
          </div>
        </section>

        <aside className="lumen-meter" aria-label="AECS learning workflow readout">
          <p className="lumen-meter__label">path · assigned</p>
          <div className="lumen-meter__bars" aria-hidden="true">
            {Array.from({ length: 48 }, (_, index) => {
              const height = 24 + Math.round((Math.sin(index / 4) + 1) * 28);
              return <span key={index} style={{ height: `${height}%` }} />;
            })}
          </div>
          <p className="lumen-meter__label">learn · practice · assess</p>
        </aside>

        <section id="programs" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20" aria-labelledby="programs-heading">
          <div className="max-w-3xl">
            <p className="alc-label">01 · programs</p>
            <h2 id="programs-heading" className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">A workspace shaped around the exam.</h2>
            <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">Build the skills, timing, and familiarity required by your chosen pathway.</p>
          </div>
          <div className="mt-9 divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
            {[
              ['IELTS', 'Academic and General Training', 'Listening · Reading · Writing · Speaking'],
              ['PTE Academic', 'Computer-based English proficiency', 'Speaking & writing · Reading · Listening'],
              ['Duolingo English Test', 'Adaptive English proficiency', 'Literacy · Comprehension · Conversation · Production'],
              ['German', 'CEFR-aligned language development', 'Vocabulary · Grammar · Lesen · Hören · Schreiben · Sprechen'],
            ].map(([name, subtitle, areas], index) => (
              <article key={name} className="grid gap-3 py-6 md:grid-cols-[3rem_minmax(12rem,.65fr)_minmax(0,1fr)] md:items-center md:gap-6">
                <span className="font-mono text-xs text-[var(--color-muted)]">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--color-ink)]">{name}</h3>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{subtitle}</p>
                </div>
                <p className="text-sm leading-6 text-[var(--color-ink-2)]">{areas}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="platform" className="border-y border-[var(--color-rule)] bg-[var(--color-surface)]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(17rem,.7fr)_minmax(0,1.3fr)] lg:gap-16">
            <div>
              <p className="alc-label">02 · workspace</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Less switching. More deliberate practice.</h2>
              <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">The student workspace keeps curriculum, practice, assessment, and progress together without burying the next action.</p>
            </div>
            <div className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
              {[
                [BookOpenCheck, 'Structured learning', 'Move from concepts and worked examples into level-appropriate exercises.'],
                [Target, 'Targeted practice', 'Choose the skill that needs attention instead of repeating an entire course.'],
                [FileCheck2, 'Assessment workflow', 'Use timed interfaces built around reading, listening, writing, and speaking tasks.'],
                [ShieldCheck, 'Account-based access', 'Enrollment and program scope are designed to be enforced by the connected account service.'],
              ].map(([Icon, title, copy]) => {
                const FeatureIcon = Icon as typeof BookOpenCheck;
                return (
                  <article key={title as string} className="grid gap-4 py-6 sm:grid-cols-[2.5rem_minmax(0,1fr)]">
                    <FeatureIcon className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--color-ink)]">{title as string}</h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{copy as string}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="access" className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,.72fr)] lg:items-start lg:gap-16">
          <div className="max-w-2xl">
            <p className="alc-label">03 · access</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Continue your enrolled program.</h2>
            <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
              Student accounts are issued by AECS. Sign in with the email address attached to your enrollment.
            </p>
            <div className="mt-8 grid gap-5 border-t border-[var(--color-rule)] pt-6 sm:grid-cols-2">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                <div><h3 className="font-semibold">Protected session</h3><p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">Designed for secure, server-issued session cookies.</p></div>
              </div>
              <div className="flex gap-3">
                <Headphones className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                <div><h3 className="font-semibold">Need access?</h3><p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">Contact your AECS coordinator to confirm enrollment.</p></div>
              </div>
            </div>
          </div>

          <form className="alc-panel p-5 sm:p-6" onSubmit={submit} aria-labelledby="signin-heading" noValidate>
            <h3 id="signin-heading" className="text-2xl font-semibold">Student sign in</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">Enter the credentials issued with your enrollment.</p>
            <label htmlFor="email" className="mt-6 block text-sm font-semibold text-[var(--color-ink)]">Email address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (formState === 'error') setFormState('idle');
              }}
              className="alc-field mt-2"
              aria-invalid={formState === 'error'}
              placeholder="you@example.com"
            />
            <label htmlFor="password" className="mt-5 block text-sm font-semibold text-[var(--color-ink)]">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              minLength={8}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (formState === 'error') setFormState('idle');
              }}
              className="alc-field mt-2"
              aria-invalid={formState === 'error'}
              placeholder="Enter your password"
            />
            <div className="min-h-12 pt-3" aria-live="polite">
              {formState === 'error' && <p className="text-sm font-medium text-red-700" role="alert">{message}</p>}
            </div>
            <button type="submit" className="alc-button-primary w-full" disabled={formState === 'loading' || !email.trim() || password.length < 8}>
              {formState === 'loading' ? 'Signing in…' : 'Sign in'}
              {formState !== 'loading' && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
            </button>
          </form>
        </section>
      </main>

      <footer className="border-t border-[var(--color-rule)] bg-[var(--color-ink)] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div><p className="font-display font-semibold">AECS Learning Center</p><p className="mt-1 text-sm text-white/65">Language test preparation</p></div>
          <p className="text-sm text-white/65">IELTS · PTE · DET · German CEFR</p>
        </div>
      </footer>
    </div>
  );
};
