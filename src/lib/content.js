import { useEffect, useState } from 'react';

/** Minimal front-matter reader — enough for title/image/alt, no dependency. */
export function parseFrontMatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = /^\s*([A-Za-z_][\w-]*)\s*:\s*(.*)$/.exec(line);
    if (!pair) continue; // list items and blank lines
    const value = pair[2].trim().replace(/^["']|["']$/g, '');
    if (value) data[pair[1]] = value;
  }
  return { data, body: raw.slice(match[0].length) };
}

/**
 * Load a markdown file from public/content, preferring the Spanish
 * translation when the site is in Spanish and falling back to English if
 * that file doesn't exist yet.
 *
 *   fetchDoc('/content/about', 'es')  ->  /content/about.es.md, then /content/about.md
 */
export async function fetchDoc(basePath, language) {
  const paths =
    language === 'es' ? [`${basePath}.es.md`, `${basePath}.md`] : [`${basePath}.md`];

  for (const path of paths) {
    try {
      const res = await fetch(path);
      if (!res.ok) continue;
      const raw = await res.text();
      if (raw.trimStart().startsWith('<')) continue; // dev-server HTML fallback
      const { data, body } = parseFrontMatter(raw);
      return { ...data, body, path };
    } catch {
      // try the next path
    }
  }
  return null;
}

/** Same, for a list of documents loaded together. */
export function useDocs(basePaths, language) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const key = basePaths.join('|');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    Promise.all(key.split('|').map((path) => fetchDoc(path, language))).then((results) => {
      if (cancelled) return;
      setDocs(results.filter(Boolean));
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [key, language]);

  return { docs, loading };
}
