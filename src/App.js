// import React, { useState } from 'react';

// // Main App component for the Retirement Corpus Calculator
// function App() {
//     // State variables for all input fields, initialized to null for empty default
//     const [husbandCurrentAge, setHusbandCurrentAge] = useState(null);
//     const [husbandRetirementAge, setHusbandRetirementAge] = useState(null);
//     const [husbandLifespan, setHusbandLifespan] = useState(null);
//     const [currentExpenseMonthly, setCurrentExpenseMonthly] = useState(null);

//     // Define Constants for magic numbers
//     const PERCENTAGE_DIVISOR = 100;
//     const MONTHS_IN_YEAR = 12;
//     const CURRENT_YEAR = new Date().getFullYear(); // Dynamically get current year
//     // RETIREMENT_YEAR is now calculated based on user input
//     const EQUITY_TAX_RATE = 0.13;
//     const BANK_FD_TAX_RATE = 0.33;
//     const PF_TAX_RATE = 0; // PF is 0% tax as per problem statement

//     // Prefilled Growth & Inflation Rates
//     const DEFAULT_EQUITY_GROWTH_PRE_RETIREMENT = 14; // %
//     const DEFAULT_BANK_GROWTH = 7; // %
//     const DEFAULT_PF_GROWTH = 7.10; // %
//     const DEFAULT_INFLATION = 9; // %
//     const DEFAULT_EQUITY_GROWTH_POST_RETIREMENT = 10; // %

//     const [equityGrowthPreRetirement, setEquityGrowthPreRetirement] = useState(DEFAULT_EQUITY_GROWTH_PRE_RETIREMENT);
//     const [bankGrowth, setBankGrowth] = useState(DEFAULT_BANK_GROWTH);
//     const [pfGrowth, setPfGrowth] = useState(DEFAULT_PF_GROWTH);
//     const [inflation, setInflation] = useState(DEFAULT_INFLATION);
//     const [equityGrowthPostRetirement, setEquityGrowthPostRetirement] = useState(DEFAULT_EQUITY_GROWTH_POST_RETIREMENT);

//     const [husbandLumpsumEquity, setHusbandLumpsumEquity] = useState(null);
//     const [husbandSipEquity, setHusbandSipEquity] = useState(null);
//     const [husbandPfCurrent, setHusbandPfCurrent] = useState(null);
//     const [husbandPfMonthlyContribution, setHusbandPfMonthlyContribution] = useState(null);
//     const [husbandBankFdCurrent, setHusbandBankFdCurrent] = useState(null);

//     // Wife's Investments are now ignorable (can be null/empty, will default to 0)
//     const [wifeLumpsumEquity, setWifeLumpsumEquity] = useState(null);
//     const [wifeSipEquity, setWifeSipEquity] = useState(null);
//     const [wifeBankFdCurrent, setWifeBankFdCurrent] = useState(null);

//     const [homePurchaseCostCurrent, setHomePurchaseCostCurrent] = useState(null);
//     const [homePurchaseYear, setHomePurchaseYear] = useState(null);

//     const [daughterEducationCostCurrent, setDaughterEducationCostCurrent] = useState(null);
//     const [daughterEducationYear, setDaughterEducationYear] = useState(null);

//     const [daughterMarriageCostCurrent, setDaughterMarriageCostCurrent] = useState(null);
//     const [daughterMarriageYear, setDaughterMarriageYear] = useState(null);

//     // New state for additional future expenses
//     const [additionalExpenses, setAdditionalExpenses] = useState([]);
//     const [nextExpenseId, setNextExpenseId] = useState(0); // To give unique keys to new expenses
//     const [showAddExpenseModal, setShowAddExpenseModal] = useState(false); // State for modal visibility

//     // State variables for results
//     const [corpusNeeded, setCorpusNeeded] = useState(null);
//     const [availableFunds, setAvailableFunds] = useState(null);
//     const [shortfall, setShortfall] = useState(null);
//     const [requiredSip, setRequiredSip] = useState(null);
//     const [errorMessage, setErrorMessage] = useState('');

//     // Function to calculate future value of a lump sum
//     const calculateFV = (principal, annualRate, years) => {
//         return principal * Math.pow(1 + annualRate / PERCENTAGE_DIVISOR, years);
//     };

//     // Function to calculate future value of SIP (Ordinary Annuity)
//     const calculateFVSIP = (monthlyContribution, annualRate, years) => {
//         const monthlyRate = annualRate / PERCENTAGE_DIVISOR / MONTHS_IN_YEAR;
//         const numberOfMonths = years * MONTHS_IN_YEAR;
//         if (monthlyRate === 0) {
//             return monthlyContribution * numberOfMonths;
//         }
//         return monthlyContribution * (Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate;
//     };

//     // Function to calculate present value of a future amount
//     const calculatePV = (futureValue, annualRate, years) => {
//         return futureValue / Math.pow(1 + annualRate / PERCENTAGE_DIVISOR, years);
//     };

