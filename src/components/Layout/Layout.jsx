import Header from '../Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import css from './Layout.module.css';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../redux/news/selectors';
import { selectNoticesLoading } from '../../redux/notices/selectors';
import { selectIsLoading } from '../../redux/users/selectors';
import { selectLoadingFriends } from '../../redux/friends/selectors';

const Layout = () => {
  const location = useLocation();

  const loadingNews = useSelector(selectLoading);
  const isNoticesLoading = useSelector(selectNoticesLoading);
  const isLoading = useSelector(selectIsLoading);
  const loadingFriends = useSelector(selectLoadingFriends);
  const isHomePage = location.pathname === "/home"; 
  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <Header isHomePage={isHomePage}/>
       { (loadingNews || isNoticesLoading || isLoading || loadingFriends) && <Loader />}
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
