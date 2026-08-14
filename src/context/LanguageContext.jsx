import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext();
const STORAGE_KEY = 'leana-language';

/** Remember the visitor's choice, and default to Spanish for Spanish-speaking browsers. */
function initialLanguage() {
  if (typeof window === 'undefined') return 'en';
  const saved = window.localStorage?.getItem(STORAGE_KEY);
  if (saved === 'en' || saved === 'es') return saved;
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(initialLanguage);

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
