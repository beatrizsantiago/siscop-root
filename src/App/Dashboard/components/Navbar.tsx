import { useLocation, useNavigate } from 'react-router';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import WhiteLogo from '@assets/icons/white_logo.png';

import { NAVBAR_SIZE } from '../utils/sizes';
import InlineMenu from './InlineMenu';
import LogoutButton from './LogoutButton';
import BurgerMenu from './BurgerMenu';

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { breakpoints } = useTheme();
  const isBigScreen = useMediaQuery(breakpoints.up('md'))

  const hideMenu = pathname === '/dashboard';

  const currentComponent = () => {
    if(hideMenu) {
      return <LogoutButton />
    }

    if (isBigScreen) {
      return (
        <>
          <InlineMenu />
          <LogoutButton />
        </>
      );
    } 

    return <BurgerMenu />;
  };

  return (
    <Box
      width="100%"
      height={NAVBAR_SIZE}
      bgcolor="primary.main"
      display="flex"
      justifyContent={hideMenu ? 'flex-end' : { xs: 'flex-end', md: 'center'}}
      alignItems="center"
      position="fixed"
      zIndex={1000}
    >
      <Box
        position="absolute"
        left={20}
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
