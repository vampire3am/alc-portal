import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
  Headphones,
  Library,
  Mic,
  Play,
  RotateCcw,
  Square,
  Volume2,
} from 'lucide-react';
import {
  GERMAN_GRAMMAR,
  GERMAN_LISTENING,
  GERMAN_MOCK_TESTS,
  GERMAN_READING,
  GERMAN_SPEAKING,
  GERMAN_VOCABULARY,
  GERMAN_WRITING,
} from './germanCurriculum';
import type { GermanLevel, UserAccount, ViewTab } from './types';

interface GermanPortalWorkspaceProps {
  user: UserAccount;
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
}

type PracticeMode = 'speaking' | 'writing' | 'listening' | 'reading';

export const GermanPortalWorkspace: React.FC<GermanPortalWorkspaceProps> = ({
  user,
  currentTab,
  onSelectTab,
}) => {
  const level: GermanLevel = user.germanLevel ?? 'A1';
  const vocabulary = useMemo(() => GERMAN_VOCABULARY.filter((item) => item.level === level), [level]);
  const grammar = useMemo(() => GERMAN_GRAMMAR.filter((item) => item.level === level), [level]);
  const speaking = useMemo(() => GERMAN_SPEAKING.filter((item) => item.level === level), [level]);
  const writing = useMemo(() => GERMAN_WRITING.filter((item) => item.level === level), [level]);
  const listening = useMemo(() => GERMAN_LISTENING.filter((item) => item.level === level), [level]);
  const reading = useMemo(() => GERMAN_READING.filter((item) => item.level === level), [level]);
  const mockTests = useMemo(() => GERMAN_MOCK_TESTS.filter((item) => item.level === level), [level]);

  const [mode, setMode] = useState<PracticeMode>('speaking');
  const [writingText, setWritingText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingError, setRecordingError] = useState('');
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const activeSpeaking = speaking[0];
  const activeWriting = writing[0];
  const activeListening = listening[0];
  const activeReading = reading[0];
  const wordCount = writingText.trim() ? writingText.trim().split(/\s+/).length : 0;

  useEffect(() => () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    recorderRef.current?.stream.getTracks().forEach((track) => track.stop());
  }, [audioUrl]);

  const speakGerman = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = level === 'A1' ? 0.85 : 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const startRecording = async () => {
    setRecordingError('');
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      setRecordingError('Audio recording is not supported in this browser.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const nextUrl = URL.createObjectURL(new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' }));
        setAudioUrl((previous) => {
          if (previous) URL.revokeObjectURL(previous);
          return nextUrl;
        });
        stream.getTracks().forEach((track) => track.stop());
      };
      recorder.start();
      setIsRecording(true);
    } catch {
      setRecordingError('Microphone access was unavailable. Check browser permission and try again.');
    }
  };

  const stopRecording = () => {
    if (recorderRef.current?.state === 'recording') recorderRef.current.stop();
    setIsRecording(false);
  };

  const intro = (eyebrow: string, title: string, copy: string) => (
    <div className="max-w-3xl">
      <p className="alc-label">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-[var(--color-ink)] sm:text-4xl">{title}</h1>
      <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{copy}</p>
    </div>
  );

  if (currentTab === 'dashboard') {
    return (
      <div className="space-y-8">
        <section className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(17rem,0.65fr)]">
          <div className="alc-panel p-6 sm:p-8">
            <p className="alc-label">Deutsch · CEFR {level}</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink)] sm:text-5xl">
              Ein klarer Weg zu sicherem Deutsch.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
              Practice level-appropriate vocabulary, grammar, reading, listening, writing, and speaking inside your assigned pathway.
            </p>
            <button type="button" className="alc-button-primary mt-7" onClick={() => onSelectTab('practice')}>
              Start practice <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="rounded-[var(--radius-panel)] bg-[var(--color-navy)] p-6 text-white">
            <p className="alc-label text-orange-300">Current level</p>
            <p className="mt-3 text-5xl font-semibold">{level}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">Your curriculum is aligned with this CEFR level.</p>
          </div>
        </section>
        <section>
          <p className="alc-label">Learning workspace</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr]">
            {[
              ['Vocabulary', `${vocabulary.length} words`, BookOpen],
              ['Grammar', `${grammar.length} topics`, FileText],
              ['Practice', 'Speaking, writing, reading, listening', Mic],
            ].map(([title, copy, Icon]) => {
              const ItemIcon = Icon as typeof BookOpen;
              return (
                <button type="button" key={title as string} className="alc-panel p-5 text-left hover:border-[var(--color-accent)]" onClick={() => onSelectTab(title === 'Practice' ? 'practice' : 'learn')}>
                  <ItemIcon className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
                  <span className="mt-7 block text-lg font-semibold text-[var(--color-ink)]">{title as string}</span>
                  <span className="mt-1 block text-sm text-[var(--color-muted)]">{copy as string}</span>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  if (currentTab === 'learn') {
    return (
      <div className="space-y-7">
        {intro(`CEFR ${level} curriculum`, 'Words and patterns in context', 'Use short examples and natural pronunciation to build recognition before active practice.')}
        <section>
          <h2 className="text-xl font-semibold text-[var(--color-ink)]">Vocabulary</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {vocabulary.slice(0, 8).map((item) => (
              <article key={item.id} className="rounded-[var(--radius-control)] border border-[var(--color-line)] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div><p className="text-lg font-semibold text-[var(--color-ink)]">{item.article !== '-' ? `${item.article} ` : ''}{item.word}</p><p className="mt-1 text-sm text-[var(--color-muted)]">{item.meaning}</p></div>
                  <button type="button" className="alc-button-quiet shrink-0" onClick={() => speakGerman(item.word)} aria-label={`Hear ${item.word}`}><Volume2 className="h-4 w-4" aria-hidden="true" /></button>
                </div>
                <p className="mt-4 text-sm italic text-[var(--color-ink)]">{item.exampleSentence}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="alc-panel divide-y divide-[var(--color-line)]">
          {grammar.map((topic) => (
            <article key={topic.id} className="p-5">
              <h2 className="font-semibold text-[var(--color-ink)]">{topic.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{topic.ruleSummary}</p>
            </article>
          ))}
        </section>
      </div>
    );
  }

  if (currentTab === 'mock-tests') {
    return (
      <div className="space-y-7">
        {intro(`CEFR ${level} mock tests`, 'Know the format before you begin', 'Assigned timed assessments appear here with their exam structure and duration.')}
        <div className="grid gap-4 md:grid-cols-2">
          {mockTests.map((test) => (
            <article key={test.id} className="alc-panel p-6">
              <p className="alc-label">{test.format}</p>
              <h2 className="mt-2 text-xl font-semibold text-[var(--color-ink)]">{test.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{test.description}</p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-[var(--color-muted)]">
                <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" aria-hidden="true" /> {test.durationMinutes} minutes</span>
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4" aria-hidden="true" /> {test.sectionsCount} sections</span>
              </div>
              <button type="button" className="alc-button-secondary mt-6" disabled title="This assessment has not been assigned">Not assigned</button>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (currentTab === 'progress') {
    return (
      <div className="space-y-7">
        {intro('Progress', `Your ${level} learning snapshot`, 'Review activity recorded for your enrolled German pathway.')}
        <div className="grid gap-4 sm:grid-cols-3">
          {[['Practice sessions', '0'], ['Words reviewed', '0'], ['Current CEFR', level]].map(([label, value]) => (
            <div key={label} className="alc-panel p-5"><p className="text-3xl font-semibold text-[var(--color-ink)]">{value}</p><p className="mt-1 text-sm text-[var(--color-muted)]">{label}</p></div>
          ))}
        </div>
      </div>
    );
  }

  if (currentTab === 'resources') {
    return (
      <div className="space-y-7">
        {intro('Reference library', `German ${level} study resources`, 'Use these references alongside lessons and assigned practice.')}
        <div className="alc-panel divide-y divide-[var(--color-line)]">
          {['Weekly vocabulary planner', 'Grammar quick reference', 'Speaking prompt worksheet'].map((item) => (
            <div key={item} className="flex items-center gap-4 p-5"><Library className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" /><p className="flex-1 font-semibold text-[var(--color-ink)]">{item}</p><span className="alc-status hidden sm:inline-flex">Guide</span></div>
          ))}
        </div>
      </div>
    );
  }

  if (currentTab === 'profile') {
    return (
      <div className="space-y-7">
        {intro('Student profile', user.fullName, 'Your account details and German learning pathway.')}
        <dl className="alc-panel max-w-2xl divide-y divide-[var(--color-line)] p-6">
          {[['Email', user.email], ['CEFR level', level], ['Account type', 'Enrolled student']].map(([label, value]) => (
            <div key={label} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]"><dt className="text-sm text-[var(--color-muted)]">{label}</dt><dd className="text-sm font-semibold text-[var(--color-ink)]">{value}</dd></div>
          ))}
        </dl>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {intro(`CEFR ${level} practice`, 'Choose one focused activity', 'Responses remain in this browser tab. Audio is not uploaded or stored.')}
      <div className="grid grid-cols-2 gap-2 sm:flex">
        {[
          ['speaking', 'Speaking', Mic],
          ['writing', 'Writing', FileText],
          ['listening', 'Listening', Headphones],
          ['reading', 'Reading', BookOpen],
        ].map(([id, label, Icon]) => {
          const ModeIcon = Icon as typeof Mic;
          return <button type="button" key={id as string} onClick={() => setMode(id as PracticeMode)} className={mode === id ? 'alc-button-primary justify-center' : 'alc-button-secondary justify-center'}><ModeIcon className="h-4 w-4" aria-hidden="true" />{label as string}</button>;
        })}
      </div>

      {mode === 'speaking' && activeSpeaking && (
        <section className="alc-panel p-5 sm:p-6">
          <p className="alc-label">{activeSpeaking.topic}</p>
          <h2 className="mt-2 text-xl font-semibold text-[var(--color-ink)]">{activeSpeaking.title}</h2>
          <p className="mt-4 rounded-[var(--radius-panel)] bg-[var(--color-surface)] p-5 text-sm leading-6 text-[var(--color-ink)]">{activeSpeaking.prompt}</p>
          <div className="mt-5 rounded-[var(--radius-panel)] bg-[var(--color-navy)] p-5 text-white">
            <p className="text-sm text-slate-300">Your recording remains local to this tab.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {!isRecording && !audioUrl && <button type="button" className="alc-button-primary" onClick={startRecording}><Mic className="h-4 w-4" aria-hidden="true" /> Record</button>}
              {isRecording && <button type="button" className="alc-button-primary bg-red-600 hover:bg-red-700" onClick={stopRecording}><Square className="h-4 w-4" aria-hidden="true" /> Stop</button>}
              {audioUrl && !isRecording && <>
                <button type="button" className="alc-button-primary bg-emerald-700 hover:bg-emerald-800" onClick={() => new Audio(audioUrl).play()}><Play className="h-4 w-4" aria-hidden="true" /> Replay</button>
                <button type="button" className="alc-button-secondary border-white/30 bg-transparent text-white hover:bg-white/10" onClick={() => { URL.revokeObjectURL(audioUrl); setAudioUrl(null); }}><RotateCcw className="h-4 w-4" aria-hidden="true" /> Retry</button>
              </>}
              <button type="button" className="alc-button-secondary border-white/30 bg-transparent text-white hover:bg-white/10" onClick={() => speakGerman(activeSpeaking.guidedSupport?.modelPromptAnswer ?? activeSpeaking.prompt)}><Volume2 className="h-4 w-4" aria-hidden="true" /> Model audio</button>
            </div>
            {recordingError && <p className="mt-4 text-sm font-semibold text-red-200" role="alert">{recordingError}</p>}
          </div>
        </section>
      )}

      {mode === 'writing' && activeWriting && (
        <section className="alc-panel p-5 sm:p-6">
          <p className="alc-label">{activeWriting.taskType}</p>
          <h2 className="mt-2 text-xl font-semibold text-[var(--color-ink)]">{activeWriting.title}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--color-muted)]">{activeWriting.instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}</ul>
          <label htmlFor="german-writing" className="mt-5 block text-sm font-semibold text-[var(--color-ink)]">Response <span className="font-normal text-[var(--color-muted)]">· {wordCount} words</span></label>
          <textarea id="german-writing" rows={11} value={writingText} onChange={(event) => setWritingText(event.target.value)} className="alc-field mt-2 resize-y leading-6" placeholder="Schreiben Sie hier…" />
          <p className="mt-3 text-sm text-[var(--color-muted)]">Target: {activeWriting.targetWordMin}–{activeWriting.targetWordMax} words. Writing is not automatically scored.</p>
        </section>
      )}

      {mode === 'listening' && activeListening && (
        <section className="alc-panel p-5 sm:p-6">
          <p className="alc-label">{activeListening.audioScenario}</p>
          <h2 className="mt-2 text-xl font-semibold text-[var(--color-ink)]">{activeListening.title}</h2>
          <button type="button" className="alc-button-primary mt-5" onClick={() => speakGerman(activeListening.audioScript)}><Volume2 className="h-4 w-4" aria-hidden="true" /> Play practice audio</button>
          <div className="mt-6 divide-y divide-[var(--color-line)]">{activeListening.questions.map((question) => <div key={question.id} className="py-4 text-sm text-[var(--color-ink)]">{question.questionText}</div>)}</div>
        </section>
      )}

      {mode === 'reading' && activeReading && (
        <section className="alc-panel p-5 sm:p-6">
          <p className="alc-label">{activeReading.contentType}</p>
          <h2 className="mt-2 text-xl font-semibold text-[var(--color-ink)]">{activeReading.title}</h2>
          <p className="mt-5 whitespace-pre-line font-serif text-sm leading-7 text-[var(--color-ink)]">{activeReading.passage}</p>
          <div className="mt-6 divide-y divide-[var(--color-line)]">{activeReading.questions.map((question) => <div key={question.id} className="py-4 text-sm text-[var(--color-ink)]">{question.questionText}</div>)}</div>
        </section>
      )}
    </div>
  );
};
