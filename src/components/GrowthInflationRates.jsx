// components/GrowthInflationRates.jsx
import React from 'react';
import InputField from './shared/InputField.jsx';
import {
    GROWTH_INFLATION_RATES_HEADER,
    EQUITY_GROWTH_PRE_RETIREMENT_LABEL,
    BANK_GROWTH_LABEL,
    PF_GROWTH_LABEL,
    INFLATION_LABEL,
    EQUITY_GROWTH_POST_RETIREMENT_LABEL
} from '../utils/strings.js'; // Import string constants

const GrowthInflationRates = ({
    equityGrowthPreRetirement, setEquityGrowthPreRetirement,
    bankGrowth, setBankGrowth,
    pfGrowth, setPfGrowth,
    inflation, setInflation,
    equityGrowthPostRetirement, setEquityGrowthPostRetirement
}) => {
    return (
        <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-indigo-600 border-b pb-2 mb-4 mt-8">{GROWTH_INFLATION_RATES_HEADER}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InputField label={EQUITY_GROWTH_PRE_RETIREMENT_LABEL} value={equityGrowthPreRetirement} onChange={setEquityGrowthPreRetirement} />
                <InputField label={BANK_GROWTH_LABEL} value={bankGrowth} onChange={setBankGrowth} />
                <InputField label={PF_GROWTH_LABEL} value={pfGrowth} onChange={setPfGrowth} />
                <InputField label={INFLATION_LABEL} value={inflation} onChange={setInflation} />
                <InputField label={EQUITY_GROWTH_POST_RETIREMENT_LABEL} value={equityGrowthPostRetirement} onChange={setEquityGrowthPostRetirement} />
            </div>
        </section>
    );
};

export default GrowthInflationRates;
