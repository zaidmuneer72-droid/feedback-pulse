import { useState } from 'react';
import { initialMockAnalysis } from './mockData';
import SentimentScoreBar from './components/SentimentScoreBar';
import FeedbackCard from './components/FeedbackCard';
import ResponseDraftCard from './components/ResponseDraftCard';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState(initialMockAnalysis);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const rawFeedback = inputText.trim();

  const handleAnalyze = async () => {
    if (!rawFeedback || !rawFeedback.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: rawFeedback }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      console.error('Analysis Error:', err);
      setError('Failed to analyze feedback. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  // Filter items based on active sentiment button
  const filteredItems = analysis ? analysis.items.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'negative') return item.type === 'bug' || item.urgency === 'high';
    if (filter === 'positive') return item.type === 'praise';
    if (filter === 'neutral') return item.type === 'feature';
    return true;
  }) : [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 mb-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="bg-indigo-600 text-white font-black text-xl px-3 py-1.5 rounded-lg">FP</span>
            <h1 className="text-xl font-bold text-slate-900">FeedbackPulse</h1>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-6 pb-16">
        {/* Input Form Section */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
          <label htmlFor="feedback-input" className="block text-sm font-semibold text-slate-800 mb-2">
            Paste Raw Customer Reviews / Support Tickets
          </label>
          <textarea
            id="feedback-input"
            rows="4"
            className="w-full p-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 placeholder-slate-400 outline-none transition-all"
            placeholder="Paste multiple app reviews or support ticket logs here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          {/* Error Banner */}
          {error && (
            <div className="mt-3 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg" role="alert">
              {error}
            </div>
          )}

          <div className="flex justify-end mt-3">
            <button
              onClick={handleAnalyze}
              disabled={loading || !inputText.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Analyzing...</span>
                </>
              ) : (
                <span>Analyze Feedback</span>
              )}
            </button>
          </div>
        </section>

        {/* Dashboard Results */}
        {analysis && (
          <section className="space-y-6">
            <SentimentScoreBar
              sentiment={analysis.sentiment}
              activeFilter={filter}
              onFilterChange={setFilter}
            />

            <ResponseDraftCard draftText={analysis.responseDraft} />

            {/* Categorized Feedback Grid */}
            <div>
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Categorized Action Items ({filteredItems.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredItems.map((item) => (
                  <FeedbackCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}