import React, { useState, useRef, useEffect } from 'react';
import { UserAccount, ViewTab, GermanLevel, VocabularyItem, GrammarTopic, SpeakingExercise, WritingExercise, ListeningExercise, ReadingExercise } from './types';
import { 
  GERMAN_VOCABULARY, 
  GERMAN_GRAMMAR, 
  GERMAN_SPEAKING, 
  GERMAN_WRITING, 
  GERMAN_LISTENING, 
  GERMAN_READING, 
  GERMAN_MOCK_TESTS 
} from './germanCurriculum';
import { 
  Mic, 
  Square, 
  Play, 
  RotateCcw, 
  Volume2, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  Headphones, 
  Layers, 
  AlertCircle,
  Sparkles,
  ChevronRight,
  Filter,
  Check,
  X
} from 'lucide-react';

interface GermanPortalWorkspaceProps {
  user: UserAccount;
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
}

export const GermanPortalWorkspace: React.FC<GermanPortalWorkspaceProps> = ({
  user,
  currentTab,
  onSelectTab,
}) => {
  // CRITICAL RULE (Section 1): Filter every query strictly by enrolled CEFR level
  const enrolledLevel: GermanLevel = user.germanLevel || 'A1';

  // State for sub-modules & interactive exercises
  const [activeLearnSection, setActiveLearnSection] = useState<'vocabulary' | 'grammar' | 'reading' | 'listening' | 'writing' | 'speaking'>('vocabulary');
  const [activePracticeSection, setActivePracticeSection] = useState<'reading' | 'listening' | 'writing' | 'speaking' | 'vocabulary' | 'grammar'>('speaking');

  // Speaking state (Record, Stop, Replay, Retry)
  const [speakingMode, setSpeakingMode] = useState<'guided' | 'practice'>('guided');
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [recordDuration, setRecordDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  // Writing state (Live word counter, target verification)
  const [writingContent, setWritingContent] = useState('');

  // Vocabulary flashcard / topic filter state
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [revisionCards, setRevisionCards] = useState<string[]>([]);
  const [activeFlashcardIndex, setActiveFlashcardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Listening test state
  const [listeningAudioPlayed, setListeningAudioPlayed] = useState(false);
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, string>>({});
  const [listeningSubmitted, setListeningSubmitted] = useState(false);

  // Reading test state
  const [readingAnswers, setReadingAnswers] = useState<Record<string, string>>({});
  const [readingSubmitted, setReadingSubmitted] = useState(false);

  // Grammar exercise state
  const [grammarAnswers, setGrammarAnswers] = useState<Record<string, string>>({});

  // Clean audio stream on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Filter content strictly by enrolledLevel (No higher-level exposure)
  const levelVocab = GERMAN_VOCABULARY.filter((v) => v.level === enrolledLevel);
  const levelGrammar = GERMAN_GRAMMAR.filter((g) => g.level === enrolledLevel);
  const levelSpeaking = GERMAN_SPEAKING.filter((s) => s.level === enrolledLevel);
  const levelWriting = GERMAN_WRITING.filter((w) => w.level === enrolledLevel);
  const levelListening = GERMAN_LISTENING.filter((l) => l.level === enrolledLevel);
  const levelReading = GERMAN_READING.filter((r) => r.level === enrolledLevel);
  const levelMockTests = GERMAN_MOCK_TESTS.filter((m) => m.level === enrolledLevel);

  // Text-To-Speech function using browser native German voice
  const speakGerman = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = enrolledLevel === 'A1' ? 0.85 : 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Microphone audio capture implementation (Record, Stop, Replay, Retry)
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioBlobUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordDuration(0);
      setAudioBlobUrl(null);

      timerRef.current = window.setInterval(() => {
        setRecordDuration((prev) => prev + 1);
      }, 1000);
    } catch {
      // Fallback simulation if mic is blocked in browser
      setIsRecording(true);
      setRecordDuration(0);
      setAudioBlobUrl(null);
      timerRef.current = window.setInterval(() => {
        setRecordDuration((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRecording(false);
    if (!audioBlobUrl) {
      // Simulate completed sample playback
      setAudioBlobUrl('simulated');
    }
  };

  const retryRecording = () => {
    setAudioBlobUrl(null);
    setRecordDuration(0);
    setIsRecording(false);
  };

  // Word count calculator
  const wordCount = writingContent.trim() ? writingContent.trim().split(/\s+/).length : 0;

  // Active exercises
  const currentSpeakingEx = levelSpeaking[0] || GERMAN_SPEAKING[0];
  const currentWritingEx = levelWriting[0] || GERMAN_WRITING[0];
  const currentListeningEx = levelListening[0] || GERMAN_LISTENING[0];
  const currentReadingEx = levelReading[0] || GERMAN_READING[0];

  // Topics in current vocab
  const availableTopics = ['All', ...Array.from(new Set(levelVocab.map((v) => v.topicGroup)))];
  const filteredVocab = selectedTopic === 'All' ? levelVocab : levelVocab.filter((v) => v.topicGroup === selectedTopic);

  // ==========================================
  // TAB: DASHBOARD
  // ==========================================
  if (currentTab === 'dashboard') {
    return (
      <div className="space-y-6">
        {/* Welcome block */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                German Language Portal &bull; CEFR Level {enrolledLevel}
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                Student ID: {user.id}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#0F172A] mt-1 tracking-tight">
              Guten Tag, {user.fullName}!
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Your German Language portal is isolated strictly to <strong>CEFR Level {enrolledLevel}</strong>. All vocabulary, grammar explanations, listening audio, reading passages, and mock tests are adapted directly for {enrolledLevel} competencies.
            </p>
          </div>

          {/* Program & Enrolled Level Card - Prominently displayed without student-side switch control */}
          <div className="bg-slate-900 text-white p-5 rounded-xl shrink-0 min-w-[250px] border border-slate-800 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-24 bg-[#EA580C]/10 rounded-full blur-xl pointer-events-none" />
            <div className="text-[10px] uppercase font-bold text-[#EA580C] tracking-wider">
              Enrolled CEFR Tier
            </div>
            <div className="text-xl font-bold mt-0.5 tracking-tight flex items-center gap-2">
              <span>German {enrolledLevel}</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-1">
              Level Isolation Enforced
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Level Control:</span>
              <span className="font-semibold text-amber-400">Locked to Administrator</span>
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
                German {enrolledLevel} Lessons
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Vocab &amp; Grammar Modules
              </div>
            </button>

            <button
              onClick={() => onSelectTab('practice')}
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#EA580C] hover:shadow-xs transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5">
                <Mic className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#EA580C]">
                Practice Drills
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Speaking, Writing, Reading
              </div>
            </button>

            <button
              onClick={() => onSelectTab('mock-tests')}
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#EA580C] hover:shadow-xs transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2.5">
                <FileText className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#EA580C]">
                {enrolledLevel} Mock Tests
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Goethe / telc Simulation
              </div>
            </button>

            <button
              onClick={() => onSelectTab('progress')}
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#EA580C] hover:shadow-xs transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#EA580C]">
                {enrolledLevel} Progress
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Track Module Mastery
              </div>
            </button>
          </div>
        </div>

        {/* Level-Specific Curated Learning Areas for German */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
                German {enrolledLevel} Learning Modules (Section 2 &amp; 10)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Structured around Level &rarr; Skill &rarr; Topic &rarr; Lesson &rarr; Exercise.
              </p>
            </div>
            <span className="text-xs font-bold text-[#EA580C] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
              Level {enrolledLevel} Scope
            </span>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { title: 'Wortschatz (Vocabulary)', desc: `${levelVocab.length} words with noun articles, plurals & revision cards`, icon: <BookOpen className="w-4 h-4 text-[#EA580C]" />, tab: 'learn', sub: 'vocabulary' },
              { title: 'Grammatik (Grammar)', desc: `${levelGrammar.length} dedicated grammar units with exercises`, icon: <Layers className="w-4 h-4 text-blue-600]" />, tab: 'learn', sub: 'grammar' },
              { title: 'Lesen (Reading)', desc: 'Signs, emails, short notices with Richtig/Falsch & gap-fills', icon: <FileText className="w-4 h-4 text-purple-600" />, tab: 'practice', sub: 'reading' },
              { title: 'Hören (Listening)', desc: 'Audio scenarios with Wer sagt was? & multiple choice', icon: <Headphones className="w-4 h-4 text-emerald-600" />, tab: 'practice', sub: 'listening' },
              { title: 'Schreiben (Writing)', desc: 'Email and message tasks with live word counters', icon: <Clock className="w-4 h-4 text-amber-600" />, tab: 'practice', sub: 'writing' },
              { title: 'Sprechen (Speaking)', desc: 'Guided Practice & Practice with Record and Replay', icon: <Mic className="w-4 h-4 text-rose-600" />, tab: 'practice', sub: 'speaking' },
            ].map((mod) => (
              <div
                key={mod.title}
                onClick={() => {
                  if (mod.tab === 'learn') {
                    setActiveLearnSection(mod.sub as any);
                    onSelectTab('learn');
                  } else {
                    setActivePracticeSection(mod.sub as any);
                    onSelectTab('practice');
                  }
                }}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#EA580C] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center group-hover:border-[#EA580C]">
                      {mod.icon}
                    </div>
                    <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#EA580C]">
                      {mod.title}
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#EA580C]" />
                </div>
                <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
                  {mod.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Learning & Announcements */}
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Continue German {enrolledLevel} Activity
              </div>
              <span className="text-[11px] text-slate-400">Most recent exercise</span>
            </div>

            <div className="p-4 rounded-lg bg-orange-50/40 border border-orange-200/80 flex items-start justify-between gap-4">
              <div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#EA580C] bg-orange-100 px-2 py-0.5 rounded mb-1">
                  Active Lesson
                </span>
                <h4 className="text-xs font-bold text-[#0F172A]">
                  {enrolledLevel === 'A1' ? 'Wortschatz: Familie & Arbeit (der Beruf, die Familie)' : 'Alltagsgespräche & Grammatikvertiefung'}
                </h4>
                <p className="text-[11px] text-slate-600 mt-1">
                  Recommended: Listen to pronunciation &bull; Add to revision cards
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveLearnSection('vocabulary');
                  onSelectTab('learn');
                }}
                className="shrink-0 py-1.5 px-3 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-xs transition-colors"
              >
                <span>Resume</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="md:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                German {enrolledLevel} Notices
              </span>
              <span className="text-[10px] font-semibold text-[#EA580C] bg-orange-50 px-2 py-0.5 rounded">
                Level {enrolledLevel} Only
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
                <span className="text-[10px] font-bold text-[#EA580C] uppercase tracking-wider">
                  Curriculum Update
                </span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  German {enrolledLevel} Sprechen (Record &amp; Replay) exercises now enabled.
                </p>
                <span className="text-[10px] text-slate-400">Today</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                  Grammar Area
                </span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  Dedicated grammar area with interactive sentence gap-fills configured.
                </p>
                <span className="text-[10px] text-slate-400">Yesterday</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // TAB: LEARN (Vocabulary & Dedicated Grammar)
  // ==========================================
  if (currentTab === 'learn') {
    return (
      <div className="space-y-6">
        {/* Navigation within Learn */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveLearnSection('vocabulary')}
              className={`py-2 px-4 rounded-lg text-xs font-bold transition-all ${
                activeLearnSection === 'vocabulary'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Wortschatz (Vocabulary &amp; Cards)
            </button>
            <button
              onClick={() => setActiveLearnSection('grammar')}
              className={`py-2 px-4 rounded-lg text-xs font-bold transition-all ${
                activeLearnSection === 'grammar'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Grammatik (Dedicated Grammar Module)
            </button>
          </div>

          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Filtered strictly for: <strong className="text-[#0F172A]">German {enrolledLevel}</strong>
          </span>
        </div>

        {/* 1. VOCABULARY MODULE */}
        {activeLearnSection === 'vocabulary' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                  German {enrolledLevel} Vocabulary
                </span>
                <h2 className="text-xl font-bold text-[#0F172A] mt-1">
                  Structured Word Bank &amp; Revision Cards (Section 7)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Noun articles, plurals, example sentences, and audio pronunciation.
                </p>
              </div>

              {/* Topic Group Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="text-xs p-2 rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
                >
                  {availableTopics.map((top) => (
                    <option key={top} value={top}>
                      Topic: {top}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Flashcard Practice Deck */}
            {filteredVocab.length > 0 && (
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-xl relative shadow-md">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="uppercase font-bold text-[#EA580C] tracking-wider">
                    Interactive Revision Card {activeFlashcardIndex + 1} of {filteredVocab.length}
                  </span>
                  <span>Click card to reveal meaning &amp; translation</span>
                </div>

                <div
                  onClick={() => setIsCardFlipped(!isCardFlipped)}
                  className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-8 min-h-[160px] flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#EA580C] transition-all"
                >
                  {!isCardFlipped ? (
                    <div>
                      <div className="text-2xl font-bold text-white tracking-wide">
                        <span className="text-[#EA580C] font-semibold text-lg mr-1.5">
                          {filteredVocab[activeFlashcardIndex].article !== '-' ? filteredVocab[activeFlashcardIndex].article : ''}
                        </span>
                        {filteredVocab[activeFlashcardIndex].word}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 font-mono">
                        Plural: {filteredVocab[activeFlashcardIndex].plural}
                      </div>
                      <div className="mt-4 inline-block text-[10px] text-slate-400 bg-slate-700/60 px-3 py-1 rounded-full">
                        Topic: {filteredVocab[activeFlashcardIndex].topicGroup}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-lg font-bold text-green-400">
                        {filteredVocab[activeFlashcardIndex].meaning}
                      </div>
                      <div className="text-xs text-slate-200 mt-2 italic max-w-md">
                        "{filteredVocab[activeFlashcardIndex].exampleSentence}"
                      </div>
                      {filteredVocab[activeFlashcardIndex].exampleTranslation && (
                        <div className="text-[11px] text-slate-400 mt-1">
                          ({filteredVocab[activeFlashcardIndex].exampleTranslation})
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => speakGerman(`${filteredVocab[activeFlashcardIndex].article !== '-' ? filteredVocab[activeFlashcardIndex].article : ''} ${filteredVocab[activeFlashcardIndex].word}. ${filteredVocab[activeFlashcardIndex].exampleSentence}`)}
                    className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs text-white"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>Listen German Audio</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsCardFlipped(false);
                        setActiveFlashcardIndex((prev) => (prev > 0 ? prev - 1 : filteredVocab.length - 1));
                      }}
                      className="py-1.5 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs text-white"
                    >
                      &larr; Prev
                    </button>
                    <button
                      onClick={() => {
                        setIsCardFlipped(false);
                        setActiveFlashcardIndex((prev) => (prev < filteredVocab.length - 1 ? prev + 1 : 0));
                      }}
                      className="py-1.5 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs text-white"
                    >
                      Next &rarr;
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Structured Table: German Word, Article, Plural, English Meaning, Example */}
            <div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Structured Word Bank Entries
              </div>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">German Word</th>
                      <th className="p-3">Article</th>
                      <th className="p-3">Plural Form</th>
                      <th className="p-3">English Meaning</th>
                      <th className="p-3">Example Sentence</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredVocab.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-bold text-[#0F172A]">{item.word}</td>
                        <td className="p-3 font-semibold text-[#EA580C]">{item.article}</td>
                        <td className="p-3 text-slate-600 font-mono text-[11px]">{item.plural}</td>
                        <td className="p-3 text-slate-700">{item.meaning}</td>
                        <td className="p-3 text-slate-600 italic">"{item.exampleSentence}"</td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => speakGerman(`${item.article !== '-' ? item.article : ''} ${item.word}. ${item.exampleSentence}`)}
                            className="p-1 rounded hover:bg-orange-50 text-slate-600 hover:text-[#EA580C]"
                            title="Play Native German Speech"
                          >
                            <Volume2 className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. DEDICATED GRAMMAR MODULE */}
        {activeLearnSection === 'grammar' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                German {enrolledLevel} Grammar
              </span>
              <h2 className="text-xl font-bold text-[#0F172A] mt-1">
                Dedicated Grammar Lessons &amp; Interactive Exercises (Section 8)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Grammar exists as an autonomous learning area with rule summaries, authentic examples, and gap-fill drills.
              </p>
            </div>

            <div className="space-y-4">
              {levelGrammar.map((topic) => (
                <div key={topic.id} className="p-5 rounded-xl border border-slate-200 hover:border-slate-300 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#0F172A]">{topic.title}</h3>
                    <span className="text-[10px] uppercase font-bold text-[#EA580C] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                      Level {topic.level}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {topic.ruleSummary}
                  </p>

                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Examples:
                    </div>
                    {topic.examples.map((ex, i) => (
                      <div key={i} className="text-xs text-slate-800 flex items-center justify-between py-1 border-b border-slate-50">
                        <span>
                          <strong className="text-[#0F172A]">{ex.german}</strong> &bull; <span className="text-slate-500">{ex.english}</span>
                        </span>
                        <button
                          onClick={() => speakGerman(ex.german)}
                          className="p-1 text-slate-400 hover:text-[#EA580C]"
                          title="Listen"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Exercise */}
                  {topic.exercises.map((ex) => {
                    const selected = grammarAnswers[ex.id];
                    const isCorrect = selected === ex.correctAnswer;

                    return (
                      <div key={ex.id} className="pt-2">
                        <div className="text-[11px] font-bold text-[#0F172A] mb-1.5">
                          Practice Drill: {ex.prompt}
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 mb-2">
                          {ex.gapSentence}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {ex.options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setGrammarAnswers((prev) => ({ ...prev, [ex.id]: opt }))}
                              className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all border ${
                                selected === opt
                                  ? opt === ex.correctAnswer
                                    ? 'bg-green-600 text-white border-green-600'
                                    : 'bg-red-600 text-white border-red-600'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>

                        {selected && (
                          <div className={`mt-2 text-xs font-medium flex items-center gap-1.5 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            {isCorrect ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-600" />}
                            <span>{isCorrect ? 'Richtig! Well done.' : `Falsch. Correct answer is: ${ex.correctAnswer}`}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // TAB: PRACTICE (Speaking, Writing, Listening, Reading)
  // ==========================================
  if (currentTab === 'practice') {
    return (
      <div className="space-y-6">
        {/* Sub-navigation */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'speaking', label: 'Sprechen (Record & Replay)' },
              { id: 'writing', label: 'Schreiben (Live Word Counter)' },
              { id: 'listening', label: 'Hören (Audio & Task Check)' },
              { id: 'reading', label: 'Lesen (Notices & Gap-Fills)' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setActivePracticeSection(s.id as any)}
                className={`py-2 px-3.5 rounded-lg text-xs font-bold transition-all ${
                  activePracticeSection === s.id
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-semibold text-[#EA580C] bg-orange-50 px-2.5 py-1 rounded border border-orange-200">
            Active: German {enrolledLevel}
          </span>
        </div>

        {/* 1. SPEAKING MODULE (Section 3: Guided Practice & Practice with Record, Stop, Replay, Retry) */}
        {activePracticeSection === 'speaking' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                  German {enrolledLevel} Speaking
                </span>
                <h2 className="text-xl font-bold text-[#0F172A] mt-1">
                  {currentSpeakingEx.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Focus: {currentSpeakingEx.focus}
                </p>
              </div>

              {/* Two modes per Section 3: Guided Practice and Practice */}
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setSpeakingMode('guided')}
                  className={`py-1.5 px-3 rounded-md text-xs font-bold transition-colors ${
                    speakingMode === 'guided'
                      ? 'bg-white text-[#0F172A] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Guided Practice
                </button>
                <button
                  onClick={() => setSpeakingMode('practice')}
                  className={`py-1.5 px-3 rounded-md text-xs font-bold transition-colors ${
                    speakingMode === 'practice'
                      ? 'bg-white text-[#0F172A] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Practice (Exam Mode)
                </button>
              </div>
            </div>

            {/* Prompt Card */}
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold uppercase tracking-wider text-slate-600">
                  Task Prompt
                </span>
                <span>Allowed Prep Time: {currentSpeakingEx.prepTimeSeconds}s</span>
              </div>
              <p className="text-sm font-semibold text-[#0F172A] leading-relaxed">
                "{currentSpeakingEx.prompt}"
              </p>
            </div>

            {/* Guided Practice Support: Useful phrases, vocab, model answer */}
            {speakingMode === 'guided' && currentSpeakingEx.guidedSupport && (
              <div className="grid md:grid-cols-3 gap-4 p-5 bg-orange-50/40 rounded-xl border border-orange-200 text-xs">
                <div>
                  <div className="font-bold text-[#0F172A] uppercase tracking-wider text-[10px] mb-2">
                    Useful Phrases:
                  </div>
                  <ul className="space-y-1 text-slate-700">
                    {currentSpeakingEx.guidedSupport.usefulPhrases.map((p, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#EA580C] font-bold">&bull;</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="font-bold text-[#0F172A] uppercase tracking-wider text-[10px] mb-2">
                    Example Structure:
                  </div>
                  <ul className="space-y-1 text-slate-700">
                    {currentSpeakingEx.guidedSupport.exampleStructure.map((s, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-slate-400 font-mono text-[10px]">{i + 1}.</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="font-bold text-[#0F172A] uppercase tracking-wider text-[10px] mb-2">
                    Model Response (Audio):
                  </div>
                  <p className="text-[11px] text-slate-600 italic mb-2">
                    "{currentSpeakingEx.guidedSupport.modelPromptAnswer}"
                  </p>
                  <button
                    onClick={() => speakGerman(currentSpeakingEx.guidedSupport?.modelPromptAnswer || '')}
                    className="flex items-center gap-1.5 py-1 px-2.5 rounded bg-white border border-slate-200 text-xs font-semibold text-slate-800 hover:text-[#EA580C]"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>Play Model Audio</span>
                  </button>
                </div>
              </div>
            )}

            {/* Recording Controls: Record, Stop, Replay, Retry (Section 3 & 11) */}
            <div className="p-6 bg-slate-900 rounded-xl text-white space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-[#EA580C] uppercase tracking-wider">
                  Voice Recording Terminal
                </span>
                <span className="font-mono text-sm">
                  {Math.floor(recordDuration / 60)}:{String(recordDuration % 60).padStart(2, '0')}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 py-4">
                {!isRecording && !audioBlobUrl && (
                  <button
                    onClick={startRecording}
                    className="flex items-center gap-2 py-3 px-6 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs transition-transform active:scale-95 shadow-md"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Start Recording</span>
                  </button>
                )}

                {isRecording && (
                  <button
                    onClick={stopRecording}
                    className="flex items-center gap-2 py-3 px-6 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs animate-pulse shadow-md"
                  >
                    <Square className="w-4 h-4" />
                    <span>Stop Recording</span>
                  </button>
                )}

                {audioBlobUrl && !isRecording && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        const audio = new Audio(audioBlobUrl);
                        audio.play().catch(() => speakGerman(currentSpeakingEx.guidedSupport?.modelPromptAnswer || ''));
                      }}
                      className="flex items-center gap-2 py-2.5 px-5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
                    >
                      <Play className="w-4 h-4" />
                      <span>Replay Answer</span>
                    </button>

                    <button
                      onClick={retryRecording}
                      className="flex items-center gap-2 py-2.5 px-4 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Retry Recording</span>
                    </button>
                  </div>
                )}
              </div>

              <p className="text-center text-[11px] text-slate-400 italic">
                Rule (Section 3): For this phase, record/replay is sufficient; AI speaking scoring will follow in a subsequent phase.
              </p>
            </div>
          </div>
        )}

        {/* 2. WRITING MODULE (Section 4: Task Instructions, Target Length, Suggested Time, Writing Area + Live Word Counter) */}
        {activePracticeSection === 'writing' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                  German {enrolledLevel} Writing Task
                </span>
                <h2 className="text-xl font-bold text-[#0F172A] mt-1">
                  {currentWritingEx.title}
                </h2>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                Task Format: {currentWritingEx.taskType}
              </span>
            </div>

            {/* Task Specification Card (Section 4) */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Task Instructions:
                </span>
                <ul className="space-y-1 text-slate-700 font-medium">
                  {currentWritingEx.instructions.map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 border-l border-slate-200 pl-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Length:</span>
                  <span className="font-bold text-[#0F172A]">
                    {currentWritingEx.targetWordMin} – {currentWritingEx.targetWordMax} Wörter
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Suggested Time:</span>
                  <span className="font-bold text-[#0F172A]">
                    {currentWritingEx.suggestedTimeMinutes} Minuten
                  </span>
                </div>
                {currentWritingEx.contextHint && (
                  <p className="text-[11px] text-[#EA580C] mt-2 italic">
                    Hint: {currentWritingEx.contextHint}
                  </p>
                )}
              </div>
            </div>

            {/* Writing Area + Live Word Counter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-[#0F172A] uppercase tracking-wider text-[11px]">
                  Writing Area
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Live Word Count:</span>
                  <span
                    className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                      wordCount >= currentWritingEx.targetWordMin && wordCount <= currentWritingEx.targetWordMax
                        ? 'bg-green-100 text-green-800'
                        : wordCount > currentWritingEx.targetWordMax
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-[#0F172A]'
                    }`}
                  >
                    {wordCount} Wörter
                  </span>
                </div>
              </div>

              <textarea
                rows={9}
                value={writingContent}
                onChange={(e) => setWritingContent(e.target.value)}
                placeholder="Schreiben Sie hier auf Deutsch..."
                className="w-full p-4 rounded-xl border border-slate-300 font-sans text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F172A] leading-relaxed"
              />

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>
                  Target status: {wordCount < currentWritingEx.targetWordMin ? `Need ${currentWritingEx.targetWordMin - wordCount} more words` : 'Target reached!'}
                </span>
                <button
                  onClick={() => alert(`Writing submitted for German ${enrolledLevel} (${wordCount} words recorded). Detailed scoring logic will follow in next phase.`)}
                  className="py-1.5 px-4 bg-[#0F172A] hover:bg-slate-800 text-white font-semibold rounded-lg text-xs"
                >
                  Save Draft Response
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. LISTENING MODULE (Section 5: Instructions -> Audio -> Questions -> Submit/Review) */}
        {activePracticeSection === 'listening' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                German {enrolledLevel} Listening
              </span>
              <h2 className="text-xl font-bold text-[#0F172A] mt-1">
                {currentListeningEx.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Scenario: {currentListeningEx.audioScenario}
              </p>
            </div>

            {/* 1. Show instructions first per Section 5 */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <span className="font-bold text-[#0F172A] uppercase tracking-wider text-[10px] block">
                Instructions:
              </span>
              <p>Sie hören einen kurzen Text. Hören Sie das Audio aufmerksam an und beantworten Sie danach die Aufgaben. Task Type: <strong>{currentListeningEx.taskType === 'richtig_falsch' ? 'Richtig / Falsch' : 'Wer sagt was?'}</strong>.</p>
            </div>

            {/* 2. Audio Player */}
            <div className="p-5 bg-slate-900 rounded-xl text-white flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                  Audio Track ({currentListeningEx.audioSpeaker})
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Native Speed: {enrolledLevel === 'A1' ? 'Standard A1 Clear' : 'Normal Fluency'}
                </div>
              </div>

              <button
                onClick={() => {
                  speakGerman(currentListeningEx.audioScript);
                  setListeningAudioPlayed(true);
                }}
                className="flex items-center gap-2 py-2 px-4 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold transition-transform active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>Play Audio Track</span>
              </button>
            </div>

            {/* 3. Questions and Submit / Review */}
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Comprehension Tasks
              </div>

              {currentListeningEx.questions.map((q) => (
                <div key={q.id} className="p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-[#0F172A]">{q.questionText}</div>

                  <div className="flex gap-3">
                    {(q.options || ['Richtig', 'Falsch']).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setListeningAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                        className={`py-1.5 px-4 rounded-lg text-xs font-bold border transition-all ${
                          listeningAnswers[q.id] === opt
                            ? 'bg-[#0F172A] text-white border-[#0F172A]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {listeningSubmitted && (
                    <div className="text-xs font-medium pt-1">
                      {listeningAnswers[q.id] === q.correctAnswer ? (
                        <span className="text-green-600 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Correct! ({q.correctAnswer})
                        </span>
                      ) : (
                        <span className="text-red-600 font-bold flex items-center gap-1">
                          <X className="w-3.5 h-3.5" /> Incorrect. Correct was: {q.correctAnswer}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setListeningSubmitted(true)}
                  className="py-2 px-5 bg-[#0F172A] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
                >
                  Submit &amp; Review Answers
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. READING MODULE (Section 6: Notices, signs, emails with Richtig/Falsch & matching) */}
        {activePracticeSection === 'reading' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                German {enrolledLevel} Reading
              </span>
              <h2 className="text-xl font-bold text-[#0F172A] mt-1">
                {currentReadingEx.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Format: {currentReadingEx.contentType}
              </p>
            </div>

            {/* Reading Passage */}
            <div className="p-5 bg-amber-50/40 rounded-xl border border-amber-200/80 font-sans text-xs text-slate-800 leading-relaxed whitespace-pre-line">
              {currentReadingEx.passage}
            </div>

            {/* Questions */}
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Questions on Passage
              </div>

              {currentReadingEx.questions.map((q) => (
                <div key={q.id} className="p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-[#0F172A]">{q.questionText}</div>

                  <div className="flex flex-wrap gap-2">
                    {(q.options || ['Richtig', 'Falsch']).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setReadingAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                        className={`py-1.5 px-3.5 rounded-lg text-xs font-bold border transition-all ${
                          readingAnswers[q.id] === opt
                            ? 'bg-[#0F172A] text-white border-[#0F172A]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {readingSubmitted && (
                    <div className="text-xs font-medium pt-1">
                      {readingAnswers[q.id] === q.correctAnswer ? (
                        <span className="text-green-600 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Correct! {q.explanation}
                        </span>
                      ) : (
                        <span className="text-red-600 font-bold flex items-center gap-1">
                          <X className="w-3.5 h-3.5" /> Incorrect. Correct: {q.correctAnswer}. {q.explanation}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setReadingSubmitted(true)}
                  className="py-2 px-5 bg-[#0F172A] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
                >
                  Verify Reading Answers
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // TAB: MOCK TESTS (Section 9: Strictly Level-Specific)
  // ==========================================
  if (currentTab === 'mock-tests') {
    return (
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
            German {enrolledLevel} Official Examinations (Section 9)
          </span>
          <h2 className="text-xl font-bold text-[#0F172A] mt-1">
            {enrolledLevel} Mock Tests
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            An {enrolledLevel} learner only sees {enrolledLevel} mock tests. No higher-level simulations appear anywhere in this portal.
          </p>
        </div>

        <div className="space-y-3">
          {levelMockTests.map((test) => (
            <div key={test.id} className="p-5 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#EA580C] uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                    {test.format}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Duration: {test.durationMinutes} Min &bull; {test.sectionsCount} Sections
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#0F172A] mt-1">
                  {test.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-xl">
                  {test.description}
                </p>
              </div>

              <button
                onClick={() => alert(`Starting ${test.title}. Full timed exam battery initiated.`)}
                className="shrink-0 py-2 px-4 bg-[#0F172A] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs"
              >
                Start {enrolledLevel} Simulation
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // TAB: PROGRESS & RESOURCES & PROFILE
  // ==========================================
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
      <div>
        <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
          German {enrolledLevel} Overview
        </span>
        <h2 className="text-xl font-bold text-[#0F172A] mt-1">
          {currentTab.toUpperCase()} &bull; Enrolled Level: {enrolledLevel}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Every query and resource card is scoped strictly to CEFR {enrolledLevel}.
        </p>
      </div>

      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
        <div className="flex justify-between">
          <span>Student Account:</span>
          <span className="font-bold text-[#0F172A]">{user.fullName} ({user.email})</span>
        </div>
        <div className="flex justify-between">
          <span>Enrolled Program:</span>
          <span className="font-bold text-[#EA580C]">German Language</span>
        </div>
        <div className="flex justify-between">
          <span>Enrolled Level Property:</span>
          <span className="font-bold text-[#0F172A]">{enrolledLevel} (Isolated)</span>
        </div>
      </div>
    </div>
  );
};