//     // Function to calculate retirement living expenses corpus
//     const calculateRetirementLivingCorpus = (firstAnnualExpense, postRetirementGrowthRate, inflationRate, years) => {
//         if (postRetirementGrowthRate === inflationRate) {
//             return firstAnnualExpense * years; // Simplified for r=g case
//         }
//         const r = postRetirementGrowthRate / PERCENTAGE_DIVISOR;
//         const g = inflationRate / PERCENTAGE_DIVISOR;
//         return firstAnnualExpense * (1 - Math.pow((1 + g) / (1 + r), years)) / (r - g);
//     };

//     // Function to calculate required SIP to reach a target future value
//     const calculateRequiredSip = (targetFV, annualRate, years) => {
//         const monthlyRate = annualRate / PERCENTAGE_DIVISOR / MONTHS_IN_YEAR;
//         const numberOfMonths = years * MONTHS_IN_YEAR;
//         if (monthlyRate === 0) {
//             return targetFV / numberOfMonths;
//         }
//         return targetFV * monthlyRate / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
//     };

//     // Function to add a new additional expense from modal
//     const handleAddExpense = (newExpense) => {
//         setAdditionalExpenses([...additionalExpenses, { ...newExpense, id: nextExpenseId }]);
//         setNextExpenseId(nextExpenseId + 1);
//         setShowAddExpenseModal(false); // Close modal after adding
//     };

//     // Function to update an additional expense
//     const updateAdditionalExpense = (id, field, value) => {
//         setAdditionalExpenses(additionalExpenses.map(exp =>
//             exp.id === id ? { ...exp, [field]: value } : exp
//         ));
//     };

//     // Function to remove an additional expense
//     const removeAdditionalExpense = (id) => {
//         setAdditionalExpenses(additionalExpenses.filter(exp => exp.id !== id));
//     };

//     // Main calculation function
//     const calculateCorpus = () => {
//         setErrorMessage(''); // Clear previous errors

//         // Inputs that *must* be provided and valid
//         const requiredInputs = {
//             husbandCurrentAge, husbandRetirementAge, husbandLifespan, currentExpenseMonthly,
//             equityGrowthPreRetirement, bankGrowth, pfGrowth, inflation, equityGrowthPostRetirement,
//             husbandLumpsumEquity, husbandSipEquity, husbandPfCurrent, husbandPfMonthlyContribution, husbandBankFdCurrent,
//             homePurchaseCostCurrent, homePurchaseYear,
//             daughterEducationCostCurrent, daughterEducationYear,
//             daughterMarriageCostCurrent, daughterMarriageYear
//         };

//         for (const key in requiredInputs) {
//             if (requiredInputs[key] === null || isNaN(requiredInputs[key]) || requiredInputs[key] < 0) {
//                 setErrorMessage(`Please enter valid positive numbers for all required fields. Issue with: ${labelMap[key] || key}`);
//                 return;
//             }
//         }

//         // Input validation for additional expenses
//         for (const exp of additionalExpenses) {
//             if (exp.description.trim() === '' || exp.cost === null || isNaN(exp.cost) || exp.cost < 0 || exp.year === null || isNaN(exp.year) || exp.year < 0) {
//                 setErrorMessage(`Please ensure all additional expenses have a description, valid positive cost, and valid positive year.`);
//                 return;
//             }
//             if (exp.year < CURRENT_YEAR) {
//                 setErrorMessage(`Additional expense year for '${exp.description}' cannot be before current year (July ${CURRENT_YEAR}).`);
//                 return;
//             }
//         }

//         if (husbandRetirementAge <= husbandCurrentAge) {
//             setErrorMessage("Retirement age must be greater than current age.");
//             return;
//         }
//         if (husbandLifespan <= husbandRetirementAge) {
//             setErrorMessage("Lifespan must be greater than retirement age.");
//             return;
//         }
//         if (homePurchaseYear < CURRENT_YEAR || daughterEducationYear < CURRENT_YEAR || daughterMarriageYear < CURRENT_YEAR) {
//             setErrorMessage(`Event years cannot be before current year (July ${CURRENT_YEAR}).`);
//             return;
//         }

//         // Calculate dynamic retirement year and years to retirement
//         const yearsToRetirement = husbandRetirementAge - husbandCurrentAge;
//         const actualRetirementYear = CURRENT_YEAR + yearsToRetirement;

//         // A. Future Value of Investments until Retirement Year
//         // Husband's Investments
//         let hLumpsumEquityFV_PreRetirement = calculateFV(husbandLumpsumEquity, equityGrowthPreRetirement, yearsToRetirement);
//         let hSipEquityFV_PreRetirement = calculateFVSIP(husbandSipEquity, equityGrowthPreRetirement, yearsToRetirement);
//         let hPfCurrentFV_PreRetirement = calculateFV(husbandPfCurrent, pfGrowth, yearsToRetirement);
//         let hPfSipFV_PreRetirement = calculateFVSIP(husbandPfMonthlyContribution, pfGrowth, yearsToRetirement);
//         let hBankFdFV_PreRetirement = calculateFV(husbandBankFdCurrent, bankGrowth, yearsToRetirement);

