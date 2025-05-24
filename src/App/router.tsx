import { createBrowserRouter } from 'react-router';

import Login from './Login';
import Registration from './Registration';

const router = createBrowserRouter([
  { path: '/', Component: Login },
  { path: '/cadastro', Component: Registration },
]);

export default router;
