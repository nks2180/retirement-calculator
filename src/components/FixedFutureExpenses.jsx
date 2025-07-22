// components/FixedFutureExpenses.jsx
import React from 'react';
import InputField from './shared/InputField.jsx'; // Corrected import path with .jsx extension

const FixedFutureExpenses = ({
    homePurchaseCostCurrent, setHomePurchaseCostCurrent,
    homePurchaseYear, setHomePurchaseYear,
    daughterEducationCostCurrent, setDaughterEducationCostCurrent,
    daughterEducationYear, setDaughterEducationYear,
    daughterMarriageCostCurrent, setDaughterMarriageCostCurrent,
    daughterMarriageYear, setDaughterMarriageYear,
    onAddAdditionalExpense // Function to open modal
}) => {
    return (
        <section className="space-y-5">
            <div className="flex justify-between items-center border-b pb-2 mb-4 mt-8">
                <h2 className="text-2xl font-semibold text-indigo-600">Fixed Future Expenses</h2>
                <button
                    onClick={onAddAdditionalExpense}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-1 rounded-full transition duration-300 ease-in-out transform hover:scale-110 shadow-md"
                    aria-label="Add New Future Expense"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>

            {/* Changed grid-cols to md:grid-cols-2 lg:grid-cols-2 to show only two fields per line */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <InputField label="Home Purchase Current Cost (₹)" value={homePurchaseCostCurrent} onChange={setHomePurchaseCostCurrent} />
                <InputField label="Home Purchase Year" value={homePurchaseYear} onChange={setHomePurchaseYear} />
                <InputField label="Daughter's Education Current Cost (₹)" value={daughterEducationCostCurrent} onChange={setDaughterEducationCostCurrent} />
                <InputField label="Daughter's Education Year" value={daughterEducationYear} onChange={setDaughterEducationYear} />
                <InputField label="Daughter's Marriage Current Cost (₹)" value={daughterMarriageCostCurrent} onChange={setDaughterMarriageCostCurrent} />
                <InputField label="Daughter's Marriage Year" value={daughterMarriageYear} onChange={setDaughterMarriageYear} />
            </div>
        </section>
    );
};

export default FixedFutureExpenses;