//         // Wife's Investments (now ignorable, default to 0 if null/empty)
//         const wifeLumpsumEquityVal = wifeLumpsumEquity || 0;
//         const wifeSipEquityVal = wifeSipEquity || 0;
//         const wifeBankFdCurrentVal = wifeBankFdCurrent || 0;

//         let wLumpsumEquityFV_PreRetirement = calculateFV(wifeLumpsumEquityVal, equityGrowthPreRetirement, yearsToRetirement);
//         let wSipEquityFV_PreRetirement = calculateFVSIP(wifeSipEquityVal, equityGrowthPreRetirement, yearsToRetirement);
//         let wBankFdFV_PreRetirement = calculateFV(wifeBankFdCurrentVal, bankGrowth, yearsToRetirement);

//         // B. Home Purchase in July 2027 (assuming home purchase year is fixed for this calculation example)
//         // Note: If homePurchaseYear is before retirement, its impact needs to be calculated
//         // and then investments adjusted for the remaining period until retirement.
//         // For simplicity, assuming home purchase occurs before retirement and its cost is handled.
//         const yearsToHomePurchase = homePurchaseYear - CURRENT_YEAR;
//         let inflatedHomeCost = 0;
//         let totalPfAtHomePurchase = 0;
//         let totalWifeEquityAtHomePurchase = 0;
//         let totalHusbandEquityAtHomePurchase = 0;
//         let husbandEquityUsedForHome = 0;
//         let wifeEquityUsedForHome = 0;
//         let remainingHusbandEquity_atHomePurchase = 0;
//         let remainingWifeEquity_atHomePurchase = 0;
//         let yearsAfterHomePurchase = 0;

//         if (homePurchaseYear >= CURRENT_YEAR && homePurchaseYear <= actualRetirementYear) {
//             inflatedHomeCost = calculateFV(homePurchaseCostCurrent, inflation, yearsToHomePurchase);

//             hPfCurrent_atHomePurchase = calculateFV(husbandPfCurrent, pfGrowth, yearsToHomePurchase);
//             hPfSip_atHomePurchase = calculateFVSIP(husbandPfMonthlyContribution, pfGrowth, yearsToHomePurchase);
//             totalPfAtHomePurchase = hPfCurrent_atHomePurchase + hPfSip_atHomePurchase;

//             let remainingHomeCost = inflatedHomeCost - totalPfAtHomePurchase;

//             wLumpsumEquity_atHomePurchase = calculateFV(wifeLumpsumEquityVal, equityGrowthPreRetirement, yearsToHomePurchase);
//             wSipEquity_atHomePurchase = calculateFVSIP(wifeSipEquityVal, equityGrowthPreRetirement, yearsToHomePurchase);
//             totalWifeEquityAtHomePurchase = wLumpsumEquity_atHomePurchase + wSipEquity_atHomePurchase;

//             husbandLumpsumEquity_atHomePurchase = calculateFV(husbandLumpsumEquity, equityGrowthPreRetirement, yearsToHomePurchase);
//             husbandSipEquity_atHomePurchase = calculateFVSIP(husbandSipEquity, equityGrowthPreRetirement, yearsToHomePurchase);
//             totalHusbandEquityAtHomePurchase = husbandLumpsumEquity_atHomePurchase + husbandSipEquity_atHomePurchase;

//             if (remainingHomeCost > 0) {
//                 if (totalWifeEquityAtHomePurchase >= remainingHomeCost) {
//                     wifeEquityUsedForHome = remainingHomeCost;
//                     remainingHomeCost = 0;
//                 } else {
//                     wifeEquityUsedForHome = totalWifeEquityAtHomePurchase;
//                     remainingHomeCost -= totalWifeEquityAtHomePurchase;
//                 }
//             }

//             if (remainingHomeCost > 0) {
//                 husbandEquityUsedForHome = remainingHomeCost;
//                 remainingHomeCost = 0;
//             }

//             // Adjust remaining investments for the period after home purchase until retirement
//             yearsAfterHomePurchase = actualRetirementYear - homePurchaseYear;

//             remainingHusbandEquity_atHomePurchase = totalHusbandEquityAtHomePurchase - husbandEquityUsedForHome;
//             hLumpsumEquityFV_PreRetirement = calculateFV(remainingHusbandEquity_atHomePurchase, equityGrowthPreRetirement, yearsAfterHomePurchase);
//             hSipEquityFV_PreRetirement = calculateFVSIP(husbandSipEquity, equityGrowthPreRetirement, yearsAfterHomePurchase);

//             remainingWifeEquity_atHomePurchase = totalWifeEquityAtHomePurchase - wifeEquityUsedForHome;
//             wLumpsumEquityFV_PreRetirement = calculateFV(remainingWifeEquity_atHomePurchase, equityGrowthPreRetirement, yearsAfterHomePurchase);
//             wSipEquityFV_PreRetirement = calculateFVSIP(wifeSipEquityVal, equityGrowthPreRetirement, yearsAfterHomePurchase);

