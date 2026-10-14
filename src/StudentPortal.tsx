import React, { useState } from 'react';
import { UserAccount, ProgramConfig, ViewTab } from './types';
import { GermanPortalWorkspace } from './GermanPortalWorkspace';
import { 
  Menu, 
  Bell, 
  ArrowRight, 
  BookOpen, 
  PenTool, 
  FileCheck2, 
  TrendingUp, 
  CheckCircle2, 
  ChevronRight,
} from 'lucide-react';

interface StudentPortalProps {
  user: UserAccount;
  program: ProgramConfig;
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  onOpenMobileMenu: () => void;
  onOpenAdminModal: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  user,
  program,
  currentTab,
  onSelectTab,
  onOpenMobileMenu,
  onOpenAdminModal,
}) => {
  const [notificationOpen, setNotificationOpen] = useState(false);

  // If user is enrolled in German Language, use the specialized GermanPortalWorkspace
  // which strictly enforces CEFR Level Isolation (Section 1, 10, 11)
  if (user.assignedProgram === 'GERMAN') {
    const germanLevel = user.germanLevel || 'A1';

    return (
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 py-3 px-6 sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenMobileMenu}
              className="md:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0F172A] text-sm hidden sm:inline">
                AECS Learning Center
              </span>
              <span className="text-slate-300 hidden sm:inline">/</span>
              <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wide">
                German Language &bull; Level {germanLevel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 relative transition-colors"
                title="German Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EA580C]" />
              </button>

              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200 p-3 z-30 text-xs">
                  <div className="font-bold text-[#0F172A] pb-2 border-b border-slate-100">
                    German {germanLevel} Updates
                  </div>
                  <div className="py-2 space-y-2">
                    <div className="text-[11px] text-slate-700">
                      <span className="font-semibold block text-[#0F172A]">
                        Sprechen Record &amp; Replay Available
                      </span>
                      <span className="text-slate-400">German Level {germanLevel}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Student Profile / Avatar */}
            <div
              onClick={() => onSelectTab('profile')}
              className="flex items-center gap-2 pl-3 border-l border-slate-200 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs group-hover:ring-2 group-hover:ring-[#EA580C]">
                {user.fullName.charAt(0)}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#EA580C] leading-tight">
                  {user.fullName}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                  German {germanLevel} (Isolated)
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* German Specialized Learning Workspace */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          <GermanPortalWorkspace
            user={user}
            currentTab={currentTab}
            onSelectTab={onSelectTab}
          />
        </main>
      </div>
    );
  }

  // STANDARD PORTAL SHELL FOR IELTS, PTE, DET (Isolated to their respective learning areas)
  const renderTabContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Welcome block */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                    Assigned Portal Scope
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                    ID: {user.id}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-[#0F172A] mt-1 tracking-tight">
                  Welcome back, {user.fullName}
                </h1>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  {program.welcomeMessage}
                </p>
              </div>

              {/* Program Card - Prominently displayed without program switch control */}
              <div className="bg-slate-900 text-white p-5 rounded-xl shrink-0 min-w-[240px] border border-slate-800 shadow-sm relative overflow-hidden">
                <div className="absolute right-0 top-0 w-24 h-24 bg-[#EA580C]/10 rounded-full blur-xl pointer-events-none" />
                <div className="text-[10px] uppercase font-bold text-[#EA580C] tracking-wider">
                  Active Enrolled Program
                </div>
                <div className="text-lg font-bold mt-0.5 tracking-tight flex items-center gap-1.5">
                  <span>{program.name}</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  {program.badge}
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Switching:</span>
                  <span className="font-semibold text-amber-400">Locked to Student</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                Quick Actions
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => onSelectTab('learn')}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#EA580C] hover:shadow-xs transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#EA580C] flex items-center justify-center mb-2.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#EA580C]">
                    Learn Curriculum
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Modules &amp; Lessons
                  </div>
                </button>

                <button
                  onClick={() => onSelectTab('practice')}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#EA580C] hover:shadow-xs transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5">
                    <PenTool className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#EA580C]">
                    Practice Drills
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Targeted Skill Sets
                  </div>
                </button>

                <button
                  onClick={() => onSelectTab('mock-tests')}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#EA580C] hover:shadow-xs transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2.5">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#EA580C]">
                    Mock Tests
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Full Exam Format
                  </div>
                </button>

                <button
                  onClick={() => onSelectTab('progress')}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#EA580C] hover:shadow-xs transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#EA580C]">
                    View Progress
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Track Milestones
                  </div>
                </button>
              </div>
            </div>

            {/* Program-Specific Available Learning Areas */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
                    {program.name} Learning Areas
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Strictly isolated to {program.name} curriculum. No cross-program content exposed.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#EA580C]">
                  {program.learningAreas.length} Areas Configured
                </span>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {program.learningAreas.map((area, idx) => (
                  <div
                    key={area}
                    className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#EA580C] transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center group-hover:bg-orange-100 group-hover:text-[#EA580C]">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-[#0F172A]">
                          {area}
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#EA580C]" />
                    </div>
                    <div className="mt-2 text-[11px] text-slate-500">
                      Standard modules &amp; exercises aligned with {program.name} specifications.
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Learning */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  Continue Learning
                </div>
                <span className="text-[11px] text-slate-400">Most recent lesson</span>
              </div>

              <div className="p-4 rounded-lg bg-orange-50/40 border border-orange-200/80 flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#EA580C] bg-orange-100 px-2 py-0.5 rounded mb-1">
                    In Progress
                  </span>
                  <h4 className="text-xs font-bold text-[#0F172A]">
                    {program.recentActivity[0]?.title || 'Orientation Module'}
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Section: {program.recentActivity[0]?.area || program.learningAreas[0]}
                  </p>
                </div>
                <button
                  onClick={() => onSelectTab('practice')}
                  className="shrink-0 py-1.5 px-3 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-xs transition-colors"
                >
                  <span>Resume</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        );

      case 'learn':
        return (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                Curriculum Structure
              </span>
              <h2 className="text-xl font-bold text-[#0F172A] mt-1">
                {program.name} Learning Modules
              </h2>
            </div>
            <div className="grid gap-3">
              {program.learningAreas.map((area, idx) => (
                <div key={area} className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#0F172A]">{area}</div>
                    <div className="text-[11px] text-slate-500">Curated modules for {program.name}</div>
                  </div>
                  <button className="py-1 px-3 text-xs font-semibold rounded-md bg-slate-100 hover:bg-[#0F172A] hover:text-white">
                    Start Module
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'practice':
        return (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                Practice Drills
              </span>
              <h2 className="text-xl font-bold text-[#0F172A] mt-1">
                {program.name} Skill Drills
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {program.learningAreas.map((area) => (
                <div key={area} className="p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-[#0F172A]">{area} Drills</div>
                  <div className="text-[11px] text-slate-500 mt-1">12 practice sets configured for {program.name}.</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'mock-tests':
        return (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                Simulation
              </span>
              <h2 className="text-xl font-bold text-[#0F172A] mt-1">
                {program.mockTestLabel}
              </h2>
            </div>
            <div className="space-y-3">
              {[1, 2].map((n) => (
                <div key={n} className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="text-xs font-bold text-[#0F172A]">{program.name} Official Simulation {n}</div>
                  <button className="py-1.5 px-3 bg-[#0F172A] text-white rounded-lg text-xs font-semibold">Start Test</button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 max-w-xl text-xs">
            <h2 className="text-xl font-bold text-[#0F172A]">Student Profile</h2>
            <div className="space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Name:</span>
                <span className="font-bold text-[#0F172A]">{user.fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Email:</span>
                <span className="font-bold text-[#0F172A]">{user.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Assigned Program:</span>
                <span className="font-bold text-[#EA580C]">{program.name}</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenAdminModal}
                className="py-1.5 px-3 bg-[#0F172A] text-white rounded-lg text-xs font-semibold"
              >
                Open Admin Program Desk
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-xs">
            {currentTab.toUpperCase()} View for {program.name}.
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 py-3 px-6 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0F172A] text-sm hidden sm:inline">
              AECS Learning Center
            </span>
            <span className="text-slate-300 hidden sm:inline">/</span>
            <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wide">
              {program.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 relative transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EA580C]" />
            </button>
          </div>

          <div
            onClick={() => onSelectTab('profile')}
            className="flex items-center gap-2 pl-3 border-l border-slate-200 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs group-hover:ring-2 group-hover:ring-[#EA580C]">
              {user.fullName.charAt(0)}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#EA580C] leading-tight">
                {user.fullName}
              </div>
              <div className="text-[10px] text-slate-400 font-medium">
                Student &bull; {program.name}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {renderTabContent()}
      </main>
    </div>
  );
};
