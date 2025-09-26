// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/check-auth`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        setIsAuthenticated(data.isAuthenticated);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;