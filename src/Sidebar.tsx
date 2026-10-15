import React, { useEffect, useRef } from 'react';
import {
  BookOpen,
  ChevronRight,
  FileCheck2,
  FolderArchive,
  LayoutDashboard,
  LogOut,
  Menu,
  PenTool,
  TrendingUp,
  User,
  X,
} from 'lucide-react';
import type { ViewTab } from './types';

interface SidebarProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  programName: string;
  onLogout: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

const navItems: Array<{ id: ViewTab; label: string; icon: React.ReactNode }> = [
  { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="h-4 w-4" /> },
  { id: 'learn', label: 'Learn', icon: <BookOpen className="h-4 w-4" /> },
  { id: 'practice', label: 'Practice', icon: <PenTool className="h-4 w-4" /> },
  { id: 'mock-tests', label: 'Mock tests', icon: <FileCheck2 className="h-4 w-4" /> },
  { id: 'progress', label: 'Progress', icon: <TrendingUp className="h-4 w-4" /> },
  { id: 'resources', label: 'Resources', icon: <FolderArchive className="h-4 w-4" /> },
  { id: 'profile', label: 'Profile', icon: <User className="h-4 w-4" /> },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  programName,
  onLogout,
  isMobileOpen,
  onCloseMobile,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMobileOpen) return;
    closeButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseMobile();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isMobileOpen, onCloseMobile]);

  const choose = (tab: ViewTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  const content = (
    <div className="flex h-full w-64 flex-col border-r border-white/10 bg-[var(--color-navy)] text-white">
      <div className="flex min-h-16 items-center justify-between border-b border-white/10 px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-accent)] font-display text-sm font-bold">
            ALC
          </div>
          <div>
            <div className="font-display text-sm font-semibold">AECS Learning</div>
            <div className="text-xs text-white/65">Student workspace</div>
          </div>
        </div>
        {isMobileOpen && (
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onCloseMobile}
            className="alc-button-quiet !h-11 !w-11 !p-0 !text-white hover:!bg-white/10"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="border-b border-white/10 px-4 py-4">
        <div className="text-xs font-medium text-white/60">Assigned workspace</div>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="font-display text-sm font-semibold text-white">{programName}</span>
          <span className="rounded-full border border-white/15 px-2 py-1 text-xs text-white/70">Enrolled</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4" aria-label="Student workspace">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = currentTab === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => choose(item.id)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium transition-[background-color,color] duration-150 ${
                    active ? 'bg-[var(--color-surface)] text-[var(--color-ink)]' : 'text-white/72 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  <span className={active ? 'text-[var(--color-accent)]' : 'text-white/55'} aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="flex-1 text-left">{item.label}</span>
                  {active && <ChevronRight className="h-4 w-4 text-[var(--color-accent)]" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={onLogout}
          className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="sticky top-0 hidden h-screen shrink-0 md:block">{content}</aside>
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button
            type="button"
            className="fixed inset-0 cursor-default bg-[color:color-mix(in_oklch,var(--color-ink)_65%,transparent)]"
            onClick={onCloseMobile}
            aria-label="Close navigation"
          />
          <aside className="relative z-10 h-full">{content}</aside>
        </div>
      )}
    </>
  );
};

export const MobileMenuIcon = Menu;
