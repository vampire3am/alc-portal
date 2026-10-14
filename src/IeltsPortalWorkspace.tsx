import React, { useState, useRef, useEffect } from 'react';
import { UserAccount, ViewTab, IeltsQuestion, IeltsFullMockTest } from './types';
import { IELTS_ACTUAL_TESTS } from './ieltsCurriculum';
import { 
  Headphones, 
  BookOpen, 
  PenTool, 
  Mic, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  Square, 
  RotateCcw, 
  Volume2, 
  Search, 
  HelpCircle, 
  Award, 
  ArrowRight, 
  Layers, 
  Check, 
  X,
  Sparkles,
  BarChart3
} from 'lucide-react';

interface IeltsPortalWorkspaceProps {
  user: UserAccount;
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
}

export const IeltsPortalWorkspace: React.FC<IeltsPortalWorkspaceProps> = ({
  user,
  currentTab,
  onSelectTab,
}) => {
  const activeTest = IELTS_ACTUAL_TESTS[0];

  // Active module within IELTS Practice / Mock Test
  const [activeIeltsSkill, setActiveIeltsSkill] = useState<'reading' | 'listening' | 'writing' | 'speaking'>('reading');

  // Reading & Listening interactive state
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState<number>(7);
  const [highlightSnippet, setHighlightSnippet] = useState<string | null>(null);
  const [activeExplainId, setActiveExplainId] = useState<number | null>(null);

  // Writing state
  const [writingTaskSelection, setWritingTaskSelection] = useState<1 | 2>(1);
  const [writingText, setWritingText] = useState('');
  const [showBand9Model, setShowBand9Model] = useState(false);

  // Speaking state (Part 1, 2 Cue card, Part 3)
  const [speakingPart, setSpeakingPart] = useState<1 | 2 | 3>(2);
  const [prepSecondsLeft, setPrepSecondsLeft] = useState<number>(60);
  const [isPrepActive, setIsPrepActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Timer countdown simulation (e.g. 60:00 for Reading/Writing)
  const [remainingTime, setRemainingTime] = useState<number>(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Prep timer for Speaking Part 2
  useEffect(() => {
    let interval: any = null;
    if (isPrepActive && prepSecondsLeft > 0) {
      interval = setInterval(() => {
        setPrepSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (prepSecondsLeft === 0) {
      setIsPrepActive(false);
    }
    return () => clearInterval(interval);
  }, [isPrepActive, prepSecondsLeft]);

  // Voice recording handlers
  const startSpeakingRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setRecordedAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      setIsRecording(true);
      setRecordedAudioUrl(null);
    } catch {
      setIsRecording(true);
      setRecordedAudioUrl('simulated-recording');
    }
  };

  const stopSpeakingRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (!recordedAudioUrl) setRecordedAudioUrl('simulated-recording');
  };

  // Text-To-Speech for Listening audio & Speaking examiners
  const speakEnglish = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Live Word Counter
  const wordCount = writingText.trim() ? writingText.trim().split(/\s+/).length : 0;
  const currentWritingTask = activeTest.writing.find((w) => w.taskNumber === writingTaskSelection)!;

  // Calculate Band Score for Reading / Listening
  const answeredCount = Object.keys(userAnswers).length;
  let correctCount = 0;
  activeTest.reading[0].questions.forEach((q) => {
    if (userAnswers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()) {
      correctCount++;
    }
  });
  activeTest.listening.forEach((sec) => {
    sec.questions.forEach((q) => {
      if (userAnswers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()) {
        correctCount++;
      }
    });
  });

  const estimatedBand = correctCount >= 10 ? '8.5 - 9.0' : correctCount >= 7 ? '7.5' : correctCount >= 5 ? '6.5' : '5.5';

  // Format time mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // ==========================================
  // TAB 1: DASHBOARD
  // ==========================================
  if (currentTab === 'dashboard') {
    return (
      <div className="space-y-6">
        {/* Welcome block */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                IELTS Academic Preparation Portal
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                Student: {user.id}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#0F172A] mt-1 tracking-tight">
              Welcome back, {user.fullName}!
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Your workspace is configured with computer-delivered IELTS exam simulation technology modeled after official British Council &amp; IDP testing standards. Access complete practice batteries across all four macro modules.
            </p>
          </div>

          <div className="bg-slate-900 text-white p-5 rounded-xl shrink-0 min-w-[240px] border border-slate-800 shadow-sm relative overflow-hidden">
            <div className="text-[10px] uppercase font-bold text-[#EA580C] tracking-wider">
              Enrolled Exam Track
            </div>
            <div className="text-xl font-bold mt-0.5 tracking-tight flex items-center gap-2">
              <span>IELTS Academic</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-1">
              Target Band: 7.5 &ndash; 8.5
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Platform Mode:</span>
              <span className="font-semibold text-emerald-400">Computer Delivered</span>
            </div>
          </div>
        </div>

        {/* Quick Module Shortcuts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { id: 'reading', title: 'Academic Reading', desc: 'Split-Screen & Locate Feature', icon: <BookOpen className="w-4 h-4 text-purple-600" /> },
            { id: 'listening', title: 'IELTS Listening', desc: 'Sections 1–4 Audio Pacing', icon: <Headphones className="w-4 h-4 text-blue-600" /> },
            { id: 'writing', title: 'Academic Writing', desc: 'Task 1 & 2 Live Word Counter', icon: <PenTool className="w-4 h-4 text-[#EA580C]" /> },
            { id: 'speaking', title: 'Speaking Interview', desc: 'Cue Card & Audio Recorder', icon: <Mic className="w-4 h-4 text-emerald-600" /> },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setActiveIeltsSkill(item.id as any);
                onSelectTab('practice');
              }}
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#EA580C] hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center mb-2.5 group-hover:border-[#EA580C]">
                {item.icon}
              </div>
              <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#EA580C]">
                {item.title}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Featured IELTS Recent Actual Test Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-white border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-[#EA580C] bg-orange-950/60 border border-orange-800/60 px-2.5 py-0.5 rounded">
              High Yield Simulation
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              {activeTest.title}
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Authentic computer-based examination featuring split-screen Reading, Audio Listening dialogue with auto-pacing, Task 1 &amp; 2 Writing assessment, and Cue-Card speaking recorder.
            </p>
          </div>

          <button
            onClick={() => {
              setActiveIeltsSkill('reading');
              onSelectTab('practice');
            }}
            className="shrink-0 py-3 px-6 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <span>Launch Test Interface</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // TAB 2 & 3: PRACTICE & MOCK TESTS (Real Computer-Delivered Interface)
  // ==========================================
  return (
    <div className="space-y-4">
      {/* Top Test Navigation Bar (modeled after ieltsonlinetests.com) */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {[
            { id: 'reading', label: 'Reading', icon: <BookOpen className="w-3.5 h-3.5" /> },
            { id: 'listening', label: 'Listening', icon: <Headphones className="w-3.5 h-3.5" /> },
            { id: 'writing', label: 'Writing', icon: <PenTool className="w-3.5 h-3.5" /> },
            { id: 'speaking', label: 'Speaking', icon: <Mic className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveIeltsSkill(tab.id as any)}
              className={`flex items-center gap-1.5 py-2 px-3.5 rounded-lg text-xs font-bold transition-all ${
                activeIeltsSkill === tab.id
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Countdown Timer & Submit Action */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-mono font-bold">
            <Clock className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>Time Left: {formatTime(remainingTime)}</span>
          </div>

          {!testSubmitted ? (
            <button
              onClick={() => setTestSubmitted(true)}
              className="py-2 px-4 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs rounded-lg transition-colors shadow-xs"
            >
              Submit &amp; Score Test
            </button>
          ) : (
            <button
              onClick={() => {
                setTestSubmitted(false);
                setUserAnswers({});
                setHighlightSnippet(null);
                setActiveExplainId(null);
              }}
              className="py-2 px-4 bg-slate-800 text-white font-bold text-xs rounded-lg hover:bg-slate-700"
            >
              Retake Test
            </button>
          )}
        </div>
      </div>

      {/* Band Score Results Header if submitted */}
      {testSubmitted && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between text-xs text-green-900 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm">Test Completed &bull; Band Score Estimated: Band {estimatedBand}</div>
              <div className="text-green-700 mt-0.5">
                Correct Answers: <strong>{correctCount}</strong> out of {answeredCount} attempted questions. Use "Locate" and "Explain" below to inspect rationale.
              </div>
            </div>
          </div>
          <span className="text-xs font-bold bg-white text-green-800 px-3 py-1.5 rounded-lg border border-green-300">
            Official IELTS Scale 9.0
          </span>
        </div>
      )}

      {/* ==========================================
          1. READING MODULE: REAL SPLIT-SCREEN LAYOUT
          ========================================== */}
      {activeIeltsSkill === 'reading' && (
        <div className="grid lg:grid-cols-12 gap-4 items-start">
          {/* Left Pane: Reading Passage with Highlight and Locate sync */}
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-xs h-[720px] overflow-y-auto space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C]">
                Reading Passage 1
              </span>
              <h3 className="text-base font-bold text-[#0F172A] mt-0.5">
                {activeTest.reading[0].title}
              </h3>
              <p className="text-xs text-slate-500 italic mt-0.5">
                {activeTest.reading[0].subtitle}
              </p>
            </div>

            <div className="text-xs text-slate-800 leading-relaxed font-serif space-y-4 whitespace-pre-line text-justify">
              {activeTest.reading[0].passageText}
            </div>

            {highlightSnippet && (
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg text-xs text-amber-900 mt-4 animate-in fade-in">
                <span className="font-bold block text-[#EA580C] uppercase text-[10px]">
                  Locate Answer in Passage:
                </span>
                <p className="italic mt-1">"{highlightSnippet}"</p>
              </div>
            )}
          </div>

          {/* Right Pane: Questions & Answer fields */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-xs h-[720px] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Questions 7 &ndash; 11
              </div>
              <span className="text-[11px] text-slate-500">True / False / Not Given &amp; Multiple Choice</span>
            </div>

            <div className="space-y-4">
              {activeTest.reading[0].questions.map((q) => {
                const isSelected = userAnswers[q.id];
                const isCorrect = isSelected?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim();

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border transition-all ${
                      activeQuestionId === q.id
                        ? 'border-[#0F172A] ring-1 ring-[#0F172A]'
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-[#0F172A]">
                        Question {q.id}: {q.questionText}
                      </span>
                    </div>

                    {/* Question Type: True/False/Not Given */}
                    {q.type === 'true_false_not_given' && (
                      <div className="flex gap-2 mt-3">
                        {['True', 'False', 'Not Given'].map((opt) => (
                          <button
                            key={opt}
                            disabled={testSubmitted}
                            onClick={() => {
                              setUserAnswers((prev) => ({ ...prev, [q.id]: opt }));
                              setActiveQuestionId(q.id);
                            }}
                            className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
                              userAnswers[q.id] === opt
                                ? 'bg-[#0F172A] text-white border-[#0F172A]'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Question Type: Multiple Choice */}
                    {q.type === 'multiple_choice' && q.options && (
                      <div className="space-y-1.5 mt-3">
                        {q.options.map((opt) => (
                          <button
                            key={opt}
                            disabled={testSubmitted}
                            onClick={() => {
                              setUserAnswers((prev) => ({ ...prev, [q.id]: opt }));
                              setActiveQuestionId(q.id);
                            }}
                            className={`w-full text-left p-2 rounded-lg text-xs font-medium border transition-all ${
                              userAnswers[q.id] === opt
                                ? 'bg-[#0F172A] text-white border-[#0F172A]'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Question Type: Sentence Completion */}
                    {q.type === 'sentence_completion' && (
                      <div className="mt-3">
                        <input
                          type="text"
                          disabled={testSubmitted}
                          value={userAnswers[q.id] || ''}
                          placeholder="Write correct word(s)..."
                          onChange={(e) => setUserAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                          className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                    )}

                    {/* Signature ieltsonlinetests.com Features: Locate & Explain */}
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <button
                        onClick={() => setHighlightSnippet(q.locateSnippet || null)}
                        className="text-[#EA580C] hover:underline font-semibold flex items-center gap-1"
                      >
                        <Search className="w-3 h-3" />
                        <span>Locate in Text</span>
                      </button>

                      <button
                        onClick={() => setActiveExplainId(activeExplainId === q.id ? null : q.id)}
                        className="text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1"
                      >
                        <HelpCircle className="w-3 h-3" />
                        <span>Explain Answer</span>
                      </button>
                    </div>

                    {activeExplainId === q.id && q.explanation && (
                      <div className="mt-2 p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-700 border border-slate-200 animate-in fade-in">
                        <strong>Rationale:</strong> {q.explanation}
                      </div>
                    )}

                    {testSubmitted && (
                      <div className="mt-2 text-xs font-semibold flex items-center gap-1.5">
                        {isCorrect ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <Check className="w-4 h-4" /> Correct Answer
                          </span>
                        ) : (
                          <span className="text-red-600 flex items-center gap-1">
                            <X className="w-4 h-4" /> Correct was: {q.correctAnswer}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          2. LISTENING MODULE: AUDIO PACING & QUESTIONS
          ========================================== */}
      {activeIeltsSkill === 'listening' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                IELTS Listening Test &bull; Section 1
              </span>
              <h3 className="text-xl font-bold text-[#0F172A] mt-0.5">
                {activeTest.listening[0].title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Context: {activeTest.listening[0].context}
              </p>
            </div>

            {/* Embedded Audio Player */}
            <div className="bg-slate-900 text-white p-3 rounded-xl flex items-center gap-3">
              <button
                onClick={() => speakEnglish(activeTest.listening[0].audioTranscript)}
                className="py-2 px-4 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold flex items-center gap-1.5 transition-transform active:scale-95 shadow-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span>Play Section 1 Audio</span>
              </button>
              <span className="text-[11px] text-slate-300">Single-Play Simulation</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {activeTest.listening[0].questions.map((q) => (
              <div key={q.id} className="p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-[#0F172A]">
                  Question {q.id}: {q.questionText}
                </div>

                {q.type === 'multiple_choice' && q.options && (
                  <div className="space-y-1.5">
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        disabled={testSubmitted}
                        onClick={() => setUserAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                        className={`w-full text-left p-2 rounded-lg text-xs font-medium border transition-all ${
                          userAnswers[q.id] === opt
                            ? 'bg-[#0F172A] text-white border-[#0F172A]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {q.type === 'sentence_completion' && (
                  <input
                    type="text"
                    disabled={testSubmitted}
                    value={userAnswers[q.id] || ''}
                    placeholder="Enter answer word..."
                    onChange={(e) => setUserAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                  />
                )}

                {testSubmitted && (
                  <div className="text-xs font-semibold pt-1">
                    {userAnswers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim() ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <Check className="w-4 h-4" /> Correct ({q.correctAnswer})
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center gap-1">
                        <X className="w-4 h-4" /> Correct was: {q.correctAnswer}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          3. WRITING MODULE: TASK 1 & 2 WITH WORD COUNTER & MODEL
          ========================================== */}
      {activeIeltsSkill === 'writing' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setWritingTaskSelection(1)}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  writingTaskSelection === 1 ? 'bg-[#0F172A] text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Task 1 (Report &bull; min 150 words)
              </button>
              <button
                onClick={() => setWritingTaskSelection(2)}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  writingTaskSelection === 2 ? 'bg-[#0F172A] text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Task 2 (Essay &bull; min 250 words)
              </button>
            </div>

            <button
              onClick={() => setShowBand9Model(!showBand9Model)}
              className="text-xs font-bold text-[#EA580C] hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{showBand9Model ? 'Hide' : 'View'} Band 9 Model Response</span>
            </button>
          </div>

          {/* Task Prompt Box */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between font-bold text-[#0F172A]">
              <span>{currentWritingTask.title}</span>
              <span className="text-slate-500">Suggested Time: {currentWritingTask.recommendedMinutes} mins</span>
            </div>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
              {currentWritingTask.taskPrompt}
            </p>

            {/* Visual Bar chart mock for Task 1 */}
            {currentWritingTask.visualChartData && (
              <div className="p-4 bg-white rounded-lg border border-slate-200 mt-2 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-500">
                  Visual Data: {currentWritingTask.visualChartType}
                </span>
                <div className="space-y-2 pt-1">
                  {currentWritingTask.visualChartData.map((d) => (
                    <div key={d.label} className="text-xs">
                      <div className="flex justify-between text-[11px] text-slate-600">
                        <span>{d.label}</span>
                        <span>2010: {d.valueA}% | 2020: {d.valueB}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full flex gap-1 mt-0.5">
                        <div className="h-full bg-slate-400 rounded-full" style={{ width: `${d.valueA}%` }} />
                        <div className="h-full bg-[#EA580C] rounded-full" style={{ width: `${d.valueB}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {showBand9Model && (
            <div className="p-5 bg-orange-50/60 border border-orange-200 rounded-xl text-xs space-y-2 animate-in fade-in">
              <span className="font-bold text-[#EA580C] uppercase tracking-wider text-[10px] block">
                Official Examiner Band 9 Sample Response:
              </span>
              <p className="text-slate-800 leading-relaxed font-serif whitespace-pre-line">
                {currentWritingTask.sampleBand9Response}
              </p>
            </div>
          )}

          {/* Typing Area with Real Live Word Counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#0F172A] uppercase tracking-wider text-[11px]">
                Student Response Editor
              </label>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Live Word Count:</span>
                <span
                  className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                    wordCount >= currentWritingTask.targetWords
                      ? 'bg-green-100 text-green-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {wordCount} / {currentWritingTask.targetWords} words
                </span>
              </div>
            </div>

            <textarea
              rows={12}
              value={writingText}
              onChange={(e) => setWritingText(e.target.value)}
              placeholder="Type your essay or report here. Word count updates automatically..."
              className="w-full p-4 rounded-xl border border-slate-300 font-sans text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F172A] leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* ==========================================
          4. SPEAKING MODULE: CUE CARD & AUDIO RECORDER
          ========================================== */}
      {activeIeltsSkill === 'speaking' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((pt) => (
                <button
                  key={pt}
                  onClick={() => setSpeakingPart(pt as any)}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                    speakingPart === pt ? 'bg-[#0F172A] text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Part {pt} {pt === 2 ? '(Cue Card)' : ''}
                </button>
              ))}
            </div>
            <span className="text-xs text-slate-500">
              Duration: {activeTest.speaking[speakingPart - 1].duration}
            </span>
          </div>

          {/* Speaking Prompt Card */}
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-[#0F172A]">
              {activeTest.speaking[speakingPart - 1].title}
            </h3>
            <p className="text-sm font-semibold text-slate-800">
              "{activeTest.speaking[speakingPart - 1].prompt}"
            </p>

            {speakingPart === 2 && activeTest.speaking[1].cueCardPoints && (
              <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2 mt-2">
                <span className="text-[11px] font-bold text-[#EA580C] uppercase tracking-wider block">
                  You should say:
                </span>
                <ul className="text-xs text-slate-700 space-y-1">
                  {activeTest.speaking[1].cueCardPoints.map((pt, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 1-Minute Prep Countdown for Cue Card */}
          {speakingPart === 2 && (
            <div className="p-4 bg-orange-50/50 border border-orange-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#0F172A]">1-Minute Preparation Timer</span>
                <div className="text-[11px] text-slate-500">Jot down quick key points before speaking</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-lg font-bold text-[#EA580C]">
                  {prepSecondsLeft}s
                </span>
                <button
                  onClick={() => setIsPrepActive(!isPrepActive)}
                  className="py-1.5 px-3 rounded-lg bg-[#0F172A] text-white text-xs font-semibold"
                >
                  {isPrepActive ? 'Pause' : 'Start Prep'}
                </button>
              </div>
            </div>
          )}

          {/* Real Audio Capture */}
          <div className="p-6 bg-slate-900 rounded-xl text-white space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold text-[#EA580C] uppercase tracking-wider">
                Voice Interview Recorder
              </span>
              <span className="text-[11px]">Speak clearly for 1 &ndash; 2 minutes</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 py-4">
              {!isRecording && !recordedAudioUrl && (
                <button
                  onClick={startSpeakingRecording}
                  className="flex items-center gap-2 py-3 px-6 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs shadow-md active:scale-95 transition-transform"
                >
                  <Mic className="w-4 h-4" />
                  <span>Record Answer</span>
                </button>
              )}

              {isRecording && (
                <button
                  onClick={stopSpeakingRecording}
                  className="flex items-center gap-2 py-3 px-6 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs animate-pulse shadow-md"
                >
                  <Square className="w-4 h-4" />
                  <span>Stop Recording</span>
                </button>
              )}

              {recordedAudioUrl && !isRecording && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const audio = new Audio(recordedAudioUrl);
                      audio.play().catch(() => speakEnglish(activeTest.speaking[speakingPart - 1].modelAnswer));
                    }}
                    className="flex items-center gap-2 py-2.5 px-5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
                  >
                    <Play className="w-4 h-4" />
                    <span>Replay Recording</span>
                  </button>

                  <button
                    onClick={() => setRecordedAudioUrl(null)}
                    className="flex items-center gap-2 py-2.5 px-4 rounded-full bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retry</span>
                  </button>
                </div>
              )}
            </div>

            {/* Model Band 9 Answer Audio */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Want to hear how a Band 9 candidate answers?</span>
              <button
                onClick={() => speakEnglish(activeTest.speaking[speakingPart - 1].modelAnswer)}
                className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>Listen Model Response</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
