// components/ResultsDisplaySection.jsx
import React from 'react';
import ResultDisplay from './shared/ResultDisplay';

const ResultsDisplaySection = ({ corpusNeeded, availableFunds, shortfall, requiredSip }) => {
    if (corpusNeeded === null) {
        return null; // Don't render until calculations are done
    }

    return (
        <section className="mt-8 space-y-4 bg-indigo-50 p-6 rounded-xl shadow-inner">
            <h2 className="text-2xl font-semibold text-indigo-700 border-b pb-2 mb-4">Calculation Results</h2>
            <ResultDisplay label="Total Retirement Corpus Needed" value={corpusNeeded} />
            <ResultDisplay label="Total Available Funds (Net of Taxes)" value={availableFunds} />
            <ResultDisplay label="Shortfall / (Surplus)" value={shortfall} isNegativeGreen={true} />
            <ResultDisplay label="Additional Monthly SIP Required to Cover Shortfall" value={requiredSip} />
            <p className="text-sm text-gray-600 mt-4">
                *Note: Tax calculations are simplified as per the problem statement (e.g., flat percentages on total value). Real-world tax implications on capital gains and interest may vary.
            </p>
        </section>
    );
};

export default ResultsDisplaySection;
    