import css from './NoticesPage.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../../components/Title/Title';

import Pagination from '../../components/Pagination/Pagination';
import NoticesFilters from '../../components/NoticesFilters/NoticesFilters';
import NoticesList from '../../components/NoticesList/NoticesList';
import {
  selectCategories,
  selectFilteredCategories,
  selectFilters,
  // selectLocations,
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
import { selectCitiesList, selectLocationsList } from '../../redux/cities/selectors';
import { fetchCitiesByKeyword, fetchCitiesWithLocations } from '../../redux/cities/operations';

const NoticesPage = () => {
  const dispatch = useDispatch();

  const notices = useSelector(selectNotices);
  const currentPage = useSelector(selectNoticesCurrentPage);
  const totalPages = useSelector(selectNoticesTotalPages);
  const categories = useSelector(selectCategories);
  const sexOptions = useSelector(selectSexOptions);
  const speciesOptions = useSelector(selectSpeciesOptions);
  const locationsList = useSelector(selectLocationsList);
  const citiesList= useSelector(selectCitiesList)

  const loading = useSelector(selectNoticesLoading);
  const error = useSelector(selectNoticesError);
  const filters = useSelector(selectFilters);

  const itemsPerPage = 6;
  // console.log(notices);
  // console.log('categories', categories);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSexOptions());
    dispatch(fetchSpeciesOptions());
    dispatch(fetchCitiesWithLocations());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchNotices({ ...filters, page: currentPage, limit: itemsPerPage })
    );
  }, [dispatch, filters, currentPage]);

  const handleFilterChange = updatedFilters => {
    dispatch(setNoticesFilters(updatedFilters));
  };
  const onFilterCitiesChange = value=> {
    dispatch(fetchCitiesByKeyword(value))
  }

  const handleResetFilters = () => {
    dispatch(
      setNoticesFilters({
        keyword: '',
        category: '',
        sex: '',
        species: '',
        locationId: '',
        byDate: true,
        byPopularity: null,
        byPrice: null,
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
            onFilterCitiesChange= {onFilterCitiesChange}
            categories={categories}
            sexOptions={sexOptions}
            speciesOptions={speciesOptions}
            locationsList={locationsList}
            citiesList={citiesList}
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
