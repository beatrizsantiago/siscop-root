import { useState } from 'react';
import {
  Box, Typography, Input, InputAdornment, Button, Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { PasswordIcon, UserCircleIcon, EnvelopeIcon } from '@phosphor-icons/react';
import { firebaseAuth } from '@infrastructure/firebase/auth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import RegisterUseCase from '@usecases/auth/register';
import BrownLogo from '@assets/icons/brown_logo.png';
import AuthContainer from '@components/AuthContainer';
import GoogleLogin from '@components/GoogleLogin';

const Registration = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      const registerUseCase = new RegisterUseCase(firebaseAuth);
      await registerUseCase.execute(data);
      navigate('/dashboard', { replace: true });
    } catch {
      toast.error('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContainer>
      <Box display="flex" justifyContent="center" marginBottom={1}>
        <img src={BrownLogo} alt="logo" width={50} />
      </Box>
      <Typography variant="h6" lineHeight={1.2} align="center" fontWeight={700} color="primary">
        Crie sua conta
      </Typography>
      <Typography variant="body2" marginTop={1} align="center" color="text.secondary" marginBottom={3}>
        Tenha acesso ao sistema e aproveite todos os recursos disponíveis.
      </Typography>

      <form onSubmit={onSubmit}>
        <Input
          name="name"
          placeholder="Nome"
          inputProps={{ minLength: 3 }}
          fullWidth
          required
          startAdornment={(
            <InputAdornment position="start">
              <UserCircleIcon size={24} />
            </InputAdornment>
          )}
        />
        <Input
          name="email"
          placeholder="E-mail"
          type="email"
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
          inputProps={{ minLength: 6 }}
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
          sx={{ mt: 3 }}
          type="submit"
          loading={loading}
          loadingPosition="start"
        >
          Cadastrar
        </Button>
      </form>

      <GoogleLogin />

      <Box display="flex" alignItems="center" justifyContent="center" fontSize="0.875rem" marginTop={2}>
        <Typography marginRight={0.5} variant="body2" color="text.secondary" fontWeight={600}>
          Já possui uma conta?
        </Typography>
        <Link component={RouterLink} to="/" color="primary" underline="hover">
          <b>
            Faça login
          </b>
        </Link>
      </Box>
    </AuthContainer>
  );
}

export default Registration;
