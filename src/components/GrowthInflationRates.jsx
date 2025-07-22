// components/GrowthInflationRates.jsx
import React from 'react';
import InputField from './shared/InputField';

const GrowthInflationRates = ({
    equityGrowthPreRetirement, setEquityGrowthPreRetirement,
    bankGrowth, setBankGrowth,
    pfGrowth, setPfGrowth,
    inflation, setInflation,
    equityGrowthPostRetirement, setEquityGrowthPostRetirement
}) => {
    return (
        <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-indigo-600 border-b pb-2 mb-4 mt-8">Growth & Inflation Rates (%)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InputField label="Equity Growth (Pre-Retirement)" value={equityGrowthPreRetirement} onChange={setEquityGrowthPreRetirement} />
                <InputField label="Bank Growth" value={bankGrowth} onChange={setBankGrowth} />
                <InputField label="PF Growth" value={pfGrowth} onChange={setPfGrowth} />
                <InputField label="Inflation" value={inflation} onChange={setInflation} />
                <InputField label="Equity Growth (Post-Retirement)" value={equityGrowthPostRetirement} onChange={setEquityGrowthPostRetirement} />
            </div>
        </section>
    );
};

export default GrowthInflationRates;
