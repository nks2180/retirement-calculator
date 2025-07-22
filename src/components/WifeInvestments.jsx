// components/WifeInvestments.jsx
import React from 'react';
import InputField from './shared/InputField.jsx'; // Changed to explicitly include .jsx extension

const WifeInvestments = ({
    wifeLumpsumEquity, setWifeLumpsumEquity,
    wifeSipEquity, setWifeSipEquity,
    wifeBankFdCurrent, setWifeBankFdCurrent
}) => {
    return (
        <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-indigo-600 border-b pb-2 mb-4 mt-8">Wife's Investments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InputField label="Lumpsum Equity (₹)" value={wifeLumpsumEquity} onChange={setWifeLumpsumEquity} />
                <InputField label="SIP Equity (₹/month)" value={wifeSipEquity} onChange={setWifeSipEquity} />
                <InputField label="Bank FD Current Amount (₹)" value={wifeBankFdCurrent} onChange={setWifeBankFdCurrent} />
            </div>
        </section>
    );
};

export default WifeInvestments;
