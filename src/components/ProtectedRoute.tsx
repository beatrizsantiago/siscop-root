import { Navigate, Outlet } from 'react-router';
import { localStorageService } from '@infrastructure/services/localStorage';

const ProtectedRoute = () => {
  const token = localStorageService.getToken();
  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
