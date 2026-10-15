import React, { useState } from 'react';
import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import type { AdminView, UserAccount } from './types';

interface AdminPortalProps {
  user: UserAccount;
  onLogout: () => Promise<void>;
}

const items: Array<{ id: AdminView; label: string; icon: React.ReactNode }> = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard /> },
  { id: 'students', label: 'Students', icon: <Users /> },
  { id: 'programs', label: 'Programs', icon: <BookOpen /> },
  { id: 'content', label: 'Content', icon: <FileText /> },
  { id: 'assessments', label: 'Assessments', icon: <ClipboardCheck /> },
  { id: 'submissions', label: 'Submissions', icon: <ShieldCheck /> },
  { id: 'reports', label: 'Reports', icon: <BarChart3 /> },
  { id: 'settings', label: 'Settings', icon: <Settings /> },
];

const viewCopy: Record<AdminView, { title: string; copy: string; requirement: string }> = {
  overview: { title: 'Operations overview', copy: 'A single place for enrollment, content, assessment, and submission status.', requirement: 'Connect the operations API to load live totals and queues.' },
  students: { title: 'Student records', copy: 'Search enrollment, assigned program, status, and support history.', requirement: 'Requires server-side student search, pagination, and authorization.' },
  programs: { title: 'Program delivery', copy: 'Manage available pathways, tracks, levels, and publishing state.', requirement: 'Requires program versioning and publish permissions.' },
  content: { title: 'Learning content', copy: 'Organize curriculum material, skill practice, and reference resources.', requirement: 'Requires content storage, revisions, and asset delivery.' },
  assessments: { title: 'Assessment operations', copy: 'Create test forms, control availability, and assign attempts.', requirement: 'Requires assessment authoring, scheduling, and attempt APIs.' },
  submissions: { title: 'Submission review', copy: 'Route writing, speaking, and instructor-marked work into review queues.', requirement: 'Requires secure upload, review state, and feedback APIs.' },
  reports: { title: 'Learning reports', copy: 'Review reliable activity and outcome data without fabricated dashboard metrics.', requirement: 'Requires a reporting schema and verified source data.' },
  settings: { title: 'Service settings', copy: 'Configure operational policy, roles, notifications, and integrations.', requirement: 'Requires protected organization settings endpoints.' },
};

export const AdminPortal: React.FC<AdminPortalProps> = ({ user, onLogout }) => {
  const [view, setView] = useState<AdminView>('overview');
  const current = viewCopy[view];

  return (
    <div className="admin-shell">
      <aside className="admin-rail">
        <div className="admin-brand"><span>ALC</span><div><strong>AECS Operations</strong><small>{user.role === 'admin' ? 'Administrator' : 'Instructor'}</small></div></div>
        <nav aria-label="Operations workspace">{items.map((item) => <button type="button" key={item.id} onClick={() => setView(item.id)} aria-current={view === item.id ? 'page' : undefined}><span aria-hidden="true">{item.icon}</span>{item.label}</button>)}</nav>
        <button className="admin-logout" type="button" onClick={onLogout}><LogOut aria-hidden="true" />Sign out</button>
      </aside>
      <div className="admin-main">
        <header><div><p className="alc-label">operations · {view}</p><strong>{user.fullName}</strong></div><ThemeToggle /></header>
        <main>
          <div className="admin-page-heading"><p className="alc-label">role-protected workspace</p><h1>{current.title}</h1><p>{current.copy}</p></div>
          {view === 'overview' ? (
            <>
              <section className="admin-status-strip">
                <div><span>Frontend</span><strong>Ready</strong><p>Role-aware shell and protected navigation.</p></div>
                <div><span>Operations data</span><strong>Not connected</strong><p>No synthetic student or revenue figures are shown.</p></div>
                <div><span>Authorization</span><strong>Server-owned</strong><p>Every mutation must be checked by the API.</p></div>
              </section>
              <section className="alc-panel admin-checklist"><h2>Production connection checklist</h2>{['Student directory and enrollment lifecycle', 'Curriculum publishing and content revisions', 'Assessment assignment and attempt controls', 'Submission review and instructor feedback', 'Reporting data definitions and exports', 'Audit log for all staff mutations'].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p><em>API required</em></div>)}</section>
            </>
          ) : (
            <section className="alc-panel admin-empty-state"><ShieldCheck aria-hidden="true" /><h2>{current.title} is protected by design</h2><p>{current.requirement}</p><div className="alc-note">This screen intentionally shows no invented records. Connect the authorized service before operational use.</div></section>
          )}
        </main>
      </div>
    </div>
  );
};
