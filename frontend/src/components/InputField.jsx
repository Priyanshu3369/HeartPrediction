import { useState } from 'react';

export const InputField = ({ label, name, value, onChange, isDark, icon: Icon }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group">
      <label className={`block mb-2 font-semibold text-xs sm:text-sm uppercase tracking-wide transition-colors ${
        isFocused 
          ? 'text-blue-400' 
          : isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
            isFocused 
              ? 'text-blue-400' 
              : isDark ? 'text-gray-500' : 'text-gray-400'
          }`} />
        )}
        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 sm:py-4 rounded-xl transition-all duration-300 ${
            isDark 
              ? 'bg-gray-800/70 text-white border-gray-700 focus:border-blue-500' 
              : 'bg-white text-gray-900 border-gray-300 focus:border-blue-400'
          } border-2 focus:outline-none focus:ring-4 ${
            isDark ? 'focus:ring-blue-500/20' : 'focus:ring-blue-400/20'
          } transform focus:scale-105 hover:border-blue-400/50`}
          required
        />
        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ${
          isFocused ? 'w-full' : 'w-0'
        }`}></div>
      </div>
    </div>
  );
};