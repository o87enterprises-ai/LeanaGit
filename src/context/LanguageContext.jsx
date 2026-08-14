import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext();
const STORAGE_KEY = 'leana-language';

/**
 * Pick the starting language: an explicit ?lang= wins (old /es/ links from the
 * previous site redirect here), then whatever the visitor last chose, then the
 * browser's own language.
 */
function initialLanguage() {
  if (typeof window === 'undefined') return 'en';

  const requested = new URLSearchParams(window.location.search).get('lang');
  if (requested === 'en' || requested === 'es') return requested;

  const saved = window.localStorage?.getItem(STORAGE_KEY);
  if (saved === 'en' || saved === 'es') return saved;

  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

/** Drop ?lang= once it has been read, so it can't override a later choice. */
function stripLangParam() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has('lang')) return;
  url.searchParams.delete('lang');
  const query = url.searchParams.toString();
  window.history.replaceState(
    window.history.state,
    '',
    url.pathname + (query ? `?${query}` : '') + url.hash
  );
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(initialLanguage);

  useEffect(() => {
    stripLangParam();
  }, []);

  useEffect(() => {
    // Keep <html lang> honest — screen readers pick pronunciation from it,
    // and it tells browsers whether to offer their own translation.
    document.documentElement.lang = language;
    try {
      window.localStorage?.setItem(STORAGE_KEY, language);
    } catch {
      // private browsing; the choice just won't persist
    }
  }, [language]);

  const toggleLanguage = () => setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));

  const t = (enText, esText) => (language === 'en' ? enText : esText ?? enText);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
