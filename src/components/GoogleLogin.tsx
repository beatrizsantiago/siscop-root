import { useState } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { firebaseAuth } from '@infrastructure/firebase/auth';
import GoogleIcon from '@assets/icons/google.png';
import LoginUseCase from '@usecases/auth/loginWithGoogle';

const GoogleLogin = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const loginUseCase = new LoginUseCase(firebaseAuth);
      await loginUseCase.execute();
      navigate('/dashboard', { replace: true });
    } catch {
      toast.error('Erro ao fazer login. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginY={2}>
        <Divider sx={{ minWidth: { xs: 80, md: 100 } }} />
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          Ou entre com
        </Typography>
        <Divider sx={{ minWidth: { xs: 80, md: 100 } }} />
      </Box>
    
      <Button
        startIcon={<img src={GoogleIcon} alt="Google Icon" width={18} height={18} />}
        variant="outlined"
        onClick={handleLogin}
        disabled={loading}
        fullWidth
      >
        Entrar com Google
      </Button>
    </>
  );
};

export default GoogleLogin;
