import { useLocation, useNavigate } from 'react-router';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import WhiteLogo from '@assets/icons/white_logo.png';

import { NAVBAR_SIZE } from '../utils/sizes';
import InlineMenu from './InlineMenu';
import LogoutButton from './LogoutButton';
import BurgerMenu from './BurgerMenu';
import NotificationButton from './NotificationButton';

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { breakpoints } = useTheme();
  const isBigScreen = useMediaQuery(breakpoints.up('md'))

  const hideMenu = pathname === '/dashboard';

  const currentComponent = () => {
    if(hideMenu) {
      return (
        <Box display="flex" alignItems="center" gap={2}>
          <NotificationButton />
          <LogoutButton />
        </Box>
      );
    }

    if (isBigScreen) {
      return (
        <>
          <InlineMenu />
          <Box display="flex" alignItems="center" gap={2}>
            <NotificationButton />
            <LogoutButton />
          </Box>
        </>
      );
    } 

    return (
      <Box display="flex" alignItems="center" gap={2}>
        <NotificationButton />
        <BurgerMenu />
      </Box>
    );
  };

  return (
    <Box
      width="100%"
      height={NAVBAR_SIZE}
      bgcolor="primary.main"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="fixed"
      paddingX={2}
      zIndex={1000}
    >
      <Box
        onClick={() => navigate('/dashboard')}
        sx={{ cursor: 'pointer' }}
      >
        <img
          src={WhiteLogo}
          alt="logo"
          width={40}
        />
      </Box>

      {currentComponent()}
    </Box>
  );
}

export default Navbar;
