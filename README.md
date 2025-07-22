# Retirement Corpus Calculator

## Project Overview

This is a React-based web application designed to help users calculate their estimated retirement corpus. It takes into account various financial inputs such as current age, retirement age, lifespan, monthly expenses, investment growth rates, and future fixed expenses (like home purchase, education, and marriage costs). The calculator then determines the total corpus needed at retirement, the funds available from current investments, and any potential shortfall or surplus, suggesting a required monthly SIP to cover any deficit.

## Features

* **Dynamic Age and Retirement Planning:** Calculates the retirement timeline based on the user's current age and desired retirement age.
* **Inflation Adjustment:** Accounts for inflation to project future expenses accurately.
* **Investment Growth Projections:** Incorporates different growth rates for equity, bank FDs, and PF (Provident Fund) for pre-retirement and post-retirement phases.
* **Tax Considerations:** Applies simplified tax rates to equity, bank FD, and PF returns.
* **Fixed Future Expense Planning:** Allows users to input and plan for significant future expenses like home purchase, daughter's education, and daughter's marriage, projecting their inflated costs to the relevant years.
* **Additional Custom Expenses:** Users can add multiple custom future expenses with descriptions, costs, and years.
* **Shortfall/Surplus Analysis:** Clearly displays the difference between the corpus needed and available funds.

* **SIP Recommendation:** Provides a recommended monthly SIP amount to cover any calculated shortfall.
* **Responsive UI:** Designed with Tailwind CSS for a modern, clean, and responsive user interface that adapts to various screen sizes.
* **Modular Codebase:** Organized into smaller, reusable React components and a custom hook for better maintainability and readability.

## Tech Stack

* **React:** Frontend JavaScript library for building user interfaces.
* **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
* **JavaScript (ES6+):** Core programming language.
* **HTML5:** Structure of the web pages.

## Project Structure
The project is organized into the following key directories:
```
src/
├── components/
│   ├── modals/
│   │   └── AddExpenseModal.jsx     // Modal for adding custom expenses
│   ├── shared/
│   │   ├── InputField.jsx          // Reusable input field component
│   │   └── ResultDisplay.jsx       // Reusable result display component
│   ├── AdditionalExpensesList.jsx  // Displays list of additional expenses
│   ├── FixedFutureExpenses.jsx     // Section for fixed future expenses
│   ├── GrowthInflationRates.jsx    // Section for growth and inflation rates
│   ├── HusbandInvestments.jsx      // Section for husband's investments
│   ├── PersonalFinancialGoals.jsx  // Section for personal and financial goals
│   ├── ResultsDisplaySection.jsx   // Displays calculation results
│   └── WifeInvestments.jsx         // Section for wife's investments
├── hooks/
│   └── useRetirementCalculator.js  // Custom hook encapsulating calculation logic and state
├── utils/
│   └── constants.js                // Global constants used across the application
└── App.js                          // Main application component
```
