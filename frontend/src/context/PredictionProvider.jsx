import { useReducer } from 'react';
import { PredictionContext } from './PredictionContext';

const initialState = {
  loading: false,
  result: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'START':
      return { ...state, loading: true, error: null };
    case 'SUCCESS':
      return { ...state, loading: false, result: action.payload };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export const PredictionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PredictionContext.Provider value={{ state, dispatch }}>
      {children}
    </PredictionContext.Provider>
  );
};