import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Info } from 'lucide-react';
import { 
  getCategories, 
  getSubcategoriesByCategoryId, 
  createEnterprise,
  type Category, 
  type Subcategory 
} from '../lib/supabase';
import AddressAutofillWrapper from '../components/AddressAutofillWrapper';

interface FormData {
  name: string;
  description: string;
  website: string;
  category: string;
  subcategories: string[];
  address: string;
  has_location: boolean;
}

const AddEnterprise: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { 
    register, 
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting } 
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      description: '',
      website: '',
      category: '',
      subcategories: [],
      address: '',
      has_location: false
    }
  });
  
  const selectedCategory = watch('category');
  const hasLocation = watch('has_location');
  
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
    const fetchSubcategories = async () => {
      if (!selectedCategory) {
        setSubcategories([]);
        return;
      }
      
      const category = categories.find(c => c.name === selectedCategory);
      if (!category) return;
      
      try {
        const data = await getSubcategoriesByCategoryId(category.id);
        setSubcategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchSubcategories();
  }, [selectedCategory, categories]);
  
  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Format the data for Supabase
      const enterprise = {
        name: data.name,
        description: data.description || null,
        website: data.website || null,
        category: data.category,
        subcategories: data.subcategories || [],
        address: data.has_location ? data.address : null,
        latitude: data.has_location && coordinates ? coordinates.lat : null,
        longitude: data.has_location && coordinates ? coordinates.lng : null,
        has_location: data.has_location,
        is_featured: false,
      };
      
      const result = await createEnterprise(enterprise);
      setSuccess(true);
      
      // Redirect to the enterprise detail page after a brief delay
      setTimeout(() => {
        navigate(`/enterprise/${result.id}`);
      }, 2000);
    } catch (err) {
      console.error(err);
      setError('Failed to create enterprise. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setValue('category', category);
    setValue('subcategories', []); // Reset subcategories when category changes
  };

  const handleAddressSelect = (result: any) => {
    if (result.features && result.features[0]) {
      const feature = result.features[0];
      setCoordinates({
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0]
      });
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Your Enterprise</h1>
        
        {success ? (
          <div className="bg-success-50 border border-success-200 text-success-700 p-4 rounded-lg mb-6">
            <p className="font-medium">Enterprise successfully added!</p>
            <p>Redirecting to your enterprise page...</p>
          </div>
        ) : (
          <div className="bg-primary-50 border border-primary-200 text-primary-700 p-4 rounded-lg mb-6">
            <div className="flex">
              <Info size={20} className="mr-2 flex-shrink-0" />
              <p>
                Add your enterprise to the directory to connect with others in the regenerative economy.
                Your submission will be publicly visible in the directory.
              </p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-error-50 border border-error-200 text-error-700 p-4 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Enterprise Name *
            </label>
            <input
              type="text"
              id="name"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
                errors.name ? 'border-error-500' : 'border-gray-300'
              }`}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="mt-1 text-error-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500"
              {...register('description')}
            ></textarea>
          </div>
          
          <div className="mb-6">
            <label htmlFor="website" className="block text-gray-700 font-medium mb-2">
              Website
            </label>
            <input
              type="url"
              id="website"
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500"
              {...register('website', {
                pattern: {
                  value: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/,
                  message: 'Please enter a valid URL'
                }
              })}
            />
            {errors.website && (
              <p className="mt-1 text-error-500 text-sm">{errors.website.message}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
              Category *
            </label>
            <select
              id="category"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
                errors.category ? 'border-error-500' : 'border-gray-300'
              }`}
              {...register('category', { required: 'Category is required' })}
              onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-error-500 text-sm">{errors.category.message}</p>
            )}
          </div>
          
          {selectedCategory && (
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Subcategories
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Controller
                  name="subcategories"
                  control={control}
                  render={({ field }) => (
                    <>
                      {subcategories.map(subcategory => (
                        <label key={subcategory.id} className="flex items-center">
                          <input
                            type="checkbox"
                            value={subcategory.name}
                            checked={field.value.includes(subcategory.name)}
                            onChange={e => {
                              const value = e.target.value;
                              const newValues = e.target.checked
                                ? [...field.value, value]
                                : field.value.filter(v => v !== value);
                              field.onChange(newValues);
                            }}
                            className="w-4 h-4 text-secondary-600 border-gray-300 rounded focus:ring-secondary-500"
                          />
                          <span className="ml-2 text-gray-700">{subcategory.name}</span>
                        </label>
                      ))}
                    </>
                  )}
                />
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="has_location"
                className="w-4 h-4 text-secondary-600 border-gray-300 rounded focus:ring-secondary-500"
                {...register('has_location')}
              />
              <label htmlFor="has_location" className="ml-2 text-gray-700 font-medium">
                This enterprise has a physical location
              </label>
            </div>
            
            {hasLocation && isMounted && (
              <div className="space-y-4 pl-6 border-l-2 border-gray-200">
                <div>
                  <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                    Address
                  </label>
                  <AddressAutofillWrapper
                    accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                    onRetrieve={handleAddressSelect}
                    register={register}
                    hasLocation={hasLocation}
                    errors={errors}
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className={`px-6 py-3 bg-secondary-600 text-white rounded-md font-medium hover:bg-secondary-700 transition-colors ${
                (isSubmitting || loading) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting || loading ? 'Submitting...' : 'Add Enterprise'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEnterprise;