export type ProgramId = 'IELTS' | 'PTE' | 'DET' | 'GERMAN';
export type GermanLevel = 'A1' | 'A2' | 'B1' | 'B2';
export type IeltsTrack = 'Academic' | 'General Training';

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  assignedProgram: ProgramId;
  germanLevel?: GermanLevel;
  ieltsTrack?: IeltsTrack;
  registrationDate: string;
  role?: 'student' | 'instructor' | 'admin';
}

export interface ProgramConfig {
  id: ProgramId;
  name: string;
  fullName: string;
  badge: string;
  description: string;
  learningAreas: string[];
  levels?: string[];
  welcomeMessage: string;
  quickStats: {
    targetMetric: string;
    targetValue: string;
    modulesCount: number;
    hoursPledged: string;
  };
  mockTestLabel: string;
  announcements: Array<{
    id: string;
    title: string;
    date: string;
    tag: string;
  }>;
  recentActivity: Array<{
    id: string;
    title: string;
    area: string;
    time: string;
    status: 'completed' | 'in-progress';
  }>;
}

export type ViewTab = 'dashboard' | 'learn' | 'practice' | 'mock-tests' | 'progress' | 'resources' | 'support' | 'settings' | 'profile';

export type AdminView = 'overview' | 'students' | 'programs' | 'content' | 'assessments' | 'submissions' | 'reports' | 'settings';

// ==========================================
// IELTS WORKSPACE TYPES (ieltsonlinetests.com style)
// ==========================================

export interface IeltsQuestion {
  id: number;
  type: 'multiple_choice' | 'true_false_not_given' | 'yes_no_not_given' | 'matching_headings' | 'summary_completion' | 'sentence_completion';
  questionText: string;
  options?: string[];
  correctAnswer: string;
  locateSnippet?: string; // Signature "Locate" feature on ieltsonlinetests
  explanation?: string;   // Signature "Explain" feature on ieltsonlinetests
}

export interface IeltsReadingPassage {
  id: string;
  title: string;
  subtitle?: string;
  passageText: string;
  questions: IeltsQuestion[];
}

export interface IeltsListeningSection {
  id: string;
  sectionNumber: 1 | 2 | 3 | 4;
  title: string;
  context: string;
  audioScenario: string;
  audioTranscript: string;
  questions: IeltsQuestion[];
}

export interface IeltsWritingTask {
  id: string;
  taskNumber: 1 | 2;
  title: string;
  taskPrompt: string;
  targetWords: number;
  recommendedMinutes: number;
  sampleBand9Response: string;
  visualChartType?: string;
  visualChartData?: Array<{ label: string; valueA: number; valueB: number }>;
}

export interface IeltsSpeakingPart {
  partNumber: 1 | 2 | 3;
  title: string;
  duration: string;
  prompt: string;
  cueCardPoints?: string[];
  prepTimeSeconds?: number;
  modelAnswer: string;
  audioHint: string;
}

export interface IeltsFullMockTest {
  id: string;
  title: string;
  track: IeltsTrack;
  yearEdition: string;
  totalQuestions: number;
  listening: IeltsListeningSection[];
  reading: IeltsReadingPassage[];
  writing: IeltsWritingTask[];
  speaking: IeltsSpeakingPart[];
}

// German Module Types (Retained)
export interface SpeakingExercise {
  id: string;
  level: GermanLevel;
  title: string;
  topic: string;
  focus: string;
  mode: 'guided' | 'practice';
  prompt: string;
  prepTimeSeconds?: number;
  guidedSupport?: {
    usefulPhrases: string[];
    vocabularySupport: string[];
    exampleStructure: string[];
    modelPromptAnswer: string;
  };
}

export interface WritingExercise {
  id: string;
  level: GermanLevel;
  taskType: 'E-Mail (formell)' | 'E-Mail (informell)' | 'Nachricht' | 'Forumsbeitrag' | 'Meinungsäußerung' | 'Brief';
  title: string;
  instructions: string[];
  targetWordMin: number;
  targetWordMax: number;
  suggestedTimeMinutes: number;
  contextHint?: string;
}

export interface ListeningExercise {
  id: string;
  level: GermanLevel;
  title: string;
  audioScenario: string;
  audioSpeaker: string;
  audioScript: string;
  taskType: 'richtig_falsch' | 'multiple_choice' | 'matching' | 'wer_sagt_was';
  questions: Array<{
    id: string;
    questionText: string;
    options?: string[];
    correctAnswer: string;
  }>;
}

export interface ReadingExercise {
  id: string;
  level: GermanLevel;
  title: string;
  contentType: 'Anzeige' | 'Aushang/Schild' | 'Kurznachricht' | 'E-Mail' | 'Zeitungsartikel';
  passage: string;
  taskType: 'multiple_choice' | 'matching' | 'richtig_falsch' | 'gap_fill';
  questions: Array<{
    id: string;
    questionText: string;
    options?: string[];
    correctAnswer: string;
    explanation?: string;
  }>;
}

export interface VocabularyItem {
  id: string;
  level: GermanLevel;
  topicGroup: 'Familie' | 'Alltag' | 'Essen und Trinken' | 'Wohnen' | 'Arbeit und Beruf' | 'Reisen' | 'Gesundheit' | 'Schule und Ausbildung' | 'Freizeit' | 'Einkaufen';
  word: string;
  article: 'der' | 'die' | 'das' | '-';
  plural: string;
  meaning: string;
  exampleSentence: string;
  exampleTranslation?: string;
}

export interface GrammarTopic {
  id: string;
  level: GermanLevel;
  title: string;
  ruleSummary: string;
  examples: Array<{ german: string; english: string; highlight?: string }>;
  exercises: Array<{
    id: string;
    prompt: string;
    gapSentence: string;
    options: string[];
    correctAnswer: string;
  }>;
}

export interface MockTestItem {
  id: string;
  level: GermanLevel;
  title: string;
  format: 'Goethe-Zertifikat' | 'Telc Deutsch' | 'ÖSD Format';
  sectionsCount: number;
  durationMinutes: number;
  description: string;
}
