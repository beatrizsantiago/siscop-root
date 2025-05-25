import { useLocation } from 'react-router';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import WhiteLogo from '@assets/icons/white_logo.png';

import { NAVBAR_SIZE } from '../utils/sizes';
import InlineMenu from './InlineMenu';
import LogoutButton from './LogoutButton';
import BurgerMenu from './BurgerMenu';

const Navbar = () => {
  const { pathname } = useLocation();

  const { breakpoints } = useTheme();
  const isBigScreen = useMediaQuery(breakpoints.up('sm'))

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
      justifyContent={hideMenu ? 'flex-end' : { xs: 'flex-end', sm: 'center'}}
      alignItems="center"
      position="fixed"
      zIndex={1000}
    >
      <img
        src={WhiteLogo}
        alt="logo"
        width={40}
        style={{ position: 'absolute', left: 20 }}
      />

      {currentComponent()}
    </Box>
  );
}

export default Navbar;
