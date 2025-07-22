// components/PersonalFinancialGoals.jsx
import React from 'react';
import InputField from './shared/InputField.jsx'; // Corrected import path with .jsx extension

const PersonalFinancialGoals = ({
    husbandCurrentAge, setHusbandCurrentAge,
    husbandRetirementAge, setHusbandRetirementAge,
    husbandLifespan, setHusbandLifespan,
    currentExpenseMonthly, setCurrentExpenseMonthly
}) => {
    return (
        <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-indigo-600 border-b pb-2 mb-4">Personal & Financial Goals</h2>
            {/* Changed grid-cols to md:grid-cols-2 lg:grid-cols-2 to align fields as requested */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <InputField label="Husband's Current Age (Years)" value={husbandCurrentAge} onChange={setHusbandCurrentAge} />
                <InputField label="Husband's Retirement Age (Years)" value={husbandRetirementAge} onChange={setHusbandRetirementAge} />
                <InputField label="Husband's Lifespan (Years)" value={husbandLifespan} onChange={setHusbandLifespan} />
                <InputField label="Current Monthly Expense (₹)" value={currentExpenseMonthly} onChange={setCurrentExpenseMonthly} />
            </div>
        </section>
    );
};

export default PersonalFinancialGoals;
