import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, MapPin } from 'lucide-react';
import type { Enterprise } from '../lib/supabase';

interface EnterpriseCardProps {
  enterprise: Enterprise;
}

const EnterpriseCard: React.FC<EnterpriseCardProps> = ({ enterprise }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className={`h-2 ${
        enterprise.category === 'Land Projects' ? 'bg-primary-500' : 
        enterprise.category === 'Capital Sources' ? 'bg-secondary-500' : 
        enterprise.category === 'Open Source Tools' ? 'bg-success-500' : 
        'bg-earth-500'
      }`}></div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 mb-1">{enterprise.name}</h3>
          {enterprise.is_featured && (
            <span className="bg-warning-100 text-warning-700 text-xs px-2 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>
        
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 text-xs rounded-full ${
            enterprise.category === 'Land Projects' ? 'bg-primary-100 text-primary-800' : 
            enterprise.category === 'Capital Sources' ? 'bg-secondary-100 text-secondary-800' : 
            enterprise.category === 'Open Source Tools' ? 'bg-success-100 text-success-700' : 
            'bg-earth-100 text-earth-800'
          }`}>
            {enterprise.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {enterprise.description || 'No description available.'}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {enterprise.subcategories.slice(0, 3).map((subcategory, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
            >
              {subcategory}
            </span>
          ))}
          {enterprise.subcategories.length > 3 && (
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              +{enterprise.subcategories.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex flex-col space-y-2 text-sm text-gray-500 mb-4">
          {enterprise.website && (
            <a
              href={enterprise.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-secondary-600"
            >
              <Globe size={16} className="mr-2" />
              {enterprise.website.replace(/^https?:\/\//, '')}
            </a>
          )}
          
          {enterprise.address && (
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" />
              {enterprise.address}
            </div>
          )}
        </div>
        
        <Link
          to={`/enterprise/${enterprise.id}`}
          className={`inline-block w-full text-center rounded-md px-4 py-2 text-white ${
            enterprise.category === 'Land Projects' ? 'bg-primary-600 hover:bg-primary-700' : 
            enterprise.category === 'Capital Sources' ? 'bg-secondary-600 hover:bg-secondary-700' : 
            enterprise.category === 'Open Source Tools' ? 'bg-success-600 hover:bg-success-700' : 
            'bg-earth-600 hover:bg-earth-700'
          } transition-colors`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EnterpriseCard;