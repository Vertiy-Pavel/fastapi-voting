import React from 'react';

const QUORUM_OPTIONS = [
  { value: "50% + 1", label: "50% + 1" },
  { value: "Простое большинство", label: "Простое большинство" },
  { value: "2/3 голосов", label: "2/3 голосов" },
  { value: "100% участников", label: "100% участников" },
];

const SelectField = ({ label, value, onChange, options = QUORUM_OPTIONS, disabled = false }) => {
  return (
    <div className="mb-2 ">
      {label && (
        <label className="px-[20px] py-[16px] block text-sm text-gray-700 font-medium mb-1">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="mt-1 p-2 border border-gray-300 rounded-lg w-full bg-white focus:outline-none focus:ring-2 focus:ring-gray-700 disabled:bg-gray-100 disabled:text-gray-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;