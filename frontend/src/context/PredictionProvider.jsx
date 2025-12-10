import React, { useReducer } from "react";
import { PredictionContext } from "./PredictionContext";

const initialState = {
  loading: false,
  result: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "START":
      return { ...state, loading: true, error: null };
    case "SUCCESS":
      return { ...state, loading: false, result: action.payload };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const PredictionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PredictionContext.Provider value={{ state, dispatch }}>
      {children}
    </PredictionContext.Provider>
  );
};

export default PredictionProvider;
