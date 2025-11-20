'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeMode, Theme } from '../types/theme';
import { lightTheme, darkTheme } from '../styles/theme';

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setThemeMode(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', themeMode);
      document.documentElement.setAttribute('data-theme', themeMode);
      
      // Set CSS variables for theme colors
      const currentTheme = themeMode === 'light' ? lightTheme : darkTheme;
      const root = document.documentElement;
      root.style.setProperty('--color-bg', currentTheme.colors.bg);
      root.style.setProperty('--color-bg-secondary', currentTheme.colors.bgSecondary);
      root.style.setProperty('--color-text', currentTheme.colors.text);
      root.style.setProperty('--color-text-secondary', currentTheme.colors.textSecondary);
      root.style.setProperty('--color-accent', currentTheme.colors.accent);
      root.style.setProperty('--color-card', currentTheme.colors.card);
      root.style.setProperty('--color-border', currentTheme.colors.border);
      root.style.setProperty('--color-button', currentTheme.colors.button);
      root.style.setProperty('--color-button-hover', currentTheme.colors.buttonHover);
    }
  }, [themeMode, mounted]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  // Always provide the context, even during SSR, using default dark theme
  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

