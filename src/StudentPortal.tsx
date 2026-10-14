import React from 'react';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Library,
  Menu,
  Play,
  TrendingUp,
  UserRound,
} from 'lucide-react';
import { GermanPortalWorkspace } from './GermanPortalWorkspace';
import { IeltsPortalWorkspace } from './IeltsPortalWorkspace';
import type { ProgramConfig, UserAccount, ViewTab } from './types';

interface StudentPortalProps {
  user: UserAccount;
  program: ProgramConfig;
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  onOpenMobileMenu: () => void;
}

const tabTitles: Record<ViewTab, string> = {
  dashboard: 'Study overview',
  learn: 'Curriculum',
  practice: 'Practice',
  'mock-tests': 'Mock tests',
  progress: 'Progress',
  resources: 'Resources',
  profile: 'Profile',
};

const areaStatus = ['Ready', 'In progress', 'Ready', 'Ready', 'Ready'];

export const StudentPortal: React.FC<StudentPortalProps> = ({
  user,
  program,
  currentTab,
  onSelectTab,
  onOpenMobileMenu,
}) => {
  const recent = program.recentActivity[0];

  const renderHeader = () => (
    <header className="sticky top-0 z-20 border-b border-[var(--color-line)] bg-[color:var(--color-paper)/0.94] px-4 py-3 backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="alc-button-quiet md:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="min-w-0">
            <p className="alc-label truncate">{program.name}</p>
            <p className="truncate text-sm font-semibold text-[var(--color-ink)]">
              {tabTitles[currentTab]}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onSelectTab('profile')}
          className="flex min-h-11 items-center gap-3 rounded-[var(--radius-control)] px-2 text-left hover:bg-[var(--color-surface)]"
          aria-label={`Open profile for ${user.fullName}`}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--color-navy)] text-sm font-bold text-white">
            {user.fullName.charAt(0)}
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-semibold text-[var(--color-ink)]">{user.fullName}</span>
            <span className="block text-xs text-[var(--color-muted)]">Sample learner</span>
          </span>
        </button>
      </div>
    </header>
  );

  const pageIntro = (eyebrow: string, title: string, copy: string) => (
    <div className="max-w-3xl">
      <p className="alc-label">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-[var(--color-ink)] sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">{copy}</p>
    </div>
  );

  const renderStandardContent = () => {
    if (currentTab === 'dashboard') {
      return (
        <div className="space-y-8">
          <section className="grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(17rem,0.75fr)]">
            <div className="alc-panel p-6 sm:p-8">
              <p className="alc-label">Today’s study plan</p>
              <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink)] sm:text-5xl">
                Build exam confidence, one focused session at a time.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
                {program.welcomeMessage} This public preview uses fictional progress data and does not save coursework.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button type="button" className="alc-button-primary" onClick={() => onSelectTab('practice')}>
                  Continue practice <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button type="button" className="alc-button-secondary" onClick={() => onSelectTab('learn')}>
                  Browse curriculum
                </button>
              </div>
            </div>
            <aside className="alc-panel flex flex-col justify-between bg-[var(--color-navy)] p-6 text-white">
              <div>
                <p className="alc-label text-orange-300">Active pathway</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">{program.name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">{program.fullName}</p>
              </div>
              <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-white/15 pt-5">
                <div>
                  <dt className="text-xs text-slate-400">{program.quickStats.targetMetric}</dt>
                  <dd className="mt-1 text-lg font-semibold">{program.quickStats.targetValue}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">Study plan</dt>
                  <dd className="mt-1 text-lg font-semibold">{program.quickStats.hoursPledged}</dd>
                </div>
              </dl>
            </aside>
          </section>

          <section aria-labelledby="workspace-heading">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="alc-label">Workspace</p>
                <h2 id="workspace-heading" className="mt-1 text-2xl font-semibold text-[var(--color-ink)]">Pick up where you left off</h2>
              </div>
              <span className="hidden text-sm text-[var(--color-muted)] sm:block">{program.learningAreas.length} skill areas</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr]">
              {[
                { tab: 'learn' as const, icon: BookOpen, title: 'Learn', copy: 'Review concepts and exam structure.' },
                { tab: 'practice' as const, icon: Play, title: 'Practice', copy: 'Try short, skill-specific activities.' },
                { tab: 'mock-tests' as const, icon: FileCheck2, title: 'Mock tests', copy: 'Preview the full test workflow.' },
              ].map(({ tab, icon: Icon, title, copy }) => (
                <button key={tab} type="button" onClick={() => onSelectTab(tab)} className="alc-panel group p-5 text-left hover:border-[var(--color-accent)]">
                  <Icon className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
                  <span className="mt-7 block text-lg font-semibold text-[var(--color-ink)]">{title}</span>
                  <span className="mt-1 block text-sm leading-6 text-[var(--color-muted)]">{copy}</span>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)]">
                    Open <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="alc-panel grid gap-6 p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <p className="alc-label">Recent activity</p>
              <h2 className="mt-2 text-xl font-semibold text-[var(--color-ink)]">{recent?.title ?? 'Orientation module'}</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{recent?.area ?? program.learningAreas[0]} · Fictional demo history</p>
            </div>
            <button type="button" className="alc-button-secondary" onClick={() => onSelectTab('progress')}>View progress</button>
          </section>
        </div>
      );
    }

    if (currentTab === 'learn' || currentTab === 'practice') {
      const practice = currentTab === 'practice';
      return (
        <div className="space-y-7">
          {pageIntro(
            practice ? 'Skill drills' : 'Curriculum',
            practice ? `${program.name} practice` : `${program.name} learning path`,
            practice
              ? 'Choose a skill area to preview the interaction pattern. Answers and attempts remain in this browser session only.'
              : 'A clear progression from fundamentals to test-day strategy, presented as a product demonstration.',
          )}
          <div className="alc-panel divide-y divide-[var(--color-line)]">
            {program.learningAreas.map((area, index) => (
              <article key={area} className="grid gap-4 p-5 sm:grid-cols-[2.25rem_minmax(0,1fr)_auto] sm:items-center">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-surface)] font-mono text-xs font-semibold text-[var(--color-muted)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="text-base font-semibold text-[var(--color-ink)]">{area}</h2>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {practice ? 'A short sample drill with immediate feedback.' : 'Concept guide, examples, and test strategy.'}
                  </p>
                </div>
                <span className="alc-status w-fit">{areaStatus[index] ?? 'Ready'}</span>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (currentTab === 'mock-tests') {
      return (
        <div className="space-y-7">
          {pageIntro('Simulation preview', program.mockTestLabel, 'Review the structure and timing before starting. This demo does not provide accredited scoring or persist attempts.')}
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2].map((number) => (
              <article key={number} className="alc-panel p-6">
                <FileCheck2 className="h-6 w-6 text-[var(--color-accent)]" aria-hidden="true" />
                <h2 className="mt-6 text-xl font-semibold text-[var(--color-ink)]">Practice form {number}</h2>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--color-muted)]">
                  <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" aria-hidden="true" /> Timed preview</span>
                  <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Sample content</span>
                </div>
                <button type="button" className="alc-button-secondary mt-6" disabled title="Interactive mock tests are not connected in this public preview">
                  Preview only
                </button>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (currentTab === 'progress') {
      return (
        <div className="space-y-7">
          {pageIntro('Demo progress', 'A calmer view of your study rhythm', 'All values below are fictional examples. A production portal would calculate these from authenticated, server-side attempt data.')}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['Sessions', '8', CalendarDays],
              ['Practice hours', '6.5', Clock3],
              ['Modules sampled', `${Math.min(3, program.learningAreas.length)} / ${program.learningAreas.length}`, TrendingUp],
            ].map(([label, value, Icon]) => {
              const MetricIcon = Icon as typeof CalendarDays;
              return (
                <div key={label as string} className="alc-panel p-5">
                  <MetricIcon className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
                  <p className="mt-6 text-3xl font-semibold text-[var(--color-ink)]">{value as string}</p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{label as string}</p>
                </div>
              );
            })}
          </div>
          <div className="alc-panel p-6">
            <h2 className="text-lg font-semibold text-[var(--color-ink)]">Recent sample activity</h2>
            <div className="mt-4 divide-y divide-[var(--color-line)]">
              {program.recentActivity.map((item) => (
                <div key={item.id} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-ink)]">{item.title}</p>
                    <p className="text-xs text-[var(--color-muted)]">{item.area}</p>
                  </div>
                  <span className="text-xs text-[var(--color-muted)]">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (currentTab === 'resources') {
      return (
        <div className="space-y-7">
          {pageIntro('Reference library', `${program.name} resources`, 'A concise set of orientation materials for the public prototype. Downloadable course files require a connected learning platform.')}
          <div className="alc-panel divide-y divide-[var(--color-line)]">
            {['Test format overview', 'Weekly study planner', 'Speaking and writing checklist'].map((resource, index) => (
              <div key={resource} className="flex items-center gap-4 p-5">
                <Library className="h-5 w-5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[var(--color-ink)]">{resource}</p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">Reference {String(index + 1).padStart(2, '0')} · Preview description</p>
                </div>
                <span className="alc-status hidden sm:inline-flex">Preview</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-7">
        {pageIntro('Sample profile', user.fullName, 'This fictional profile is provided to demonstrate the portal interface. It is not an authenticated account.')}
        <div className="alc-panel max-w-2xl p-6">
          <div className="flex items-center gap-4 border-b border-[var(--color-line)] pb-6">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-[var(--color-navy)] text-xl font-semibold text-white">
              {user.fullName.charAt(0)}
            </span>
            <div>
              <h2 className="text-xl font-semibold text-[var(--color-ink)]">{user.fullName}</h2>
              <p className="text-sm text-[var(--color-muted)]">{user.email}</p>
            </div>
          </div>
          <dl className="mt-2 divide-y divide-[var(--color-line)]">
            <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]">
              <dt className="text-sm text-[var(--color-muted)]">Program</dt>
              <dd className="text-sm font-semibold text-[var(--color-ink)]">{program.name}</dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]">
              <dt className="text-sm text-[var(--color-muted)]">Profile type</dt>
              <dd className="text-sm font-semibold text-[var(--color-ink)]">Fictional demo learner</dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]">
              <dt className="text-sm text-[var(--color-muted)]">Data storage</dt>
              <dd className="text-sm font-semibold text-[var(--color-ink)]">Selection only, for this browser session</dd>
            </div>
          </dl>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-w-0 flex-1 flex-col bg-[var(--color-paper)]">
      {renderHeader()}
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        {user.assignedProgram === 'GERMAN' ? (
          <GermanPortalWorkspace user={user} currentTab={currentTab} onSelectTab={onSelectTab} />
        ) : user.assignedProgram === 'IELTS' ? (
          <IeltsPortalWorkspace user={user} currentTab={currentTab} onSelectTab={onSelectTab} />
        ) : (
          renderStandardContent()
        )}
      </main>
    </div>
  );
};
