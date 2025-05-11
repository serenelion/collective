import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Search enterprises...' 
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value === '') {
      onSearch('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="search"
          id="search"
          className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-secondary-500 focus:border-secondary-500 outline-none"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="absolute right-2.5 bottom-2 top-2 bg-secondary-600 hover:bg-secondary-700 focus:ring-2 focus:outline-none focus:ring-secondary-300 font-medium rounded-lg text-sm px-4 text-white"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;