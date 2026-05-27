import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (storedUser && token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const expiry = payload.exp * 1000;
          const now = Date.now();
          
          if (now > expiry) {
            logout();
          } else {
            setUser(JSON.parse(storedUser));
          }
        } catch (e) {
          logout();
        }
      }
      setLoading(false);
    };

    checkToken();
  }, []);

  const login = (userData, token) => {
    const normalizedUser = {
      ...userData,
      name: userData.nombreCompleto || userData.name,
      role: userData.rol || userData.role,
      id: userData.id
    };
    
    localStorage.setItem('user', JSON.stringify(normalizedUser));
    localStorage.setItem('token', token);
    setUser(normalizedUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    if (window.location.pathname !== '/loginform') {
      window.location.href = '/loginform';
    }
  };

  const renewSession = async () => {
    try {
      const { token, ...userData } = await import('../services/api').then(m => m.api.refresh());
      login(userData, token);
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
