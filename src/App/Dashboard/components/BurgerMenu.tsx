import { useState } from 'react';
import {
  Box, Link, IconButton, Divider, Button,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router';
import { ListIcon, SignOutIcon, XIcon } from '@phosphor-icons/react';

import { MENU_ITEMS } from '../utils/menuItems';
import { NAVBAR_SIZE } from '../utils/sizes';
import useLogout from '../hooks/useLogout';

const BurgerMenu = () => {
  const { logout } = useLogout();
  const { pathname } = useLocation();

  const [showMenu, setShowMenu] = useState(false);

  return (
    <Box marginRight={1}>
      <IconButton onClick={() => setShowMenu((prev) => !prev)}>
        {showMenu ? (
          <XIcon size={32} color="#fff" data-testid="x-icon" />
        ) : (
          <ListIcon size={32} color="#fff" data-testid="list-icon" />
        )}
      </IconButton>

      {showMenu && (
        <Box
          position="absolute"
          top={0}
          right={0}
          bgcolor="primary.dark"
          zIndex={1000}
          width={200}
          marginTop={NAVBAR_SIZE}
        >
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.label}
              component={RouterLink}
              to={`/dashboard${item.url}`}
              underline='none'
            >
              <Box
                width="100%"
                height={NAVBAR_SIZE}
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="#fff"
                fontWeight={pathname.includes(item.url) ? 'bold' : 'normal'}
                onClick={() => setShowMenu(false)}
              >
                {item.label}
              </Box>
              <Divider variant="middle" sx={{ bgcolor: 'primary.light' }} />
            </Link>
          ))}
          <Button
            endIcon={<SignOutIcon size={20} weight="bold" data-testid="signout-icon" />}
            onClick={logout}
            fullWidth
            sx={{
              color: '#fff',
              fontWeight: 500,
              height: NAVBAR_SIZE,
              borderRadius: 0,
              fontSize: '1rem',
            }}
          >
            Sair
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default BurgerMenu;
