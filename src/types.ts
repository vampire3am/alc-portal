export type ProgramId = 'IELTS' | 'PTE' | 'DET' | 'GERMAN';
export type GermanLevel = 'A1' | 'A2' | 'B1' | 'B2';

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  assignedProgram: ProgramId;
  germanLevel?: GermanLevel; // Stored separate account property per Section 1 & 11
  registrationDate: string;
  role: 'student' | 'admin';
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

export type ViewTab = 'dashboard' | 'learn' | 'practice' | 'mock-tests' | 'progress' | 'resources' | 'profile';

// Speaking Types (Guided Practice & Practice modes, recording & replay)
export interface SpeakingExercise {
  id: string;
  level: GermanLevel;
  title: string;
  topic: string;
  focus: string; // e.g. Introductions, Everyday situations
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

// Writing Types (formal/informal emails, messages, forum posts, opinion, letters)
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

// Listening Types (Richtig/Falsch, Multiple Choice, Matching, Wer sagt was?)
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
    matchingPairs?: Array<{ speakerOrItem: string; statementOrMatch: string }>;
    correctAnswer: string;
  }>;
}

// Reading Types (Notices, messages, emails, articles)
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

// Vocabulary Types (Structured noun article, plural, meaning, example, audio, revision cards)
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

// Grammar Types (Dedicated module per level with lessons, examples, exercises)
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

// Mock Test Types (Level-specific practice tests)
export interface MockTestItem {
  id: string;
  level: GermanLevel;
  title: string;
  format: 'Goethe-Zertifikat' | 'Telc Deutsch' | 'ÖSD Format';
  sectionsCount: number;
  durationMinutes: number;
  description: string;
}
