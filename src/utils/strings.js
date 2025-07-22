// utils/strings.js

export const RESULTS_SECTION_HEADER = "Calculation Results";
export const RESULTS_SUMMARY_INTRO = "Based on your inputs, here's a summary of your retirement financial projections:";
export const KEY_POINTERS_HEADER = "Key Pointers:";

export const POINTER_CORPUS_NEEDED_TITLE = "Total Retirement Corpus Needed:";
export const POINTER_CORPUS_NEEDED_DESC = "This is the estimated total amount you will need at your retirement age to cover all your projected expenses. This includes your estimated annual living expenses, adjusted for inflation throughout your retirement period, as well as the inflated costs of significant future events like your daughter's education and marriage. This figure aims to ensure you maintain your desired lifestyle without financial stress.";

export const POINTER_AVAILABLE_FUNDS_TITLE = "Total Available Funds (Net of Taxes):";
export const POINTER_AVAILABLE_FUNDS_DESC = "This represents the projected accumulated value of all your current investments (Lumpsum Equity, SIP Equity, PF, and Bank FDs) by your retirement age. This calculation considers the specified growth rates for each asset class and importantly, deducts the applicable taxes (Equity Tax, Bank FD Tax, PF Tax) to provide a realistic net amount you'll have at your disposal.";

export const POINTER_SHORTFALL_SURPLUS_TITLE = "Shortfall / (Surplus):";
export const POINTER_SHORTFALL_SURPLUS_DESC = "This crucial figure highlights the difference between your 'Total Retirement Corpus Needed' and your 'Total Available Funds'. If the value is positive, it indicates a **shortfall**, meaning you need to save more to reach your retirement goal. If the value is negative (shown in green), it indicates a **surplus**, meaning your current savings and investment plan are projected to exceed your retirement needs.";

export const POINTER_REQUIRED_SIP_TITLE = "Additional Monthly SIP Required to Cover Shortfall:";
export const POINTER_REQUIRED_SIP_DESC = "If a shortfall is identified, this is the calculated additional monthly Systematic Investment Plan (SIP) amount you would need to consistently contribute from your current age until your retirement age. This SIP is designed to bridge the exact gap (shortfall) identified, assuming the specified pre-retirement equity growth rate, helping you achieve your desired retirement corpus.";

export const HOW_CALCULATED_HEADER = "How We Calculated This:";

export const CALC_CORPUS_NEEDED_DESC = "We first projected your `Current Monthly Expense` to your `Husband's Retirement Age` using your `Inflation` rate to get your first year's retirement expense. Then, we calculated the total corpus required for your `Husband's Lifespan` (post-retirement years) considering the `Equity Growth (Post-Retirement)` rate. Separately, we inflated the `Home Purchase`, `Daughter's Education`, and `Daughter's Marriage` costs to their respective years using the `Inflation` rate, and then discounted them back to your retirement year. All these future expense components are summed up to get the total corpus needed.";

export const CALC_AVAILABLE_FUNDS_DESC = "We projected the future value of each of your investments (`Husband's Lumpsum Equity`, `Husband's SIP Equity`, `Husband's PF Current Amount`, `Husband's PF Monthly Contribution`, `Husband's Bank FD Current Amount`, `Wife's Lumpsum Equity`, `Wife's SIP Equity`, `Wife's Bank FD Current Amount`) up to your `Husband's Retirement Age` using their respective growth rates (`Equity Growth (Pre-Retirement)`, `Bank Growth`, `PF Growth`). We also factored in the `Home Purchase` payment from PF and then equity, adjusting the remaining investment amounts. Finally, we applied the `Equity Tax Rate`, `Bank FD Tax Rate`, and `PF Tax Rate` to these projected values to arrive at the net available funds.";

export const CALC_SHORTFALL_SURPLUS_DESC = "This is a straightforward calculation: `Total Retirement Corpus Needed - Total Available Funds`. A positive result means you need more money (shortfall), while a negative result means you have more than enough (surplus).";

export const CALC_REQUIRED_SIP_DESC = "If a shortfall exists, we determined the monthly SIP amount needed to accumulate that exact shortfall by your `Husband's Retirement Age`. This calculation assumes this SIP will grow at your `Equity Growth (Pre-Retirement)` rate over the years remaining until retirement.";

export const DISCLAIMER_NOTE = "*Note: Tax calculations are simplified as per the problem statement (e.g., flat percentages on total value). Real-world tax implications on capital gains and interest may vary.";


// New strings for Growth & Inflation Rates section
export const GROWTH_INFLATION_RATES_HEADER = "Growth & Inflation Rates (%)";
export const EQUITY_GROWTH_PRE_RETIREMENT_LABEL = "Equity Growth (Pre-Retirement)";
export const BANK_GROWTH_LABEL = "Bank Growth";
export const PF_GROWTH_LABEL = "PF Growth";
export const INFLATION_LABEL = "Inflation";
export const EQUITY_GROWTH_POST_RETIREMENT_LABEL = "Equity Growth (Post-Retirement)";