import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'day' | 'night';

const storageKey = 'aecs-theme';

const readInitialTheme = (): Theme => {
  try {
    const savedTheme = window.localStorage.getItem(storageKey);
    if (savedTheme === 'day' || savedTheme === 'night') return savedTheme;
  } catch {
    // Storage may be unavailable in privacy-restricted contexts.
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
};

const initialTheme = readInitialTheme();
document.documentElement.dataset.theme = initialTheme;

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const nextTheme = theme === 'day' ? 'night' : 'day';

  const toggleTheme = () => {
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);

    try {
      window.localStorage.setItem(storageKey, nextTheme);
    } catch {
      // The theme still applies for the current session.
    }
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      aria-pressed={theme === 'night'}
      title={`Switch to ${nextTheme} theme`}
    >
      {theme === 'day'
        ? <Moon className="h-4 w-4" aria-hidden="true" />
        : <Sun className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
};
