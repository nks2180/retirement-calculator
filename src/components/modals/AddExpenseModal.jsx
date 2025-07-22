// components/modals/AddExpenseModal.jsx
import React, { useState } from 'react';
import InputField from '../shared/InputField'; // Adjust path as needed

const AddExpenseModal = ({ onClose, onAddExpense }) => {
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState(null);
    const [year, setYear] = useState(null);
    const [modalError, setModalError] = useState('');

    const handleSave = () => {
        setModalError('');
        if (description.trim() === '' || cost === null || isNaN(cost) || cost < 0 || year === null || isNaN(year) || year < 0) {
            setModalError('Please fill all fields with valid positive values.');
            return;
        }
        if (year < new Date().getFullYear()) { // Use dynamic current year for validation
            setModalError(`Expense year cannot be before current year (July ${new Date().getFullYear()}).`);
            return;
        }
        onAddExpense({ description, cost, year });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-indigo-700 text-center mb-4">Add New Future Expense</h2>

                {modalError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                        <span className="block sm:inline">{modalError}</span>
                    </div>
                )}

                <InputField label="Description" value={description} onChange={setDescription} type="text" />
                <InputField label="Current Cost (₹)" value={cost} onChange={setCost} />
                <InputField label="Year" value={year} onChange={setYear} />

                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Add Expense
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddExpenseModal;
