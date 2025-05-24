import {
  Box, Typography, Input, InputAdornment, Button, Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { PasswordIcon, EnvelopeIcon } from '@phosphor-icons/react';
import BrownLogo from '@assets/icons/brown_logo.png';
import AuthContainer from '@components/AuthContainer';

const Login = () => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
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
