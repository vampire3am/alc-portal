import React from 'react';
import { ViewTab } from './types';
import { 
  LayoutDashboard, 
  BookOpen, 
  PenTool, 
  FileCheck2, 
  TrendingUp, 
  FolderArchive, 
  User, 
  LogOut,
  ShieldAlert,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  programName: string;
  onLogout: () => void;
  onSimulateUnauthorizedUrl: () => void;
  onOpenAdminModal: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  programName,
  onLogout,
  onSimulateUnauthorizedUrl,
  onOpenAdminModal,
  isMobileOpen,
  onCloseMobile,
}) => {
  const navItems: Array<{ id: ViewTab; label: string; icon: React.ReactNode }> = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'learn', label: 'Learn', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'practice', label: 'Practice', icon: <PenTool className="w-4 h-4" /> },
    { id: 'mock-tests', label: 'Mock Tests / Exams', icon: <FileCheck2 className="w-4 h-4" /> },
    { id: 'progress', label: 'Progress', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'resources', label: 'Resources', icon: <FolderArchive className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0F172A] text-slate-300 w-64 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#EA580C] text-white flex items-center justify-center font-bold text-sm tracking-wider shadow">
            ALC
          </div>
          <div>
            <div className="text-white font-bold text-sm tracking-tight leading-none">
              AECS Learning
            </div>
            <div className="text-[10px] text-slate-400 font-medium mt-1">
              Student Workspace
            </div>
          </div>
        </div>
      </div>

      {/* Program Isolation Indicator Badge */}
      <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800/80">
        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
          Enrolled Program
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs font-bold text-[#EA580C] tracking-wide">
            {programName}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            Isolated
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        <div className="px-2 pb-1 text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
          Primary Navigation
        </div>
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-slate-800 text-white border-l-4 border-[#EA580C] pl-2.5 shadow-sm'
                  : 'text-slate-300 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <span className={isActive ? 'text-[#EA580C]' : 'text-slate-400'}>
                {item.icon}
              </span>
              <span className="flex-1 text-left">{item.label}</span>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#EA580C]" />}
            </button>
          );
        })}
      </div>

      {/* Strict Isolation & Security Verification Controls */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40 space-y-2">
        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold px-1">
          Isolation Audit Tools
        </div>

        <button
          onClick={onSimulateUnauthorizedUrl}
          className="w-full flex items-center justify-between p-2 rounded bg-slate-900 hover:bg-red-950/40 border border-slate-800 hover:border-red-800/60 text-[11px] text-slate-300 transition-colors group"
          title="Test attempt to access URL of another program"
        >
          <span className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400 group-hover:text-red-400" />
            <span>Test Cross-URL Guard</span>
          </span>
          <span className="text-[10px] text-slate-400 group-hover:text-red-300">Run</span>
        </button>

        <button
          onClick={onOpenAdminModal}
          className="w-full flex items-center justify-between p-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 transition-colors"
          title="Admin authority to correct or change student assigned program"
        >
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span>Admin Program Desk</span>
          </span>
          <span className="text-[10px] text-slate-400">Manage</span>
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 p-2 rounded hover:bg-slate-800 text-[11px] text-slate-400 hover:text-slate-200 transition-colors mt-2"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block shrink-0 sticky top-0 h-screen z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
