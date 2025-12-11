import { useTheme } from '../context/ThemeContext';

export const FeatureCard = ({ icon: Icon, title, description, gradient, delay = 0 }) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`group relative p-6 sm:p-8 rounded-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 cursor-pointer ${
        isDark 
          ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700 hover:border-blue-500/50' 
          : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-400/50 shadow-lg hover:shadow-2xl'
      } animate-fade-in-up`}
      style={{
        animationDelay: `${delay}s`
      }}
    >
      <div className={`bg-gradient-to-br ${gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg relative overflow-hidden`}>
        <Icon className="w-8 h-8 text-white relative z-10" />
        <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
      </div>
      
      <h4 className={`text-xl sm:text-2xl font-bold mb-3 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h4>
      
      <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
        {description}
      </p>

      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};