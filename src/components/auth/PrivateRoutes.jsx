import { Navigate } from 'react-router-dom';
import { isTokenExpired } from '../utilities/Token';
import { useEffect, useState } from 'react';
import Loading from '../utilities/Loading';

const PrivateRoutes = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const tokenExpired = isTokenExpired();
    
    if (tokenExpired) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (isAuthenticated === null) {
    return <Loading />
  }

  return isAuthenticated ? children : <Navigate to="/prihlasenie" />;
};

export default PrivateRoutes;
