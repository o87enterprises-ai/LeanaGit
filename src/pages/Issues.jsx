import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLanguage } from '../context/LanguageContext';

// The priorities live as markdown in public/content/projects/ (each one also has
// an .es.md translation), so the campaign can edit them without touching code.
const ISSUE_SLUGS = [
  'safer-schools',
  'students-with-disabilities',
  'budget',
  'superintendent',
  'engagement',
];

/** Minimal front-matter reader — enough for title/image/alt, no dependency. */
function parseFrontMatter(raw) {
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

async function fetchIssue(slug, language) {
  const paths =
    language === 'es'
      ? [`/content/projects/${slug}.es.md`, `/content/projects/${slug}.md`]
      : [`/content/projects/${slug}.md`];

  for (const path of paths) {
    try {
      const res = await fetch(path);
      if (!res.ok) continue;
      const raw = await res.text();
      if (raw.trimStart().startsWith('<')) continue; // dev-server HTML fallback
      const { data, body } = parseFrontMatter(raw);
      return { slug, title: data.title || slug, image: data.image, alt: data.alt, body };
    } catch {
      // try the next path
    }
  }
  return null;
}

// react-markdown renders bare tags; give them the campaign's typography.
const markdownComponents = {
  p: ({ children }) => (
    <p className="text-rooted-black/80 leading-relaxed mb-4">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-rooted-black">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-rooted-black/80">{children}</ul>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-oakland-terracotta font-semibold underline hover:text-sierra-sage transition-colors"
    >
      {children}
    </a>
  ),
};

export default function Issues() {
  const { language, t } = useLanguage();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    Promise.all(ISSUE_SLUGS.map((slug) => fetchIssue(slug, language))).then((results) => {
      if (cancelled) return;
      setIssues(results.filter(Boolean));
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [language]);

  return (
    <div className="min-h-screen bg-warm-ivory">
      <section className="honeycomb-bg py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
          <span className="absolute top-8 left-10 text-5xl anim-float-1 text-rooted-black/10">🐾</span>
          <span className="absolute bottom-6 right-12 text-4xl anim-float-2 text-rooted-black/10">🐾</span>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-rooted-black mb-4">
            {t('Where LeAna Stands', 'La Postura de LeAna')}
          </h1>
          <p className="text-lg sm:text-xl text-rooted-black/70">
            {t(
              'Five priorities for District 6 — safe schools, real support for students with disabilities, an honest budget, stable leadership, and families at the table.',
              'Cinco prioridades para el Distrito 6: escuelas seguras, apoyo real para estudiantes con discapacidades, un presupuesto honesto, liderazgo estable y familias en la mesa.'
            )}
          </p>
        </div>
      </section>

      {loading ? (
        <div className="py-24 flex justify-center">
          <div className="w-16 h-16 border-4 border-oakland-terracotta border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
          {issues.map((issue, index) => (
            <article
              key={issue.slug}
              id={issue.slug}
              className="scroll-mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
            >
              {issue.image && (
                <div className={`h-64 md:h-full min-h-[16rem] ${index % 2 ? 'md:order-2' : ''}`}>
                  <img
                    src={issue.image}
                    alt={issue.alt || issue.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className={`p-8 ${issue.image ? '' : 'md:col-span-2'}`}>
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-oakland-terracotta mb-2">
                  {t('Priority', 'Prioridad')} {index + 1}
                </span>
                <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-rooted-black mb-4">
                  {issue.title}
                </h2>
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {issue.body}
                </ReactMarkdown>
              </div>
            </article>
          ))}

          <div className="text-center bg-deep-navy text-white rounded-2xl p-10">
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold mb-3">
              {t('Have an idea, or a question?', '¿Tiene una idea o una pregunta?')}
            </h2>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              {t(
                'LeAna is meeting with District 6 principals, families, and community members. She would like to hear from you.',
                'LeAna se está reuniendo con directores, familias y miembros de la comunidad del Distrito 6. Le gustaría saber de usted.'
              )}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:leana@leanaforoaklandschools.com"
                className="bg-oakland-terracotta text-white px-6 py-3 rounded-full font-bold hover:bg-california-gold transition-colors"
              >
                {t('Email LeAna', 'Escríbale a LeAna')}
              </a>
              <Link
                to="/volunteer"
                className="bg-white text-rooted-black px-6 py-3 rounded-full font-bold hover:bg-california-gold hover:text-white transition-colors"
              >
                {t('Get involved', 'Participe')} &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="pb-16 text-center">
        <Link to="/" className="text-oakland-terracotta font-bold underline hover:text-sierra-sage transition-colors">
          {t('Return Home', 'Volver al Inicio')}
        </Link>
      </div>
    </div>
  );
}
