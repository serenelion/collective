export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      enterprises: {
        Row: {
          id: string
          is_featured: boolean
          name: string
          description: string | null
          website: string | null
          address: string | null
          latitude: number | null
          longitude: number | null
          has_location: boolean
          category: string
          subcategories: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          is_featured?: boolean
          name: string
          description?: string | null
          website?: string | null
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          has_location?: boolean
          category: string
          subcategories: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          is_featured?: boolean
          name?: string
          description?: string | null
          website?: string | null
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          has_location?: boolean
          category?: string
          subcategories?: string[]
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      subcategories: {
        Row: {
          id: number
          category_id: number
          name: string
        }
        Insert: {
          id?: number
          category_id: number
          name: string
        }
        Update: {
          id?: number
          category_id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}