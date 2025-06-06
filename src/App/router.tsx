import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router';
import LoadingModule from '@components/LoadingModule';
import ProtectedRoute from '@components/ProtectedRoute';

import Login from './Login';
import Registration from './Registration';
import Dashboard from './Dashboard';

const RemoteProductsApp = lazy(() => import('products/products-app'));
const RemoteFarmsApp = lazy(() => import('farms/farms-app'));
const RemoteInventoryApp = lazy(() => import('inventory/inventory-app'));
const RemoteSalesApp = lazy(() => import('sales/sales-app'));
const RemoteProductionApp = lazy(() => import('production/production-app'));

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
          { path: 'metas', element: <h1>Metas</h1> },
          {
            path: 'producao',
            element: (
              <Suspense fallback={<LoadingModule />}>
                <RemoteProductionApp />
              </Suspense>
            )
          },
          {
            path: 'vendas',
            element: (
              <Suspense fallback={<LoadingModule />}>
                <RemoteSalesApp />
              </Suspense>
            )
          },
          {
            path: 'estoque',
            element: (
              <Suspense fallback={<LoadingModule />}>
                <RemoteInventoryApp />
              </Suspense>
            )
          },
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
