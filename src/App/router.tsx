import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router';
import LoadingModule from '@components/LoadingModule';
import ProtectedRoute from '@components/ProtectedRoute';

import Login from './Login';
import Registration from './Registration';
import Dashboard from './Dashboard';

const RemoteProductsApp = lazy(() => import('products/products-app'));
const RemoteFarmsApp = lazy(() => import('farms/farms-app'));

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
          {
            path: 'fazendas',
            element: (
              <Suspense fallback={<LoadingModule />}>
                <RemoteFarmsApp />
              </Suspense>
            )
          },
          {
            path: 'produtos',
            element: (
              <Suspense fallback={<LoadingModule />}>
                <RemoteProductsApp />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
