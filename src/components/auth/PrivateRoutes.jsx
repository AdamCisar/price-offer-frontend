import { Navigate, useLocation } from 'react-router-dom';
import { isTokenExpired } from '../utilities/Token';
import { useEffect, useState } from 'react';
import Loading from '../utilities/Loading';
import { checkExpiringToken } from './RefreshToken';


const PrivateRoutes = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const tokenExpired = isTokenExpired();

    if (tokenExpired) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }

    checkExpiringToken(); 
  }, [location.pathname]);

  if (isAuthenticated === null) {
    return <Loading />
  }

  return isAuthenticated ? children : <Navigate to="/prihlasenie" />;
};

export default PrivateRoutes;
