// components/HusbandInvestments.jsx
import React from 'react';
import InputField from './shared/InputField';

const HusbandInvestments = ({
    husbandLumpsumEquity, setHusbandLumpsumEquity,
    husbandSipEquity, setHusbandSipEquity,
    husbandPfCurrent, setHusbandPfCurrent,
    husbandPfMonthlyContribution, setHusbandPfMonthlyContribution,
    husbandBankFdCurrent, setHusbandBankFdCurrent
}) => {
    return (
        <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-indigo-600 border-b pb-2 mb-4 mt-8">Husband's Investments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InputField label="Lumpsum Equity (₹)" value={husbandLumpsumEquity} onChange={setHusbandLumpsumEquity} />
                <InputField label="SIP Equity (₹/month)" value={husbandSipEquity} onChange={setHusbandSipEquity} />
                <InputField label="PF Current Amount (₹)" value={husbandPfCurrent} onChange={setHusbandPfCurrent} />
                <InputField label="PF Monthly Contribution (₹)" value={husbandPfMonthlyContribution} onChange={setHusbandPfMonthlyContribution} />
                <InputField label="Bank FD Current Amount (₹)" value={husbandBankFdCurrent} onChange={setHusbandBankFdCurrent} />
            </div>
        </section>
    );
};

export default HusbandInvestments;
