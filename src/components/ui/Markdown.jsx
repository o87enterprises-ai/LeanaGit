import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// react-markdown renders bare tags; give them the campaign's typography.
const components = {
  p: ({ children }) => <p className="text-rooted-black/80 leading-relaxed mb-4">{children}</p>,
  strong: ({ children }) => <strong className="font-bold text-rooted-black">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-rooted-black/80">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-rooted-black/80">{children}</ol>
  ),
  h2: ({ children }) => (
    <h2 className="font-playfair text-2xl font-bold text-rooted-black mt-6 mb-3">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-playfair text-xl font-bold text-rooted-black mt-4 mb-2">{children}</h3>
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

export default function Markdown({ children }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
