import {
  Box, Paper, useTheme, useMediaQuery,
} from '@mui/material';
import BarnImage from '@assets/barn.png';
import WindMildImage from '@assets/wind_mild.png';

type Props = {
  children: React.ReactNode;
};

const AuthContainer = ({ children }:Props) => {
  const { breakpoints } = useTheme();
  const isBigScreen = useMediaQuery(breakpoints.up('md'))

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
        {children}
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

export default AuthContainer;
