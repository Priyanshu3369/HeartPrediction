import { useState, useContext } from 'react';
import { Stethoscope, TrendingUp, Loader, Calendar, User, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PredictionContext } from '../context/PredictionContext';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';

export const Predict = ({ onNavigate }) => {
  const { isDark } = useTheme();
  const { state, dispatch } = useContext(PredictionContext);
  const [formData, setFormData] = useState({
    age: '', sex: '', cp: '', trestbps: '', chol: '', fbs: '',
    restecg: '', thalach: '', exang: '', oldpeak: '', slope: '', ca: '', thal: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (formData[key] === '' || isNaN(formData[key])) {
        alert(`Invalid value for: ${key}`);
        return;
      }
    }

    dispatch({ type: 'START' });

    // Simulate API call
    setTimeout(() => {
      const prediction = Math.random() > 0.5 ? 1 : 0;
      const confidence = Math.random() * 20 + 80;
      dispatch({ 
        type: 'SUCCESS', 
        payload: { 
          prediction, 
          confidence: confidence.toFixed(1),
          riskLevel: prediction === 1 ? 'High' : 'Low',
          factors: prediction === 1 
            ? ['Elevated cholesterol levels', 'High blood pressure detected', 'Age-related risk factor']
            : ['Normal cardiac parameters', 'Healthy cholesterol range', 'Good blood pressure']
        } 
      });
    }, 2500);
  };

  const fieldLabels = {
    age: 'Age (years)',
    sex: 'Sex (1=M, 0=F)',
    cp: 'Chest Pain Type',
    trestbps: 'Resting BP',
    chol: 'Cholesterol',
    fbs: 'Fasting Blood Sugar',
    restecg: 'Resting ECG',
    thalach: 'Max Heart Rate',
    exang: 'Exercise Angina',
    oldpeak: 'ST Depression',
    slope: 'Slope',
    ca: 'Major Vessels',
    thal: 'Thalassemia'
  };

  const fieldIcons = {
    age: Calendar,
    sex: User,
    cp: Activity,
    trestbps: Activity,
    chol: Activity,
    thalach: Activity
  };

  return (
    <div className={`min-h-screen pt-24 sm:pt-28 pb-12 px-4 transition-colors duration-500 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className={`rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-500 animate-scale-in relative overflow-hidden ${
          isDark 
            ? 'bg-gray-800/50 border border-gray-700' 
            : 'bg-white border border-gray-200'
        }`}>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="mb-8 sm:mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl animate-pulse-slow">
                  <Stethoscope className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Health Assessment
                </h1>
              </div>
              <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Please fill in your health parameters for accurate prediction
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {Object.keys(formData).map((key, index) => (
                  <div
                    key={key}
                    className="animate-slide-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <InputField
                      label={fieldLabels[key]}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      isDark={isDark}
                      icon={fieldIcons[key]}
                    />
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={state.loading}
                className="mt-8 sm:mt-10 w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl transition-all duration-300 font-semibold text-base sm:text-lg shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1 disabled:transform-none flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {state.loading ? (
                    <>
                      <Loader className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                      Analyzing Your Data...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                      Analyze Risk
                    </>
                  )}
                </span>
                {!state.loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                )}
              </button>
            </form>

            {state.result && <ResultCard result={state.result} />}

            {state.error && (
              <div className={`mt-8 p-6 rounded-2xl border-2 animate-shake ${
                isDark 
                  ? 'bg-red-500/10 border-red-500/50' 
                  : 'bg-red-50 border-red-300'
              }`}>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-red-500/20">
                    <Activity className="w-8 h-8 text-red-400" />
                  </div>
                  <div>
                    <p className={`font-semibold text-lg ${
                      isDark ? 'text-red-300' : 'text-red-700'
                    }`}>
                      Error: {state.error}
                    </p>
                    <p className={`text-sm mt-1 ${
                      isDark ? 'text-red-400' : 'text-red-600'
                    }`}>
                      Please try again or contact support if the issue persists.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate('home')}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 ${
              isDark 
                ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            ← Back to Home
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-scale-in { animation: scale-in 0.4s ease-out; }
        .animate-slide-in { animation: slide-in 0.4s ease-out forwards; opacity: 0; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};