import React from "react";

const InputField = ({ label, name, type="number", value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-200 mb-1 font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        required
      />
    </div>
  );
};

export default InputField;
