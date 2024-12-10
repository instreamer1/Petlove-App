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
import { checkAuth} from './redux/users/operations';
import { Toaster } from 'react-hot-toast';

const Layout = lazy(() => import('./components/Layout/Layout'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));


const App = ()=> {

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    // Вызываем checkAuth при загрузке приложения
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>; // Показать индикатор загрузки
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

          <Route path='*' element={<Navigate to='/' />} />
        </Route>
      </Routes>

      <Toaster />
    </Suspense>
  );
}

export default App;
