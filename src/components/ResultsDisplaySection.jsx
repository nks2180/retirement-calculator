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
// components/ResultsDisplaySection.jsx
import React from 'react';
import ResultDisplay from './shared/ResultDisplay.jsx'; // Corrected import path with .jsx extension
import {
    RESULTS_SECTION_HEADER,
    RESULTS_SUMMARY_INTRO,
    KEY_POINTERS_HEADER,
    POINTER_CORPUS_NEEDED_TITLE,
    POINTER_CORPUS_NEEDED_DESC,
    POINTER_AVAILABLE_FUNDS_TITLE,
    POINTER_AVAILABLE_FUNDS_DESC,
    POINTER_SHORTFALL_SURPLUS_TITLE,
    POINTER_SHORTFALL_SURPLUS_DESC,
    POINTER_REQUIRED_SIP_TITLE,
    POINTER_REQUIRED_SIP_DESC,
    HOW_CALCULATED_HEADER,
    CALC_CORPUS_NEEDED_DESC,
    CALC_AVAILABLE_FUNDS_DESC,
    CALC_SHORTFALL_SURPLUS_DESC,
    CALC_REQUIRED_SIP_DESC,
    DISCLAIMER_NOTE
} from '../utils/strings.js'; // Import string constants

const ResultsDisplaySection = ({ corpusNeeded, availableFunds, shortfall, requiredSip }) => {
    if (corpusNeeded === null) {
        return null; // Don't render until calculations are done
    }

    return (
        <section className="mt-8 space-y-4 bg-indigo-50 p-6 rounded-xl shadow-inner">
            <h2 className="text-2xl font-semibold text-indigo-700 border-b pb-2 mb-4">{RESULTS_SECTION_HEADER}</h2>
            <p className="text-gray-700 mb-4">
                {RESULTS_SUMMARY_INTRO}
            </p>

            <h3 className="text-lg font-semibold text-indigo-600 mt-4 mb-2">{KEY_POINTERS_HEADER}</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>
                    <span className="font-medium">{POINTER_CORPUS_NEEDED_TITLE}</span> {POINTER_CORPUS_NEEDED_DESC}
                </li>
                <li>
                    <span className="font-medium">{POINTER_AVAILABLE_FUNDS_TITLE}</span> {POINTER_AVAILABLE_FUNDS_DESC}
                </li>
                <li>
                    <span className="font-medium">{POINTER_SHORTFALL_SURPLUS_TITLE}</span> {POINTER_SHORTFALL_SURPLUS_DESC}
                </li>
                <li>
                    <span className="font-medium">{POINTER_REQUIRED_SIP_TITLE}</span> {POINTER_REQUIRED_SIP_DESC}
                </li>
            </ul>

            <h3 className="text-lg font-semibold text-indigo-600 mt-6 mb-2">{HOW_CALCULATED_HEADER}</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>
                    <span className="font-medium">{POINTER_CORPUS_NEEDED_TITLE}</span> {CALC_CORPUS_NEEDED_DESC}
                </li>
                <li>
                    <span className="font-medium">{POINTER_AVAILABLE_FUNDS_TITLE}</span> {CALC_AVAILABLE_FUNDS_DESC}
                </li>
                <li>
                    <span className="font-medium">{POINTER_SHORTFALL_SURPLUS_TITLE}</span> {CALC_SHORTFALL_SURPLUS_DESC}
                </li>
                <li>
                    <span className="font-medium">{POINTER_REQUIRED_SIP_TITLE}</span> {CALC_REQUIRED_SIP_DESC}
                </li>
            </ul>

            <ResultDisplay label={POINTER_CORPUS_NEEDED_TITLE} value={corpusNeeded} />
            <ResultDisplay label={POINTER_AVAILABLE_FUNDS_TITLE} value={availableFunds} />
            <ResultDisplay label={POINTER_SHORTFALL_SURPLUS_TITLE} value={shortfall} isNegativeGreen={true} />
            <ResultDisplay label={POINTER_REQUIRED_SIP_TITLE} value={requiredSip} />
            <p className="text-sm text-gray-600 mt-4">
                {DISCLAIMER_NOTE}
            </p>
        </section>
    );
};

export default ResultsDisplaySection;
