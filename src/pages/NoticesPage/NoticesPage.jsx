import css from './NoticesPage.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../../components/Title/Title';

import Pagination from '../../components/Pagination/Pagination';
import NoticesFilters from '../../components/NoticesFilters/NoticesFilters';
import NoticesList from '../../components/NoticesList/NoticesList';
import {
  selectNotices,
  selectNoticesCurrentPage,
  selectNoticesError,
  selectNoticesLoading,
  selectNoticesTotalPages,
} from '../../redux/notices/selectors';
import { fetchNotices } from '../../redux/notices/operations';
import { setNoticesPage } from '../../redux/notices/slice';

const NoticesPage = () => {
  const dispatch = useDispatch();

  const notices = useSelector(selectNotices);
  //   const searchQuery = useSelector(selectSearchQuery);
  const currentPage = useSelector(selectNoticesCurrentPage);
  const totalPages = useSelector(selectNoticesTotalPages);
  const loading = useSelector(selectNoticesLoading);
  const error = useSelector(selectNoticesError);

  const itemsPerPage = 6;
  console.log(notices);
  useEffect(() => {
    dispatch(
      fetchNotices({
        // keyword: searchQuery,
        page: currentPage,
        limit: itemsPerPage,
      })
    );
  }, [
    dispatch,
    //  searchQuery,
    currentPage,
  ]);

  //   const handleSearch = query => {
  //     dispatch(setSearchQuery(query));
  //   };

  const handlePageChange = page => {
    dispatch(setNoticesPage(page));
  };

  return (
    <section className={css.notices}>
      <div className={css.container}>
        <div className={css.noticesWrapper}>
          <Title title='Find your favorite pet' />
          <NoticesFilters />
          </div>
          <NoticesList notices={notices} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
       
      </div>
    </section>
  );
};

export default NoticesPage;
