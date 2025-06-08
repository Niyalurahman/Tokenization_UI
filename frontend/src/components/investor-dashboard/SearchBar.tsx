import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearchChange: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-text-light dark:text-text-dark-light" />
      </div>
      <input
        type="text"
        placeholder="Search by property name or location..."
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-background dark:bg-background-dark-light text-text dark:text-text-dark placeholder-text-light dark:placeholder-text-dark-light focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand sm:text-sm"
      />
    </div>
  );
};