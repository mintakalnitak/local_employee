import { Search, MapPin, Sparkles } from 'lucide-react';

interface HeroProps {
    onSearch: (query: string) => void;
    searchQuery: string;
}

export function Hero({ onSearch, searchQuery }: HeroProps) {
    return (
        <div className="relative overflow-hidden w-full flex flex-col items-center pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">

            {/* Small badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 text-xs font-bold uppercase tracking-wider mb-8 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
                <Sparkles strokeWidth={2.5} className="w-4 h-4" />
                Premium Services Hub
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold text-center text-gray-900 dark:text-white mb-6 animate-fade-in-up" style={{ animationDelay: '100ms', lineHeight: '1.15' }}>
                Find Trusted Service <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500">
                    Providers Near You
                </span>
            </h1>

            <p className="text-lg md:text-xl text-center text-gray-600 dark:text-gray-400 max-w-2xl mb-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                Connecting households with the finest, reliable local artisans and tradespeople instantly.
            </p>

            {/* Main glass search input */}
            <div className="w-full max-w-3xl glass-panel !rounded-2xl p-2 md:p-3 flex items-center shadow-glass-lg animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <div className="flex-1 relative flex items-center">
                    <Search className="absolute left-4 w-6 h-6 text-brand-500 opacity-70" />
                    <input
                        type="text"
                        placeholder="Search for plumbers, electricians, cleaners..."
                        value={searchQuery}
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full h-14 pl-14 pr-4 bg-transparent border-none text-base md:text-lg text-gray-800 dark:text-white placeholder-gray-400 outline-none focus:ring-0"
                    />
                </div>
                <button className="btn-primary flex-shrink-0 !h-12 !px-8 !rounded-xl text-base hidden sm:flex">
                    Search
                </button>
            </div>

            {/* Fast filters decorative element beneath search */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <span className="text-sm font-medium text-gray-500 mr-2 flex items-center">Popular:</span>
                {['Plumbing', 'Electrical', 'House Cleaning'].map(t => (
                    <button key={t} onClick={() => onSearch(t)} className="text-sm bg-white/40 border border-white/60 text-gray-700 px-4 py-1.5 rounded-full hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-colors shadow-sm dark:bg-slate-800/40 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-brand-500 dark:hover:border-brand-500">
                        {t}
                    </button>
                ))}
            </div>
        </div>
    );
}
