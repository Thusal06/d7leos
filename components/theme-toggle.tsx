"use client";
import React from 'react';
import { useTheme } from './theme-provider';

// Sun/Moon icon button for theme toggle
export function ThemeToggleButton() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative inline-flex items-center justify-center h-9 w-9 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 hover:bg-white/90 dark:hover:bg-white/20 transition"
    >
      {/* Sun icon for light mode, visible when theme is light */}
      <svg
        className={`h-5 w-5 text-yellow-500 ${isDark ? 'hidden' : 'block'}`}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.48 0l1.79-1.79 1.41 1.41-1.79 1.8-1.41-1.42zM12 4V1h-0v3h0zm0 19v-3h-0v3h0zM4 12H1v0h3v0zm19 0h-3v0h3v0zM6.76 19.16l-1.79 1.79 1.41 1.41 1.8-1.79-1.42-1.41zm10.48 0l1.42 1.41 1.79-1.79-1.41-1.41-1.8 1.79zM12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
      {/* Moon icon for dark mode, visible when theme is dark */}
      <svg
        className={`h-5 w-5 text-yellow-300 ${isDark ? 'block' : 'hidden'}`}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M21.75 15.5A9.75 9.75 0 1110.5 2.25c.2 0 .4 0 .6.02a.75.75 0 01.23 1.45A7.5 7.5 0 1019.78 13.67a.75.75 0 011.45-.23c.02.2.02.4.02.6z" />
      </svg>
    </button>
  );
}