import { useState } from 'react';
import { type Property } from '../../types';
// This line expects InvestModal.tsx to be in the same folder as this file.
import { InvestModal } from './InvestModal';
import { TrendingUp, TrendingDown, MapPin } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

const getYieldColor = (yieldVal: number) => {
  return yieldVal >= 0 ? 'text-yield-positive' : 'text-yield-negative';
};

const getCategoryBadgeColor = (category: Property['category']) => {
  switch(category) {
    case 'Residential': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'Commercial': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'Villa': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
  }
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-background dark:bg-background-dark-light rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col border border-border-light dark:border-border-dark">
        <div className="relative">
          <img src={property.imageUrl} alt={property.name} className="w-full h-48 object-cover" />
          <span className={`absolute top-2 right-2 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ${getCategoryBadgeColor(property.category)}`}>
            {property.category}
          </span>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-text dark:text-text-dark">{property.name}</h3>
          <div className="flex items-center text-sm text-text-light dark:text-text-dark-light mt-1 mb-4">
            <MapPin size={14} className="mr-1.5"/>
            {property.location}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-5">
            <div>
              <p className="text-text-light dark:text-text-dark-light">Price</p>
              <p className="font-semibold text-text dark:text-text-dark">
                {property.price.toLocaleString('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-text-light dark:text-text-dark-light">Annual Yield</p>
              <div className={`flex items-center justify-end font-semibold ${getYieldColor(property.yield)}`}>
                {property.yield >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span className="ml-1">{property.yield.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-border-light dark:border-border-dark">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-brand text-white py-2.5 px-4 rounded-lg hover:bg-brand-hover transition-colors duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            >
              Invest Now
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && <InvestModal property={property} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};