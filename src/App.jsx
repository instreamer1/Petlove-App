import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
// import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from 'react';
const Layout = lazy(() => import('./components/Layout/Layout'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
function App() {
  return (
    <Suspense fallback={<div className='loading'>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to='/home' replace />} />
          <Route path='home' element={<HomePage />} />

          {/* <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} /> */}

     
          {/* <Route path="*" element={<NotFoundPage />} /> */}
          <Route path='*' element={<Navigate to='/' />} />
        </Route>
      </Routes>

      {/* <Toaster /> */}
    </Suspense>
  );
}

export default App;
