import { Heart, Github, Twitter, Linkedin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Footer = () => {
  const { isDark } = useTheme();
  
  return (
    <footer className={`border-t py-10 text-center mt-auto transition-colors duration-500 ${
      isDark 
        ? 'bg-gray-900 border-gray-800' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 animate-heartbeat" />
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              HeartPredict
            </span>
          </div>

          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} HeartPredict. All rights reserved.
          </p>
          
          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            AI-powered heart disease risk assessment
          </p>

          <div className="flex gap-4 mt-2">
            {[Github, Twitter, Linkedin].map((Icon, idx) => (
              <button
                key={idx}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  isDark 
                    ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10% { transform: scale(1.2); }
          20% { transform: scale(1); }
          30% { transform: scale(1.2); }
          40% { transform: scale(1); }
        }
        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};