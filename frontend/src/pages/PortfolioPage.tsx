import { YieldEstimator } from '../components/YieldEstimator';
import { mockHoldings, mockPayouts } from '../data/mockData';

const PortfolioPage = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-text dark:text-text-dark mb-8">My Portfolio</h1>

      <div className="mb-8">
        <YieldEstimator holdings={mockHoldings} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* --- Current Holdings Card --- */}
        <div className="bg-background dark:bg-background-dark-light p-6 rounded-xl shadow-md border border-border-light dark:border-border-dark">
          <h2 className="text-xl font-semibold text-text dark:text-text-dark mb-4">Current Holdings</h2>
          <div className="flow-root">
             <div className="divide-y divide-border-light dark:divide-border-dark">
              {/* Table Header */}
              <div className="py-2 grid grid-cols-3 gap-4 text-xs font-semibold text-text-light dark:text-text-dark-light uppercase">
                <div className="col-span-1">Property</div>
                <div className="text-right">Tokens</div>
                <div className="text-right">Value</div>
              </div>
              {/* Table Body */}
              {mockHoldings.map((holding) => (
                <div key={holding.propertyName} className="py-3 grid grid-cols-3 gap-4 text-sm">
                  <div className="font-medium text-text dark:text-text-dark col-span-1">{holding.propertyName}</div>
                  <div className="text-right text-text-light dark:text-text-dark-light">{holding.tokens}</div>
                  <div className="text-right font-semibold text-text dark:text-text-dark">
                    {holding.currentValue.toLocaleString('en-US', { style: 'currency', currency: 'AED' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Payout History Card --- */}
        <div className="bg-background dark:bg-background-dark-light p-6 rounded-xl shadow-md border border-border-light dark:border-border-dark">
          <h2 className="text-xl font-semibold text-text dark:text-text-dark mb-4">Payout History</h2>
          <div className="flow-root">
            <div className="divide-y divide-border-light dark:divide-border-dark">
               {/* Table Header */}
               <div className="py-2 grid grid-cols-3 gap-4 text-xs font-semibold text-text-light dark:text-text-dark-light uppercase">
                <div className="col-span-1">Property</div>
                <div className="text-right">Date</div>
                <div className="text-right">Amount</div>
              </div>
              {/* Table Body */}
              <div className="max-h-96 overflow-y-auto">
                {mockPayouts.map((payout, index) => (
                  <div key={index} className="py-3 grid grid-cols-3 gap-4 text-sm pr-2">
                    <div className="font-medium text-text dark:text-text-dark col-span-1">{payout.propertyName}</div>
                    <div className="text-right text-text-light dark:text-text-dark-light">{payout.date}</div>
                    <p className="text-right font-semibold text-yield-positive">
                      + {payout.amount.toLocaleString('en-US', { style: 'currency', currency: 'AED' })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;