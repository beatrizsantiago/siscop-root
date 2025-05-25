import { Outlet, useLocation } from 'react-router';
import { Box } from '@mui/material';

import { NAVBAR_SIZE } from './utils/sizes';
import Navbar from './components/Navbar';
import ListMenu from './components/ListMenu';

const Dashboard = () => {
  const location = useLocation();

  const isShowingOutlet = location.pathname.includes('/dashboard/');

  return (
    <Box>
      <Navbar />
      <Box paddingTop={NAVBAR_SIZE}>
        {isShowingOutlet ? (
          <Outlet />
        ) : (
          <ListMenu />
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
