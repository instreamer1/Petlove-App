import css from './NoticesPage.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../../components/Title/Title';

import Pagination from '../../components/Pagination/Pagination';
import NoticesFilters from '../../components/NoticesFilters/NoticesFilters';
import NoticesList from '../../components/NoticesList/NoticesList';
import {
  selectCategories,
  selectFilters,
  selectLocations,
  selectNotices,
  selectNoticesCurrentPage,
  selectNoticesError,
  selectNoticesLoading,
  selectNoticesTotalPages,
  selectSexOptions,
  selectSpeciesOptions,
} from '../../redux/notices/selectors';
import {
  fetchCategories,
  fetchNotices,
  fetchSexOptions,
  fetchSpeciesOptions,
} from '../../redux/notices/operations';
import { setNoticesFilters, setNoticesPage } from '../../redux/notices/slice';

const NoticesPage = () => {
  const dispatch = useDispatch();

  const notices = useSelector(selectNotices);
  const currentPage = useSelector(selectNoticesCurrentPage);
  const totalPages = useSelector(selectNoticesTotalPages);
  const categories = useSelector(selectCategories);
  const sexOptions = useSelector(selectSexOptions);
  const speciesOptions = useSelector(selectSpeciesOptions);
  const locations = useSelector(selectLocations);

  const loading = useSelector(selectNoticesLoading);
  const error = useSelector(selectNoticesError);
  const filters = useSelector(selectFilters);

  const itemsPerPage = 6;
  console.log(notices);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSexOptions());
    dispatch(fetchSpeciesOptions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchNotices({ ...filters, page: currentPage, limit: itemsPerPage })
    );
  }, [dispatch, filters, currentPage]);

  const handleFilterChange = updatedFilters => {
    dispatch(setNoticesFilters(updatedFilters));
  };

  const handleResetFilters = () => {
    dispatch(
      setNoticesFilters({
        keyword: '',
        category: '',
        gender: '',
        type: '',
        location: '',
        sortBy: 'popular',
      })
    );
  };

  const handlePageChange = page => {
    dispatch(setNoticesPage(page));
  };

  return (
    <section className={css.notices}>
      <div className={css.container}>
        <div className={css.noticesWrapper}>
          <Title title='Find your favorite pet' />
          <NoticesFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            categories={categories}
            sexOptions={sexOptions}
            speciesOptions={speciesOptions}
            locations={locations}
          />
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
