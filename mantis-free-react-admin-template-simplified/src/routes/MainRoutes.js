import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));



// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <SamplePage />
    },
  ]
};

export default MainRoutes;
