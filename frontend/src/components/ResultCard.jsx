import { AlertCircle, CheckCircle, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ResultCard = ({ result }) => {
  const { isDark } = useTheme();
  const isHighRisk = result.prediction === 1;

  return (
    <div className={`mt-8 rounded-2xl overflow-hidden transition-all duration-500 animate-result-in ${
      isHighRisk
        ? isDark 
          ? 'bg-red-500/10 border-2 border-red-500/50' 
          : 'bg-red-50 border-2 border-red-300'
        : isDark
          ? 'bg-green-500/10 border-2 border-green-500/50'
          : 'bg-green-50 border-2 border-green-300'
    }`}>
      {/* Header Section with Gradient */}
      <div className={`p-6 sm:p-8 ${
        isHighRisk
          ? 'bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20'
          : 'bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20'
      } relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 relative z-10">
          {/* Animated Icon */}
          <div className={`p-4 sm:p-5 rounded-2xl ${
            isHighRisk
              ? 'bg-red-500/20 animate-pulse-error'
              : 'bg-green-500/20 animate-pulse-success'
          } relative overflow-hidden`}>
            {isHighRisk ? (
              <AlertCircle className="w-12 h-12 sm:w-14 sm:h-14 text-red-400 animate-shake" />
            ) : (
              <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 text-green-400 animate-check" />
            )}
            <div className="absolute inset-0 animate-ping opacity-20">
              {isHighRisk ? (
                <AlertCircle className="w-full h-full text-red-400" />
              ) : (
                <CheckCircle className="w-full h-full text-green-400" />
              )}
            </div>
          </div>
          
          <div className="flex-1">
            {/* Title and Confidence */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
              <h3 className={`text-2xl sm:text-3xl font-bold flex items-center gap-2 ${
                isHighRisk
                  ? isDark ? 'text-red-300' : 'text-red-600'
                  : isDark ? 'text-green-300' : 'text-green-600'
              }`}>
                {result.riskLevel} Risk Detected
                {isHighRisk ? (
                  <TrendingUp className="w-6 h-6 animate-bounce" />
                ) : (
                  <TrendingDown className="w-6 h-6" />
                )}
              </h3>
              <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold animate-fade-in ${
                isHighRisk
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                  : 'bg-green-500/20 text-green-300 border border-green-500/30'
              }`}>
                <Activity className="w-4 h-4 mr-1 animate-pulse" />
                {result.confidence}% Confidence
              </span>
            </div>
            
            {/* Description */}
            <p className={`text-base sm:text-lg mb-6 leading-relaxed ${
              isHighRisk
                ? isDark ? 'text-red-200' : 'text-red-700'
                : isDark ? 'text-green-200' : 'text-green-700'
            }`}>
              {isHighRisk
                ? 'The analysis indicates a higher probability of heart disease. Please consult with a healthcare professional for a comprehensive evaluation and personalized treatment plan.'
                : 'The analysis shows no significant risk detected. Continue maintaining a healthy lifestyle with regular exercise, balanced diet, and routine checkups.'}
            </p>

            {/* Key Factors */}
            <div className="space-y-3">
              <h4 className={`font-semibold text-sm uppercase tracking-wide flex items-center gap-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                Key Factors Identified:
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.factors.map((factor, idx) => (
                  <span
                    key={idx}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 animate-tag-in ${
                      isHighRisk
                        ? isDark 
                          ? 'bg-red-500/20 text-red-200 border border-red-500/30' 
                          : 'bg-red-100 text-red-700 border border-red-200'
                        : isDark
                          ? 'bg-green-500/20 text-green-200 border border-green-500/30'
                          : 'bg-green-100 text-green-700 border border-green-200'
                    }`}
                    style={{
                      animationDelay: `${idx * 0.1}s`
                    }}
                  >
                    • {factor}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Section */}
      <div className={`p-6 ${
        isDark ? 'bg-gray-800/30' : 'bg-white/50'
      } border-t ${
        isHighRisk
          ? isDark ? 'border-red-500/20' : 'border-red-200'
          : isDark ? 'border-green-500/20' : 'border-green-200'
      }`}>
        <h5 className={`font-semibold mb-3 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Recommended Next Steps:
        </h5>
        <ul className={`space-y-2 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {isHighRisk ? (
            <>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">▸</span>
                <span>Schedule an appointment with a cardiologist</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">▸</span>
                <span>Get comprehensive cardiac tests done</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">▸</span>
                <span>Monitor your blood pressure and cholesterol regularly</span>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">▸</span>
                <span>Continue regular health checkups</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">▸</span>
                <span>Maintain a balanced diet and exercise routine</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">▸</span>
                <span>Keep tracking your health metrics</span>
              </li>
            </>
          )}
        </ul>
      </div>

      <style jsx>{`
        @keyframes result-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes pulse-error {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
        }
        @keyframes pulse-success {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
        }
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes check {
          from {
            opacity: 0;
            transform: scale(0) rotate(-45deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        @keyframes tag-in {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-result-in { animation: result-in 0.5s ease-out; }
        .animate-pulse-error { animation: pulse-error 2s ease-in-out infinite; }
        .animate-pulse-success { animation: pulse-success 2s ease-in-out infinite; }
        .animate-shake { animation: shake 0.5s ease-in-out infinite; }
        .animate-check { animation: check 0.5s ease-out; }
        .animate-tag-in { animation: tag-in 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};