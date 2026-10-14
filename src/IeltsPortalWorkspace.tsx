import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  FileText,
  Headphones,
  Library,
  Mic,
  Play,
  RotateCcw,
  Square,
  TrendingUp,
  Volume2,
  X,
} from 'lucide-react';
import { IELTS_ACTUAL_TESTS } from './ieltsCurriculum';
import { estimateIeltsBand, formatCountdown } from './scoring';
import type { IeltsQuestion, UserAccount, ViewTab } from './types';

interface IeltsPortalWorkspaceProps {
  user: UserAccount;
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
}

type Skill = 'reading' | 'listening' | 'writing' | 'speaking';

export const IeltsPortalWorkspace: React.FC<IeltsPortalWorkspaceProps> = ({
  user,
  currentTab,
  onSelectTab,
}) => {
  const activeTest = IELTS_ACTUAL_TESTS[0];
  const [skill, setSkill] = useState<Skill>('reading');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(3600);
  const [writingTask, setWritingTask] = useState<1 | 2>(1);
  const [writingText, setWritingText] = useState('');
  const [speakingPart, setSpeakingPart] = useState<1 | 2 | 3>(2);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingError, setRecordingError] = useState('');
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const timedView = currentTab === 'practice' || currentTab === 'mock-tests';

  useEffect(() => {
    if (!timedView || submitted || remainingTime === 0) return;
    const timer = window.setInterval(() => setRemainingTime((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [remainingTime, submitted, timedView]);

  useEffect(() => {
    if (remainingTime === 0 && Object.keys(answers).length > 0) setSubmitted(true);
  }, [answers, remainingTime]);

  useEffect(() => () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    recorderRef.current?.stream.getTracks().forEach((track) => track.stop());
  }, [audioUrl]);

  const questions = useMemo(
    () => [...activeTest.reading.flatMap((passage) => passage.questions), ...activeTest.listening.flatMap((section) => section.questions)],
    [activeTest],
  );
  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.reduce(
    (total, question) => total + (answers[question.id]?.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase() ? 1 : 0),
    0,
  );
  const band = estimateIeltsBand(correctCount, answeredCount);
  const selectedWritingTask = activeTest.writing.find((item) => item.taskNumber === writingTask)!;
  const wordCount = writingText.trim() ? writingText.trim().split(/\s+/).length : 0;

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 0.95;
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
      chunksRef.current = [];
      recorderRef.current = recorder;
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

  const resetAttempt = () => {
    setAnswers({});
    setSubmitted(false);
    setRemainingTime(3600);
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
        <section className="alc-panel grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(17rem,0.65fr)]">
          <div>
            <p className="alc-label">IELTS Academic preparation</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink)] sm:text-5xl">
              Practice the interface before test day.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
              Build familiarity across reading, listening, writing, and speaking with focused computer-delivered practice.
            </p>
            <button type="button" className="alc-button-primary mt-7" onClick={() => onSelectTab('practice')}>
              Open practice <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <dl className="grid grid-cols-2 gap-4 border-t border-[var(--color-line)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div>
              <dt className="text-xs text-[var(--color-muted)]">Track</dt>
              <dd className="mt-1 font-semibold text-[var(--color-ink)]">{user.ieltsTrack ?? 'Academic'}</dd>
            </div>
            <div>
              <dt className="text-xs text-[var(--color-muted)]">Practice set</dt>
              <dd className="mt-1 font-semibold text-[var(--color-ink)]">{activeTest.yearEdition}</dd>
            </div>
          </dl>
        </section>
        <section>
          <p className="alc-label">Four-skill workspace</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['reading', 'Reading', 'Passage and question split view', BookOpen],
              ['listening', 'Listening', 'Audio-led comprehension practice', Headphones],
              ['writing', 'Writing', 'Prompt and live word count', FileText],
              ['speaking', 'Speaking', 'Local microphone recorder', Mic],
            ].map(([id, label, copy, Icon]) => {
              const SkillIcon = Icon as typeof BookOpen;
              return (
                <button
                  type="button"
                  key={id as string}
                  onClick={() => { setSkill(id as Skill); onSelectTab('practice'); }}
                  className="alc-panel p-5 text-left hover:border-[var(--color-accent)]"
                >
                  <SkillIcon className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
                  <span className="mt-7 block text-lg font-semibold text-[var(--color-ink)]">{label as string}</span>
                  <span className="mt-1 block text-sm leading-6 text-[var(--color-muted)]">{copy as string}</span>
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
        {intro('Curriculum', 'Understand the IELTS test structure', 'Four concise modules explain what each skill measures and how the computer-delivered interface behaves.')}
        <div className="alc-panel divide-y divide-[var(--color-line)]">
          {[
            ['Reading', 'Skimming, scanning, evidence location, and answer transfer.'],
            ['Listening', 'Question preview, signposting, and accurate completion.'],
            ['Writing', 'Task response, coherence, vocabulary, and grammar.'],
            ['Speaking', 'Fluency, pronunciation, vocabulary, and grammar.'],
          ].map(([title, copy], index) => (
            <article key={title} className="grid gap-3 p-5 sm:grid-cols-[2rem_minmax(0,1fr)_auto] sm:items-center">
              <span className="font-mono text-xs text-[var(--color-muted)]">{String(index + 1).padStart(2, '0')}</span>
              <div><h2 className="font-semibold text-[var(--color-ink)]">{title}</h2><p className="mt-1 text-sm text-[var(--color-muted)]">{copy}</p></div>
              <span className="alc-status w-fit">Guide</span>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (currentTab === 'progress') {
    return (
      <div className="space-y-7">
        {intro('Progress', 'Current practice performance', 'Review the answers completed in your current practice session.')}
        <div className="grid gap-4 sm:grid-cols-3">
          {[['Answered this session', answeredCount], ['Correct this session', correctCount], ['Estimated band', band ?? '—']].map(([label, value]) => (
            <div key={label} className="alc-panel p-5">
              <TrendingUp className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
              <p className="mt-6 text-3xl font-semibold text-[var(--color-ink)]">{value}</p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentTab === 'resources') {
    return (
      <div className="space-y-7">
        {intro('Reference library', 'IELTS preparation resources', 'Study guides for use alongside lessons and assigned practice. Verify official test policy with an authorized IELTS provider.')}
        <div className="alc-panel divide-y divide-[var(--color-line)]">
          {['Computer-delivered test orientation', 'Writing task checklist', 'Speaking cue-card planner'].map((item) => (
            <div key={item} className="flex items-center gap-4 p-5">
              <Library className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
              <p className="flex-1 font-semibold text-[var(--color-ink)]">{item}</p>
              <span className="alc-status hidden sm:inline-flex">Guide</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentTab === 'profile') {
    return (
      <div className="space-y-7">
        {intro('Student profile', user.fullName, 'Your account details and IELTS learning pathway.')}
        <dl className="alc-panel max-w-2xl divide-y divide-[var(--color-line)] p-6">
          {[['Email', user.email], ['Track', user.ieltsTrack ?? 'Academic'], ['Account type', 'Enrolled student']].map(([label, value]) => (
            <div key={label} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]">
              <dt className="text-sm text-[var(--color-muted)]">{label}</dt>
              <dd className="text-sm font-semibold text-[var(--color-ink)]">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  const renderQuestion = (question: IeltsQuestion) => {
    const correct = answers[question.id]?.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();
    const options = question.options ?? (question.type === 'true_false_not_given' ? ['True', 'False', 'Not Given'] : []);
    return (
      <fieldset key={question.id} className="border-t border-[var(--color-line)] py-5 first:border-t-0 first:pt-0">
        <legend className="text-sm font-semibold leading-6 text-[var(--color-ink)]">{question.id}. {question.questionText}</legend>
        {options.length > 0 ? (
          <div className="mt-3 grid gap-2">
            {options.map((option) => (
              <label key={option} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-control)] border border-[var(--color-line)] px-3 text-sm has-[:checked]:border-[var(--color-navy)] has-[:checked]:bg-[var(--color-surface)]">
                <input type="radio" name={`question-${question.id}`} value={option} checked={answers[question.id] === option} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [question.id]: option }))} />
                {option}
              </label>
            ))}
          </div>
        ) : (
          <label className="mt-3 block text-sm text-[var(--color-muted)]">
            Your answer
            <input className="alc-field mt-2" value={answers[question.id] ?? ''} disabled={submitted} onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))} />
          </label>
        )}
        {submitted && (
          <p className={`mt-3 flex items-center gap-2 text-sm font-semibold ${correct ? 'text-emerald-700' : 'text-red-700'}`}>
            {correct ? <Check className="h-4 w-4" aria-hidden="true" /> : <X className="h-4 w-4" aria-hidden="true" />}
            {correct ? 'Correct' : `Correct answer: ${question.correctAnswer}`}
          </p>
        )}
      </fieldset>
    );
  };

  return (
    <div className="space-y-5">
      <section className="alc-panel p-4">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="grid grid-cols-2 gap-2 sm:flex">
            {[
              ['reading', 'Reading', BookOpen],
              ['listening', 'Listening', Headphones],
              ['writing', 'Writing', FileText],
              ['speaking', 'Speaking', Mic],
            ].map(([id, label, Icon]) => {
              const SkillIcon = Icon as typeof BookOpen;
              return (
                <button type="button" key={id as string} onClick={() => setSkill(id as Skill)} className={skill === id ? 'alc-button-primary justify-center' : 'alc-button-secondary justify-center'}>
                  <SkillIcon className="h-4 w-4" aria-hidden="true" /> {label as string}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] bg-[var(--color-navy)] px-4 font-mono text-sm font-semibold text-white">
              <Clock3 className="h-4 w-4 text-orange-300" aria-hidden="true" /> {formatCountdown(remainingTime)}
            </span>
            {submitted ? (
              <button type="button" className="alc-button-secondary" onClick={resetAttempt}><RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset</button>
            ) : (
              <button type="button" className="alc-button-primary" disabled={answeredCount === 0} onClick={() => answeredCount > 0 && setSubmitted(true)}>
                {answeredCount === 0 ? 'Answer a question first' : 'Check answers'}
              </button>
            )}
          </div>
        </div>
      </section>

      {submitted && band !== null && (
        <div className="alc-panel border-emerald-300 bg-emerald-50 p-5" role="status">
          <p className="font-semibold text-emerald-950">Practice estimate: band {band}</p>
          <p className="mt-1 text-sm text-emerald-800">{correctCount} correct from {answeredCount} attempted. This estimate covers these reading/listening practice items only and is not an official IELTS score.</p>
        </div>
      )}

      {skill === 'reading' && (
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="alc-panel p-5 lg:max-h-[46rem] lg:overflow-y-auto">
            <p className="alc-label">Reading passage</p>
            <h2 className="mt-2 text-xl font-semibold text-[var(--color-ink)]">{activeTest.reading[0].title}</h2>
            <p className="mt-5 whitespace-pre-line font-[var(--font-body)] text-sm leading-7 text-[var(--color-ink)]">{activeTest.reading[0].passageText}</p>
          </article>
          <section className="alc-panel p-5 lg:max-h-[46rem] lg:overflow-y-auto" aria-labelledby="reading-questions">
            <h2 id="reading-questions" className="text-xl font-semibold text-[var(--color-ink)]">Questions</h2>
            <div className="mt-5">{activeTest.reading[0].questions.map(renderQuestion)}</div>
          </section>
        </div>
      )}

      {skill === 'listening' && (
        <section className="alc-panel p-5 sm:p-6">
          <div className="flex flex-col gap-4 border-b border-[var(--color-line)] pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="alc-label">Listening practice</p><h2 className="mt-2 text-xl font-semibold text-[var(--color-ink)]">{activeTest.listening[0].title}</h2></div>
            <button type="button" className="alc-button-primary" onClick={() => speak(activeTest.listening[0].audioTranscript)}>
              <Volume2 className="h-4 w-4" aria-hidden="true" /> Play practice audio
            </button>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">{activeTest.listening[0].questions.map(renderQuestion)}</div>
        </section>
      )}

      {skill === 'writing' && (
        <section className="alc-panel p-5 sm:p-6">
          <div className="flex flex-wrap gap-2 border-b border-[var(--color-line)] pb-5">
            {[1, 2].map((task) => <button type="button" key={task} className={writingTask === task ? 'alc-button-primary' : 'alc-button-secondary'} onClick={() => setWritingTask(task as 1 | 2)}>Task {task}</button>)}
          </div>
          <div className="mt-5 rounded-[var(--radius-panel)] bg-[var(--color-surface)] p-5">
            <h2 className="font-semibold text-[var(--color-ink)]">{selectedWritingTask.title}</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-[var(--color-muted)]">{selectedWritingTask.taskPrompt}</p>
          </div>
          <label htmlFor="ielts-writing" className="mt-5 block text-sm font-semibold text-[var(--color-ink)]">
            Response <span className="font-normal text-[var(--color-muted)]">· {wordCount} / {selectedWritingTask.targetWords} words</span>
          </label>
          <textarea id="ielts-writing" rows={12} value={writingText} onChange={(event) => setWritingText(event.target.value)} className="alc-field mt-2 min-h-64 resize-y leading-6" placeholder="Write your response here…" />
          <p className="mt-3 text-sm text-[var(--color-muted)]">Writing feedback requires instructor review.</p>
        </section>
      )}

      {skill === 'speaking' && (
        <section className="alc-panel p-5 sm:p-6">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((part) => <button type="button" key={part} className={speakingPart === part ? 'alc-button-primary' : 'alc-button-secondary'} onClick={() => setSpeakingPart(part as 1 | 2 | 3)}>Part {part}</button>)}
          </div>
          <div className="mt-5 rounded-[var(--radius-panel)] bg-[var(--color-surface)] p-5">
            <p className="alc-label">{activeTest.speaking[speakingPart - 1].title}</p>
            <h2 className="mt-2 text-xl font-semibold text-[var(--color-ink)]">{activeTest.speaking[speakingPart - 1].prompt}</h2>
          </div>
          <div className="mt-5 rounded-[var(--radius-panel)] bg-[var(--color-navy)] p-5 text-white">
            <p className="text-sm text-slate-300">Audio stays in this browser tab and is discarded when you leave.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {!isRecording && !audioUrl && <button type="button" className="alc-button-primary" onClick={startRecording}><Mic className="h-4 w-4" aria-hidden="true" /> Record answer</button>}
              {isRecording && <button type="button" className="alc-button-primary bg-red-600 hover:bg-red-700" onClick={stopRecording}><Square className="h-4 w-4" aria-hidden="true" /> Stop recording</button>}
              {audioUrl && !isRecording && <>
                <button type="button" className="alc-button-primary bg-emerald-700 hover:bg-emerald-800" onClick={() => new Audio(audioUrl).play()}><Play className="h-4 w-4" aria-hidden="true" /> Replay</button>
                <button type="button" className="alc-button-secondary border-white/30 bg-transparent text-white hover:bg-white/10" onClick={() => { URL.revokeObjectURL(audioUrl); setAudioUrl(null); }}><RotateCcw className="h-4 w-4" aria-hidden="true" /> Retry</button>
              </>}
              <button type="button" className="alc-button-secondary border-white/30 bg-transparent text-white hover:bg-white/10" onClick={() => speak(activeTest.speaking[speakingPart - 1].modelAnswer)}><Volume2 className="h-4 w-4" aria-hidden="true" /> Play model answer</button>
            </div>
            {recordingError && <p className="mt-4 text-sm font-semibold text-red-200" role="alert">{recordingError}</p>}
          </div>
        </section>
      )}
    </div>
  );
};
