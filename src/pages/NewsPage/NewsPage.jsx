import css from './NewsPage.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../../components/Title/Title';
import SearchField from '../../components/SearchField/SearchField';
import NewsList from '../../components/NewsList/NewsList';
import Pagination from '../../components/Pagination/Pagination';
import {
  selectNews,
  selectSearchQuery,
  selectCurrentPage,
  selectTotalPages,
  selectLoading,
  selectError,
} from '../../redux/news/selectors';
import { fetchNews } from '../../redux/news/operations';
import { setPage, setSearchQuery } from '../../redux/news/slice';

const NewsPage = () => {
  const dispatch = useDispatch();

  const news = useSelector(selectNews);
  const searchQuery = useSelector(selectSearchQuery);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const itemsPerPage = 6;
  useEffect(() => {
    dispatch(
      fetchNews({
        keyword: searchQuery,
        page: currentPage,
        limit: itemsPerPage,
      })
    );
  }, [dispatch, searchQuery, currentPage]);

  const handleSearch = query => {
    dispatch(setSearchQuery(query));
    dispatch(setPage(1));
  };

  const handlePageChange = page => {
    dispatch(setPage(page));
  };

  return (
    <section className={css.news}>
      <div className={css.container}>
        <div className={css.newsWrapper}>
          <Title title='News' />
          <SearchField onSearch={handleSearch} />
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && news.length === 0 && <p>No news found.</p>}
        <NewsList news={news} />
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

export default NewsPage;
