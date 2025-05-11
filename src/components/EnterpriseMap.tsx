import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Enterprise } from '../lib/supabase';

interface EnterpriseMapProps {
  enterprises: Enterprise[];
}

const EnterpriseMap: React.FC<EnterpriseMapProps> = ({ enterprises }) => {
  // Filter enterprises with valid locations
  const enterprisesWithLocation = enterprises.filter(
    enterprise => enterprise.latitude && enterprise.longitude && enterprise.has_location
  );

  // If no enterprises have location data, show a message
  if (enterprisesWithLocation.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-600">No location data available for the selected enterprises.</p>
      </div>
    );
  }

  // Calculate the center of the map based on the average of all coordinates
  const initialCenter = enterprisesWithLocation.reduce(
    (acc, enterprise) => {
      acc.lat += enterprise.latitude || 0;
      acc.lng += enterprise.longitude || 0;
      return acc;
    },
    { lat: 0, lng: 0 }
  );
  
  initialCenter.lat /= enterprisesWithLocation.length;
  initialCenter.lng /= enterprisesWithLocation.length;

  return (
    <div className="h-[500px] rounded-lg overflow-hidden shadow-md">
      <MapContainer 
        center={[initialCenter.lat, initialCenter.lng]} 
        zoom={5} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {enterprisesWithLocation.map((enterprise) => (
          <Marker 
            key={enterprise.id} 
            position={[enterprise.latitude || 0, enterprise.longitude || 0]}
          >
            <Popup>
              <div className="max-w-xs">
                <h3 className="font-bold text-base mb-1">{enterprise.name}</h3>
                {enterprise.location_name && (
                  <p className="text-sm mb-2">{enterprise.location_name}</p>
                )}
                <p className="text-xs mb-2 line-clamp-3">{enterprise.description}</p>
                <a 
                  href={`/enterprise/${enterprise.id}`} 
                  className="text-xs text-secondary-600 hover:text-secondary-800 font-medium"
                >
                  View Details
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default EnterpriseMap;