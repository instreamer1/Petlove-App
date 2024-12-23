import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import RestrictedRoute from './pages/RestrictedRoute';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PrivateRoute from './pages/PrivateRoute';
import LoginPage from './pages/LoginPage/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectIsLoggedIn } from './redux/users/selectors';
import { checkAuth, getCurrentUserFullInfo } from './redux/users/operations';
import { Toaster } from 'react-hot-toast';
import NewsPage from './pages/NewsPage/NewsPage';
import NoticesPage from './pages/NoticesPage/NoticesPage';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import AddPetPage from './pages/AddPetPage/AddPetPage';
import {
  fetchCategories,
  fetchNotices,
  fetchSexOptions,
  fetchSpeciesOptions,
} from './redux/notices/operations';
import { fetchCitiesWithLocations } from './redux/cities/operations';
import { selectFilters, selectNoticesCurrentPage } from './redux/notices/selectors';

const Layout = lazy(() => import('./components/Layout/Layout'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

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

  useEffect(() => {
    dispatch(getCurrentUserFullInfo());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(
  //     fetchNotices({ ...filters, page: currentPage, limit: itemsPerPage })
  //   );
  // }, [dispatch, filters, currentPage]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // return isRefreshing ? (
  //   <div
  //     style={{
  //       display: 'flex',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       height: '100vh',
  //     }}>
  //     <Spinner />
  //   </div>
  // ) : (

  return (
    <Suspense fallback={<div className='loading'>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to='/home' replace />} />
          <Route path='home' element={<HomePage />} />

          {/* <Route path='/' element={<HomePage />} /> */}
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

          <Route path='*' element={<Navigate to='/' />} />
        </Route>
      </Routes>

      <Toaster />
    </Suspense>
  );
};

export default App;
