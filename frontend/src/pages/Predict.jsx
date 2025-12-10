import React, { useState, useContext } from "react";
import InputField from "../components/InputField";
import { PredictionContext } from "../context/PredictionContext";
import { predictHeartDisease } from "../services/api";

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

    // ⛔ Frontend Validation
    for (const key in formData) {
      if (formData[key] === "" || isNaN(formData[key])) {
        alert(`Invalid value for: ${key}`);
        return;
      }
    }

    // ✅ Convert all values to numbers
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
    <div className="min-h-screen bg-gray-900 flex justify-center items-center px-4">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl text-white font-bold mb-4">
          Heart Disease Prediction
        </h1>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            {state.loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {state.result && (
          <div className="mt-5 p-4 bg-gray-700 rounded-lg text-white">
            <p className="text-lg font-bold">Result:</p>
            <p>
              {state.result.prediction === 1
                ? "⚠️ High chance of Heart Disease"
                : "✅ No significant risk detected"}
            </p>
          </div>
        )}

        {state.error && (
          <div className="mt-3 p-3 bg-red-600 rounded-lg text-white">
            Error: {state.error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Predict;
