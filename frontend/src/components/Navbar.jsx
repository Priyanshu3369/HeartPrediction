function Navbar() {
  return (
    <nav className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-400">HeartPredict</h1>

      <div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition">
          Predict Now
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
