import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
// import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from 'react';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import RestrictedRoute from './pages/RestrictedRoute';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PrivateRoute from './pages/PrivateRoute';
const Layout = lazy(() => import('./components/Layout/Layout'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
function App() {
  return (
    <Suspense fallback={<div className='loading'>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to='/home' replace />} />
          <Route path='home' element={<HomePage />} />

          <Route path='/' element={<HomePage />} />
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

          <Route path='*' element={<Navigate to='/' />} />
        </Route>
      </Routes>

      {/* <Toaster /> */}
    </Suspense>
  );
}

export default App;
