import React, { useEffect, useState } from 'react';
import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';

interface AddressAutofillWrapperProps {
  accessToken: string;
  onRetrieve: (result: any) => void;
  register: UseFormRegister<any>;
  hasLocation: boolean;
  errors: FieldErrors<any>;
  setValue?: UseFormSetValue<any>;
}

const AddressAutofillWrapper: React.FC<AddressAutofillWrapperProps> = ({
  accessToken,
  onRetrieve,
  register,
  hasLocation,
  errors,
  setValue
}) => {
  const [addressInput, setAddressInput] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Function to fetch address suggestions directly from Mapbox API
  const fetchAddressSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`;
const url = `${endpoint}?access_token=${accessToken}&types=address,country,region,postcode,place&limit=5`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.features) {
        setSuggestions(data.features);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle address selection from suggestions
  const handleSelectAddress = (feature: any) => {
    const address = feature.place_name;
    setAddressInput(address);
    setSuggestions([]);
    setShowSuggestions(false);
    
    // Update the form value if setValue is provided
    if (setValue) {
      setValue('address', address);
    }
    
    // Create a result object similar to what the Mapbox component would return
    const result = {
      features: [feature]
    };
    
    onRetrieve(result);
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <input
        type="text"
        id="address"
        placeholder="Enter an address..."
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
          errors.address ? 'border-error-500' : 'border-gray-300'
        }`}
        value={addressInput}
        onChange={(e) => {
          const value = e.target.value;
          setAddressInput(value);
          // Update the form value if setValue is provided
          if (setValue) {
            setValue('address', value);
          }
          fetchAddressSuggestions(value);
        }}
        onFocus={() => {
          setIsFocused(true);
          if (addressInput.length >= 3) {
            setShowSuggestions(true);
          }
        }}
        onBlur={() => {
          setIsFocused(false);
          // Delay hiding suggestions to allow for clicks
          setTimeout(() => {
            if (!isFocused) {
              setShowSuggestions(false);
            }
          }, 200);
        }}
        name="address"
        ref={(e) => {
          // Manually register the input with react-hook-form
          const registerRef = register('address', {
            required: hasLocation ? 'Address is required when adding a location' : false
          }).ref;
          // Pass the ref to react-hook-form
          if (registerRef) registerRef(e);
        }}
      />
      
      {isLoading && (
        <div className="absolute right-3 top-3">
          <div className="animate-spin h-4 w-4 border-2 border-secondary-500 rounded-full border-t-transparent"></div>
        </div>
      )}
      
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white mt-1 border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((feature) => (
            <li 
              key={feature.id} 
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectAddress(feature)}
            >
              {feature.place_name}
            </li>
          ))}
        </ul>
      )}
      
      {errors.address && (
        <p className="mt-1 text-error-500 text-sm">{errors.address.message?.toString()}</p>
      )}
    </div>
  );
};

export default AddressAutofillWrapper;
