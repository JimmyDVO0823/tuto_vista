/**
 * @fileoverview Core Layer - Authentication Context
 * @module context/AuthContext
 * @description Orchestrates the global authentication state of the application.
 * Adheres to the 'Academic Editorial' philosophy by providing a seamless, 
 * high-prestige authentication flow that filters and maps raw Supabase 
 * session data into a refined 'User' domain object.
 *
 * JWT Integration (added):
 * After each successful Supabase session, a custom HS256 JWT is signed using
 * `signToken` from lib/jwt. The token carries { id, rol, email } and has a
 * 24-hour expiration. It is persisted in localStorage under the key 'tuto_jwt'
 * and exposed via context as `jwtToken` for consumption by ProtectedRoute and
 * other consumers. On sign-out, the token is removed automatically.
 */

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { signToken, JWT_STORAGE_KEY } from '../lib/jwt';

/**
 * Context object for authentication state.
 * @type {React.Context<{user: Object|null, loading: boolean, jwtToken: string|null}>}
 */
const AuthContext = createContext({});

/**
 * Custom hook to access the authentication context.
 * Provides a streamlined interface for consumption within the component tree.
 * @returns {{user: Object|null, loading: boolean, jwtToken: string|null}}
 */
export const useAuth = () => useContext(AuthContext);

/**
 * Authentication Provider Component.
 * Encapsulates the logic for session persistence, reactive profile mapping,
 * and JWT lifecycle management.
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

  /**
   * The signed JWT string for the current session.
   * Null when the user is unauthenticated or token signing fails.
   * @state {string|null} jwtToken
   */
  const [jwtToken, setJwtToken] = useState(null);

  useEffect(() => {
    /**
     * Unified Session Handler.
     * Logic Rationale:
     * Extracted into a named async function to share behavior between the
     * initial `getSession()` call and the `onAuthStateChange` listener.
     * This avoids code duplication and ensures JWT lifecycle is always consistent.
     *
     * On session present:
     *  1. Map raw Supabase user → enriched User domain object.
     *  2. Sign a custom JWT with the required payload shape (id, rol, email).
     *  3. Persist token to localStorage and expose via state.
     *
     * On session absent:
     *  1. Clear user state.
     *  2. Remove JWT from localStorage and clear state.
     *
     * @param {import('@supabase/supabase-js').Session|null} session
     */
    const handleSession = async (session) => {
      if (session?.user) {
        // Map Supabase user to our domain User object
        const mappedUser = {
          ...session.user,
          name: session.user.user_metadata?.nombre_completo || session.user.email,
          role: session.user.user_metadata?.rol || 'estudiante',
          email: session.user.email,
        };
        setUser(mappedUser);

        // Sign our custom JWT with the required payload shape
        try {
          const token = await signToken({
            id: session.user.id,
            rol: session.user.user_metadata?.rol || 'estudiante',
            email: session.user.email,
          });
          localStorage.setItem(JWT_STORAGE_KEY, token);
          setJwtToken(token);
        } catch (err) {
          console.error('[AuthContext] JWT signing failed:', err);
          // Session remains valid — JWT failure is non-blocking for UX
        }
      } else {
        // Clear all auth state on sign-out or expired session
        setUser(null);
        localStorage.removeItem(JWT_STORAGE_KEY);
        setJwtToken(null);
      }

      setLoading(false);
    };

    /**
     * Initial Session Check:
     * Restores user state from the persisted Supabase session in localStorage.
     * Runs once on mount.
     */
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    /**
     * Subscription Logic:
     * Listens for real-time auth events (LOGIN, LOGOUT, TOKEN_REFRESHED).
     * Necessary for cross-tab synchronization and immediate UI reaction
     * to state changes. Also handles Supabase token refresh cycles,
     * re-signing our custom JWT whenever the session is refreshed.
     */
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, jwtToken }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
