'use client';

import { useTheme } from 'next-themes';

export const useThemeToggle = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const currentTheme = resolvedTheme ?? theme ?? 'light';
  const isDark = currentTheme === 'dark';

  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  return { isDark, toggleTheme };
};
