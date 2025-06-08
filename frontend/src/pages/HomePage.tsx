import { useState, useMemo } from 'react';
import { PropertyCard } from '../components/investor-dashboard/PropertyCard'
import { SearchBar } from '../components/investor-dashboard/SearchBar';
import { mockProperties } from '../data/mockData';
import type { Property } from '../types';
import { ChevronDown } from 'lucide-react';

// Get unique values for filters
const propertyCategories = ["All", ...Array.from(new Set(mockProperties.map(p => p.category)))];
const propertyLocations = ["All", ...Array.from(new Set(mockProperties.map(p => p.location)))];

const HomePage = () => {
  const [properties] = useState<Property[]>(mockProperties);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = searchQuery === '' ||
        property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || property.category === selectedCategory;
      const matchesLocation = selectedLocation === 'All' || property.location === selectedLocation;

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [properties, searchQuery, selectedCategory, selectedLocation]);

  const FilterDropdown: React.FC<{ label: string; options: string[]; value: string; onChange: (value: string) => void }> = ({ label, options, value, onChange }) => (
    <div className="relative">
      <select 
        value={value} 
        onChange={e => onChange(e.target.value)}
        className="appearance-none w-full bg-background dark:bg-background-dark-light border border-border-light dark:border-border-dark rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
      >
        <option value="All">{label}</option>
        {options.filter(o => o !== "All").map(option => <option key={option} value={option}>{option}</option>)}
      </select>
      <ChevronDown className="w-4 h-4 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none text-text-light" />
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-text dark:text-text-dark tracking-tight sm:text-5xl">
          Find Your Next Investment
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-text-light dark:text-text-dark-light">
          Browse and invest in premium tokenized real estate opportunities from around the globe.
        </p>
      </div>

      {/* --- Filter Bar --- */}
      <div className="p-4 bg-background dark:bg-background-dark-light rounded-lg shadow-md mb-8 sticky top-[65px] z-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <SearchBar onSearchChange={setSearchQuery} />
          </div>
          <FilterDropdown label="All Categories" options={propertyCategories} value={selectedCategory} onChange={setSelectedCategory} />
          <FilterDropdown label="All Locations" options={propertyLocations} value={selectedLocation} onChange={setSelectedLocation} />
        </div>
      </div>
      
      {/* --- Property Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      {filteredProperties.length === 0 && (
          <div className="col-span-full text-center py-16">
            <h3 className="text-2xl font-semibold text-text dark:text-text-dark">No Properties Found</h3>
            <p className="text-text-light dark:text-text-dark-light mt-2">Try adjusting your search or filter criteria.</p>
          </div>
        )}
    </div>
  );
};

export default HomePage;