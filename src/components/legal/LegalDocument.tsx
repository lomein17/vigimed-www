import Link from 'next/link';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

type LegalDocumentProps = {
  source: string;
  lang: 'es' | 'en';
};

const linkClass =
  'text-brand-500 underline decoration-brand-500/40 underline-offset-2 transition-colors hover:text-brand-400 hover:decoration-brand-400';

function isInternalHref(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//');
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-[-0.015em] text-text-primary mt-0 mb-4">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-display text-xl md:text-2xl lg:text-[1.75rem] font-bold leading-[1.2] tracking-[-0.01em] text-text-primary mt-12 md:mt-16 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-display text-lg md:text-xl font-medium leading-[1.3] text-text-muted mt-8 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-display text-base md:text-lg font-medium leading-[1.35] text-text-muted mt-6 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="font-body text-text-body text-[1rem] md:text-[1.0625rem] leading-relaxed mt-4">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="font-body text-text-body text-[1rem] md:text-[1.0625rem] leading-relaxed mt-4 list-disc list-outside pl-6 marker:text-text-muted">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="font-body text-text-body text-[1rem] md:text-[1.0625rem] leading-relaxed mt-4 list-decimal list-outside pl-6 marker:text-text-muted">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="mt-2">{children}</li>,
  a: ({ href, children, title }) => {
    if (href === undefined || href === '') {
      return <>{children}</>;
    }
    if (href.startsWith('mailto:') || href.startsWith('#')) {
      return (
        <a href={href} title={title} className={linkClass}>
          {children}
        </a>
      );
    }
    if (isInternalHref(href)) {
      return (
        <Link href={href} title={title} className={linkClass}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        title={title}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {children}
      </a>
    );
  },
  code: ({ children }) => (
    <code className="font-mono text-[0.9em] bg-gray-100 text-text-primary rounded px-1.5 py-0.5 break-all">
      {children}
    </code>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-text-primary">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  hr: () => <hr className="my-8 border-0 border-t border-gray-200" />,
};

export function LegalDocument({ source, lang }: LegalDocumentProps) {
  return (
    <article
      lang={lang}
      className="mx-auto max-w-[68ch] px-gutter py-16 md:py-24"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {source}
      </ReactMarkdown>
    </article>
  );
}