//             // PF and Bank FD are also adjusted from their value at home purchase
//             hPfCurrentFV_PreRetirement = calculateFV(0, pfGrowth, yearsAfterHomePurchase); // PF assumed fully used for home
//             hPfSipFV_PreRetirement = calculateFVSIP(husbandPfMonthlyContribution, pfGrowth, yearsAfterHomePurchase); // New PF contributions post home purchase
            
//             // Bank FD is not used for home purchase in this logic, so it grows for full period
//             hBankFdFV_PreRetirement = calculateFV(husbandBankFdCurrent, bankGrowth, yearsToRetirement);
//             wBankFdFV_PreRetirement = calculateFV(wifeBankFdCurrentVal, bankGrowth, yearsToRetirement);

//         } else if (homePurchaseYear > actualRetirementYear) {
//             // If home purchase is after retirement, it's a post-retirement expense.
//             // Current investments are not affected by it before retirement.
//             // The cost will be added to the corpus needed.
//         }
//         // If homePurchaseYear < CURRENT_YEAR, it means it already happened, so its cost is not considered as a future expense.
//         // The investments would reflect the current state after such a purchase.
//         // For simplicity, we assume if year is past, it's not a future expense to be planned for.


//         // D. Total Available Funds at Retirement Year (After Taxes)
//         let totalEquityPreTax = hLumpsumEquityFV_PreRetirement + hSipEquityFV_PreRetirement + wLumpsumEquityFV_PreRetirement + wSipEquityFV_PreRetirement;
//         let totalPfPreTax = hPfCurrentFV_PreRetirement + hPfSipFV_PreRetirement;
//         let totalBankFdPreTax = hBankFdFV_PreRetirement + wBankFdFV_PreRetirement;

//         // Apply taxes as per problem statement
//         let netEquity = totalEquityPreTax * (1 - EQUITY_TAX_RATE);
//         let netPf = totalPfPreTax * (1 - PF_TAX_RATE);
//         let netBankFd = totalBankFdPreTax * (1 - BANK_FD_TAX_RATE);

//         let totalAvailableFunds = netEquity + netPf + netBankFd;
//         setAvailableFunds(totalAvailableFunds);

//         // E. Retirement Corpus Needed at Retirement Year

//         // 1. Future Value of Daughter's Education and Marriage
//         // Calculate years from current year to event year for inflation
//         const educationYearsFromCurrent = daughterEducationYear - CURRENT_YEAR + (1.0 / MONTHS_IN_YEAR);
//         const marriageYearsFromCurrent = daughterMarriageYear - CURRENT_YEAR + (1.0 / MONTHS_IN_YEAR);

//         const daughterEducationFV = calculateFV(daughterEducationCostCurrent, inflation, educationYearsFromCurrent);
//         const daughterMarriageFV = calculateFV(daughterMarriageCostCurrent, inflation, marriageYearsFromCurrent);

//         // Present Value of these expenses at actualRetirementYear
//         const pvEducationAtRetirement = calculatePV(daughterEducationFV, inflation, daughterEducationYear - actualRetirementYear + (1.0 / MONTHS_IN_YEAR));
//         const pvMarriageAtRetirement = calculatePV(daughterMarriageFV, inflation, daughterMarriageYear - actualRetirementYear + (1.0 / MONTHS_IN_YEAR));

//         // Calculate PV for additional expenses
//         let pvAdditionalExpensesAtRetirement = 0;
//         for (const exp of additionalExpenses) {
//             const expenseYearsFromCurrent = exp.year - CURRENT_YEAR;
//             const expenseFV = calculateFV(exp.cost, inflation, expenseYearsFromCurrent);
//             const pvAtRetirement = calculatePV(expenseFV, inflation, exp.year - actualRetirementYear);
//             pvAdditionalExpensesAtRetirement += pvAtRetirement;
//         }

//         // 2. Retirement Living Expenses
//         const monthlyExpenseAtRetirement = calculateFV(currentExpenseMonthly, inflation, yearsToRetirement);
//         const firstAnnualExpenseAtRetirement = monthlyExpenseAtRetirement * MONTHS_IN_YEAR;
//         const retirementPeriodYears = husbandLifespan - husbandRetirementAge;

//         const livingExpensesCorpus = calculateRetirementLivingCorpus(
//             firstAnnualExpenseAtRetirement,
//             equityGrowthPostRetirement,
//             inflation,
//             retirementPeriodYears
//         );

//         let totalCorpusNeeded = livingExpensesCorpus + pvEducationAtRetirement + pvMarriageAtRetirement + pvAdditionalExpensesAtRetirement;

//         // Add home purchase cost if it occurs AFTER retirement
//         if (homePurchaseYear > actualRetirementYear) {
//             const yearsToHomePurchaseFromRetirement = homePurchaseYear - actualRetirementYear;
//             const inflatedHomeCostAtRetirement = calculatePV(calculateFV(homePurchaseCostCurrent, inflation, yearsToHomePurchase), inflation, yearsToHomePurchaseFromRetirement);
//             totalCorpusNeeded += inflatedHomeCostAtRetirement;
//         }


