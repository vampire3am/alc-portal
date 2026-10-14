import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, ProgramId, GermanLevel } from './types';

interface AuthContextType {
  currentUser: UserAccount | null;
  users: UserAccount[];
  login: (emailOrPhone: string, password?: string) => { success: boolean; error?: string };
  register: (data: {
    fullName: string;
    email: string;
    phone: string;
    assignedProgram: ProgramId;
    germanLevel?: GermanLevel;
  }) => { success: boolean; error?: string };
  logout: () => void;
  adminUpdateStudentProgram: (userId: string, newProgram: ProgramId, newLevel?: GermanLevel) => void;
  allPrograms: ProgramId[];
}

const STORAGE_KEY = 'alc_portal_users_v2';
const CURRENT_USER_KEY = 'alc_portal_active_user_v2';

// Realistic sample students aligned with the brief
const DEFAULT_USERS: UserAccount[] = [
  {
    id: 'student-ielts-1',
    fullName: 'Aarav Sharma',
    email: 'aarav@example.com',
    phone: '+977 9841234567',
    assignedProgram: 'IELTS',
    registrationDate: '2026-10-01',
    role: 'student',
  },
  {
    id: 'student-german-a1',
    fullName: 'Sneha Thapa',
    email: 'sneha@example.com',
    phone: '+977 9851234567',
    assignedProgram: 'GERMAN',
    germanLevel: 'A1',
    registrationDate: '2026-10-10',
    role: 'student',
  },
  {
    id: 'student-german-b1',
    fullName: 'Lukas Meyer',
    email: 'lukas@example.com',
    phone: '+977 9801234567',
    assignedProgram: 'GERMAN',
    germanLevel: 'B1',
    registrationDate: '2026-10-12',
    role: 'student',
  },
  {
    id: 'student-pte-1',
    fullName: 'Priya Shrestha',
    email: 'priya@example.com',
    phone: '+977 9801987654',
    assignedProgram: 'PTE',
    registrationDate: '2026-10-04',
    role: 'student',
  },
  {
    id: 'student-det-1',
    fullName: 'Rohan Adhikari',
    email: 'rohan@example.com',
    phone: '+977 9812345678',
    assignedProgram: 'DET',
    registrationDate: '2026-10-08',
    role: 'student',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_USERS;
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem(CURRENT_USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [currentUser]);

  const login = (emailOrPhone: string, _password?: string) => {
    const cleanInput = emailOrPhone.trim().toLowerCase();
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === cleanInput ||
        u.phone.replace(/[\s-]/g, '') === cleanInput.replace(/[\s-]/g, '')
    );

    if (!user) {
      return { success: false, error: 'No account found with this email or phone number.' };
    }

    setCurrentUser(user);
    return { success: true };
  };

  const register = (data: {
    fullName: string;
    email: string;
    phone: string;
    assignedProgram: ProgramId;
    germanLevel?: GermanLevel;
  }) => {
    const existing = users.find(
      (u) =>
        u.email.toLowerCase() === data.email.toLowerCase().trim() ||
        u.phone.replace(/[\s-]/g, '') === data.phone.replace(/[\s-]/g, '').trim()
    );

    if (existing) {
      return {
        success: false,
        error: 'An account with this email address or phone already exists.',
      };
    }

    const newUser: UserAccount = {
      id: `student-${Date.now()}`,
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      assignedProgram: data.assignedProgram,
      germanLevel: data.assignedProgram === 'GERMAN' ? (data.germanLevel || 'A1') : undefined,
      registrationDate: new Date().toISOString().split('T')[0],
      role: 'student',
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Administrator capability to progress student level or update program (Section 1 & 11)
  const adminUpdateStudentProgram = (userId: string, newProgram: ProgramId, newLevel?: GermanLevel) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            assignedProgram: newProgram,
            germanLevel: newProgram === 'GERMAN' ? (newLevel || u.germanLevel || 'A1') : undefined,
          };
        }
        return u;
      })
    );

    setCurrentUser((curr) => {
      if (curr && curr.id === userId) {
        return {
          ...curr,
          assignedProgram: newProgram,
          germanLevel: newProgram === 'GERMAN' ? (newLevel || curr.germanLevel || 'A1') : undefined,
        };
      }
      return curr;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        login,
        register,
        logout,
        adminUpdateStudentProgram,
        allPrograms: ['IELTS', 'PTE', 'DET', 'GERMAN'],
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
