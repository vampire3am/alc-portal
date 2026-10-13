export type ProgramId = 'IELTS' | 'PTE' | 'DET' | 'GERMAN';

export interface ProgramConfig {
  id: ProgramId;
  name: string;
  fullName: string;
  badge: string;
  description: string;
  learningAreas: string[];
  levels?: string[]; // Specifically for German (A1, A2, B1, B2)
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

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  assignedProgram: ProgramId;
  registrationDate: string;
  role: 'student' | 'admin';
}

export type ViewTab = 'dashboard' | 'learn' | 'practice' | 'mock-tests' | 'progress' | 'resources' | 'profile';
