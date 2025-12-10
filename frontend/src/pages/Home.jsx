import { Link } from "react-router-dom";
import { Heart, Activity, Shield, Zap } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center max-w-4xl animate-fadeIn">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse"></div>
              <Heart className="w-20 h-20 text-blue-400 relative animate-heartbeat" />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Heart Disease Prediction
          </h2>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Enter your health details and let our AI-powered system analyze your
            heart disease risk instantly with advanced machine learning.
          </p>

          <Link to="/predict">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
              Start Prediction
              <Zap className="w-5 h-5 group-hover:animate-pulse" />
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10">
            <div className="bg-blue-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Activity className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-400">
              Advanced machine learning algorithms analyze your health data with high accuracy.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10">
            <div className="bg-cyan-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-7 h-7 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Instant Results</h3>
            <p className="text-gray-400">
              Get your heart disease risk assessment in seconds, not days.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10">
            <div className="bg-blue-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Secure & Private</h3>
            <p className="text-gray-400">
              Your health data is processed securely and remains completely private.
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Home;