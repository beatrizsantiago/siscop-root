import { createBrowserRouter } from 'react-router';
import ProtectedRoute from '@components/ProtectedRoute';

import Login from './Login';
import Registration from './Registration';
import Dashboard from './Dashboard';

const router = createBrowserRouter([
  { path: '/', Component: Login },
  { path: '/cadastro', Component: Registration },
  {
    Component: ProtectedRoute,
    children: [
      {
        path: '/dashboard',
        Component: Dashboard,
        children: [
          { path: 'vendas', element: <h1>Vendas</h1> },
          { path: 'producao', element: <h1>Produção</h1> },
          { path: 'estoque', element: <h1>Estoque</h1> },
          { path: 'metas', element: <h1>Metas</h1> },
        ],
      },
    ],
  },
]);

export default router;