//         setCorpusNeeded(totalCorpusNeeded);

//         // F. Shortfall/Surplus Calculation
//         const calculatedShortfall = totalCorpusNeeded - totalAvailableFunds;
//         setShortfall(calculatedShortfall);

//         // G. Required SIP in Case of Shortfall
//         if (calculatedShortfall > 0) {
//             const sipRequired = calculateRequiredSip(calculatedShortfall, equityGrowthPreRetirement, yearsToRetirement);
//             setRequiredSip(sipRequired);
//         } else {
//             setRequiredSip(0); // No SIP needed if there's a surplus or no shortfall
//         }
//     };

//     // Mapping for error messages to user-friendly labels
//     const labelMap = {
//         husbandCurrentAge: "Husband's Current Age",
//         husbandRetirementAge: "Husband's Retirement Age",
//         husbandLifespan: "Husband's Lifespan",
//         currentExpenseMonthly: "Current Monthly Expense",
//         equityGrowthPreRetirement: "Equity Growth (Pre-Retirement)",
//         bankGrowth: "Bank Growth",
//         pfGrowth: "PF Growth",
//         inflation: "Inflation",
//         equityGrowthPostRetirement: "Equity Growth (Post-Retirement)",
//         husbandLumpsumEquity: "Husband's Lumpsum Equity",
//         husbandSipEquity: "Husband's SIP Equity",
//         husbandPfCurrent: "Husband's PF Current Amount",
//         husbandPfMonthlyContribution: "Husband's PF Monthly Contribution",
//         husbandBankFdCurrent: "Husband's Bank FD Current Amount",
//         wifeLumpsumEquity: "Wife's Lumpsum Equity",
//         wifeSipEquity: "Wife's SIP Equity",
//         wifeBankFdCurrent: "Wife's Bank FD Current Amount",
//         homePurchaseCostCurrent: "Home Purchase Current Cost",
//         homePurchaseYear: "Home Purchase Year",
//         daughterEducationCostCurrent: "Daughter's Education Current Cost",
//         daughterEducationYear: "Daughter's Education Year",
//         daughterMarriageCostCurrent: "Daughter's Marriage Current Cost",
//         daughterMarriageYear: "Daughter's Marriage Year",
//     };


//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-sans text-gray-800 flex items-center justify-center">
//             <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-6 md:p-8 space-y-6">
//                 <h1 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-700 mb-6">
//                     Retirement Corpus Calculator
//                 </h1>

//                 {errorMessage && (
//                     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
//                         <strong className="font-bold">Error!</strong>
//                         <span className="block sm:inline ml-2">{errorMessage}</span>
//                     </div>
//                 )}

//                 <section className="space-y-5">
//                     <h2 className="text-2xl font-semibold text-indigo-600 border-b pb-2 mb-4">Personal & Financial Goals</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         <InputField label="Husband's Current Age (Years)" value={husbandCurrentAge} onChange={setHusbandCurrentAge} />
//                         <InputField label="Husband's Retirement Age (Years)" value={husbandRetirementAge} onChange={setHusbandRetirementAge} />
//                         <InputField label="Husband's Lifespan (Years)" value={husbandLifespan} onChange={setHusbandLifespan} />
//                         <InputField label="Current Monthly Expense (₹)" value={currentExpenseMonthly} onChange={setCurrentExpenseMonthly} />
//                     </div>

//                     <h2 className="text-2xl font-semibold text-indigo-600 border-b pb-2 mb-4 mt-8">Growth & Inflation Rates (%)</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         <InputField label="Equity Growth (Pre-Retirement)" value={equityGrowthPreRetirement} onChange={setEquityGrowthPreRetirement} />
//                         <InputField label="Bank Growth" value={bankGrowth} onChange={setBankGrowth} />
//                         <InputField label="PF Growth" value={pfGrowth} onChange={setPfGrowth} />
//                         <InputField label="Inflation" value={inflation} onChange={setInflation} />
//                         <InputField label="Equity Growth (Post-Retirement)" value={equityGrowthPostRetirement} onChange={setEquityGrowthPostRetirement} />
//                     </div>
//                 </section>

//                 <section className="space-y-5">
//                     <h2 className="text-2xl font-semibold text-indigo-600 border-b pb-2 mb-4 mt-8">Husband's Investments</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         <InputField label="Lumpsum Equity (₹)" value={husbandLumpsumEquity} onChange={setHusbandLumpsumEquity} />
//                         <InputField label="SIP Equity (₹/month)" value={husbandSipEquity} onChange={setHusbandSipEquity} />
//                         <InputField label="PF Current Amount (₹)" value={husbandPfCurrent} onChange={setHusbandPfCurrent} />
//                         <InputField label="PF Monthly Contribution (₹)" value={husbandPfMonthlyContribution} onChange={setHusbandPfMonthlyContribution} />
//                         <InputField label="Bank FD Current Amount (₹)" value={husbandBankFdCurrent} onChange={setHusbandBankFdCurrent} />
//                     </div>
//                 </section>

