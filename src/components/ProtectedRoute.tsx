import { useEffect } from 'react';
import { Navigate, Outlet, useNavigation } from 'react-router';
import { localStorageService } from '@infrastructure/services/localStorage';
import { CircularProgress } from '@mui/material';

const ProtectedRoute = () => {
  const navigation = useNavigation();

  const token = localStorageService.getToken();

  useEffect(() => {
    import('@components/PreloadModules');
  }, []);

  return token
    ? (
      <>
        {navigation.state === 'loading' && <CircularProgress />}
        <Outlet />
      </>
    )
    : <Navigate to="/" replace />;
};

export default ProtectedRoute;
