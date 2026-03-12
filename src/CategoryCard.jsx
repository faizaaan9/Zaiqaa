export default function CategoryCard({ category: c, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 group">
      <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${c.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-lg transition-all duration-200`}>
        <span className="text-2xl sm:text-3xl">{c.emoji}</span>
      </div>
      <span className="text-[11px] font-semibold text-z-800 text-center leading-tight">{c.name}</span>
    </button>
  );
}
