// components/shared/ResultDisplay.jsx
import React from 'react';

const ResultDisplay = ({ label, value, isNegativeGreen = false }) => {
    const displayValue = value !== null ? `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` : 'N/A';
    const textColorClass = isNegativeGreen && value < 0 ? 'text-green-600' : 'text-indigo-800';

    return (
        <div className="flex justify-between items-center py-2 border-b border-indigo-200 last:border-b-0">
            <span className="font-medium text-gray-700">{label}:</span>
            <span className={`font-bold text-lg ${textColorClass}`}>{displayValue}</span>
        </div>
    );
};

export default ResultDisplay;
