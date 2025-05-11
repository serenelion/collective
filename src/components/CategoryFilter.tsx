import React, { useState, useEffect } from 'react';
import { getSubcategoriesByCategoryId, type Subcategory } from '../lib/supabase';

interface CategoryFilterProps {
  categoryId: number;
  onFilterChange: (selectedSubcategories: string[]) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categoryId, onFilterChange }) => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        setLoading(true);
        const data = await getSubcategoriesByCategoryId(categoryId);
        setSubcategories(data);
        setSelectedSubcategories([]);
        setError(null);
      } catch (err) {
        setError('Failed to load subcategories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [categoryId]);

  const handleSubcategoryToggle = (subcategoryName: string) => {
    setSelectedSubcategories(prev => {
      const isSelected = prev.includes(subcategoryName);
      const newSelection = isSelected
        ? prev.filter(name => name !== subcategoryName)
        : [...prev, subcategoryName];
      
      // Notify parent component about the change
      onFilterChange(newSelection);
      return newSelection;
    });
  };

  const clearFilters = () => {
    setSelectedSubcategories([]);
    onFilterChange([]);
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-8 bg-gray-200 rounded w-24"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-error-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-gray-700">Filter by Subcategory</h3>
        {selectedSubcategories.length > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-secondary-600 hover:text-secondary-800"
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {subcategories.map(subcategory => (
          <button
            key={subcategory.id}
            onClick={() => handleSubcategoryToggle(subcategory.name)}
            className={`text-xs px-3 py-2 rounded-full transition-colors ${
              selectedSubcategories.includes(subcategory.name)
                ? 'bg-secondary-100 text-secondary-800 border border-secondary-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
            }`}
          >
            {subcategory.name}
          </button>
        ))}
      </div>
      
      {subcategories.length === 0 && (
        <p className="text-sm text-gray-500">No subcategories available</p>
      )}
    </div>
  );
};

export default CategoryFilter;