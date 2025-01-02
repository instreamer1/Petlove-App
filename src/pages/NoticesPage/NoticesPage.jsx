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
  selectNotices,
  selectNoticesCurrentPage,
  selectNoticesError,
  selectNoticesLoading,
  selectNoticesTotalPages,
  selectSexOptions,
  selectSpeciesOptions,
} from '../../redux/notices/selectors';
import { fetchNotices } from '../../redux/notices/operations';
import { setNoticesFilters, setNoticesPage } from '../../redux/notices/slice';
import {
  selectCitiesList,
  selectLocationsList,
} from '../../redux/cities/selectors';
import { fetchCitiesByKeyword } from '../../redux/cities/operations';

const NoticesPage = () => {
  const dispatch = useDispatch();

  const notices = useSelector(selectNotices);
  const currentPage = useSelector(selectNoticesCurrentPage);
  const totalPages = useSelector(selectNoticesTotalPages);
  const categories = useSelector(selectCategories);
  const sexOptions = useSelector(selectSexOptions);
  const speciesOptions = useSelector(selectSpeciesOptions);
  const locationsList = useSelector(selectLocationsList);
  const citiesList = useSelector(selectCitiesList);

  const loading = useSelector(selectNoticesLoading);
  const error = useSelector(selectNoticesError);
  const filters = useSelector(selectFilters);

  const itemsPerPage = 6;


  useEffect(() => {
    dispatch(
      fetchNotices({ ...filters, page: currentPage, limit: itemsPerPage })
    );
  }, [dispatch, filters, currentPage]);

  const handleFilterChange = updatedFilters => {
    dispatch(setNoticesFilters(updatedFilters));
  };
  const onFilterCitiesChange = value => {
    dispatch(fetchCitiesByKeyword(value));
  };

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


    // Функции для работы с избранным
    const handleAddToFavorites = async (id) => {
      await dispatch(addToFavorites(id)); // Операция для добавления
    };
  
    const handleRemoveFromFavorites = async (id) => {
      await dispatch(removeFromFavorites(id)); // Операция для удаления
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
            onFilterCitiesChange={onFilterCitiesChange}
            categories={categories}
            sexOptions={sexOptions}
            speciesOptions={speciesOptions}
            locationsList={locationsList}
            citiesList={citiesList}
          />
        </div>
        <NoticesList notices={notices}          onAddToFavorites={handleAddToFavorites}
          onRemoveFromFavorites={handleRemoveFromFavorites} />
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
