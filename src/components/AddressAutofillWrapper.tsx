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
  const [AddressAutofill, setAddressAutofill] = useState<any>(null);

  useEffect(() => {
    // Only import the component when we're in the browser
    if (typeof window !== 'undefined') {
      import('@mapbox/search-js-react')
        .then(module => {
          setAddressAutofill(() => module.AddressAutofill);
        })
        .catch(error => {
          console.error('Error loading AddressAutofill:', error);
        });
    }
  }, []);

  if (!AddressAutofill) {
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
      options={{
        language: 'en',
        country: 'US'
      }}
    >
      <input
        type="text"
        id="address"
        placeholder="Start typing an address..."
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
          errors.address ? 'border-error-500' : 'border-gray-300'
        }`}
        {...register('address', {
          required: hasLocation ? 'Address is required when adding a location' : false
        })}
      />
      {errors.address && (
        <p className="mt-1 text-error-500 text-sm">{errors.address.message}</p>
      )}
    </AddressAutofill>
  );
};

export default AddressAutofillWrapper;