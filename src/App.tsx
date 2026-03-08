import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AdminDashboard } from './pages/AdminDashboard';
import { ThemeProvider } from './components/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>

        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
              © 2024 LocalConnect. Connecting you with trusted local service providers.
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
