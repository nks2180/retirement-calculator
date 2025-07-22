// components/AdditionalExpensesList.jsx
import React from 'react';
import InputField from './shared/InputField';

const AdditionalExpensesList = ({ expenses, onUpdate, onRemove }) => {
    if (expenses.length === 0) {
        return null; // Don't render if no additional expenses
    }

    return (
        <>
            <h3 className="text-xl font-semibold text-indigo-600 border-b pb-2 mb-4 mt-8">Additional Future Expenses</h3>
            {expenses.map((expense) => (
                <div key={expense.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-gray-50 p-4 rounded-lg shadow-sm">
                    <InputField
                        label="Description"
                        value={expense.description}
                        onChange={(val) => onUpdate(expense.id, 'description', val)}
                        type="text"
                    />
                    <InputField
                        label="Current Cost (₹)"
                        value={expense.cost}
                        onChange={(val) => onUpdate(expense.id, 'cost', val)}
                    />
                    <InputField
                        label="Year"
                        value={expense.year}
                        onChange={(val) => onUpdate(expense.id, 'year', val)}
                    />
                    <button
                        onClick={() => onRemove(expense.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Remove
                    </button>
                </div>
            ))}
        </>
    );
};

export default AdditionalExpensesList;
