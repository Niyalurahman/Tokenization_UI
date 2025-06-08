import { useMemo } from 'react';
import { type Holding } from '../../types';

interface YieldEstimatorProps {
  holdings: Holding[];
}

export const YieldEstimator: React.FC<YieldEstimatorProps> = ({ holdings }) => {
  const estimatedMonthlyYield = useMemo(() => {
    if (holdings.length === 0) {
      return 0;
    }

    // 1. Calculate total portfolio value
    const totalPortfolioValue = holdings.reduce(
      (sum, holding) => sum + holding.tokens * holding.tokenPriceAED,
      0
    );

    if (totalPortfolioValue === 0) {
        return 0;
    }

    // 2. Calculate weighted average yield
    const weightedYield = holdings.reduce((sum, holding) => {
      const holdingValue = holding.tokens * holding.tokenPriceAED;
      const weight = holdingValue / totalPortfolioValue;
      return sum + holding.annualYieldRate * weight;
    }, 0);

    // 3. Calculate estimated annual return
    const estimatedAnnualReturn = totalPortfolioValue * (weightedYield / 100);

    // 4. Return estimated monthly yield
    return estimatedAnnualReturn / 12;
  }, [holdings]);

  const formattedYield = estimatedMonthlyYield.toLocaleString('en-US', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="bg-background-light dark:bg-background-dark-light p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-text dark:text-text-dark mb-2">Monthly Yield Estimator</h2>
      <p className="text-3xl font-bold text-accent-green">{formattedYield}</p>
      <p className="text-sm text-text-light dark:text-text-dark-light mt-1">
        Based on your current holdings and their annual yield.
      </p>
    </div>
  );
};