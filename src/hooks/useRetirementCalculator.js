// hooks/useRetirementCalculator.js
import { useState } from 'react';
import {
    PERCENTAGE_DIVISOR, MONTHS_IN_YEAR, EQUITY_TAX_RATE, BANK_FD_TAX_RATE, PF_TAX_RATE, DEFAULT_EQUITY_GROWTH_PRE_RETIREMENT, DEFAULT_BANK_GROWTH, DEFAULT_PF_GROWTH, DEFAULT_INFLATION, DEFAULT_EQUITY_GROWTH_POST_RETIREMENT
} from '../utils/constants.js'; // Corrected import path with .js extension

const useRetirementCalculator = () => {
    // State variables for all input fields
    const [husbandCurrentAge, setHusbandCurrentAge] = useState(null);
    const [husbandRetirementAge, setHusbandRetirementAge] = useState(null);
    const [husbandLifespan, setHusbandLifespan] = useState(null);
    const [currentExpenseMonthly, setCurrentExpenseMonthly] = useState(null);

    const [equityGrowthPreRetirement, setEquityGrowthPreRetirement] = useState(DEFAULT_EQUITY_GROWTH_PRE_RETIREMENT);
    const [bankGrowth, setBankGrowth] = useState(DEFAULT_BANK_GROWTH);
    const [pfGrowth, setPfGrowth] = useState(DEFAULT_PF_GROWTH);
    const [inflation, setInflation] = useState(DEFAULT_INFLATION);
    const [equityGrowthPostRetirement, setEquityGrowthPostRetirement] = useState(DEFAULT_EQUITY_GROWTH_POST_RETIREMENT);

    const [husbandLumpsumEquity, setHusbandLumpsumEquity] = useState(null);
    const [husbandSipEquity, setHusbandSipEquity] = useState(null);
    const [husbandPfCurrent, setHusbandPfCurrent] = useState(null);
    const [husbandPfMonthlyContribution, setHusbandPfMonthlyContribution] = useState(null);
    const [husbandBankFdCurrent, setHusbandBankFdCurrent] = useState(null);

    const [wifeLumpsumEquity, setWifeLumpsumEquity] = useState(null);
    const [wifeSipEquity, setWifeSipEquity] = useState(null);
    const [wifeBankFdCurrent, setWifeBankFdCurrent] = useState(null);

    const [homePurchaseCostCurrent, setHomePurchaseCostCurrent] = useState(null);
    const [homePurchaseYear, setHomePurchaseYear] = useState(null);

    const [daughterEducationCostCurrent, setDaughterEducationCostCurrent] = useState(null);
    const [daughterEducationYear, setDaughterEducationYear] = useState(null);

    const [daughterMarriageCostCurrent, setDaughterMarriageCostCurrent] = useState(null);
    const [daughterMarriageYear, setDaughterMarriageYear] = useState(null);

    const [additionalExpenses, setAdditionalExpenses] = useState([]);
    const [nextExpenseId, setNextExpenseId] = useState(0);

    // State variables for results
    const [corpusNeeded, setCorpusNeeded] = useState(null);
    const [availableFunds, setAvailableFunds] = useState(null);
    const [shortfall, setShortfall] = useState(null);
    const [requiredSip, setRequiredSip] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    // Mapping for error messages to user-friendly labels
    const labelMap = {
        husbandCurrentAge: "Husband's Current Age",
        husbandRetirementAge: "Husband's Retirement Age",
        husbandLifespan: "Husband's Lifespan",
        currentExpenseMonthly: "Current Monthly Expense",
        equityGrowthPreRetirement: "Equity Growth (Pre-Retirement)",
        bankGrowth: "Bank Growth",
        pfGrowth: "PF Growth",
        inflation: "Inflation",
        equityGrowthPostRetirement: "Equity Growth (Post-Retirement)",
        husbandLumpsumEquity: "Husband's Lumpsum Equity",
        husbandSipEquity: "Husband's SIP Equity",
        husbandPfCurrent: "Husband's PF Current Amount",
        husbandPfMonthlyContribution: "Husband's PF Monthly Contribution",
        husbandBankFdCurrent: "Husband's Bank FD Current Amount",
        wifeLumpsumEquity: "Wife's Lumpsum Equity",
        wifeSipEquity: "Wife's SIP Equity",
        wifeBankFdCurrent: "Wife's Bank FD Current Amount",
        homePurchaseCostCurrent: "Home Purchase Current Cost",
        homePurchaseYear: "Home Purchase Year",
        daughterEducationCostCurrent: "Daughter's Education Current Cost",
        daughterEducationYear: "Daughter's Education Year",
        daughterMarriageCostCurrent: "Daughter's Marriage Current Cost",
        daughterMarriageYear: "Daughter's Marriage Year",
    };

    // Helper Functions
    const calculateFV = (principal, annualRate, years) => {
        return principal * Math.pow(1 + annualRate / PERCENTAGE_DIVISOR, years);
    };

    const calculateFVSIP = (monthlyContribution, annualRate, years) => {
        const monthlyRate = annualRate / PERCENTAGE_DIVISOR / MONTHS_IN_YEAR;
        const numberOfMonths = years * MONTHS_IN_YEAR;
        if (monthlyRate === 0) {
            return monthlyContribution * numberOfMonths;
        }
        return monthlyContribution * (Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate;
    };

    const calculatePV = (futureValue, annualRate, years) => {
        return futureValue / Math.pow(1 + annualRate / PERCENTAGE_DIVISOR, years);
    };

    const calculateRetirementLivingCorpus = (firstAnnualExpense, postRetirementGrowthRate, inflationRate, years) => {
        if (postRetirementGrowthRate === inflationRate) {
            return firstAnnualExpense * years;
        }
        const r = postRetirementGrowthRate / PERCENTAGE_DIVISOR;
        const g = inflationRate / PERCENTAGE_DIVISOR;
        return firstAnnualExpense * (1 - Math.pow((1 + g) / (1 + r), years)) / (r - g);
    };

    const calculateRequiredSip = (targetFV, annualRate, years) => {
        const monthlyRate = annualRate / PERCENTAGE_DIVISOR / MONTHS_IN_YEAR;
        const numberOfMonths = years * MONTHS_IN_YEAR;
        if (monthlyRate === 0) {
            return targetFV / numberOfMonths;
        }
        return targetFV * monthlyRate / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
    };

    // Main calculation function
    const calculateCorpus = () => {
        setErrorMessage('');

        const currentYear = new Date().getFullYear(); // Dynamic current year

        const requiredInputs = {
            husbandCurrentAge, husbandRetirementAge, husbandLifespan, currentExpenseMonthly,
            equityGrowthPreRetirement, bankGrowth, pfGrowth, inflation, equityGrowthPostRetirement,
            husbandLumpsumEquity, husbandSipEquity, husbandPfCurrent, husbandPfMonthlyContribution, husbandBankFdCurrent,
            homePurchaseCostCurrent, homePurchaseYear,
            daughterEducationCostCurrent, daughterEducationYear,
            daughterMarriageCostCurrent, daughterMarriageYear
        };

        for (const key in requiredInputs) {
            if (requiredInputs[key] === null || isNaN(requiredInputs[key]) || requiredInputs[key] < 0) {
                setErrorMessage(`Please enter valid positive numbers for all required fields. Issue with: ${labelMap[key] || key}`);
                return;
            }
        }

        for (const exp of additionalExpenses) {
            if (exp.description.trim() === '' || exp.cost === null || isNaN(exp.cost) || exp.cost < 0 || exp.year === null || isNaN(exp.year) || exp.year < 0) {
                setErrorMessage(`Please ensure all additional expenses have a description, valid positive cost, and valid positive year.`);
                return;
            }
            if (exp.year < currentYear) {
                setErrorMessage(`Additional expense year for '${exp.description}' cannot be before current year (July ${currentYear}).`);
                return;
            }
        }

        if (husbandRetirementAge <= husbandCurrentAge) {
            setErrorMessage("Retirement age must be greater than current age.");
            return;
        }
        if (husbandLifespan <= husbandRetirementAge) {
            setErrorMessage("Lifespan must be greater than retirement age.");
            return;
        }
        if (homePurchaseYear < currentYear || daughterEducationYear < currentYear || daughterMarriageYear < currentYear) {
            setErrorMessage(`Event years cannot be before current year (July ${currentYear}).`);
            return;
        }

        const yearsToRetirement = husbandRetirementAge - husbandCurrentAge;
        const actualRetirementYear = currentYear + yearsToRetirement;

        // A. Future Value of Investments until Retirement Year
        let hLumpsumEquityFV_PreRetirement = calculateFV(husbandLumpsumEquity, equityGrowthPreRetirement, yearsToRetirement);
        let hSipEquityFV_PreRetirement = calculateFVSIP(husbandSipEquity, equityGrowthPreRetirement, yearsToRetirement);
        let hPfCurrentFV_PreRetirement = calculateFV(husbandPfCurrent, pfGrowth, yearsToRetirement);
        let hPfSipFV_PreRetirement = calculateFVSIP(husbandPfMonthlyContribution, pfGrowth, yearsToRetirement);
        let hBankFdFV_PreRetirement = calculateFV(husbandBankFdCurrent, bankGrowth, yearsToRetirement);

        const wifeLumpsumEquityVal = wifeLumpsumEquity || 0;
        const wifeSipEquityVal = wifeSipEquity || 0;
        const wifeBankFdCurrentVal = wifeBankFdCurrent || 0;

        let wLumpsumEquityFV_PreRetirement = calculateFV(wifeLumpsumEquityVal, equityGrowthPreRetirement, yearsToRetirement);
        let wSipEquityFV_PreRetirement = calculateFVSIP(wifeSipEquityVal, equityGrowthPreRetirement, yearsToRetirement);
        let wBankFdFV_PreRetirement = calculateFV(wifeBankFdCurrentVal, bankGrowth, yearsToRetirement);

        // B. Home Purchase - Declare variables at a higher scope
        let inflatedHomeCost = 0;
        let hPfCurrent_atHomePurchase = 0; // Declared here
        let hPfSip_atHomePurchase = 0; // Declared here
        let totalPfAtHomePurchase = 0;
        let wLumpsumEquity_atHomePurchase = 0; // Declared here
        let wSipEquity_atHomePurchase = 0; // Declared here
        let totalWifeEquityAtHomePurchase = 0;
        let husbandLumpsumEquity_atHomePurchase = 0; // Declared here
        let husbandSipEquity_atHomePurchase = 0; // Declared here
        let totalHusbandEquityAtHomePurchase = 0;
        let wifeEquityUsedForHome = 0;
        let husbandEquityUsedForHome = 0;
        let remainingHusbandEquity_atHomePurchase = 0;
        let remainingWifeEquity_atHomePurchase = 0;
        let yearsAfterHomePurchase = 0;

        if (homePurchaseYear >= currentYear && homePurchaseYear <= actualRetirementYear) {
            inflatedHomeCost = calculateFV(homePurchaseCostCurrent, inflation, yearsToHomePurchase);

            hPfCurrent_atHomePurchase = calculateFV(husbandPfCurrent, pfGrowth, yearsToHomePurchase);
            hPfSip_atHomePurchase = calculateFVSIP(husbandPfMonthlyContribution, pfGrowth, yearsToHomePurchase);
            totalPfAtHomePurchase = hPfCurrent_atHomePurchase + hPfSip_atHomePurchase;

            let remainingHomeCost = inflatedHomeCost - totalPfAtHomePurchase;

            wLumpsumEquity_atHomePurchase = calculateFV(wifeLumpsumEquityVal, equityGrowthPreRetirement, yearsToHomePurchase);
            wSipEquity_atHomePurchase = calculateFVSIP(wifeSipEquityVal, equityGrowthPreRetirement, yearsToHomePurchase);
            totalWifeEquityAtHomePurchase = wLumpsumEquity_atHomePurchase + wSipEquity_atHomePurchase;

            husbandLumpsumEquity_atHomePurchase = calculateFV(husbandLumpsumEquity, equityGrowthPreRetirement, yearsToHomePurchase);
            husbandSipEquity_atHomePurchase = calculateFVSIP(husbandSipEquity, equityGrowthPreRetirement, yearsToHomePurchase);
            totalHusbandEquityAtHomePurchase = husbandLumpsumEquity_atHomePurchase + husbandSipEquity_atHomePurchase;

            if (remainingHomeCost > 0) {
                if (totalWifeEquityAtHomePurchase >= remainingHomeCost) {
                    wifeEquityUsedForHome = remainingHomeCost;
                    remainingHomeCost = 0;
                } else {
                    wifeEquityUsedForHome = totalWifeEquityAtHomePurchase;
                    remainingHomeCost -= totalWifeEquityAtHomePurchase;
                }
            }

            if (remainingHomeCost > 0) {
                husbandEquityUsedForHome = remainingHomeCost;
                remainingHomeCost = 0;
            }

            yearsAfterHomePurchase = actualRetirementYear - homePurchaseYear;

            remainingHusbandEquity_atHomePurchase = totalHusbandEquityAtHomePurchase - husbandEquityUsedForHome;
            hLumpsumEquityFV_PreRetirement = calculateFV(remainingHusbandEquity_atHomePurchase, equityGrowthPreRetirement, yearsAfterHomePurchase);
            hSipEquityFV_PreRetirement = calculateFVSIP(husbandSipEquity, equityGrowthPreRetirement, yearsAfterHomePurchase);

            remainingWifeEquity_atHomePurchase = totalWifeEquityAtHomePurchase - wifeEquityUsedForHome;
            wLumpsumEquityFV_PreRetirement = calculateFV(remainingWifeEquity_atHomePurchase, equityGrowthPreRetirement, yearsAfterHomePurchase);
            wSipEquityFV_PreRetirement = calculateFVSIP(wifeSipEquityVal, equityGrowthPreRetirement, yearsAfterHomePurchase);

            hPfCurrentFV_PreRetirement = calculateFV(0, pfGrowth, yearsAfterHomePurchase);
            hPfSipFV_PreRetirement = calculateFVSIP(husbandPfMonthlyContribution, pfGrowth, yearsAfterHomePurchase);
            
            hBankFdFV_PreRetirement = calculateFV(husbandBankFdCurrent, bankGrowth, yearsToRetirement);
            wBankFdFV_PreRetirement = calculateFV(wifeBankFdCurrentVal, bankGrowth, yearsToRetirement);

        } else if (homePurchaseYear > actualRetirementYear) {
            // Home purchase is after retirement, handled as a post-retirement expense.
        }

        // D. Total Available Funds at Retirement Year (After Taxes)
        let totalEquityPreTax = hLumpsumEquityFV_PreRetirement + hSipEquityFV_PreRetirement + wLumpsumEquityFV_PreRetirement + wSipEquityFV_PreRetirement;
        let totalPfPreTax = hPfCurrentFV_PreRetirement + hPfSipFV_PreRetirement;
        let totalBankFdPreTax = hBankFdFV_PreRetirement + wBankFdFV_PreRetirement;

        let netEquity = totalEquityPreTax * (1 - EQUITY_TAX_RATE);
        let netPf = totalPfPreTax * (1 - PF_TAX_RATE);
        let netBankFd = totalBankFdPreTax * (1 - BANK_FD_TAX_RATE);

        let totalAvailableFunds = netEquity + netPf + netBankFd;
        setAvailableFunds(totalAvailableFunds);

        // E. Retirement Corpus Needed at Retirement Year
        const educationYearsFromCurrent = daughterEducationYear - currentYear + (1.0 / MONTHS_IN_YEAR);
        const marriageYearsFromCurrent = daughterMarriageYear - currentYear + (1.0 / MONTHS_IN_YEAR);

        const daughterEducationFV = calculateFV(daughterEducationCostCurrent, inflation, educationYearsFromCurrent);
        const daughterMarriageFV = calculateFV(daughterMarriageCostCurrent, inflation, marriageYearsFromCurrent);

        const pvEducationAtRetirement = calculatePV(daughterEducationFV, inflation, daughterEducationYear - actualRetirementYear + (1.0 / MONTHS_IN_YEAR));
        const pvMarriageAtRetirement = calculatePV(daughterMarriageFV, inflation, daughterMarriageYear - actualRetirementYear + (1.0 / MONTHS_IN_YEAR));

        let pvAdditionalExpensesAtRetirement = 0;
        for (const exp of additionalExpenses) {
            const expenseYearsFromCurrent = exp.year - currentYear;
            const expenseFV = calculateFV(exp.cost, inflation, expenseYearsFromCurrent);
            const pvAtRetirement = calculatePV(expenseFV, inflation, exp.year - actualRetirementYear);
            pvAdditionalExpensesAtRetirement += pvAtRetirement;
        }

        const monthlyExpenseAtRetirement = calculateFV(currentExpenseMonthly, inflation, yearsToRetirement);
        const firstAnnualExpenseAtRetirement = monthlyExpenseAtRetirement * MONTHS_IN_YEAR;
        const retirementPeriodYears = husbandLifespan - husbandRetirementAge;

        const livingExpensesCorpus = calculateRetirementLivingCorpus(
            firstAnnualExpenseAtRetirement,
            equityGrowthPostRetirement,
            inflation,
            retirementPeriodYears
        );

        let totalCorpusNeeded = livingExpensesCorpus + pvEducationAtRetirement + pvMarriageAtRetirement + pvAdditionalExpensesAtRetirement;

        if (homePurchaseYear > actualRetirementYear) {
            const yearsToHomePurchaseFromRetirement = homePurchaseYear - actualRetirementYear;
            const inflatedHomeCostAtRetirement = calculatePV(calculateFV(homePurchaseCostCurrent, inflation, yearsToHomePurchase), inflation, yearsToHomePurchaseFromRetirement);
            totalCorpusNeeded += inflatedHomeCostAtRetirement;
        }

        setCorpusNeeded(totalCorpusNeeded);

        const calculatedShortfall = totalCorpusNeeded - totalAvailableFunds;
        setShortfall(calculatedShortfall);

        if (calculatedShortfall > 0) {
            const sipRequired = calculateRequiredSip(calculatedShortfall, equityGrowthPreRetirement, yearsToRetirement);
            setRequiredSip(sipRequired);
        } else {
            setRequiredSip(0);
        }
    };

    return {
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
        corpusNeeded, availableFunds, shortfall, requiredSip, errorMessage, setErrorMessage,
        // Functions
        calculateCorpus,
        labelMap
    };
};

export default useRetirementCalculator;
