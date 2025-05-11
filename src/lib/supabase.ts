import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for the entire app
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Types for our data
export type Category = {
  id: number;
  name: string;
};

export type Subcategory = {
  id: number;
  category_id: number;
  name: string;
};

export type Enterprise = {
  id: string;
  is_featured: boolean;
  name: string;
  description: string | null;
  website: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  has_location: boolean;
  category: string;
  subcategories: string[];
  created_at: string;
  updated_at: string;
};

// API functions for categories
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) throw error;
  return data || [];
}

// API functions for subcategories
export async function getSubcategoriesByCategoryId(categoryId: number): Promise<Subcategory[]> {
  const { data, error } = await supabase
    .from('subcategories')
    .select('*')
    .eq('category_id', categoryId);
  if (error) throw error;
  return data || [];
}

// API functions for enterprises
export async function getEnterprises(category?: string, subcategories?: string[]): Promise<Enterprise[]> {
  let query = supabase.from('enterprises').select('*');
  
  if (category) {
    query = query.eq('category', category);
  }
  
  if (subcategories && subcategories.length > 0) {
    // Filter by any of the selected subcategories
    query = query.contains('subcategories', subcategories);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getFeaturedEnterprises(): Promise<Enterprise[]> {
  const { data, error } = await supabase
    .from('enterprises')
    .select('*')
    .eq('is_featured', true)
    .limit(6);
  if (error) throw error;
  return data || [];
}

export async function getEnterprise(id: string): Promise<Enterprise | null> {
  const { data, error } = await supabase
    .from('enterprises')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function createEnterprise(enterprise: Omit<Enterprise, 'id' | 'created_at' | 'updated_at'>): Promise<Enterprise> {
  const { data, error } = await supabase
    .from('enterprises')
    .insert([enterprise])
    .select()
    .single();
  if (error) throw error;
  return data;
}