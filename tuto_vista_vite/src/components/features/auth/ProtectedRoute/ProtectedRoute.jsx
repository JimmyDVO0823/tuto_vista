import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';

/**
 * Route guard component.
 * Verifies if a user is authenticated via AuthContext.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f9fb]">
        <div className="animate-pulse text-primary font-bold">Verificando acceso...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/loginform" replace />;
  }

  return children;
};

export default ProtectedRoute;
