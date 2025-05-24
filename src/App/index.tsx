import { theme } from 'agro-core';
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';

import router from './router';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={router} />
    <ToastContainer />
  </ThemeProvider>
);

export default App;
