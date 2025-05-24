import { useState } from 'react';
import {
  Box, Typography, Input, InputAdornment, Button, Link,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router';
import { PasswordIcon, EnvelopeIcon } from '@phosphor-icons/react';
import { firebaseAuth } from '@infrastructure/firebase/auth';
import { toast } from 'react-toastify';
import LoginUseCase from '@usecases/auth/login';
import BrownLogo from '@assets/icons/brown_logo.png';
import AuthContainer from '@components/AuthContainer';

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      const loginUseCase = new LoginUseCase(firebaseAuth);
      await loginUseCase.execute(data);
      navigate('/dashboard');
    } catch {
      toast.error('Erro ao fazer login. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContainer>
      <Box display="flex" justifyContent="center" marginBottom={1}>
        <img src={BrownLogo} alt="logo" width={50} />
      </Box>
      <Typography variant="h6" lineHeight={1.2} align="center" fontWeight={700} color="secondary">
        Seja bem-vindo(a)!
      </Typography>
      <Typography variant="body2" marginTop={1} align="center" color="text.secondary">
        Para acessar o sistema, faça login com seu usuário e senha.
      </Typography>

      <form onSubmit={onSubmit}>
        <Input
          name="email"
          placeholder="E-mail"
          type="email"
          color="secondary"
          fullWidth
          required
          startAdornment={(
            <InputAdornment position="start">
              <EnvelopeIcon size={24} />
            </InputAdornment>
          )}
          sx={{ my: 3 }}
        />
        <Input
          name="password"
          placeholder="Senha"
          type="password"
          color="secondary"
          fullWidth
          required
          startAdornment={(
            <InputAdornment position="start">
              <PasswordIcon size={24} />
            </InputAdornment>
          )}
        />

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ mt: 3 }}
          type="submit"
          loading={loading}
          loadingPosition="start"
        >
          Entrar
        </Button>

        <Box display="flex" alignItems="center" justifyContent="center" fontSize="0.875rem" marginTop={2}>
          <Typography marginRight={0.5} variant="body2" color="text.secondary" fontWeight={600}>
            Não possui uma conta?
          </Typography>
          <Link component={RouterLink} to="/cadastro" color="secondary" underline="hover">
            <b>
              Cadastre-se
            </b>
          </Link>
        </Box>
      </form>
    </AuthContainer>
  );
}

export default Login;
