import { useState, useEffect } from 'react';
import { Activity, Moon, Sun, ArrowRight, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Navbar = ({ onNavigate, currentPage }) => {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? `${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-lg shadow-2xl` 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group cursor-pointer relative z-10"
          >
            <div className={`p-2.5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg ${
              isDark ? 'shadow-blue-500/50' : 'shadow-blue-600/30'
            }`}>
              <Activity className="w-7 h-7 text-white animate-pulse-slow" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              HeartPredict
            </h1>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3 sm:gap-4">
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-xl transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              } hover:scale-110 shadow-lg transform hover:rotate-12`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 animate-spin-slow" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {currentPage === 'home' && (
              <button
                onClick={() => onNavigate('predict')}
                className="group px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1 flex items-center gap-2 text-sm sm:text-base"
              >
                Predict Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden absolute top-20 left-0 right-0 ${
            isDark ? 'bg-gray-900/98' : 'bg-white/98'
          } backdrop-blur-lg border-t ${
            isDark ? 'border-gray-800' : 'border-gray-200'
          } shadow-xl animate-slide-down`}>
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={toggleTheme}
                className={`w-full p-3 rounded-xl transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } flex items-center justify-center gap-2`}
              >
                {isDark ? (
                  <>
                    <Sun className="w-5 h-5" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>

              {currentPage === 'home' && (
                <button
                  onClick={() => {
                    onNavigate('predict');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg flex items-center justify-center gap-2"
                >
                  Predict Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </nav>
  );
};