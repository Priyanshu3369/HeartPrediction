import React, { useState, useContext } from "react";
import InputField from "../components/InputField";
import { PredictionContext } from "../context/PredictionContext";
import { predictHeartDisease } from "../services/api";
import { AlertCircle, CheckCircle, Loader } from "lucide-react";

const Predict = () => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const { state, dispatch } = useContext(PredictionContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend Validation
    for (const key in formData) {
      if (formData[key] === "" || isNaN(formData[key])) {
        alert(`Invalid value for: ${key}`);
        return;
      }
    }

    // Convert all values to numbers
    const numericData = {};
    for (const key in formData) {
      numericData[key] = Number(formData[key]);
    }

    dispatch({ type: "START" });

    try {
      const response = await predictHeartDisease(numericData);
      dispatch({ type: "SUCCESS", payload: response });
    } catch (error) {
      dispatch({ type: "ERROR", payload: "Prediction failed" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex justify-center items-center px-4 py-12">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-4xl animate-slideUp">
        <div className="mb-8">
          <h1 className="text-3xl text-white font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Heart Disease Prediction
          </h1>
          <p className="text-gray-400 text-sm">
            Please fill in your health parameters for accurate prediction
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(formData).map((key) => (
              <InputField
                key={key}
                label={key.toUpperCase()}
                name={key}
                value={formData[key]}
                onChange={handleChange}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={state.loading}
            className="mt-8 w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-4 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1 disabled:transform-none flex items-center justify-center gap-2"
          >
            {state.loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Predict Risk"
            )}
          </button>
        </form>

        {state.result && (
          <div
            className={`mt-6 p-6 rounded-xl border-2 animate-fadeIn ${
              state.result.prediction === 1
                ? "bg-red-500/10 border-red-500/50"
                : "bg-green-500/10 border-green-500/50"
            }`}
          >
            <div className="flex items-start gap-4">
              {state.result.prediction === 1 ? (
                <AlertCircle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
              ) : (
                <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
              )}
              <div>
                <p className="text-xl font-bold text-white mb-2">
                  {state.result.prediction === 1
                    ? "High Risk Detected"
                    : "Low Risk Detected"}
                </p>
                <p
                  className={
                    state.result.prediction === 1
                      ? "text-red-300"
                      : "text-green-300"
                  }
                >
                  {state.result.prediction === 1
                    ? "The analysis indicates a higher chance of heart disease. Please consult with a healthcare professional for a thorough evaluation."
                    : "The analysis shows no significant risk detected. Continue maintaining a healthy lifestyle."}
                </p>
              </div>
            </div>
          </div>
        )}

        {state.error && (
          <div className="mt-6 p-4 bg-red-500/10 border-2 border-red-500/50 rounded-xl animate-fadeIn">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
              <p className="text-red-300 font-semibold">Error: {state.error}</p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Predict;