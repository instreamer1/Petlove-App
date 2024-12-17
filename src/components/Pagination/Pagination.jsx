import useResponsive from '../hooks/useResponsive';
import css from './Pagination.module.css';
import iconSprite from '../../assets/sprite.svg';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { isMobile, isTablet } = useResponsive();

  const getVisiblePages = () => {
    const visiblePages = [];

    if (totalPages <= 2) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else if (isMobile) {
      if (currentPage === 1) {
        visiblePages.push(1, 2, '...');
      } else if (currentPage >= 2 && currentPage < totalPages - 1) {
        visiblePages.push(currentPage, currentPage + 1, '...');
      } else if (currentPage === totalPages) {
        visiblePages.push('...', currentPage - 1, totalPages);
      } else if (currentPage === totalPages - 1) {
        visiblePages.push('...', currentPage, currentPage + 1);
      } else if (currentPage < totalPages - 1) {
        visiblePages.push(currentPage - 1, currentPage, '...');
      }
    } else {
      if (currentPage === 1) {
        visiblePages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage === 2) {
        visiblePages.push(1, currentPage, currentPage + 1, '...', totalPages);
      } else if (currentPage === totalPages) {
        visiblePages.push(
          1,
          '...',
          currentPage - 2,
          currentPage - 1,
          totalPages
        );
      } else if (currentPage < totalPages - 1) {
        visiblePages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages
        );
      } else if (currentPage === totalPages - 1) {
        visiblePages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          '...',
          totalPages
        );
      }
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={css.pagination}>
      <button
        className={css.pageButton}
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}>
        <svg className={css.icon}>
          <use href={`${iconSprite}#arrowLeft`}></use>
        </svg>
        <svg className={css.icon}>
          <use href={`${iconSprite}#arrowLeft`}></use>
        </svg>
      </button>
      <button
        className={css.pageButton}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}>
        <svg className={css.icon}>
          <use href={`${iconSprite}#arrowLeft`}></use>
        </svg>
      </button>

      {visiblePages.map((page, index) => (
        <button
          key={index}
          className={`${css.pageButton} ${
            page === currentPage ? css.active : ''
          }`}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === currentPage || page === '...'}>
          {page}
        </button>
      ))}

      <button
        className={css.pageButton}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}>
        <svg className={css.icon}>
          <use href={`${iconSprite}#arrowRight`}></use>
        </svg>
      </button>
      <button
        className={css.pageButton}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}>
        <svg className={css.icon}>
          <use href={`${iconSprite}#arrowRight`}></use>
        </svg>
        <svg className={css.icon}>
          <use href={`${iconSprite}#arrowRight`}></use>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
