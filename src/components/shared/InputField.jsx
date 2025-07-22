// components/shared/InputField.jsx
import React from 'react';

const InputField = ({ label, value, onChange, type = "number" }) => (
    <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            value={type === "number" ? (value !== null && !isNaN(value) ? value.toString() : '') : value}
            onChange={(e) => {
                const val = e.target.value;
                onChange(type === "number" ? (val === '' ? null : parseFloat(val)) : val);
            }}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            step="any"
        />
    </div>
);

export default InputField;
