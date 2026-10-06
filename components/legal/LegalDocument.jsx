'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Dark background with the site's brand gradient, shared by every legal page.
const bgImageStyle = {
  backgroundColor: 'hsla(219,45%,7%,1)',
  backgroundImage: `
    radial-gradient(at 63% 43%, hsla(217,43%,7%,1) 0px, transparent 50%),
    radial-gradient(at 63% 59%, hsla(197,100%,32%,0.2) 0px, transparent 50%),
    radial-gradient(at 80% 94%, hsla(218,44%,7%,1) 0px, transparent 50%),
    radial-gradient(at 39% 40%, hsla(218,44%,7%,1) 0px, transparent 50%),
    radial-gradient(at 39% 76%, hsla(218,44%,7%,1) 0px, transparent 50%),
    radial-gradient(at 99% 46%, hsla(212,100%,20%,1) 0px, transparent 50%),
    radial-gradient(at 51% 0%, hsla(212,100%,20%,1) 0px, transparent 50%),
    radial-gradient(at 0% 47%, hsla(212,100%,15%,1) 0px, transparent 50%),
    radial-gradient(at 0% 61%, hsla(197,100%,32%,0.6) 0px, transparent 50%)
  `,
};

// Renders a legal document written in Markdown (content/legal/*.md) with the site's look.
const components = {
  h1: (props) => <h1 className="text-4xl mb:text-5xl font-light text-white mb-4" {...props} />,
  h2: (props) => <h2 className="text-2xl mb:text-3xl font-semibold text-slate-200 mt-12 mb-4" {...props} />,
  p: (props) => <p className="text-base text-slate-300 leading-relaxed mb-4" {...props} />,
  ul: (props) => <ul className="list-disc pl-6 text-slate-300 mb-4 space-y-2" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 text-slate-300 mb-4 space-y-2" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  strong: (props) => <strong className="font-semibold text-white" {...props} />,
  a: (props) => <a className="text-orange-400 underline hover:text-orange-300" {...props} />,
  code: (props) => <code className="bg-slate-800 text-orange-200 px-1 py-0.5 rounded text-sm" {...props} />,
  table: (props) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-left text-sm text-slate-300 border-collapse" {...props} />
    </div>
  ),
  th: (props) => <th className="border border-slate-600 bg-slate-800/60 px-3 py-2 font-semibold text-white" {...props} />,
  td: (props) => <td className="border border-slate-700 px-3 py-2 align-top" {...props} />,
};

export default function LegalDocument({ markdown }) {
  return (
    <div style={bgImageStyle} className="w-full">
      <article className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {markdown}
        </ReactMarkdown>
      </article>
    </div>
  );
}
