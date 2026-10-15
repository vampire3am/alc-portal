import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpenCheck,
  Check,
  FileCheck2,
  Headphones,
  Menu,
  MessagesSquare,
  Route,
  Target,
  X,
} from 'lucide-react';
import { AuthView } from './AuthView';
import { ThemeToggle } from './ThemeToggle';
import { parsePublicRoute, publicRouteTitle, routeHref, type PublicRoute } from './publicRoutes';

const programs = [
  {
    code: 'IELTS',
    name: 'IELTS Academic + General Training',
    copy: 'A four-skill pathway with reading, listening, writing, speaking, mock-test, and review workflows.',
    areas: ['Listening', 'Reading', 'Writing', 'Speaking'],
  },
  {
    code: 'PTE',
    name: 'PTE Academic',
    copy: 'Computer-based preparation organized around speaking and writing, reading, and listening task families.',
    areas: ['Speaking + writing', 'Reading', 'Listening'],
  },
  {
    code: 'DET',
    name: 'Duolingo English Test',
    copy: 'Adaptive-test preparation for literacy, comprehension, conversation, and production.',
    areas: ['Literacy', 'Comprehension', 'Conversation', 'Production'],
  },
  {
    code: 'DE',
    name: 'German CEFR',
    copy: 'Level-aware language development from A1 through B2 with vocabulary, grammar, and four-skill practice.',
    areas: ['A1', 'A2', 'B1', 'B2'],
  },
];

const navItems: Array<{ route: PublicRoute; label: string }> = [
  { route: 'programs', label: 'Programs' },
  { route: 'how-it-works', label: 'How it works' },
  { route: 'enrollment', label: 'Enrollment' },
  { route: 'about', label: 'About' },
  { route: 'contact', label: 'Contact' },
];

const PageIntro: React.FC<{ index: string; label: string; title: string; copy: string }> = ({ index, label, title, copy }) => (
  <header className="public-page-intro">
    <p className="alc-label">{index} · {label}</p>
    <h1 className="public-page-title">{title}</h1>
    <p className="public-page-lede">{copy}</p>
  </header>
);

