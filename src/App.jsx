import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectIsLoggedIn } from './redux/users/selectors';
import { checkAuth, getCurrentUserFullInfo } from './redux/users/operations';
import { Toaster } from 'react-hot-toast';
import {
  fetchCategories,
  fetchNotices,
  fetchSexOptions,
  fetchSpeciesOptions,
} from './redux/notices/operations';
import { fetchCitiesWithLocations } from './redux/cities/operations';
import {
  selectFilters,
  selectNoticesCurrentPage,
} from './redux/notices/selectors';

const Layout = lazy(() => import('./components/Layout/Layout'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegistrationPage = lazy(() =>
  import('./pages/RegistrationPage/RegistrationPage')
);
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const NewsPage = lazy(() => import('./pages/NewsPage/NewsPage'));
const NoticesPage = lazy(() => import('./pages/NoticesPage/NoticesPage'));
const FriendsPage = lazy(() => import('./pages/FriendsPage/FriendsPage'));
const AddPetPage = lazy(() => import('./pages/AddPetPage/AddPetPage'));
const PrivateRoute = lazy(() => import('./pages/PrivateRoute'));
const RestrictedRoute = lazy(() => import('./pages/RestrictedRoute'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const Loader = () => <div className='loader'>Loading...</div>;

const App = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const currentPage = useSelector(selectNoticesCurrentPage);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchCategories());
    dispatch(fetchSexOptions());
    dispatch(fetchSpeciesOptions());
    dispatch(fetchCitiesWithLocations());
  }, [dispatch]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     dispatch(getCurrentUserFullInfo());
  //   }
  // }, [dispatch, isLoggedIn]);
  // useEffect(() => {
  //   dispatch(
  //     fetchNotices({ ...filters, page: currentPage, limit: itemsPerPage })
  //   );
  // }, [dispatch, filters, currentPage]);


  if (isLoading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to='/home' replace />} />
          <Route path='home' element={<HomePage />} />
          <Route
            path='/profile'
            element={
              <PrivateRoute redirectTo='/register'>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path='/register'
            element={
              <RestrictedRoute redirectTo='/profile'>
                <RegistrationPage />
              </RestrictedRoute>
            }
          />
          <Route
            path='/login'
            element={
              <RestrictedRoute redirectTo='/profile'>
                <LoginPage />
              </RestrictedRoute>
            }
          />
          <Route
            path='/add-pet'
            element={
              <PrivateRoute redirectTo='/register'>
                <AddPetPage />
              </PrivateRoute>
            }
          />
          <Route path='/news' element={<NewsPage />} />
          <Route path='/notices' element={<NoticesPage />} />
          <Route path='/friends' element={<FriendsPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>

      <Toaster />
    </Suspense>
  );
};

export default App;
