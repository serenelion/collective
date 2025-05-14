import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderTree, BarChart3, GlassWater, Users, ChevronRight } from 'lucide-react';
import { getFeaturedEnterprises, type Enterprise } from '../lib/supabase';
import EnterpriseCard from '../components/EnterpriseCard';
import SearchBar from '../components/SearchBar';

const Home: React.FC = () => {
  const [featuredEnterprises, setFeaturedEnterprises] = useState<Enterprise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedEnterprises = async () => {
      try {
        setLoading(true);
        const data = await getFeaturedEnterprises();
        setFeaturedEnterprises(data);
      } catch (err) {
        setError('Failed to load featured enterprises');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedEnterprises();
  }, []);

  const handleSearch = (query: string) => {
    if (query) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-800 to-primary-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Discover Regenerative Enterprises
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Connect with ecological integrity.
            </p>
            
            <div className="max-w-xl mx-auto mb-8">
              <SearchBar onSearch={handleSearch} placeholder="Search for enterprises, projects, or tools..." />
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/add-enterprise"
                className="px-6 py-3 bg-secondary-600 hover:bg-secondary-700 rounded-lg font-medium transition-colors"
              >
                Add Your Enterprise
              </Link>
              <Link
                to="/directory/land-projects"
                className="px-6 py-3 bg-white text-primary-800 hover:bg-primary-50 rounded-lg font-medium transition-colors"
              >
                Explore Directory
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Explore by Category
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              to="/directory/land-projects"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                  <FolderTree size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                  Land Projects
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Explore regenerative farms, food forests, permaculture sites, and other land-based projects.
              </p>
              <div className="flex items-center text-primary-600 font-medium">
                View Directory
                <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            
            <Link 
              to="/directory/capital-sources"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-secondary-100 text-secondary-600 mr-4">
                  <BarChart3 size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-secondary-600 transition-colors">
                  Capital Sources
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Find impact investment funds, grantmaking organizations, and regenerative financial institutions.
              </p>
              <div className="flex items-center text-secondary-600 font-medium">
                View Directory
                <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            
            <Link 
              to="/directory/open-source-tools"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-success-100 text-success-700 mr-4">
                  <GlassWater size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-success-700 transition-colors">
                  Open Source Tools
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Discover digital tools for mapping, monitoring, and managing regenerative projects.
              </p>
              <div className="flex items-center text-success-700 font-medium">
                View Directory
                <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            
            <Link 
              to="/directory/network-organizers"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-earth-100 text-earth-600 mr-4">
                  <Users size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-earth-600 transition-colors">
                  Network Organizers
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Connect with organizations building communities, networks, and movements for regeneration.
              </p>
              <div className="flex items-center text-earth-600 font-medium">
                View Directory
                <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Enterprises Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Featured Enterprises
          </h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-2 bg-gray-200"></div>
                  <div className="p-5">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
                    <div className="flex gap-1 mb-4">
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center p-8 bg-error-50 text-error-700 rounded-lg">
              <p>{error}</p>
            </div>
          ) : featuredEnterprises.length === 0 ? (
            <div className="text-center p-8">
              <p className="text-gray-600">No featured enterprises available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEnterprises.map(enterprise => (
                <EnterpriseCard key={enterprise.id} enterprise={enterprise} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link 
              to="/directory/land-projects" 
              className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              Explore All Enterprises
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-earth-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-earth-800">
            Join the Regenerative Ecosystem
          </h2>
          <p className="text-xl mb-8 text-earth-700 max-w-2xl mx-auto">
            Are you working on a regenerative project? Add your enterprise to our directory 
            and connect with a global community of changemakers.
          </p>
          <Link 
            to="/add-enterprise" 
            className="inline-block px-8 py-4 bg-earth-600 hover:bg-earth-700 text-white rounded-lg font-medium text-lg transition-colors"
          >
            Add Your Enterprise
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;