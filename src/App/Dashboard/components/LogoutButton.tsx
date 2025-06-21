import { Button } from '@mui/material';
import { SignOutIcon } from '@phosphor-icons/react';

import useLogout from '../hooks/useLogout';

const LogoutButton = () => {
  const { logout } = useLogout();

  return (
    <Button
      variant="contained"
      endIcon={<SignOutIcon size={20} weight="bold" data-testid="signout-icon" />}
      sx={{ position: 'absolute', right: 20, bgcolor: 'primary.dark' }}
      onClick={logout}
    >
      Sair
    </Button>
  );
};

export default LogoutButton;
