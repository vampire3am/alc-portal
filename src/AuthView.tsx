import React from 'react';
import { ArrowRight, BookOpenCheck, ShieldCheck } from 'lucide-react';
import { useAuth } from './AuthContext';
import { PROGRAMS } from './programData';

interface AuthViewProps {
  onLoginSuccess: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const { users, selectDemoProfile } = useAuth();

  const openProfile = (userId: string) => {
    if (selectDemoProfile(userId)) {
      window.scrollTo({ top: 0, left: 0 });
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      <header className="border-b border-[var(--color-rule)] bg-[var(--color-surface)]">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-ink)] font-display text-sm font-bold tracking-wide text-white">
              ALC
            </div>
            <div className="min-w-0">
              <div className="whitespace-nowrap font-display text-sm font-semibold tracking-tight sm:text-base">
                <span className="sm:hidden">AECS</span>
                <span className="hidden sm:inline">AECS Learning Center</span>
              </div>
              <div className="hidden text-sm text-[var(--color-muted)] sm:block">Preparation workspace</div>
            </div>
          </div>
          <span className="alc-chip">
            <span className="sm:hidden">Demo</span>
            <span className="hidden sm:inline">Interactive demo</span>
          </span>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,.95fr)] lg:items-start lg:gap-16">
        <section className="min-w-0 pt-2 lg:sticky lg:top-12" aria-labelledby="entry-heading">
          <p className="alc-label">Student preparation, clearly scoped</p>
          <h1
            id="entry-heading"
            className="mt-4 max-w-[12ch] text-[clamp(2.75rem,7vw,5rem)] font-semibold leading-[.98] tracking-[-.045em]"
          >
            Practice inside one focused learning track.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[var(--color-ink-2)]">
            Explore IELTS, PTE, Duolingo English Test, and German CEFR workspaces.
            Each sample profile opens only the curriculum assigned to it.
          </p>

          <div className="mt-8 grid max-w-xl gap-4 border-t border-[var(--color-rule)] pt-6 sm:grid-cols-2">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
              <div>
                <h2 className="text-base font-semibold">Honest demo boundaries</h2>
                <p className="mt-1 text-sm leading-6 text-[var(--color-ink-2)]">
                  No passwords, email delivery, or production accounts are simulated.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <BookOpenCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
              <div>
                <h2 className="text-base font-semibold">Real interaction patterns</h2>
                <p className="mt-1 text-sm leading-6 text-[var(--color-ink-2)]">
                  Try lessons, exercises, timed practice, and responsive navigation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="alc-panel p-5 sm:p-6" aria-labelledby="profiles-heading">
          <div className="border-b border-[var(--color-rule)] pb-5">
            <p className="alc-label">Demo access</p>
            <h2 id="profiles-heading" className="mt-2 text-2xl font-semibold">
              Choose a sample student
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-ink-2)]">
              Profiles are fictional and reset with the browser session.
            </p>
          </div>

          <ul className="mt-2 divide-y divide-[var(--color-rule)]">
            {users.map((user) => {
              const program = PROGRAMS[user.assignedProgram];
              const scope =
                user.assignedProgram === 'GERMAN'
                  ? `German ${user.germanLevel ?? 'A1'}`
                  : program.name;

              return (
                <li key={user.id}>
                  <button
                    type="button"
                    onClick={() => openProfile(user.id)}
                    className="group flex min-h-20 w-full items-center justify-between gap-4 py-4 text-left focus-visible:relative"
                    aria-label={`Open ${user.fullName}'s ${scope} demo workspace`}
                  >
                    <span className="min-w-0">
                      <span className="block font-display text-base font-semibold text-[var(--color-ink)]">
                        {user.fullName}
                      </span>
                      <span className="mt-1 block text-sm text-[var(--color-muted)]">{scope}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-[var(--color-ink-2)] group-hover:text-[var(--color-accent-hover)]">
                      Open
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="alc-note mt-4">
            This static GitHub Pages build is a curriculum prototype. Production identity,
            enrollment, and progress storage require a server-backed deployment.
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl border-t border-[var(--color-rule)] px-4 py-5 text-sm text-[var(--color-muted)] sm:px-6">
        AECS Learning Center · Curriculum interface demonstration
      </footer>
    </div>
  );
};
