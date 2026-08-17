
export default function FeedbackCard({ item }) {
  const typeStyles = {
    bug: 'bg-rose-50 text-rose-700 border-rose-200',
    feature: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    praise: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const urgencyBadge = {
    high: 'bg-rose-600 text-white',
    medium: 'bg-amber-500 text-white',
    low: 'bg-slate-500 text-white',
  };

  return (
    <article className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border ${typeStyles[item.type] || 'bg-slate-50 text-slate-700 border-slate-200'}`}>
            {item.type}
          </span>
          {item.urgency && (
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${urgencyBadge[item.urgency]}`}>
              {item.urgency} priority
            </span>
          )}
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">{item.title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">{item.description}</p>
      </div>
      <div className="text-xs text-slate-400 font-medium border-t border-slate-100 pt-3">
        Source: {item.source}
      </div>
    </article>
  );
}