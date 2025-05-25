import {
  Box, Typography, Link, useTheme, useMediaQuery,
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import CropBrown from '@assets/crop_brown.png';

import { MENU_ITEMS } from '../utils/menuItems';

const ListMenu = () => {
  const { breakpoints } = useTheme();
  const isBigScreen = useMediaQuery(breakpoints.up('sm'))

  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="80vh" padding={3}>
      <Box zIndex={1}>
        <Typography align="center" fontWeight={500} marginBottom={1}>
          Olá, Bia! Bem vindo(a) 😄
        </Typography>
        <Typography fontSize={{ xs: '1.25rem', md: '1.5rem' }} align="center" fontWeight={600} marginBottom={3}>
          Escolha uma área para começar!
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center" flexWrap="wrap">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.label}
              component={RouterLink}
              to={`/dashboard${item.url}`}
              underline='none'
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                border="solid 1px #e0e0e0"
                width={200}
                padding={2}
                margin={1}
                borderRadius={5}
                bgcolor="background.default"
                sx={{
                  '&:hover': {
                    bgcolor: 'rgba(224, 224, 224, 0.25)',
                    cursor: 'pointer',
                    transition: 'background-color 0.5s ease',
                  },
                }}
              >
                <img src={item.icon} width={50} />
                <Typography
                  align="center"
                  variant="h6"
                  fontWeight={600}
                  lineHeight={1.2}
                  marginY={1}
                  color="text.primary"
                >
                  {item.label}
                </Typography>
                <Typography align="center" color="text.secondary" variant="body2">
                  {item.description}
                </Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
      <img 
        src={CropBrown}
        alt="logo"
        width={isBigScreen ? 600 : '100%'}
        style={{ position: 'fixed', bottom: 20, right: 0, zIndex: 0, }}
      />
    </Box>
  );
}

export default ListMenu;
