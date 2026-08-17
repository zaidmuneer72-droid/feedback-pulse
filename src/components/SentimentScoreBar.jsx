
export default function SentimentScoreBar({ sentiment, activeFilter, onFilterChange }) {
  const { positive, neutral, negative } = sentiment;

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 mb-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-3">Overall Sentiment Breakdown</h2>
      
      {/* Visual Progress Bar */}
      <div 
        className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex mb-4"
        role="progressbar"
        aria-label="Sentiment distribution bar"
        aria-valuenow={positive}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div style={{ width: `${positive}%` }} className="bg-emerald-500 h-full transition-all duration-300" title={`Positive: ${positive}%`} />
        <div style={{ width: `${neutral}%` }} className="bg-amber-400 h-full transition-all duration-300" title={`Neutral: ${neutral}%`} />
        <div style={{ width: `${negative}%` }} className="bg-rose-500 h-full transition-all duration-300" title={`Negative: ${negative}%`} />
      </div>

      {/* Interactive Legend / Filter Buttons */}
      <div className="flex flex-wrap gap-3" role="group" aria-label="Filter feedback by sentiment">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            activeFilter === 'all' 
              ? 'bg-slate-900 text-white' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          All Items
        </button>
        <button
          onClick={() => onFilterChange('positive')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            activeFilter === 'positive' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
          }`}
        >
          Positive ({positive}%)
        </button>
        <button
          onClick={() => onFilterChange('neutral')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            activeFilter === 'neutral' 
              ? 'bg-amber-500 text-white' 
              : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
          }`}
        >
          Neutral ({neutral}%)
        </button>
        <button
          onClick={() => onFilterChange('negative')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            activeFilter === 'negative' 
              ? 'bg-rose-600 text-white' 
              : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
          }`}
        >
          Negative ({negative}%)
        </button>
      </div>
    </div>
  );
}