//                 <section className="space-y-5">
//                     <h2 className="text-2xl font-semibold text-indigo-600 border-b pb-2 mb-4 mt-8">Wife's Investments</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         <InputField label="Lumpsum Equity (₹)" value={wifeLumpsumEquity} onChange={setWifeLumpsumEquity} />
//                         <InputField label="SIP Equity (₹/month)" value={wifeSipEquity} onChange={setWifeSipEquity} />
//                         <InputField label="Bank FD Current Amount (₹)" value={wifeBankFdCurrent} onChange={setWifeBankFdCurrent} />
//                     </div>
//                 </section>

//                 <section className="space-y-5">
//                     <div className="flex justify-between items-center border-b pb-2 mb-4 mt-8">
//                         <h2 className="text-2xl font-semibold text-indigo-600">Fixed Future Expenses</h2>
//                         <button
//                             onClick={() => setShowAddExpenseModal(true)} // Open modal on click
//                             className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-1 rounded-full transition duration-300 ease-in-out transform hover:scale-110 shadow-md"
//                             aria-label="Add New Future Expense"
//                         >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//                             </svg>
//                         </button>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         <InputField label="Home Purchase Current Cost (₹)" value={homePurchaseCostCurrent} onChange={setHomePurchaseCostCurrent} />
//                         <InputField label="Home Purchase Year" value={homePurchaseYear} onChange={setHomePurchaseYear} />
//                         <InputField label="Daughter's Education Current Cost (₹)" value={daughterEducationCostCurrent} onChange={setDaughterEducationCostCurrent} />
//                         <InputField label="Daughter's Education Year" value={daughterEducationYear} onChange={setDaughterEducationYear} />
//                         <InputField label="Daughter's Marriage Current Cost (₹)" value={daughterMarriageCostCurrent} onChange={setDaughterMarriageCostCurrent} />
//                         <InputField label="Daughter's Marriage Year" value={daughterMarriageYear} onChange={setDaughterMarriageYear} />
//                     </div>

//                     {additionalExpenses.length > 0 && (
//                         <h3 className="text-xl font-semibold text-indigo-600 border-b pb-2 mb-4 mt-8">Additional Future Expenses</h3>
//                     )}
//                     {/* Render AdditionalExpensesList component */}
//                     <AdditionalExpensesList
//                         expenses={additionalExpenses}
//                         onUpdate={updateAdditionalExpense}
//                         onRemove={removeAdditionalExpense}
//                     />
//                 </section>

//                 <button
//                     onClick={calculateCorpus}
//                     className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
//                 >
//                     Calculate Retirement Corpus
//                 </button>

//                 {corpusNeeded !== null && (
//                     <section className="mt-8 space-y-4 bg-indigo-50 p-6 rounded-xl shadow-inner">
//                         <h2 className="text-2xl font-semibold text-indigo-700 border-b pb-2 mb-4">Calculation Results</h2>
//                         <ResultDisplay label="Total Retirement Corpus Needed" value={corpusNeeded} />
//                         <ResultDisplay label="Total Available Funds in July 2034 (Net of Taxes)" value={availableFunds} />
//                         <ResultDisplay label="Shortfall / (Surplus)" value={shortfall} isNegativeGreen={true} />
//                         <ResultDisplay label="Additional Monthly SIP Required to Cover Shortfall" value={requiredSip} />
//                         <p className="text-sm text-gray-600 mt-4">
//                             *Note: Tax calculations are simplified as per the problem statement (e.g., flat percentages on total value). Real-world tax implications on capital gains and interest may vary.
//                         </p>
//                     </section>
//                 )}

//                 {/* Add Expense Modal */}
//                 {showAddExpenseModal && (
//                     <AddExpenseModal
//                         onClose={() => setShowAddExpenseModal(false)}
//                         onAddExpense={handleAddExpense}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// }

// // Helper component for input fields
// const InputField = ({ label, value, onChange, type = "number" }) => (
//     <div className="flex flex-col">
//         <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
//         <input
//             type={type}
//             value={type === "number" ? (value !== null && !isNaN(value) ? value.toString() : '') : value}
//             onChange={(e) => {
//                 const val = e.target.value;
//                 onChange(type === "number" ? (val === '' ? null : parseFloat(val)) : val);
//             }}
//             className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
//             step="any"
//         />
//     </div>
// );

// // Helper component for displaying results
// const ResultDisplay = ({ label, value, isNegativeGreen = false }) => {
//     const displayValue = value !== null ? `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` : 'N/A';
//     const textColorClass = isNegativeGreen && value < 0 ? 'text-green-600' : 'text-indigo-800';

//     return (
//         <div className="flex justify-between items-center py-2 border-b border-indigo-200 last:border-b-0">
//             <span className="font-medium text-gray-700">{label}:</span>
//             <span className={`font-bold text-lg ${textColorClass}`}>{displayValue}</span>
//         </div>
//     );
// };

