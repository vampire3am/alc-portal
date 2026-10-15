import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { UserAccount } from './types';

interface LoginResult {
  ok: boolean;
  message?: string;
}

interface AuthContextType {
  currentUser: UserAccount | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  requestPasswordReset: (email: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_URL = (import.meta.env.VITE_AUTH_API_URL as string | undefined)?.replace(/\/$/, '');

const getMessage = async (response: Response, fallback: string) => {
  try {
    const body = await response.json() as { message?: string };
    return body.message || fallback;
  } catch {
    return fallback;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(API_URL));

  useEffect(() => {
    if (!API_URL) return;

    const controller = new AbortController();
    fetch(`${API_URL}/session`, {
      credentials: 'include',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) return null;
        const body = await response.json() as { user?: UserAccount };
        return body.user ?? null;
      })
      .then((user) => setCurrentUser(user))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setCurrentUser(null);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      currentUser,
      isLoading,
      login: async (email, password) => {
        if (!API_URL) {
          return {
            ok: false,
            message: 'Student sign-in is being configured. Please contact your AECS coordinator for access.',
          };
        }

        try {
          const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            return { ok: false, message: await getMessage(response, 'Email or password was not accepted.') };
          }

          const body = await response.json() as { user?: UserAccount };
          if (!body.user) return { ok: false, message: 'The account response was incomplete.' };
          setCurrentUser(body.user);
          return { ok: true };
        } catch {
          return { ok: false, message: 'The sign-in service could not be reached. Please try again.' };
        }
      },
      requestPasswordReset: async (email) => {
        if (!API_URL) {
          return {
            ok: false,
            message: 'Password recovery is being configured. Please contact your AECS coordinator.',
          };
        }

        try {
          const response = await fetch(`${API_URL}/password-reset`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
          if (!response.ok) {
            return { ok: false, message: await getMessage(response, 'The reset request could not be submitted.') };
          }
          return { ok: true, message: 'If that address is enrolled, recovery instructions have been sent.' };
        } catch {
          return { ok: false, message: 'The account service could not be reached. Please try again.' };
        }
      },
      logout: async () => {
        setCurrentUser(null);
        if (!API_URL) return;
        try {
          await fetch(`${API_URL}/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: { Accept: 'application/json' },
          });
        } catch {
          // The local session is cleared even if the network is unavailable.
        }
      },
    }),
    [currentUser, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
