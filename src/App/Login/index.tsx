import {
  Box, Paper, Typography, Input, InputAdornment,
  Button, Link, useTheme, useMediaQuery,
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { PasswordIcon, UserCircleIcon } from '@phosphor-icons/react';
import BrownLogo from '@assets/icons/brown_logo.png';
import BarnImage from '@assets/barn.png';
import WindMildImage from '@assets/wind_mild.png';

const Login = () => {
  const { breakpoints } = useTheme();
  const isBigScreen = useMediaQuery(breakpoints.up('md'))

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width="100%"
      padding={2}
    >
      <Paper
        elevation={0}
        sx={{
          width: { xs: '100%', sm: 400 },
          padding: { xs: 3, sm: 5 },
          borderRadius: 5,
          zIndex: 1,
        }}
      >
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
                <UserCircleIcon size={24} />
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
      </Paper>

      {isBigScreen && (
        <>
          <img
            src={BarnImage}
            alt="Seleiro"
            style={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              width: '30%',
              zIndex: 0,
            }}
          />
          <img
            src={WindMildImage}
            alt="Moinho"
            style={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              width: '30%',
              zIndex: 0,
            }}
          />
        </>
      )}
    </Box>
  );
}

export default Login;
