/**
 * @fileoverview Feature Component — Protected Route Guard
 * @module components/features/auth/ProtectedRoute
 * @description Acts as the client-side authentication middleware.
 * Intercepts navigation to private routes and enforces two conditions:
 *  1. A valid Supabase session must exist (via AuthContext).
 *  2. A valid, non-expired JWT must be present in localStorage ('tuto_jwt').
 *
 * If either condition fails, the user is redirected to /loginform.
 * A branded loading screen prevents flash-of-unauthorized-content (FOUC).
 */

import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { verifyToken } from '../../../../lib/jwt';

// ---------------------------------------------------------------------------
// Sub-component: Loading Screen
// ---------------------------------------------------------------------------

/**
 * Branded loading state shown while the JWT verification is in progress.
 * Maintains the 'Academic Editorial' visual language.
 */
const AuthLoadingScreen = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f9fb] gap-6">
    <div className="w-16 h-16 bg-[#002045] rounded-full flex items-center justify-center shadow-lg animate-pulse">
      <span className="material-symbols-outlined text-3xl text-[#cba72f]">
        auto_stories
      </span>
    </div>
    <div className="text-center space-y-1">
      <p className="text-xs font-bold text-[#696C6E] uppercase tracking-widest">
        Verificando acceso
      </p>
      <p className="text-sm text-gray-400">Por favor espera un momento...</p>
    </div>
    {/* Animated progress bar */}
    <div className="w-48 h-0.5 bg-[#e6e8ea] rounded-full overflow-hidden">
      <div className="h-full bg-[#002045] animate-[shimmer_1.5s_ease-in-out_infinite]"
        style={{ width: '60%', animation: 'shimmer 1.5s ease-in-out infinite' }}
      />
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// ProtectedRoute Component
// ---------------------------------------------------------------------------

/**
 * Route guard wrapper component.
 * Wrap any <Route> element that requires authentication.
 *
 * @param {Object}           props
 * @param {React.ReactNode}  props.children — The protected page/component
 * @component
 *
 * @example
 * <Route path="/dashboard" element={<ProtectedRoute><DashboardSwitcher /></ProtectedRoute>} />
 */
const ProtectedRoute = ({ children }) => {
  /**
   * Authentication state from the global context.
   * `user`      → Supabase session user object (null if unauthenticated)
   * `loading`   → true while AuthContext is initializing
   * `jwtToken`  → Signed JWT string managed by AuthContext (single source of truth)
   *               Reading from context instead of localStorage directly eliminates
   *               the double source of truth and ensures re-verification triggers
   *               automatically on token refresh cycles.
   */
  const { user, loading, jwtToken } = useAuth();

  /**
   * Local JWT verification state.
   * null    → check not yet performed
   * true    → token is valid
   * false   → token is absent, expired, or invalid
   * @state {boolean|null} tokenValid
   */
  const [tokenValid, setTokenValid] = useState(null);

  useEffect(() => {
    /**
     * Verification Logic:
     * We perform JWT verification only after AuthContext finishes loading.
     * This prevents premature redirects during the initial session hydration.
     *
     * Source of truth: `jwtToken` from AuthContext (not localStorage directly).
     * This guarantees that ProtectedRoute and AuthContext are always in sync,
     * and that a Supabase token refresh re-triggers this check automatically
     * because jwtToken is listed as a dependency.
     */
    if (loading) return; // Wait for AuthContext to resolve first

    const checkToken = async () => {
      if (!jwtToken) {
        setTokenValid(false);
        return;
      }

      try {
        await verifyToken(jwtToken);
        setTokenValid(true);
      } catch (err) {
        // Token expired or tampered — AuthContext handles cleanup via onAuthStateChange
        console.warn(`[ProtectedRoute] Access denied: ${err.message}`);
        setTokenValid(false);
      }
    };

    checkToken();
  }, [loading, jwtToken]);

  // Phase 1: AuthContext initializing OR JWT check pending
  if (loading || tokenValid === null) {
    return <AuthLoadingScreen />;
  }

  // Phase 2: No valid session or invalid/expired JWT → redirect
  if (!user || !tokenValid) {
    return <Navigate to="/loginform" replace />;
  }

  // Phase 3: All checks passed → render the protected content
  return children;
};

export default ProtectedRoute;
