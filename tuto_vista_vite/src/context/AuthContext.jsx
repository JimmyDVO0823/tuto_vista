/**
 * @fileoverview Core Layer - Authentication Context
 * @module context/AuthContext
 * @description Orchestrates the global authentication state of the application.
 * Adheres to the 'Academic Editorial' philosophy by providing a seamless, 
 * high-prestige authentication flow that filters and maps raw Supabase 
 * session data into a refined 'User' domain object.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Context object for authentication state.
 * @type {React.Context<{user: Object|null, loading: boolean}>}
 */
const AuthContext = createContext({});

/**
 * Custom hook to access the authentication context.
 * Provides a streamlined interface for consumption within the component tree.
 * @returns {{user: Object|null, loading: boolean}} The current auth state.
 */
export const useAuth = () => useContext(AuthContext);

/**
 * Authentication Provider Component.
 * Encapsulates the logic for session persistence and reactive profile mapping.
 * 
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Child components to be wrapped.
 * @component
 */
export const AuthProvider = ({ children }) => {
  /**
   * The current authenticated user object, enriched with metadata.
   * @state {Object|null} user
   */
  const [user, setUser] = useState(null);

  /**
   * Indicates whether the initial session check is in progress.
   * Crucial for preventing 'flash of unauthenticated content'.
   * @state {boolean} loading
   */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Logic Rationale:
     * We perform an initial session check on mount to restore user state 
     * from local storage. The `setUser` operation performs a selective mapping 
     * where 'user_metadata' takes precedence over system roles to ensure 
     * the 'Tutor' or 'Estudiante' identity is preserved.
     */
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          ...session.user,
          name: session.user.user_metadata?.nombre_completo || session.user.email,
          role: session.user.user_metadata?.rol || 'estudiante',
          email: session.user.email,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    /**
     * Subscription Logic:
     * Listens for real-time auth events (e.g., LOGIN, LOGOUT).
     * Necessary for cross-tab synchronization and immediate UI reaction 
     * to state changes.
     */
    // Listen for auth state changes (login, logout, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          ...session.user,
          name: session.user.user_metadata?.nombre_completo || session.user.email,
          role: session.user.user_metadata?.rol || 'estudiante',
          email: session.user.email,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
