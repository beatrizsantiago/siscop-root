import { localStorageService } from '@infrastructure/services/localStorage';
import { useNavigate } from 'react-router';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorageService.clearToken();
    navigate('/', { replace: true });
  };

  return { logout };
};

export default useLogout;
