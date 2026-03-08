import { ArrowUpDown, MapPin } from 'lucide-react';

interface FilterBarProps {
  sortBy: 'rating' | 'name';
  onSortChange: (sort: 'rating' | 'name') => void;
  totalResults: number;
  locations: string[];
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

export function FilterBar({
  sortBy,
  onSortChange,
  totalResults,
  locations,
  selectedLocation,
  onLocationChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-8 glass-panel !rounded-2xl p-4 md:p-5">
      <div className="text-[15px] font-medium text-slate-600 dark:text-slate-300 mb-4 sm:mb-0">
        <span className="font-bold font-display text-slate-900 dark:text-white mr-1.5 bg-brand-500/10 text-brand-600 dark:text-brand-300 px-2.5 py-1 rounded-full">{totalResults}</span>
        Service Providers Found
      </div>

      <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 md:gap-5 w-full sm:w-auto">

        <div className="flex items-center bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-xl px-3 h-10 shadow-sm">
          <MapPin className="w-4 h-4 text-brand-500 mr-2" />
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="text-sm bg-transparent outline-none text-slate-900 dark:text-white font-medium cursor-pointer"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-xl px-3 h-10 shadow-sm">
          <ArrowUpDown className="w-4 h-4 text-brand-500 mr-2" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'rating' | 'name')}
            className="text-sm bg-transparent outline-none text-slate-900 dark:text-white font-medium cursor-pointer"
          >
            <option value="rating">Top Rated</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>

      </div>
    </div>
  );
}
