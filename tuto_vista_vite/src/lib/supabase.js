/**
 * @fileoverview Infrastructure Layer - Supabase Client Configuration
 * @module lib/supabase
 * @description Established as the primary gateway to the Supabase BaaS. 
 * This module orchestrates the connection to the database, authentication, 
 * and storage services using Environment Variable tokens.
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * The initialized Supabase client instance.
 * Provides the interface for CRUD operations and Auth management.
 * @type {import('@supabase/supabase-js').SupabaseClient}
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
