import Header from '../Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import css from './Layout.module.css';
import Loader from '../Loader/Loader';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home"; 
  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <Header isHomePage={isHomePage}/>
          {/* <Loader /> */}
        </div>
      </header>

      <main>
        <Suspense fallback={<div>Loading page...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
