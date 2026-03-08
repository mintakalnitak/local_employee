import { EmployeeCard } from './EmployeeCard';
import { Loader2, SearchX } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  profession: string;
  location: string;
  phone: string;
  email: string | null;
  rating: number;
  skills: string[];
  availability: string;
  photo_url: string | null;
  description: string;
  experience_years: number;
}

interface EmployeeListProps {
  employees: Employee[];
  loading: boolean;
  onViewProfile: (id: string) => void;
}

export function EmployeeList({ employees, loading, onViewProfile }: EmployeeListProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 animate-fade-in-up">
        <div className="w-16 h-16 relative flex items-center justify-center mb-4">
          <div className="absolute inset-0 rounded-full border-[3px] border-brand-200 dark:border-slate-700"></div>
          <div className="absolute inset-0 rounded-full border-[3px] border-brand-500 border-t-transparent animate-spin"></div>
        </div>
        <span className="text-lg font-medium text-slate-600 dark:text-slate-300">Summoning top service providers...</span>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="glass-panel !rounded-[24px] flex flex-col items-center justify-center py-24 text-center mx-auto max-w-2xl animate-fade-in-up border-dashed !border-2">
        <div className="bg-slate-100 dark:bg-slate-800 w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <SearchX className="w-10 h-10 text-slate-400 dark:text-slate-500" />
        </div>
        <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-2">No providers match your criteria</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm">Try adjusting your category, location, or search filters to find what you need.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
      {employees.map((employee, index) => (
        <div key={employee.id} className="animate-fade-in-up" style={{ animationDelay: `${(index % 12) * 50}ms` }}>
          <EmployeeCard
            employee={employee}
            onViewProfile={onViewProfile}
          />
        </div>
      ))}
    </div>
  );
}
