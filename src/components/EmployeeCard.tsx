import { Star, MapPin, Phone, Briefcase, MessageSquare } from 'lucide-react';

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
  remote?: boolean; // Added per design direction
}

interface EmployeeCardProps {
  employee: Employee;
  onViewProfile: (id: string) => void;
}

function getGradient(name: string) {
  const palettes = [
    ['from-[#ff9a9e]', 'to-[#fecfef]'],
    ['from-[#84fab0]', 'to-[#8fd3f4]'],
    ['from-[#a18cd1]', 'to-[#fbc2eb]'],
    ['from-[#fad0c4]', 'to-[#ffd1ff]'],
    ['from-[#a8edea]', 'to-[#fed6e3]'],
    ['from-[#4facfe]', 'to-[#00f2fe]'],
    ['from-[#43e97b]', 'to-[#38f9d7]'],
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const [f, t] = palettes[Math.abs(hash) % palettes.length];
  return `bg-gradient-to-br ${f} ${t}`;
}

export function EmployeeCard({ employee, onViewProfile }: EmployeeCardProps) {
  const initials = employee.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const avatarGradient = getGradient(employee.name);
  const isRemote = employee.remote ?? true; // Default to remote if not specified

  return (
    <div className="glass-panel !rounded-[24px] p-6 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-glass-lg hover:bg-white dark:hover:bg-slate-800 group cursor-pointer border-white/60 dark:border-slate-700/60" onClick={() => onViewProfile(employee.id)}>

      {/* Top Header Section with Photo & Indicator */}
      <div className="flex justify-between items-start">
        <div className="relative">
          {/* Photo / Avatar Area */}
          <div className="w-[84px] h-[84px] relative">
            {employee.photo_url ? (
              <img src={employee.photo_url} alt={employee.name} className="w-full h-full object-cover rounded-[22px] shadow-md border-[3px] border-white dark:border-slate-800" />
            ) : (
              <div className={`w-full h-full rounded-[22px] flex items-center justify-center text-white font-display font-bold text-3xl shadow-md border-[3px] border-white dark:border-slate-800 ${avatarGradient}`}>
                {initials}
              </div>
            )}

            {/* 1. Remote Indicator Icon (TOP-LEFT per request) */}
            <div className={`absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800 z-10 transition-transform group-hover:scale-110 ${isRemote ? 'bg-brand-500 text-white' : 'bg-emerald-500 text-white'}`}>
              {isRemote ? <Briefcase className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
            </div>
          </div>
        </div>

        {/* 5. Employment-type Badge (availability) */}
        <div className="px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-[0.1em] font-display bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-300 border border-brand-500/20 shadow-sm">
          {employee.availability}
        </div>
      </div>

      {/* Card Info */}
      <div className="flex-1">
        {/* 2. Employee Name */}
        <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-1 leading-tight group-hover:text-brand-500 transition-colors">{employee.name}</h3>

        {/* 3. Role/Title */}
        <p className="text-brand-600 dark:text-brand-400 font-semibold text-sm mb-4">{employee.profession}</p>

        {/* Additional Functional Data (Location/Rating) */}
        <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400 font-medium bg-slate-50/50 dark:bg-slate-900/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-2 opacity-60" />
              <span>{employee.location}</span>
            </div>
            <div className="flex items-center text-yellow-600 dark:text-yellow-500 font-bold">
              <Star className="w-3.5 h-3.5 mr-1 fill-yellow-400" />
              <span>{employee.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex items-center text-[12px] opacity-80 border-t border-slate-200/50 dark:border-slate-700/50 pt-2 mt-2">
            <span className="font-bold mr-2 text-slate-700 dark:text-slate-200">{employee.experience_years} Years Experience</span>
          </div>
        </div>
      </div>

      {/* 4. Message + Call Action Buttons */}
      <div className="pt-2 flex gap-3" onClick={(e) => e.stopPropagation()}>
        <a
          href={`https://wa.me/${employee.phone?.replace(/\D/g, '') ?? ''}`}
          target="_blank"
          rel="noopener noreferrer"
          className="icon-btn !w-12 !h-12 bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 !rounded-xl hover:text-green-500 dark:hover:text-green-400"
          onClick={(e) => e.stopPropagation()}
          title="WhatsApp Message"
        >
          <MessageSquare className="w-5 h-5 flex-shrink-0" />
        </a>
        <a
          href={`tel:${employee.phone}`}
          className="btn-primary flex-1 !h-12 !rounded-xl text-sm font-bold flex items-center justify-center gap-2 group/btn"
        >
          <Phone className="w-4 h-4 transition-transform group-hover/btn:scale-110" /> Call Provider
        </a>
      </div>
    </div>
  );
}
