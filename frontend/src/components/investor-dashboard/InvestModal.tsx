import { useState } from 'react';
import { type Property } from '../types';
import { X } from 'lucide-react';

interface InvestModalProps {
  property: Property;
  onClose: () => void;
}

export const InvestModal: React.FC<InvestModalProps> = ({ property, onClose }) => {
  const [aedAmount, setAedAmount] = useState(1000);
  const tokenPrice = 10;

  const handleConfirm = () => {
    alert(`Investment of ${aedAmount} AED for ${property.name} confirmed! You will receive ${aedAmount / tokenPrice} tokens.`);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 animate-in fade-in-0"
      onClick={onClose}
    >
      <div 
        className="bg-background dark:bg-background-dark-light rounded-xl shadow-xl w-full max-w-md p-6 animate-in zoom-in-95"
        onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-text dark:text-text-dark">Invest in {property.name}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <X size={20} className="text-text-light" />
          </button>
        </div>
        
        <p className="text-sm text-text-light dark:text-text-dark-light mb-6">Token Price: {tokenPrice} AED per token</p>

        <div className="space-y-4">
          <div>
            <label htmlFor="aedAmount" className="block text-sm font-medium text-text-light dark:text-text-dark-light">
              Investment Amount (AED)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-text-light dark:text-text-dark-light sm:text-sm">AED</span>
              </div>
              <input
                id="aedAmount"
                type="number"
                value={aedAmount}
                onChange={(e) => setAedAmount(Number(e.target.value))}
                className="block w-full rounded-md border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark py-2 pl-12 pr-4 text-text dark:text-text-dark focus:border-brand focus:ring-brand"
                min="100"
                step="100"
              />
            </div>
          </div>
          <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg border border-border-light dark:border-border-dark">
            <p className="text-text-light dark:text-text-dark-light">You will receive:</p>
            <p className="text-2xl font-bold text-brand">{(aedAmount / tokenPrice).toFixed(2)} Tokens</p>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border-light dark:border-border-dark rounded-md text-sm font-medium text-text-light dark:text-text-dark-light hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-colors"
          >
            Confirm Investment
          </button>
        </div>
      </div>
    </div>
  );
};