import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Globe, MapPin, Calendar, ArrowLeft } from 'lucide-react';
import { getEnterprise, type Enterprise } from '../lib/supabase';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const EnterpriseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [enterprise, setEnterprise] = useState<Enterprise | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnterprise = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getEnterprise(id);
        setEnterprise(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load enterprise details');
      } finally {
        setLoading(false);
      }
    };

    fetchEnterprise();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
          <div className="flex gap-2 mb-6">
            <div className="h-8 bg-gray-200 rounded w-24"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
        </div>
      </div>
    );
  }

  if (error || !enterprise) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-error-600 mb-4">{error || 'Enterprise not found'}</p>
          <Link 
            to="/"
            className="inline-block px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-md"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(enterprise.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Generate the back URL based on the category
  const getCategorySlug = (category: string) => {
    return category.toLowerCase().replace(/\s+/g, '-');
  };
  
  const backUrl = `/directory/${getCategorySlug(enterprise.category)}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to={backUrl}
          className="inline-flex items-center text-secondary-600 hover:text-secondary-800 mb-6"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to {enterprise.category}
        </Link>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className={`h-2 ${
            enterprise.category === 'Land Projects' ? 'bg-primary-500' : 
            enterprise.category === 'Capital Sources' ? 'bg-secondary-500' : 
            enterprise.category === 'Open Source Tools' ? 'bg-success-500' : 
            'bg-earth-500'
          }`}></div>
          
          <div className="p-6">
            <div className="flex flex-wrap justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{enterprise.name}</h1>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar size={16} className="mr-1" />
                  Added on {formattedDate}
                </div>
              </div>
              
              {enterprise.is_featured && (
                <span className="bg-warning-100 text-warning-700 px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
            </div>
            
            <div className="mb-6">
              <span className={`inline-block px-3 py-1 text-sm rounded-full ${
                enterprise.category === 'Land Projects' ? 'bg-primary-100 text-primary-800' : 
                enterprise.category === 'Capital Sources' ? 'bg-secondary-100 text-secondary-800' : 
                enterprise.category === 'Open Source Tools' ? 'bg-success-100 text-success-700' : 
                'bg-earth-100 text-earth-800'
              }`}>
                {enterprise.category}
              </span>
            </div>
            
            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed">
                {enterprise.description || 'No description available.'}
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Subcategories</h3>
              <div className="flex flex-wrap gap-2">
                {enterprise.subcategories.map((subcategory, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {subcategory}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Contact Information</h3>
              <div className="space-y-2">
                {enterprise.website && (
                  <a
                    href={enterprise.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-secondary-600 hover:text-secondary-800"
                  >
                    <Globe size={18} className="mr-2" />
                    {enterprise.website}
                  </a>
                )}
                
                {enterprise.address && (
                  <div className="flex items-center text-gray-700">
                    <MapPin size={18} className="mr-2" />
                    {enterprise.address}
                  </div>
                )}
              </div>
            </div>
            
            {enterprise.has_location && enterprise.latitude && enterprise.longitude && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Location</h3>
                <div className="h-64 rounded-lg overflow-hidden shadow-sm">
                  <MapContainer 
                    center={[enterprise.latitude, enterprise.longitude]} 
                    zoom={13} 
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[enterprise.latitude, enterprise.longitude]} />
                  </MapContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseDetail;