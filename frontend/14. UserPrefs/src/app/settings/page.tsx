'use client';

import { useEffect, useState } from 'react';
import Toast from '@/src/components/Toast';
import { prefs } from '@/src/app/types/prefs';
import { useTranslations } from 'next-intl';
import { ThemeContext } from '@/src/context/ThemeProvider';
import { useContext } from 'react';

export default function SettingsPage() {
  const t = useTranslations('SettingsPage');
  // const { theme, setTheme } = useTheme(); // Theme from Context
  const { theme, setTheme } = useContext(ThemeContext)!

  const [prefsState, setPrefsState] = useState<prefs>({
    theme: 'light',
    notification: false,
    language: 'en',
  });

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Load initial prefs from API
  useEffect(() => {
    async function fetchPrefs() {
      try {
        const res = await fetch('/api/prefs');
        const data: prefs = await res.json();
        setPrefsState(data);

        // Also sync Context theme with prefs.json theme
        if (data.theme !== theme) {
          setTheme(data.theme as "light" | "dark");
        }
      } catch (err) {
        console.error('Failed to load prefs', err);
      }
    }
    fetchPrefs();
  }, []);

  // Update prefs.json via API
  async function updatePrefs(updated: Partial<prefs>) {
    try {
      const newPrefs = { ...prefsState, ...updated };
      setPrefsState(newPrefs);

      await fetch('/api/prefs', {
        method: 'POST',
        body: JSON.stringify(newPrefs),
      });

      setToast({ message: t('saved'), type: 'success' });
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to save', type: 'error' });
    }
  }

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
      </div>

      <div className="space-y-6 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-6 rounded-xl shadow-sm transition-colors duration-300">
        {/* Theme Selector */}
        <label className="flex flex-col gap-1">
          <span className="font-medium text-zinc-800 dark:text-zinc-100">{t('theme')}</span>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
            className="px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>

        {/* Notification Toggle */}
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={prefsState.notification}
            onChange={(e) => updatePrefs({ notification: e.target.checked })}
            className="w-4 h-4 accent-blue-600"
          />
          <span className="font-medium text-zinc-800 dark:text-zinc-100">{t('notifications')}</span>
        </label>

        {/* Language Selector */}
        <label className="flex flex-col gap-1">
          <span className="font-medium text-zinc-800 dark:text-zinc-100">{t('language')}</span>
          <select
            value={prefsState.language}
            onChange={(e) => updatePrefs({ language: e.target.value })}
            className="px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="am">Amharic</option>
            <option value="ar">Arabic</option>
          </select>
        </label>
      </div>

      {/* Toast notifications */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </section>
  );
}
