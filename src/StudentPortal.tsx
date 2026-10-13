import React, { useState } from 'react';
import { UserAccount, ProgramConfig, ViewTab } from './types';
import { 
  Menu, 
  Bell, 
  User as UserIcon, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  PenTool, 
  FileCheck2, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Shield,
  Layers,
  Award
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
  const [selectedGermanLevel, setSelectedGermanLevel] = useState<string>('A1');
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Render content according to current selected tab
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
              <div className="bg-slate-900 text-white p-4 rounded-xl shrink-0 min-w-[240px] border border-slate-800 shadow-sm relative overflow-hidden">
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

            {/* Special German Level Switcher if German Program */}
            {program.id === 'GERMAN' && (
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-[#EA580C] tracking-wider">
                      German Level-Based Learning
                    </span>
                    <h3 className="text-sm font-bold text-[#0F172A] mt-0.5">
                      Select CEFR Proficiency Level
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-500 hidden sm:inline">
                    Initial structure supports A1-B2 alongside skill modules
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-4">
                  {(program.levels || ['A1', 'A2', 'B1', 'B2']).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedGermanLevel(lvl)}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all text-center border ${
                        selectedGermanLevel === lvl
                          ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Level {lvl}
                    </button>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-200">
                  Active Level: <span className="font-bold text-[#0F172A]">{selectedGermanLevel}</span> — Access German skill areas below: Vocabulary, Grammar, Lesen, Hören, Schreiben, and Sprechen tailored to {selectedGermanLevel}.
                </div>
              </div>
            )}

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

            {/* Continue Learning & Progress Summary */}
            <div className="grid md:grid-cols-12 gap-6">
              {/* Continue Learning */}
              <div className="md:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
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
                      {program.recentActivity[0]?.title || 'Core Diagnostic Orientation'}
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Section: {program.recentActivity[0]?.area || program.learningAreas[0]} &bull; Estimated: 15 mins remaining
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

                {/* Recent Activity */}
                <div>
                  <div className="text-[11px] font-bold uppercase text-slate-500 tracking-wider mb-2">
                    Recent Activity
                  </div>
                  <div className="space-y-2">
                    {program.recentActivity.map((act) => (
                      <div
                        key={act.id}
                        className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2
                            className={`w-4 h-4 ${
                              act.status === 'completed'
                                ? 'text-green-600'
                                : 'text-amber-500'
                            }`}
                          />
                          <div>
                            <span className="font-semibold text-slate-800">
                              {act.title}
                            </span>
                            <span className="text-[11px] text-slate-400 ml-2">
                              ({act.area})
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] text-slate-400 shrink-0">
                          {act.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress Summary & Program-Specific Announcements */}
              <div className="md:col-span-5 space-y-6">
                {/* Progress Summary */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                  <div className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-3">
                    Progress Summary
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-600">Core Course Completion</span>
                        <span className="text-[#0F172A]">38%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#EA580C] rounded-full"
                          style={{ width: '38%' }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">
                          {program.quickStats.targetMetric}
                        </div>
                        <div className="text-sm font-bold text-[#0F172A] mt-0.5">
                          {program.quickStats.targetValue}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">
                          Target Hours
                        </div>
                        <div className="text-sm font-bold text-[#0F172A] mt-0.5">
                          {program.quickStats.hoursPledged}
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 italic pt-1">
                      Detailed scoring models &amp; AI evaluation logic are scheduled for the next phase.
                    </p>
                  </div>
                </div>

                {/* Announcements - Strictly program-specific notices */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                      {program.name} Announcements
                    </span>
                    <span className="text-[10px] font-semibold text-[#EA580C] bg-orange-50 px-2 py-0.5 rounded">
                      Filtered to {program.name}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {program.announcements.map((ann) => (
                      <div
                        key={ann.id}
                        className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-200 bg-slate-50/40 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#EA580C] uppercase tracking-wider">
                            {ann.tag}
                          </span>
                          <span className="text-[10px] text-slate-400">{ann.date}</span>
                        </div>
                        <div className="font-semibold text-slate-800 mt-1">
                          {ann.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
              <p className="text-xs text-slate-500 mt-1">
                Review core lessons, foundational guides, and conceptual explanations designed for {program.name}.
              </p>
            </div>

            <div className="grid gap-3">
              {program.learningAreas.map((area, idx) => (
                <div
                  key={area}
                  className="p-4 rounded-xl border border-slate-200 hover:border-[#EA580C] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#0F172A] font-bold text-xs flex items-center justify-center">
                        0{idx + 1}
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-[#0F172A]">{area}</h3>
                        <p className="text-[11px] text-slate-500">
                          Comprehensive preparation strategies and task rubrics
                        </p>
                      </div>
                    </div>
                    <button className="py-1 px-3 text-xs font-semibold rounded-md bg-slate-100 hover:bg-[#0F172A] hover:text-white transition-colors">
                      View Lessons
                    </button>
                  </div>
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
              <p className="text-xs text-slate-500 mt-1">
                Focus on isolated question types and targeted speed drills.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-orange-50/50 border border-orange-200 text-xs text-slate-700 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#0F172A]">Phase 1 Interface Specification:</span> Detailed question banks, live audio recording, automated scoring models, and AI feedback are scheduled for the subsequent phase according to Section 8 of the Brief.
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {program.learningAreas.map((area) => (
                <div key={area} className="p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-[#0F172A]">{area} Drills</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    12 practice sets configured for {program.name} format.
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">Readiness: High</span>
                    <button className="text-xs font-semibold text-[#EA580C] hover:underline">
                      Start Session &rarr;
                    </button>
                  </div>
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
                Full-Length Simulation
              </span>
              <h2 className="text-xl font-bold text-[#0F172A] mt-1">
                {program.mockTestLabel}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Standardized timed mock examinations mirroring real testing conditions.
              </p>
            </div>

            <div className="space-y-3">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className="p-4 rounded-xl border border-slate-200 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-[#EA580C] uppercase tracking-wider">
                      Simulation #{num}
                    </span>
                    <h3 className="text-xs font-bold text-[#0F172A] mt-0.5">
                      {program.name} Official Format Mock Examination {num}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Full timed test battery with sectional pacing
                    </p>
                  </div>
                  <button className="py-1.5 px-3 bg-[#0F172A] text-white hover:bg-slate-800 text-xs font-semibold rounded-lg">
                    Schedule Test
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'progress':
        return (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                Performance Tracking
              </span>
              <h2 className="text-xl font-bold text-[#0F172A] mt-1">
                {program.name} Diagnostic &amp; Milestone Progress
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Completion rates across all assigned learning modules.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Target Goal
                </span>
                <div className="text-xl font-bold text-[#0F172A] mt-1">
                  {program.quickStats.targetValue}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {program.quickStats.targetMetric}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Modules Handled
                </span>
                <div className="text-xl font-bold text-[#0F172A] mt-1">
                  {program.quickStats.modulesCount} / {program.quickStats.modulesCount}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Active syllabus coverage</div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Study Commitment
                </span>
                <div className="text-xl font-bold text-[#EA580C] mt-1">
                  {program.quickStats.hoursPledged}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Recommended timeline</div>
              </div>
            </div>
          </div>
        );

      case 'resources':
        return (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                Approved Materials
              </span>
              <h2 className="text-xl font-bold text-[#0F172A] mt-1">
                {program.name} Reference Files &amp; Study Sheets
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Downloadable guides and reference templates curated exclusively for {program.name}.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { title: `${program.name} Scoring Criteria & Rubric Guide`, size: '1.4 MB PDF' },
                { title: `${program.name} High-Frequency Vocabulary Bank`, size: '2.1 MB PDF' },
                { title: `${program.name} Official Format Strategy Sheet`, size: '850 KB PDF' },
                { title: `${program.name} Common Mistakes & Penalties Guide`, size: '1.1 MB PDF' },
              ].map((res, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#0F172A]">{res.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{res.size}</div>
                  </div>
                  <button className="text-xs font-semibold text-[#EA580C] hover:underline">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6 max-w-2xl">
            <div>
              <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                Student Account
              </span>
              <h2 className="text-xl font-bold text-[#0F172A] mt-1">
                Personal Profile &amp; Program Enrollment
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Your assigned program credentials and security settings.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Full Name</span>
                <span className="font-semibold text-[#0F172A]">{user.fullName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Email Address</span>
                <span className="font-semibold text-[#0F172A]">{user.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Phone Number</span>
                <span className="font-semibold text-[#0F172A]">{user.phone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 items-center">
                <span className="text-slate-500">Assigned Learning Program</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#EA580C] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                    {program.name}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    (Student cannot self-modify)
                  </span>
                </div>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Enrolled Since</span>
                <span className="font-semibold text-[#0F172A]">{user.registrationDate}</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#0F172A] block">
                  Need to change your learning program?
                </span>
                <span className="text-[11px] text-slate-500">
                  Per ALC isolation rules, only an authorized administrator can update your assignment.
                </span>
              </div>
              <button
                onClick={onOpenAdminModal}
                className="py-1.5 px-3 bg-[#0F172A] text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Admin Desk
              </button>
            </div>
          </div>
        );

      default:
        return null;
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
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 relative transition-colors"
              title="Program Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EA580C]" />
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200 p-3 z-30 text-xs">
                <div className="font-bold text-[#0F172A] pb-2 border-b border-slate-100">
                  {program.name} Updates
                </div>
                <div className="py-2 space-y-2">
                  {program.announcements.map((a) => (
                    <div key={a.id} className="text-[11px] text-slate-700">
                      <span className="font-semibold block text-[#0F172A]">{a.title}</span>
                      <span className="text-slate-400">{a.date}</span>
                    </div>
                  ))}
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
