import  { useState } from 'react';

export default function ResponseDraftCard({ draftText }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(draftText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-white">Suggested Customer Support Response</h2>
        <button
          onClick={handleCopy}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Copy customer support response to clipboard"
        >
          {copied ? '✓ Copied!' : 'Copy Response'}
        </button>
      </div>
      
      {/* Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite">
        {copied ? 'Support response copied to clipboard' : ''}
      </div>

      <pre className="text-sm text-slate-300 font-sans whitespace-pre-wrap leading-relaxed bg-slate-800/60 p-4 rounded-lg border border-slate-700/50">
        {draftText}
      </pre>
    </div>
  );
}