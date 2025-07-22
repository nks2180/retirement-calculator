// // components/ResultsDisplaySection.jsx
// import React from 'react';
// import ResultDisplay from './shared/ResultDisplay';

// const ResultsDisplaySection = ({ corpusNeeded, availableFunds, shortfall, requiredSip }) => {
//     if (corpusNeeded === null) {
//         return null; // Don't render until calculations are done
//     }

//     return (
//         <section className="mt-8 space-y-4 bg-indigo-50 p-6 rounded-xl shadow-inner">
//             <h2 className="text-2xl font-semibold text-indigo-700 border-b pb-2 mb-4">Calculation Results</h2>
//             <ResultDisplay label="Total Retirement Corpus Needed" value={corpusNeeded} />
//             <ResultDisplay label="Total Available Funds (Net of Taxes)" value={availableFunds} />
//             <ResultDisplay label="Shortfall / (Surplus)" value={shortfall} isNegativeGreen={true} />
//             <ResultDisplay label="Additional Monthly SIP Required to Cover Shortfall" value={requiredSip} />
//             <p className="text-sm text-gray-600 mt-4">
//                 *Note: Tax calculations are simplified as per the problem statement (e.g., flat percentages on total value). Real-world tax implications on capital gains and interest may vary.
//             </p>
//         </section>
//     );
// };

// export default ResultsDisplaySection;
    

// components/ResultsDisplaySection.jsx
import React from 'react';
import ResultDisplay from './shared/ResultDisplay.jsx'; // Corrected import path with .jsx extension

const ResultsDisplaySection = ({ corpusNeeded, availableFunds, shortfall, requiredSip }) => {
    if (corpusNeeded === null) {
        return null; // Don't render until calculations are done
    }

    return (
        <section className="mt-8 space-y-4 bg-indigo-50 p-6 rounded-xl shadow-inner">
            <h2 className="text-2xl font-semibold text-indigo-700 border-b pb-2 mb-4">Calculation Results</h2>
            <p className="text-gray-700 mb-4">
                Based on your inputs, here's a summary of your retirement financial projections:
            </p>
            <ResultDisplay label="Total Retirement Corpus Needed" value={corpusNeeded} />
            <p className="text-sm text-gray-600 mt-1 mb-3">
                This is the estimated total amount you will need at your retirement age to cover your projected living expenses and planned future expenses throughout your lifespan.
            </p>
            <ResultDisplay label="Total Available Funds (Net of Taxes)" value={availableFunds} />
            <p className="text-sm text-gray-600 mt-1 mb-3">
                This represents the projected value of your current investments (Equity, PF, Bank FD) at your retirement age, after accounting for growth and applicable taxes.
            </p>
            <ResultDisplay label="Shortfall / (Surplus)" value={shortfall} isNegativeGreen={true} />
            <p className="text-sm text-gray-600 mt-1 mb-3">
                This figure indicates how much more (shortfall) or less (surplus) you need compared to your available funds. A negative value means you have a surplus!
            </p>
            <ResultDisplay label="Additional Monthly SIP Required to Cover Shortfall" value={requiredSip} />
            <p className="text-sm text-gray-600 mt-1 mb-4">
                If there's a shortfall, this is the additional monthly Systematic Investment Plan (SIP) you would need to contribute from now until retirement, assuming your pre-retirement equity growth rate, to bridge the gap.
            </p>
            <p className="text-sm text-gray-600 mt-4">
                *Note: Tax calculations are simplified as per the problem statement (e.g., flat percentages on total value). Real-world tax implications on capital gains and interest may vary.
            </p>
        </section>
    );
};

export default ResultsDisplaySection;
