import { Wrench, Zap, Hammer, Sparkles, Home, Paintbrush } from 'lucide-react';

interface Category {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const categories: Category[] = [
  { name: 'Plumber', icon: <Wrench className="w-8 h-8" />, color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300' },
  { name: 'Electrician', icon: <Zap className="w-8 h-8" />, color: 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300' },
  { name: 'Carpenter', icon: <Hammer className="w-8 h-8" />, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300' },
  { name: 'Cleaner', icon: <Sparkles className="w-8 h-8" />, color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300' },
  { name: 'Painter', icon: <Paintbrush className="w-8 h-8" />, color: 'bg-rose-100 text-rose-600 dark:bg-rose-900 dark:text-rose-300' },
  { name: 'Home Repair', icon: <Home className="w-8 h-8" />, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300' },
];

interface CategoriesProps {
  onSelectCategory: (category: string) => void;
}

export function Categories({ onSelectCategory }: CategoriesProps) {
  return (
    <section className="py-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
      <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6 tracking-tight text-center md:text-left">Browse by Service</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            className="glass-panel !rounded-2xl p-5 sm:p-6 hover:shadow-glass hover:-translate-y-1 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 flex flex-col items-center justify-center space-y-4 group cursor-pointer border-white/60 dark:border-slate-700/60"
          >
            <div className={`${category.color} p-4 rounded-2xl group-hover:scale-110 shadow-sm transition-transform duration-300 -rotate-3 group-hover:rotate-0`}>
              {category.icon}
            </div>
            <span className="text-sm font-semibold text-center text-gray-700 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors tracking-wide">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
