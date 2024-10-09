import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); 

  return isAuthenticated ? children : <Navigate to="/prihlasenie" />;
};

export default PrivateRoutes;
