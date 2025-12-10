import React from "react";

const InputField = ({ label, name, type="number", value, onChange }) => {
  return (
    <div className="mb-4 group">
      <label className="block text-gray-300 mb-2 font-semibold text-sm uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm group-hover:border-gray-600"
        required
      />
    </div>
  );
};

export default InputField;