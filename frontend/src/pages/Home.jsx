function Home() {
  return (
    <section className="flex flex-col items-center justify-center py-20">
      <h2 className="text-4xl font-bold text-blue-700 mb-4">
        Heart Disease Prediction
      </h2>
      <p className="text-gray-700 max-w-xl text-center">
        Enter your health details and let our AI-powered system analyze your
        heart disease risk instantly.
      </p>

      <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Start Prediction
      </button>
    </section>
  );
}

export default Home;
