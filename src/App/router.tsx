import { createBrowserRouter } from 'react-router';
import ProtectedRoute from '@components/ProtectedRoute';

import Login from './Login';
import Registration from './Registration';
import Dashboard from './Dashboard';

const router = createBrowserRouter([
  { path: '/', Component: Login },
  { path: '/cadastro', Component: Registration },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
    ],
  },
]);

export default router;
