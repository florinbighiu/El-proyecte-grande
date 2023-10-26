import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  const authToken = localStorage.getItem('authToken');

  return authToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