// // New Modal Component for adding expenses
// const AddExpenseModal = ({ onClose, onAddExpense }) => {
//     const [description, setDescription] = useState('');
//     const [cost, setCost] = useState(null);
//     const [year, setYear] = useState(null);
//     const [modalError, setModalError] = useState('');

//     const handleSave = () => {
//         setModalError('');
//         if (description.trim() === '' || cost === null || isNaN(cost) || cost < 0 || year === null || isNaN(year) || year < 0) {
//             setModalError('Please fill all fields with valid positive values.');
//             return;
//         }
//         if (year < new Date().getFullYear()) { // Use dynamic current year for validation
//             setModalError(`Expense year cannot be before current year (July ${new Date().getFullYear()}).`);
//             return;
//         }
//         onAddExpense({ description, cost, year });
//     };

//     return (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md space-y-4">
//                 <h2 className="text-2xl font-bold text-indigo-700 text-center mb-4">Add New Future Expense</h2>

//                 {modalError && (
//                     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
//                         <span className="block sm:inline">{modalError}</span>
//                     </div>
//                 )}

//                 <InputField label="Description" value={description} onChange={setDescription} type="text" />
//                 <InputField label="Current Cost (₹)" value={cost} onChange={setCost} />
//                 <InputField label="Year" value={year} onChange={setYear} />

//                 <div className="flex justify-end space-x-4 mt-6">
//                     <button
//                         onClick={onClose}
//                         className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={handleSave}
//                         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
//                     >
//                         Add Expense
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // New component to list additional expenses
// const AdditionalExpensesList = ({ expenses, onUpdate, onRemove }) => {
//     return (
//         <>
//             {expenses.map((expense) => (
//                 <div key={expense.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-gray-50 p-4 rounded-lg shadow-sm">
//                     <InputField
//                         label="Description"
//                         value={expense.description}
//                         onChange={(val) => onUpdate(expense.id, 'description', val)}
//                         type="text"
//                     />
//                     <InputField
//                         label="Current Cost (₹)"
//                         value={expense.cost}
//                         onChange={(val) => onUpdate(expense.id, 'cost', val)}
//                     />
//                     <InputField
//                         label="Year"
//                         value={expense.year}
//                         onChange={(val) => onUpdate(expense.id, 'year', val)}
//                     />
//                     <button
//                         onClick={() => onRemove(expense.id)}
//                         className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
//                     >
//                         Remove
//                     </button>
//                 </div>
//             ))}
//         </>
//     );
// };

// export default App;
import React, { useState } from 'react';
import useRetirementCalculator from './hooks/useRetirementCalculator.js';
import PersonalFinancialGoals from './components/PersonalFinancialGoals.jsx';
import GrowthInflationRates from './components/GrowthInflationRates.jsx';
import HusbandInvestments from './components/HusbandInvestments.jsx';
import WifeInvestments from './components/WifeInvestments.jsx';
import FixedFutureExpenses from './components/FixedFutureExpenses.jsx';
import AdditionalExpensesList from './components/AdditionalExpensesList.jsx';
import AddExpenseModal from './components/modals/AddExpenseModal.jsx';
import ResultsDisplaySection from './components/ResultsDisplaySection.jsx';
// No longer importing CURRENT_YEAR from constants as it's calculated dynamically in the hook

