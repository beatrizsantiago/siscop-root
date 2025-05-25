import { Box, Link } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router';

import { MENU_ITEMS } from '../utils/menuItems';
import { NAVBAR_SIZE } from '../utils/sizes';

const InlineMenu = () => {
  const { pathname } = useLocation();

  return (
    <Box display="flex" alignItems="center">
      {MENU_ITEMS.map((item) => (
        <Link
          key={item.label}
          component={RouterLink}
          to={`/dashboard${item.url}`}
          underline='none'
        >
          <Box
            height={NAVBAR_SIZE}
            display="flex"
            alignItems="center"
            px={{ xs: 2, md: 3 }}
            color="#fff"
            bgcolor={pathname.includes(item.url) ? 'primary.dark' : 'none'}
            sx={{
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            {item.label}
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default InlineMenu;
