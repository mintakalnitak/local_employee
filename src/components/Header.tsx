import { Search, MapPin, User as UserIcon, LogOut, LayoutDashboard, Compass } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export function Header({ onSearch, searchQuery }: HeaderProps) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border-b border-white/50 dark:border-slate-800/50 shadow-glass-sm mt-0 mx-auto w-full transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">

          <Link to="/" className="flex items-center gap-3 hover:-translate-y-px transition-transform group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-400 flex items-center justify-center text-white shadow-[0_8px_16px_rgba(99,102,241,0.25)] group-hover:shadow-[0_12px_24px_rgba(99,102,241,0.3)] transition-all">
              <Compass className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white tracking-tight">LocalConnect</h1>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex gap-6 mr-4 font-semibold text-[15px] text-gray-500 dark:text-gray-400">
              <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-[2px] after:bg-brand-500 after:rounded-full after:opacity-100 text-gray-900 dark:text-white">Directory</Link>
              <Link to="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Services</Link>
              <Link to="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">About</Link>
            </div>

            {currentUser ? (
              <div className="flex items-center gap-3">
                <Link to="/admin" className="btn-secondary hidden sm:flex !h-10 !px-4">
                  <LayoutDashboard className="w-4 h-4" /> Admin
                </Link>
                <button onClick={handleLogout} className="btn-secondary !h-10 !px-4 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary !h-10 !px-5 text-sm">
                <UserIcon className="w-4 h-4" /> Sign In
              </Link>
            )}

            <div className="ml-2 pl-2 sm:ml-4 sm:pl-4 border-l border-gray-200 dark:border-slate-700">
              <ThemeSwitcher />
            </div>
          </div>
        </div>

        {/* Keeping mobile search fallback if onSearch prop is heavily relied upon, but hidden on desktop since hero handles it */}
        {onSearch && searchQuery !== undefined && (
          <div className="pt-4 md:hidden">
            <div className="relative glass-panel rounded-xl flex items-center p-1">
              <Search className="absolute left-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-transparent border-none text-sm text-gray-800 dark:text-white placeholder-gray-400 outline-none focus:ring-0"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
