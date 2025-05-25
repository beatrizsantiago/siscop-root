import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingModule = () => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    height="70vh"
    width="100%"
  >
    <CircularProgress size={20} />
    <Typography sx={{ mt: 2 }} color="primary">
      Carregando...
    </Typography>
  </Box>
);

export default LoadingModule;
