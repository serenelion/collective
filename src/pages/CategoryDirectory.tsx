import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapIcon, LayoutGrid } from 'lucide-react';
import { getCategories, getEnterprises, type Category, type Enterprise } from '../lib/supabase';
import CategoryFilter from '../components/CategoryFilter';
import EnterprisesList from '../components/EnterprisesList';
import EnterpriseMap from '../components/EnterpriseMap';
import MindMap from '../components/MindMap';
import SearchBar from '../components/SearchBar';

type ViewMode = 'grid' | 'visualization';

const slugToCategoryName = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const CategoryDirectory: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [categories, setCategories] = useState<Category[]>([]);
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [filteredEnterprises, setFilteredEnterprises] = useState<Enterprise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryName = categorySlug ? slugToCategoryName(categorySlug) : '';
  
  // Find the category ID based on the category name
  const category = categories.find(c => c.name === categoryName);
  const categoryId = category?.id || 0;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchEnterprises = async () => {
      if (!categoryName) return;
      
      try {
        setLoading(true);
        const data = await getEnterprises(categoryName);
        setEnterprises(data);
        setFilteredEnterprises(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load enterprises');
      } finally {
        setLoading(false);
      }
    };

    fetchEnterprises();
  }, [categoryName]);

  const handleFilterChange = (selectedSubcategories: string[]) => {
    if (selectedSubcategories.length === 0) {
      setFilteredEnterprises(enterprises);
    } else {
      const filtered = enterprises.filter(enterprise => 
        selectedSubcategories.some(subcat => enterprise.subcategories.includes(subcat))
      );
      setFilteredEnterprises(filtered);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query) {
      setFilteredEnterprises(enterprises);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const results = enterprises.filter(
      enterprise => 
        enterprise.name.toLowerCase().includes(lowerQuery) || 
        (enterprise.description && enterprise.description.toLowerCase().includes(lowerQuery))
    );
    
    setFilteredEnterprises(results);
  };

  return (
    <div>
      {/* Category Header */}
      <div className={`py-12 ${
        categoryName === 'Land Projects' ? 'bg-primary-800' : 
        categoryName === 'Capital Sources' ? 'bg-secondary-800' : 
        categoryName === 'Open Source Tools' ? 'bg-success-700' : 
        'bg-earth-800'
      } text-white`}>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{categoryName}</h1>
          <p className="text-lg max-w-3xl">
            {categoryName === 'Land Projects' && 
              'Discover regenerative farms, food forests, and other land-based projects restoring ecosystems.'}
            {categoryName === 'Capital Sources' && 
              'Find organizations providing funding, investment, and financial resources for regenerative work.'}
            {categoryName === 'Open Source Tools' && 
              'Explore digital tools supporting the management and monitoring of regenerative projects.'}
            {categoryName === 'Network Organizers' && 
              'Connect with organizations building communities and networks for ecosystem restoration.'}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="w-full md:w-1/2 lg:w-2/3">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder={`Search ${categoryName}...`} 
            />
          </div>
          
          <div className="flex justify-end items-center space-x-2">
            <span className="text-sm text-gray-600 mr-2">View:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid' 
                  ? 'bg-gray-200 text-gray-800' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode('visualization')}
              className={`p-2 rounded-md ${
                viewMode === 'visualization' 
                  ? 'bg-gray-200 text-gray-800' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Map view"
            >
              <MapIcon size={20} />
            </button>
          </div>
        </div>
        
        {searchQuery && (
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredEnterprises.length} results for "{searchQuery}"
              <button 
                onClick={() => handleSearch('')}
                className="ml-2 text-secondary-600 hover:text-secondary-800"
              >
                Clear
              </button>
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            {categoryId > 0 && (
              <CategoryFilter 
                categoryId={categoryId} 
                onFilterChange={handleFilterChange} 
              />
            )}
          </div>
          
          <div className="lg:col-span-3">
            {error ? (
              <div className="bg-error-50 text-error-700 p-4 rounded-lg mb-4">
                <p>{error}</p>
              </div>
            ) : viewMode === 'grid' ? (
              <EnterprisesList 
                enterprises={filteredEnterprises} 
                loading={loading} 
              />
            ) : (
              categoryName === 'Land Projects' ? (
                <EnterpriseMap enterprises={filteredEnterprises} />
              ) : (
                <MindMap 
                  enterprises={filteredEnterprises} 
                  category={categoryName} 
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDirectory;