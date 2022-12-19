import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// layouts
import DashboardLayout from '../layouts/dashboard';
// guards
import GuestGuard from '../guards/GuestGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';
import CategoriesList from 'src/pages/dashboard/categories';
import CategoriesCreate from 'src/pages/dashboard/categoriesCreate';
import CategoriesEdit from 'src/pages/dashboard/categoriesEdit';
import SubCategoriesList from 'src/pages/dashboard/subcategories';
import SubCategoriesCreate from 'src/pages/dashboard/subcategoriesCreate';
import SubCategoriesEdit from 'src/pages/dashboard/subcategoriesEdit';
import ProuductsList from 'src/pages/dashboard/products';
import ProductsCreate from 'src/pages/dashboard/productsCreate';
import ProuductsView from 'src/pages/dashboard/productsView';
import ProductsEdit from 'src/pages/dashboard/ProductsEdit';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isAuthenticated } = useAuth();

  const isDashboard = pathname.includes('/dashboard') && isAuthenticated;

  return (
    <Suspense fallback={<LoadingScreen isDashboard={isDashboard} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
      
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        {
          path: 'categories',
          children: [
            { element: <Navigate to="/dashboard/categories" replace />, index: true },
            { path: 'list', element: <CategoriesList /> },
            { path: 'add', element: <CategoriesCreate /> },
            { path: ':id/edit', element: <CategoriesEdit /> },
            { path: ':id/sub-categories', element: <SubCategoriesList /> },
            { path: ':id/sub-categories/edit/:subCategoryId', element: <SubCategoriesEdit /> },
            { path: ':id/sub-categories/add', element: <SubCategoriesCreate /> },
          ],
        },
        {
          path: 'products',
          children: [
            { element: <Navigate to="/dashboard/products" replace />, index: true },
            { path: 'list', element: <ProuductsList /> },
            { path: 'add', element: <ProductsCreate /> },
            { path: 'edit/:id', element: <ProductsEdit /> },
            { path: 'view/:id', element: <ProuductsView /> },
          ],
        },

      
        { path: 'permission-denied', element: <PermissionDenied /> },
      ],
    },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')))
// DASHBOARD

// GENERAL
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/products')));


// 

// USER
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/users/UserList')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));


// TEST RENDER PAGE BY ROLE
const PermissionDenied = Loadable(lazy(() => import('../pages/dashboard/PermissionDenied')));

