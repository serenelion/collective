import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getEnterprises, type Enterprise } from '../lib/supabase';
import EnterprisesList from '../components/EnterprisesList';
import SearchBar from '../components/SearchBar';

const SearchResults: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchEnterprises = async () => {
      if (!query) return;
      
      try {
        setLoading(true);
        
        // Get all enterprises and filter on the client side
        // In a real app, you'd want to do this filtering on the server
        const allEnterprises = await getEnterprises();
        
        const lowerQuery = query.toLowerCase();
        const results = allEnterprises.filter(
          enterprise => 
            enterprise.name.toLowerCase().includes(lowerQuery) || 
            (enterprise.description && enterprise.description.toLowerCase().includes(lowerQuery)) ||
            enterprise.subcategories.some(sub => sub.toLowerCase().includes(lowerQuery))
        );
        
        setEnterprises(results);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load search results');
      } finally {
        setLoading(false);
      }
    };

    searchEnterprises();
  }, [query]);

  const handleSearch = (newQuery: string) => {
    if (newQuery) {
      const params = new URLSearchParams();
      params.set('q', newQuery);
      window.location.search = params.toString();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Search Results for "{query}"
      </h1>
      
      <div className="max-w-2xl mb-8">
        <SearchBar onSearch={handleSearch} placeholder="Search enterprises..." />
      </div>
      
      {error ? (
        <div className="bg-error-50 text-error-700 p-4 rounded-lg mb-4">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <p className="mb-6 text-gray-600">
            Found {enterprises.length} {enterprises.length === 1 ? 'result' : 'results'}
          </p>
          
          <EnterprisesList enterprises={enterprises} loading={loading} />
          
          {!loading && enterprises.length === 0 && (
            <div className="text-center mt-8">
              <p className="text-lg text-gray-700 mb-4">
                No enterprises found matching "{query}"
              </p>
              <Link
                to="/add-enterprise"
                className="inline-block px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg transition-colors"
              >
                Add an Enterprise
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;