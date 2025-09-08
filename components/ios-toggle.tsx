"use client";
import React from 'react';
import { useTheme } from './theme-provider';

// Simple iOS-style toggle switch that controls theme
export function IOSToggle() {
  const { theme, toggle } = useTheme();
  const checked = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none border border-black/10 dark:border-white/10 ${
        checked ? 'bg-zinc-900' : 'bg-zinc-200'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </button>
  );
}