import React from 'react';
import EnterpriseCard from './EnterpriseCard';
import type { Enterprise } from '../lib/supabase';

interface EnterprisesListProps {
  enterprises: Enterprise[];
  loading: boolean;
}

const EnterprisesList: React.FC<EnterprisesListProps> = ({ enterprises, loading }) => {
  if (loading) {
    return (
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
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (enterprises.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-medium text-gray-700 mb-2">No enterprises found</h3>
        <p className="text-gray-500">
          Try adjusting your filters or search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {enterprises.map(enterprise => (
        <EnterpriseCard key={enterprise.id} enterprise={enterprise} />
      ))}
    </div>
  );
};

export default EnterprisesList;