import React, { createContext, useContext, useMemo, useState } from 'react';
import type { UserAccount } from './types';

interface AuthContextType {
  currentUser: UserAccount | null;
  users: UserAccount[];
  selectDemoProfile: (userId: string) => boolean;
  logout: () => void;
}

const SESSION_KEY = 'alc_demo_profile_id';

const DEMO_USERS: UserAccount[] = [
  {
    id: 'student-ielts-1',
    fullName: 'Aarav Sharma',
    email: 'aarav@example.com',
    phone: '+977 9841234567',
    assignedProgram: 'IELTS',
    registrationDate: '2026-10-01',
  },
  {
    id: 'student-german-a1',
    fullName: 'Sneha Thapa',
    email: 'sneha@example.com',
    phone: '+977 9851234567',
    assignedProgram: 'GERMAN',
    germanLevel: 'A1',
    registrationDate: '2026-10-10',
  },
  {
    id: 'student-german-b1',
    fullName: 'Lukas Meyer',
    email: 'lukas@example.com',
    phone: '+977 9801234567',
    assignedProgram: 'GERMAN',
    germanLevel: 'B1',
    registrationDate: '2026-10-12',
  },
  {
    id: 'student-pte-1',
    fullName: 'Priya Shrestha',
    email: 'priya@example.com',
    phone: '+977 9801987654',
    assignedProgram: 'PTE',
    registrationDate: '2026-10-04',
  },
  {
    id: 'student-det-1',
    fullName: 'Rohan Adhikari',
    email: 'rohan@example.com',
    phone: '+977 9812345678',
    assignedProgram: 'DET',
    registrationDate: '2026-10-08',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const readDemoProfile = () => {
  try {
    const id = sessionStorage.getItem(SESSION_KEY);
    return DEMO_USERS.find((user) => user.id === id) ?? null;
  } catch {
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(readDemoProfile);

  const value = useMemo<AuthContextType>(
    () => ({
      currentUser,
      users: DEMO_USERS,
      selectDemoProfile: (userId) => {
        const user = DEMO_USERS.find((candidate) => candidate.id === userId);
        if (!user) return false;
        setCurrentUser(user);
        try {
          sessionStorage.setItem(SESSION_KEY, user.id);
        } catch {
          // The demo still works when storage is unavailable.
        }
        return true;
      },
      logout: () => {
        setCurrentUser(null);
        try {
          sessionStorage.removeItem(SESSION_KEY);
        } catch {
          // The in-memory session has already been cleared.
        }
      },
    }),
    [currentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
