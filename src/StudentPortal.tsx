import React from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Library,
  Menu,
  LifeBuoy,
  Settings,
  Play,
  UserRound,
} from 'lucide-react';
import { GermanPortalWorkspace } from './GermanPortalWorkspace';
import { IeltsPortalWorkspace } from './IeltsPortalWorkspace';
import { ThemeToggle } from './ThemeToggle';
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
  support: 'Support',
  settings: 'Settings',
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
  const renderHeader = () => (
    <header className="sticky top-0 z-20 border-b border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 sm:px-6">
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
        <div className="flex items-center gap-2">
          <ThemeToggle />
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
              <span className="block text-xs text-[var(--color-muted)]">Student</span>
            </span>
          </button>
        </div>
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
                {program.welcomeMessage} Your assigned pathway keeps each study session focused on the right exam.
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
                { tab: 'mock-tests' as const, icon: FileCheck2, title: 'Mock tests', copy: 'Review assigned full-test workflows.' },
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
              <p className="alc-label">Recommended next</p>
              <h2 className="mt-2 text-xl font-semibold text-[var(--color-ink)]">{program.learningAreas[0]} foundations</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">Begin with the first skill area in your assigned curriculum.</p>
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
              ? 'Choose a skill area and work through a focused activity.'
              : 'Follow a clear progression from fundamentals to test-day strategy.',
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
                    {practice ? 'A short drill with immediate feedback.' : 'Concept guide, examples, and test strategy.'}
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
          {pageIntro('Assessment', program.mockTestLabel, 'Review the structure and timing of available assessments. Tests appear here when assigned by AECS.')}
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2].map((number) => (
              <article key={number} className="alc-panel p-6">
                <FileCheck2 className="h-6 w-6 text-[var(--color-accent)]" aria-hidden="true" />
                <h2 className="mt-6 text-xl font-semibold text-[var(--color-ink)]">Practice form {number}</h2>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--color-muted)]">
                  <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" aria-hidden="true" /> Timed assessment</span>
                  <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Instructor assigned</span>
                </div>
                <button type="button" className="alc-button-secondary mt-6" disabled title="This assessment has not been assigned">
                  Not assigned
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
          {pageIntro('Progress', 'Your study rhythm', 'Completed lessons, practice attempts, and instructor feedback will appear here as you work through the program.')}
          <div className="alc-panel p-8 text-center">
            <CheckCircle2 className="mx-auto h-6 w-6 text-[var(--color-accent)]" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold text-[var(--color-ink)]">No completed activity yet</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[var(--color-muted)]">Start a learning module or practice activity to begin building your progress record.</p>
            <button type="button" className="alc-button-primary mt-5" onClick={() => onSelectTab('learn')}>Start learning</button>
          </div>
        </div>
      );
    }

    if (currentTab === 'resources') {
      return (
        <div className="space-y-7">
          {pageIntro('Reference library', `${program.name} resources`, 'Use these guides alongside your lessons and assigned practice.')}
          <div className="alc-panel divide-y divide-[var(--color-line)]">
            {['Test format overview', 'Weekly study planner', 'Speaking and writing checklist'].map((resource, index) => (
              <div key={resource} className="flex items-center gap-4 p-5">
                <Library className="h-5 w-5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[var(--color-ink)]">{resource}</p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">Reference {String(index + 1).padStart(2, '0')}</p>
                </div>
                <span className="alc-status hidden sm:inline-flex">Guide</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (currentTab === 'support') {
      return (
        <div className="space-y-7">
          {pageIntro('Help and guidance', 'Student support', 'Find the right route for learning questions, access issues, or enrollment changes.')}
          <div className="grid gap-4 md:grid-cols-2">
            <article className="alc-panel p-6">
              <LifeBuoy className="h-6 w-6 text-[var(--color-accent)]" aria-hidden="true" />
              <h2 className="mt-5 text-xl">Learning guidance</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">Ask your AECS coordinator or instructor about study sequence, feedback, and assigned assessments.</p>
              <p className="alc-note mt-5">Direct support messaging requires the connected support service.</p>
            </article>
            <article className="alc-panel p-6">
              <Settings className="h-6 w-6 text-[var(--color-accent)]" aria-hidden="true" />
              <h2 className="mt-5 text-xl">Account access</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">Use password recovery from the sign-in screen or contact AECS when your enrollment scope needs correction.</p>
              <button type="button" className="alc-button-secondary mt-5" onClick={() => onSelectTab('profile')}>Review profile</button>
            </article>
          </div>
        </div>
      );
    }

    if (currentTab === 'settings') {
      return (
        <div className="space-y-7">
          {pageIntro('Preferences', 'Workspace settings', 'Control visual preferences here. Account and enrollment changes remain server-managed.')}
          <div className="alc-panel max-w-2xl divide-y divide-[var(--color-line)]">
            <div className="flex items-center justify-between gap-6 p-6"><div><h2 className="text-lg">Appearance</h2><p className="mt-1 text-sm text-[var(--color-muted)]">Switch between Day and Night Foundry.</p></div><ThemeToggle /></div>
            <div className="p-6"><h2 className="text-lg">Notifications</h2><p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">Notification preferences become available when the account service exposes a settings endpoint.</p><button type="button" className="alc-button-secondary mt-4" disabled>Not connected</button></div>
            <div className="p-6"><h2 className="text-lg">Enrollment</h2><p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">Program assignments cannot be changed from the browser. Contact AECS for corrections.</p></div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-7">
        {pageIntro('Student profile', user.fullName, 'Your account details and assigned learning pathway.')}
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
              <dd className="text-sm font-semibold text-[var(--color-ink)]">Enrolled student</dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]">
              <dt className="text-sm text-[var(--color-muted)]">Data storage</dt>
              <dd className="text-sm font-semibold text-[var(--color-ink)]">Managed by the AECS account service</dd>
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
        {currentTab === 'support' || currentTab === 'settings' ? (
          renderStandardContent()
        ) : user.assignedProgram === 'GERMAN' ? (
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