const HomePage: React.FC = () => (
  <>
    <section className="lumen-hero">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-12 sm:px-6 sm:pb-28 sm:pt-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,.85fr)] lg:items-center lg:gap-16">
        <div>
          <p className="alc-label">00 · learning system</p>
          <h1 className="lumen-title mt-5 max-w-[14ch]"><em>Prepare</em> with a plan that fits your exam.</h1>
          <p className="lumen-lede mt-6">AECS brings learning, targeted practice, assessment workflows, and progress into one assigned workspace for each enrolled student.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={routeHref('enrollment')} className="alc-button-primary">Start an enrollment enquiry <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
            <a href={routeHref('programs')} className="alc-button-secondary">Compare programs</a>
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
          return <span key={index} style={{ height: `${height}%`, '--bar-delay': `${index * 10}ms` } as React.CSSProperties} />;
        })}
      </div>
      <p className="lumen-meter__label">learn · practice · assess</p>
    </aside>

    <section className="public-section public-section--split">
      <div>
        <p className="alc-label">01 · product</p>
        <h2>One route from enrollment to the next useful task.</h2>
        <p>The public site explains the offer. The enrolled workspace then narrows the interface to the learner’s assigned exam, level, curriculum, practice, and assessment status.</p>
      </div>
      <div className="public-rule-list">
        {[
          ['01', 'Assigned pathway', 'The account service determines the program and authorized role.'],
          ['02', 'Focused practice', 'Learners move between curriculum, skill drills, and timed test workflows.'],
          ['03', 'Recorded progress', 'Completion and feedback surfaces are ready for connected learning data.'],
        ].map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
      </div>
    </section>

    <section className="public-section public-section--tint">
      <div className="public-section-heading">
        <p className="alc-label">02 · programs</p>
        <h2>Four pathways. One consistent workspace.</h2>
        <a href={routeHref('programs')} className="public-text-link">Compare every program <ArrowRight aria-hidden="true" /></a>
      </div>
      <div className="public-program-index">
        {programs.map((program, index) => (
          <article key={program.code}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div><h3>{program.name}</h3><p>{program.copy}</p></div>
            <p>{program.areas.join(' · ')}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="public-cta-band">
      <div><p className="alc-label">03 · next step</p><h2>Find the pathway that fits your exam.</h2></div>
      <div><a className="alc-button-primary" href={routeHref('enrollment')}>Start an enquiry <ArrowRight aria-hidden="true" /></a><a className="alc-button-secondary" href={routeHref('sign-in')}>Already enrolled? Sign in</a></div>
    </section>
  </>
);

const ProgramsPage: React.FC = () => (
  <div className="public-page-shell">
    <PageIntro index="01" label="programs" title="Choose the exam. Keep the workflow." copy="Each pathway follows its own skills and assessment format while preserving one clear place to learn, practice, review, and continue." />
    <div className="public-program-detail-list">
      {programs.map((program, index) => (
        <article key={program.code}>
          <div className="public-program-code">{String(index + 1).padStart(2, '0')}<strong>{program.code}</strong></div>
          <div><h2>{program.name}</h2><p>{program.copy}</p></div>
          <ul>{program.areas.map((area) => <li key={area}><Check aria-hidden="true" />{area}</li>)}</ul>
          <a className="public-text-link" href={routeHref('enrollment')}>Ask about this pathway <ArrowRight aria-hidden="true" /></a>
        </article>
      ))}
    </div>
    <div className="public-note"><strong>Not sure which format applies?</strong><p>AECS can confirm the exam, track, or CEFR level before access is issued.</p><a href={routeHref('contact')}>Ask a coordinator</a></div>
  </div>
);

const HowItWorksPage: React.FC = () => (
  <div className="public-page-shell">
    <PageIntro index="02" label="workflow" title="From goal to guided practice." copy="The system is designed around an explicit sequence so students always know what has been assigned, what to do next, and where feedback belongs." />
    <ol className="public-steps">
      {[
        ['01', 'Confirm the pathway', 'AECS confirms the exam, track or level, and issues the account attached to that enrollment.'],
        ['02', 'Enter the assigned workspace', 'Authentication returns only the program and role authorized by the account service.'],
        ['03', 'Learn and practice', 'Follow curriculum, focused drills, listening, writing, speaking, and mock-test workflows for the assigned program.'],
        ['04', 'Review the record', 'Progress, attempts, and instructor feedback appear as connected learning data becomes available.'],
      ].map(([number, title, copy]) => <li key={number}><span>{number}</span><div><h2>{title}</h2><p>{copy}</p></div></li>)}
    </ol>
    <section className="public-capability-grid">
      {[
        [BookOpenCheck, 'Curriculum', 'Ordered learning material tied to the exam or level.'],
        [Target, 'Practice', 'Skill-specific work instead of undirected repetition.'],
        [FileCheck2, 'Assessment', 'Timed and instructor-assigned test workflows.'],
        [MessagesSquare, 'Support', 'A visible route back to AECS when access or study guidance is needed.'],
      ].map(([Icon, title, copy]) => { const FeatureIcon = Icon as typeof Route; return <article key={title as string}><FeatureIcon aria-hidden="true" /><h3>{title as string}</h3><p>{copy as string}</p></article>; })}
    </section>
  </div>
);

const EnrollmentPage: React.FC = () => (
  <div className="public-page-shell">
    <PageIntro index="03" label="enrollment" title="A plan begins with the right exam." copy="AECS enrollment is coordinator-led. Program scope, schedule, and tuition should be confirmed against the student’s actual goal rather than guessed by a static pricing table." />
    <div className="public-enrollment-grid">
      <section className="alc-panel">
        <p className="alc-label">new students</p><h2>Start an enrollment enquiry</h2>
        <p>Share the target exam or German level, your intended timeline, and where you need guidance. AECS can then confirm the appropriate pathway and next steps.</p>
        <a className="alc-button-primary" href={routeHref('contact')}>Contact AECS <ArrowRight aria-hidden="true" /></a>
      </section>
      <section className="alc-panel">
        <p className="alc-label">enrolled students</p><h2>Access an issued account</h2>
        <p>If enrollment is already confirmed, sign in with the email address supplied to AECS. Account recovery is available from the same screen.</p>
        <a className="alc-button-secondary" href={routeHref('sign-in')}>Go to sign in</a>
      </section>
    </div>
    <div className="public-spec-sheet">
      <div><span>01</span><strong>Program selection</strong><p>IELTS, PTE Academic, DET, or German CEFR.</p></div>
      <div><span>02</span><strong>Account issue</strong><p>Created only after AECS confirms enrollment.</p></div>
      <div><span>03</span><strong>Tuition + schedule</strong><p>Confirmed directly for the selected pathway.</p></div>
      <div><span>04</span><strong>Workspace access</strong><p>Protected by the connected authentication service.</p></div>
    </div>
  </div>
);

const AboutPage: React.FC = () => (
  <div className="public-page-shell">
    <PageIntro index="04" label="about" title="Language preparation with a clearer operating system." copy="AECS Learning Center organizes exam preparation around assigned pathways, deliberate practice, and visible next actions." />
    <div className="public-editorial-grid">
      <section><h2>Why this product exists</h2><p>Language preparation easily fragments across notes, links, recordings, worksheets, and test interfaces. This product gives those activities a shared structure without pretending every learner needs the same sequence.</p></section>
      <section><h2>What the software does</h2><p>It delivers the public program information, secure account entry, program-aware student workspaces, role-aware staff foundations, and interfaces for curriculum, practice, assessment, progress, and support.</p></section>
      <section><h2>What stays human</h2><p>Enrollment decisions, learning guidance, instructor feedback, and account support remain with AECS. The software makes that work easier to reach; it does not replace it.</p></section>
    </div>
    <blockquote className="public-statement">A focused system should make the next useful action obvious.</blockquote>
  </div>
);

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="public-page-shell">
      <PageIntro index="05" label="contact" title="Tell AECS what you are preparing for." copy="Use this enquiry brief to organize the information a coordinator needs. Submission requires the connected enquiry service; until then, the form will keep your details in the browser only for this session." />
      <div className="public-contact-grid">
        <form className="alc-panel public-contact-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
          <label htmlFor="contact-name">Full name</label><input id="contact-name" className="alc-field" required autoComplete="name" />
          <label htmlFor="contact-email">Email address</label><input id="contact-email" className="alc-field" required type="email" autoComplete="email" />
          <label htmlFor="contact-program">Program of interest</label>
          <select id="contact-program" className="alc-field" defaultValue=""><option value="" disabled>Select a pathway</option>{programs.map((program) => <option key={program.code}>{program.name}</option>)}</select>
          <label htmlFor="contact-message">Goal or question</label><textarea id="contact-message" className="alc-field public-textarea" required rows={5} />
          <button className="alc-button-primary" type="submit">Prepare enquiry <ArrowRight aria-hidden="true" /></button>
          <div className="auth-feedback" aria-live="polite">{submitted && <p data-tone="success">Your brief is ready. Direct form delivery still needs the AECS enquiry endpoint; please use the official AECS contact channel in the meantime.</p>}</div>
        </form>
        <aside className="public-contact-aside">
          <p className="alc-label">include these details</p>
          <ul><li><Check aria-hidden="true" />Target exam or German level</li><li><Check aria-hidden="true" />Expected test or study timeline</li><li><Check aria-hidden="true" />Current preparation stage</li><li><Check aria-hidden="true" />Any account-access issue</li></ul>
          <div><Headphones aria-hidden="true" /><p><strong>Already enrolled?</strong>Use the support area inside the student workspace or ask your AECS coordinator.</p></div>
        </aside>
      </div>
    </div>
  );
};

const LegalPage: React.FC<{ kind: 'privacy' | 'terms' }> = ({ kind }) => (
  <div className="public-page-shell public-legal">
    <PageIntro index="07" label={kind} title={kind === 'privacy' ? 'Privacy at the product boundary.' : 'Terms for using this frontend.'}
      copy={kind === 'privacy' ? 'This page documents what the current frontend does and identifies the policies the operating organization must complete.' : 'These operational notes describe the current software boundary and are not a substitute for AECS legal terms.'} />
    {kind === 'privacy' ? (
      <>
        <section><h2>Frontend data handling</h2><p>This frontend does not store passwords or session tokens. Authentication requests use secure cookies issued by the configured account service.</p></section>
        <section><h2>Local preferences</h2><p>The selected day or night theme may be stored in the browser. Draft enquiry information is not transmitted while an enquiry endpoint is unavailable.</p></section>
        <section><h2>Required operator policy</h2><p>Before production enrollment, AECS must publish the responsible entity, contact route, retention periods, lawful basis, subprocessors, and data-rights procedure for the connected services.</p></section>
      </>
    ) : (
      <>
        <section><h2>Authorized access</h2><p>Workspace access is intended for enrolled students and authorized staff. Server-side authorization remains the source of truth.</p></section>
        <section><h2>Learning materials</h2><p>Program material is provided for the learner’s assigned pathway. Assessment availability and instructor feedback depend on connected services and enrollment scope.</p></section>
        <section><h2>Required operator terms</h2><p>AECS must add its legal entity, service description, payment and cancellation rules, acceptable-use policy, governing law, and support commitments before commercial launch.</p></section>
      </>
    )}
  </div>
);

const renderPage = (route: PublicRoute) => {
  switch (route) {
    case 'programs': return <ProgramsPage />;
    case 'how-it-works': return <HowItWorksPage />;
    case 'enrollment': return <EnrollmentPage />;
    case 'about': return <AboutPage />;
    case 'contact': return <ContactPage />;
    case 'sign-in': return <div className="public-page-shell"><AuthView /></div>;
    case 'privacy': return <LegalPage kind="privacy" />;
    case 'terms': return <LegalPage kind="terms" />;
    default: return <HomePage />;
  }
};

export const PublicSite: React.FC = () => {
  const [route, setRoute] = useState<PublicRoute>(() => parsePublicRoute(window.location.hash));
  const [menuOpen, setMenuOpen] = useState(false);
  const [motionReady, setMotionReady] = useState(false);

  useEffect(() => {
    const update = () => setRoute(parsePublicRoute(window.location.hash));
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  useEffect(() => {
    document.title = publicRouteTitle(route);
    setMenuOpen(false);
    setMotionReady(false);
    window.scrollTo({ top: 0, left: 0 });
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setMotionReady(true));
    });
    return () => { window.cancelAnimationFrame(firstFrame); window.cancelAnimationFrame(secondFrame); };
  }, [route]);

  return (
    <div className="public-site" data-motion={motionReady ? 'ready' : 'waiting'}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="public-nav">
        <div className="public-nav__inner">
          <a href={routeHref('home')} className="public-brand" aria-label="AECS Learning Center home"><span>ALC</span><strong>AECS Learning Center</strong></a>
          <nav className="public-nav__links" aria-label="Main navigation">
            {navItems.map((item) => <a key={item.route} href={routeHref(item.route)} aria-current={route === item.route ? 'page' : undefined}>{item.label}</a>)}
          </nav>
          <div className="public-nav__actions"><ThemeToggle /><a className="alc-button-quiet public-signin-link" href={routeHref('sign-in')}>Sign in</a><a className="alc-button-primary public-enrol-link" href={routeHref('enrollment')}>Enquire</a><button className="public-menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button></div>
        </div>
        {menuOpen && <nav id="mobile-nav" className="public-mobile-nav" aria-label="Mobile navigation">{navItems.map((item) => <a key={item.route} href={routeHref(item.route)}>{item.label}<ArrowRight aria-hidden="true" /></a>)}<a href={routeHref('sign-in')}>Sign in<ArrowRight aria-hidden="true" /></a></nav>}
      </header>
      <main id="main-content" key={route} className="public-page-enter">{renderPage(route)}</main>
      <footer className="public-footer">
        <div className="public-footer__statement"><p className="alc-label">AECS Learning Center</p><h2>Preparation, organized around the exam.</h2></div>
        <div className="public-footer__row"><p>IELTS · PTE Academic · Duolingo English Test · German CEFR</p><nav aria-label="Footer"><a href={routeHref('contact')}>Contact</a><a href={routeHref('privacy')}>Privacy</a><a href={routeHref('terms')}>Terms</a><a href={routeHref('sign-in')}>Sign in</a></nav></div>
      </footer>
    </div>
  );
};