// Main App component for the Retirement Corpus Calculator
function App() {
    const {
        // State variables
        husbandCurrentAge, setHusbandCurrentAge,
        husbandRetirementAge, setHusbandRetirementAge,
        husbandLifespan, setHusbandLifespan,
        currentExpenseMonthly, setCurrentExpenseMonthly,
        equityGrowthPreRetirement, setEquityGrowthPreRetirement,
        bankGrowth, setBankGrowth,
        pfGrowth, setPfGrowth,
        inflation, setInflation,
        equityGrowthPostRetirement, setEquityGrowthPostRetirement,
        husbandLumpsumEquity, setHusbandLumpsumEquity,
        husbandSipEquity, setHusbandSipEquity,
        husbandPfCurrent, setHusbandPfCurrent,
        husbandPfMonthlyContribution, setHusbandPfMonthlyContribution,
        husbandBankFdCurrent, setHusbandBankFdCurrent,
        wifeLumpsumEquity, setWifeLumpsumEquity,
        wifeSipEquity, setWifeSipEquity,
        wifeBankFdCurrent, setWifeBankFdCurrent,
        homePurchaseCostCurrent, setHomePurchaseCostCurrent,
        homePurchaseYear, setHomePurchaseYear,
        daughterEducationCostCurrent, setDaughterEducationCostCurrent,
        daughterEducationYear, setDaughterEducationYear,
        daughterMarriageCostCurrent, setDaughterMarriageCostCurrent,
        daughterMarriageYear, setDaughterMarriageYear,
        additionalExpenses, setAdditionalExpenses,
        nextExpenseId, setNextExpenseId,
        // Results
        errorMessage, // Removed setErrorMessage from destructuring
        corpusNeeded, availableFunds, shortfall, requiredSip,
        // Functions
        calculateCorpus
    } = useRetirementCalculator();

    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false); // State for modal visibility in App

    const handleAddExpense = (newExpense) => {
        setAdditionalExpenses([...additionalExpenses, { ...newExpense, id: nextExpenseId }]);
        setNextExpenseId(nextExpenseId + 1);
        setShowAddExpenseModal(false); // Close modal after adding
    };

    const updateAdditionalExpense = (id, field, value) => {
        setAdditionalExpenses(additionalExpenses.map(exp =>
            exp.id === id ? { ...exp, [field]: value } : exp
        ));
    };

    const removeAdditionalExpense = (id) => {
        setAdditionalExpenses(additionalExpenses.filter(exp => exp.id !== id));
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-sans text-gray-800 flex items-center justify-center">
            <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-6 md:p-8 space-y-6">
                <h1 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-700 mb-6">
                    Fire Calculator
                </h1>

                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline ml-2">{errorMessage}</span>
                    </div>
                )}

                <PersonalFinancialGoals
                    husbandCurrentAge={husbandCurrentAge} setHusbandCurrentAge={setHusbandCurrentAge}
                    husbandRetirementAge={husbandRetirementAge} setHusbandRetirementAge={setHusbandRetirementAge}
                    husbandLifespan={husbandLifespan} setHusbandLifespan={setHusbandLifespan}
                    currentExpenseMonthly={currentExpenseMonthly} setCurrentExpenseMonthly={setCurrentExpenseMonthly}
                />

                <GrowthInflationRates
                    equityGrowthPreRetirement={equityGrowthPreRetirement} setEquityGrowthPreRetirement={setEquityGrowthPreRetirement}
                    bankGrowth={bankGrowth} setBankGrowth={setBankGrowth}
                    pfGrowth={pfGrowth} setPfGrowth={setPfGrowth}
                    inflation={inflation} setInflation={setInflation}
                    equityGrowthPostRetirement={equityGrowthPostRetirement} setEquityGrowthPostRetirement={setEquityGrowthPostRetirement}
                />

                <HusbandInvestments
                    husbandLumpsumEquity={husbandLumpsumEquity} setHusbandLumpsumEquity={setHusbandLumpsumEquity}
                    husbandSipEquity={husbandSipEquity} setHusbandSipEquity={setHusbandSipEquity}
                    husbandPfCurrent={husbandPfCurrent} setHusbandPfCurrent={setHusbandPfCurrent}
                    husbandPfMonthlyContribution={husbandPfMonthlyContribution} setHusbandPfMonthlyContribution={setHusbandPfMonthlyContribution}
                    husbandBankFdCurrent={husbandBankFdCurrent} setHusbandBankFdCurrent={setHusbandBankFdCurrent}
                />

                <WifeInvestments
                    wifeLumpsumEquity={wifeLumpsumEquity} setWifeLumpsumEquity={setWifeLumpsumEquity}
                    wifeSipEquity={wifeSipEquity} setWifeSipEquity={setWifeSipEquity}
                    wifeBankFdCurrent={wifeBankFdCurrent} setWifeBankFdCurrent={setWifeBankFdCurrent}
                />

                <FixedFutureExpenses
                    homePurchaseCostCurrent={homePurchaseCostCurrent} setHomePurchaseCostCurrent={setHomePurchaseCostCurrent}
                    homePurchaseYear={homePurchaseYear} setHomePurchaseYear={setHomePurchaseYear}
                    daughterEducationCostCurrent={daughterEducationCostCurrent} setDaughterEducationCostCurrent={setDaughterEducationCostCurrent}
                    daughterEducationYear={daughterEducationYear} setDaughterEducationYear={setDaughterEducationYear}
                    daughterMarriageCostCurrent={daughterMarriageCostCurrent} setDaughterMarriageCostCurrent={setDaughterMarriageCostCurrent}
                    daughterMarriageYear={daughterMarriageYear} setDaughterMarriageYear={setDaughterMarriageYear}
                    onAddAdditionalExpense={() => setShowAddExpenseModal(true)} // Pass handler to open modal
                />

                {additionalExpenses.length > 0 && (
                    <section className="space-y-5">
                        <h3 className="text-xl font-semibold text-indigo-600 border-b pb-2 mb-4 mt-8">Additional Future Expenses</h3>
                        <AdditionalExpensesList
                            expenses={additionalExpenses}
                            onUpdate={updateAdditionalExpense}
                            onRemove={removeAdditionalExpense}
                        />
                    </section>
                )}
                
                <button
                    onClick={calculateCorpus}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                >
                    Calculate Retirement Corpus
                </button>

                <ResultsDisplaySection
                    corpusNeeded={corpusNeeded}
                    availableFunds={availableFunds}
                    shortfall={shortfall}
                    requiredSip={requiredSip}
                />

                {/* Add Expense Modal */}
                {showAddExpenseModal && (
                    <AddExpenseModal
                        onClose={() => setShowAddExpenseModal(false)}
                        onAddExpense={handleAddExpense}
                        // CURRENT_YEAR prop is not needed as AddExpenseModal calculates it internally
                    />
                )}
            </div>
        </div>
    );
}

export default App;
