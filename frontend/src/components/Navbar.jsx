import { Link } from "react-router-dom";
import { Activity } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl border-b border-gray-700 p-4 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg transform group-hover:scale-110 transition-transform duration-300">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            HeartPredict
          </h1>
        </Link>

        <Link to="/predict">
          <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-0.5">
            Predict Now
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;