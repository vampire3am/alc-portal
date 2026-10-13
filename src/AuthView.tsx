import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { ProgramId } from './types';
import { PROGRAMS } from './programData';
import { 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Phone, 
  User, 
  ChevronRight,
  BookOpen,
  Sparkles,
  Info
} from 'lucide-react';

interface AuthViewProps {
  onLoginSuccess: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const { login, register, users } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<ProgramId | null>(null);
  const [showConfirmationStep, setShowConfirmationStep] = useState(false);
  const [registerError, setRegisterError] = useState('');

  // Forgot password mock
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const programList: ProgramId[] = ['IELTS', 'PTE', 'DET', 'GERMAN'];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginIdentifier) {
      setLoginError('Please enter your email address or phone number.');
      return;
    }

    const res = login(loginIdentifier, loginPassword);
    if (!res.success) {
      setLoginError(res.error || 'Authentication failed');
    } else {
      onLoginSuccess();
    }
  };

  const handleQuickDemoSelect = (userEmail: string) => {
    setLoginIdentifier(userEmail);
    setLoginPassword('password123');
    const res = login(userEmail);
    if (res.success) {
      onLoginSuccess();
    }
  };

  const validateRegisterFirstStep = () => {
    setRegisterError('');
    if (!fullName.trim()) {
      setRegisterError('Please enter your full name.');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      setRegisterError('Please provide a valid email address.');
      return false;
    }
    if (!phone.trim()) {
      setRegisterError('Please enter your phone number.');
      return false;
    }
    if (!password || password.length < 6) {
      setRegisterError('Password must be at least 6 characters.');
      return false;
    }
    if (password !== confirmPassword) {
      setRegisterError('Passwords do not match.');
      return false;
    }
    if (!selectedProgram) {
      setRegisterError('Registration requires selecting exactly one learning program.');
      return false;
    }
    return true;
  };

  const handleProceedToConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateRegisterFirstStep()) {
      setShowConfirmationStep(true);
    }
  };

  const handleFinalRegister = () => {
    if (!selectedProgram) return;

    const res = register({
      fullName,
      email,
      phone,
      assignedProgram: selectedProgram,
    });

    if (!res.success) {
      setRegisterError(res.error || 'Registration failed');
      setShowConfirmationStep(false);
    } else {
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 py-3.5 px-6 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0F172A] text-white flex items-center justify-center font-bold text-lg tracking-wider shadow-sm">
              ALC
            </div>
            <div>
              <div className="font-bold text-[#0F172A] text-base leading-tight tracking-tight">
                AECS Learning Center
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Student Preparation & Practice Portal
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMode('login');
                setShowConfirmationStep(false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                mode === 'login'
                  ? 'bg-[#0F172A] text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('register');
                setShowConfirmationStep(false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                mode === 'register'
                  ? 'bg-[#EA580C] text-white hover:bg-[#C2410C]'
                  : 'text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 flex flex-col justify-center">
        {mode === 'login' && (
          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Left Column: Login Form */}
            <div className="md:col-span-7 bg-white p-7 rounded-xl border border-slate-200 shadow-sm">
              <div className="mb-6">
                <span className="text-xs font-semibold text-[#EA580C] tracking-wide uppercase">
                  Student Access
                </span>
                <h1 className="text-2xl font-bold text-[#0F172A] mt-1">
                  Log in to your ALC account
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Access your assigned learning portal, lessons, and practice materials.
                </p>
              </div>

              {loginError && (
                <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email address or phone number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="student@example.com or +977 98..."
                      className="w-full text-xs py-2.5 px-3 pl-9 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:border-transparent text-slate-900 bg-white"
                      required
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-xs text-[#EA580C] hover:underline font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-xs py-2.5 px-3 pl-9 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:border-transparent text-slate-900 bg-white"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Sign In to Student Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>New to AECS Learning Center?</span>
                <button
                  onClick={() => setMode('register')}
                  className="font-semibold text-[#EA580C] hover:underline"
                >
                  Create an account
                </button>
              </div>
            </div>

            {/* Right Column: Fast Demo Switcher for Evaluation */}
            <div className="md:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] pb-2 border-b border-slate-100">
                <Sparkles className="w-4 h-4 text-[#EA580C]" />
                <span>Instant Demo: Test Program Isolation</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Click any registered sample student below to verify that the portal completely isolates their content, navigation, and practice areas:
              </p>

              <div className="space-y-2.5 pt-1">
                {users.map((u) => {
                  const prog = PROGRAMS[u.assignedProgram];
                  return (
                    <button
                      key={u.id}
                      onClick={() => handleQuickDemoSelect(u.email)}
                      className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-[#EA580C] hover:bg-orange-50/30 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-xs font-semibold text-[#0F172A] group-hover:text-[#EA580C]">
                          {u.fullName}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {u.email}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-[#0F172A] border border-slate-200">
                          {prog?.name || u.assignedProgram}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Isolated Portal &rarr;
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
                <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>
                  According to the Brief, once logged in, a student cannot switch programs or view any links/resources of another program.
                </span>
              </div>
            </div>
          </div>
        )}

        {mode === 'register' && !showConfirmationStep && (
          <div className="max-w-3xl mx-auto w-full bg-white p-7 rounded-xl border border-slate-200 shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-semibold text-[#EA580C] tracking-wide uppercase">
                Student Registration
              </span>
              <h1 className="text-2xl font-bold text-[#0F172A] mt-1">
                Enroll in AECS Learning Center
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Select your designated learning program and complete your basic student profile.
              </p>
            </div>

            {registerError && (
              <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{registerError}</span>
              </div>
            )}

            <form onSubmit={handleProceedToConfirmation} className="space-y-6">
              {/* Account Details */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Bipin Nepal"
                      className="w-full text-xs py-2 px-3 pl-9 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F172A] text-slate-900"
                      required
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full text-xs py-2 px-3 pl-9 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F172A] text-slate-900"
                      required
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+977 98..."
                      className="w-full text-xs py-2 px-3 pl-9 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F172A] text-slate-900"
                      required
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Password *
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 6 chars"
                      className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F172A] text-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Confirm *
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat"
                      className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F172A] text-slate-900"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Program Selection Cards */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                    Choose Your Learning Program *
                  </label>
                  <span className="text-[11px] text-slate-500">
                    Strict 1-program assignment
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {programList.map((progId) => {
                    const prog = PROGRAMS[progId];
                    const isSelected = selectedProgram === progId;

                    return (
                      <div
                        key={progId}
                        onClick={() => setSelectedProgram(progId)}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all relative ${
                          isSelected
                            ? 'border-[#EA580C] bg-orange-50/30 ring-2 ring-[#EA580C]/20 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[11px] font-bold text-[#0F172A] uppercase tracking-wider block">
                              {prog.name}
                            </span>
                            <span className="text-[11px] font-medium text-slate-500">
                              {prog.badge}
                            </span>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? 'bg-[#EA580C] border-[#EA580C] text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                          {prog.description}
                        </p>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1">
                          {prog.learningAreas.slice(0, 3).map((area) => (
                            <span
                              key={area}
                              className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium"
                            >
                              {area}
                            </span>
                          ))}
                          {prog.learningAreas.length > 3 && (
                            <span className="text-[10px] text-slate-400 px-1 py-0.5">
                              +{prog.learningAreas.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-xs text-slate-600 hover:text-[#0F172A] font-medium"
                >
                  Back to Sign In
                </button>

                <button
                  type="submit"
                  className="py-2.5 px-6 bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                >
                  <span>Review & Confirm Program</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Program Confirmation State (Explicit requirement from Brief) */}
        {mode === 'register' && showConfirmationStep && selectedProgram && (
          <div className="max-w-xl mx-auto w-full bg-white p-7 rounded-xl border border-slate-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-orange-100 text-[#EA580C] rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
              Step 3: Program Confirmation
            </span>

            {/* Exact requirement line from OCR / PDF brief: "You are registering for: [PROGRAM]" */}
            <h2 className="text-2xl font-bold text-[#0F172A] mt-2 mb-1">
              You are registering for: {PROGRAMS[selectedProgram].name}
            </h2>

            <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
              Please verify your selected learning program. After registration, your student portal and practice areas will be exclusively isolated to {PROGRAMS[selectedProgram].name}.
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left mb-6 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Student Name:</span>
                <span className="font-semibold text-[#0F172A]">{fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Email Address:</span>
                <span className="font-semibold text-[#0F172A]">{email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Phone Number:</span>
                <span className="font-semibold text-[#0F172A]">{phone}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Assigned Portal Scope:</span>
                <span className="font-bold text-[#EA580C]">
                  {PROGRAMS[selectedProgram].name} Only
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center">
              <button
                type="button"
                onClick={() => setShowConfirmationStep(false)}
                className="py-2.5 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              >
                Change Program
              </button>

              <button
                type="button"
                onClick={handleFinalRegister}
                className="py-2.5 px-6 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Confirm & Create Account</span>
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              </button>
            </div>
          </div>
        )}

        {mode === 'forgot' && (
          <div className="max-w-md mx-auto w-full bg-white p-7 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-[#0F172A] mb-1">
              Reset Student Password
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Enter your registered student email or phone number to receive reset instructions.
            </p>

            {forgotSent ? (
              <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 text-xs">
                <p className="font-semibold">Instructions sent!</p>
                <p className="mt-1">
                  We've dispatched a reset link to {forgotEmail}. Please check your inbox or SMS.
                </p>
                <button
                  onClick={() => {
                    setForgotSent(false);
                    setMode('login');
                  }}
                  className="mt-3 text-[#0F172A] font-semibold underline block"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (forgotEmail) setForgotSent(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Registered Email or Phone
                  </label>
                  <input
                    type="text"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                    required
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-xs text-slate-600 hover:text-slate-900"
                  >
                    Back to Sign In
                  </button>

                  <button
                    type="submit"
                    className="py-2 px-4 bg-[#0F172A] text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500 bg-white">
        AECS Learning Center (ALC) &bull; Initial Workflow &amp; Interface Brief &bull; Student Registration &amp; Program Isolation
      </footer>
    </div>
  );
};
