import React, { useEffect, useState } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface AddressAutofillWrapperProps {
  accessToken: string;
  onRetrieve: (result: any) => void;
  register: UseFormRegister<any>;
  hasLocation: boolean;
  errors: FieldErrors<any>;
}

const AddressAutofillWrapper: React.FC<AddressAutofillWrapperProps> = ({
  accessToken,
  onRetrieve,
  register,
  hasLocation,
  errors
}) => {
  const [isClient, setIsClient] = useState(false);
  const [AddressAutofill, setAddressAutofill] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    const loadAddressAutofill = async () => {
      if (!isClient) return;
      
      try {
        const { AddressAutofill: AddressAutofillComponent } = await import('@mapbox/search-js-react');
        setAddressAutofill(() => AddressAutofillComponent);
      } catch (error) {
        console.error('Error loading AddressAutofill:', error);
      }
    };

    loadAddressAutofill();
  }, [isClient]);

  if (!isClient || !AddressAutofill) {
    return (
      <input
        type="text"
        id="address"
        placeholder="Loading address search..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500"
        disabled
      />
    );
  }

  return (
    <AddressAutofill
      accessToken={accessToken}
      onRetrieve={onRetrieve}
    >
      <input
        type="text"
        id="address"
        placeholder="Start typing an address..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500"
        {...register('address', {
          required: hasLocation ? 'Address is required when adding a location' : false
        })}
      />
    </AddressAutofill>
  );
};

export default AddressAutofillWrapper;