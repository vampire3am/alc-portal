import { ProgramConfig, ProgramId } from './types';

export const PROGRAMS: Record<ProgramId, ProgramConfig> = {
  IELTS: {
    id: 'IELTS',
    name: 'IELTS',
    fullName: 'International English Language Testing System',
    badge: 'IELTS Academic & General',
    description: 'Comprehensive preparation for Academic and General Training test formats.',
    learningAreas: ['Listening', 'Reading', 'Writing', 'Speaking'],
    welcomeMessage: 'Welcome to your focused IELTS preparation workspace. Build foundational skills across all four macro modules.',
    quickStats: {
      targetMetric: 'Target Band',
      targetValue: '7.5+',
      modulesCount: 4,
      hoursPledged: '42 hrs',
    },
    mockTestLabel: 'Full-Length IELTS Mock Exams',
    announcements: [
      {
        id: '1',
        title: 'New IELTS Writing Task 2 Argumentative Essay Frameworks Released',
        date: 'Today',
        tag: 'Academic Update',
      },
      {
        id: '2',
        title: 'IELTS Speaking Part 2 Cue-Card strategy session scheduled for Friday',
        date: 'Yesterday',
        tag: 'Live Session',
      },
    ],
    recentActivity: [
      { id: '1', title: 'Academic Reading - Skimming & Scanning Drill 04', area: 'Reading', time: '2 hours ago', status: 'completed' },
      { id: '2', title: 'Task 1 Graph Interpretation Analysis', area: 'Writing', time: 'Yesterday', status: 'in-progress' },
      { id: '3', title: 'Section 3 Dialogue Multiple Choice Exercises', area: 'Listening', time: '2 days ago', status: 'completed' },
    ],
  },

  PTE: {
    id: 'PTE',
    name: 'PTE Academic',
    fullName: 'Pearson Test of English Academic',
    badge: 'PTE Academic Fast-Track',
    description: 'Computer-based academic English test preparation with automated scoring focus.',
    learningAreas: ['Speaking & Writing', 'Reading', 'Listening'],
    welcomeMessage: 'Welcome to your PTE Academic training portal. Hone your fluency, pronunciation, and time management.',
    quickStats: {
      targetMetric: 'Target Score',
      targetValue: '79+',
      modulesCount: 3,
      hoursPledged: '36 hrs',
    },
    mockTestLabel: 'Scored PTE Academic Mock Simulations',
    announcements: [
      {
        id: '1',
        title: 'PTE Read Aloud oral fluency rhythm and stress patterns updated',
        date: 'Today',
        tag: 'Speaking Guide',
      },
      {
        id: '2',
        title: 'Write from Dictation high-frequency vocabulary list refreshed',
        date: '3 days ago',
        tag: 'High Yield',
      },
    ],
    recentActivity: [
      { id: '1', title: 'Repeat Sentence & Describe Image Practice Set 12', area: 'Speaking & Writing', time: '4 hours ago', status: 'completed' },
      { id: '2', title: 'Fill in the Blanks (Reading & Writing) Precision Quiz', area: 'Reading', time: 'Yesterday', status: 'completed' },
      { id: '3', title: 'Summarize Spoken Text Key Point Extraction', area: 'Listening', time: '3 days ago', status: 'in-progress' },
    ],
  },

  DET: {
    id: 'DET',
    name: 'Duolingo English Test',
    fullName: 'Duolingo English Test Preparation',
    badge: 'DET Computer Adaptive',
    description: 'Targeted preparation for the computer-adaptive DET testing format and subscores.',
    learningAreas: ['Reading', 'Listening', 'Speaking', 'Writing', 'Integrated / interactive task groups'],
    welcomeMessage: 'Welcome to your Duolingo English Test workspace. Master adaptive question types and interactive interview prompts.',
    quickStats: {
      targetMetric: 'Target Score',
      targetValue: '125 - 135',
      modulesCount: 5,
      hoursPledged: '28 hrs',
    },
    mockTestLabel: 'Adaptive DET Simulation Tests',
    announcements: [
      {
        id: '1',
        title: 'Interactive Reading & Fill in the Blanks strategies handbook now live',
        date: 'Today',
        tag: 'Adaptive Skill',
      },
      {
        id: '2',
        title: 'Production Subscore: Writing about a photo 60-second timing guide',
        date: '2 days ago',
        tag: 'Production Subscore',
      },
    ],
    recentActivity: [
      { id: '1', title: 'Read and Complete - C-Test Sentence Completion', area: 'Reading', time: '1 hour ago', status: 'completed' },
      { id: '2', title: 'Listen and Type - Acoustic Memory Drill Set 08', area: 'Listening', time: 'Yesterday', status: 'completed' },
      { id: '3', title: 'Interactive Reading Passage Evaluation', area: 'Integrated / interactive task groups', time: 'Yesterday', status: 'in-progress' },
    ],
  },

  GERMAN: {
    id: 'GERMAN',
    name: 'German Language',
    fullName: 'Deutsches Sprachprogramm (CEFR Levels)',
    badge: 'CEFR A1 – B2 Mastery',
    description: 'Level-based German acquisition curriculum structured around CEFR competencies and essential language skills.',
    levels: ['A1', 'A2', 'B1', 'B2'],
    learningAreas: ['Vocabulary', 'Grammar', 'Lesen', 'Hören', 'Schreiben', 'Sprechen'],
    welcomeMessage: 'Willkommen to your German Language portal. Progress systematically through CEFR levels and core communicative skills.',
    quickStats: {
      targetMetric: 'Target CEFR',
      targetValue: 'Level B2',
      modulesCount: 10,
      hoursPledged: '65 hrs',
    },
    mockTestLabel: 'Goethe / Telc Format Goethe-Prüfungen',
    announcements: [
      {
        id: '1',
        title: 'B1 Konjunktiv II & Passiv Grammatik-Übersicht steht bereit',
        date: 'Today',
        tag: 'Grammar Module',
      },
      {
        id: '2',
        title: 'A2 Wortschatz: Arbeit, Beruf und alltägliche Kommunikation',
        date: '2 days ago',
        tag: 'Vocabulary',
      },
    ],
    recentActivity: [
      { id: '1', title: 'A2 Grammatik: Dativ- und Akkusativ-Präpositionen', area: 'Grammar', time: '3 hours ago', status: 'completed' },
      { id: '2', title: 'Leseverstehen: Kurze Zeitungsartikel und Anzeigen', area: 'Lesen', time: 'Yesterday', status: 'completed' },
      { id: '3', title: 'Sprechen: Sich vorstellen und Meinungen äußern', area: 'Sprechen', time: '2 days ago', status: 'in-progress' },
    ],
  },
};
