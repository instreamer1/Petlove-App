import css from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showEllipsis = totalPages > 5;

  return (
    <div className={css.pagination}>
      <button
        className={css.pageButton}
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        ««
      </button>
      <button
        className={css.pageButton}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        «
      </button>

      {showEllipsis && currentPage > 3 && (
        <button
          className={`${css.pageButton} ${css.ellipsis}`}
          disabled
        >
          ...
        </button>
      )}

      {pages.map((page) => (
        <button
          key={page}
          className={`${css.pageButton} ${page === currentPage ? css.active : ""}`}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}

      {showEllipsis && currentPage < totalPages - 2 && (
        <button
          className={`${css.pageButton} ${css.ellipsis}`}
          disabled
        >
          ...
        </button>
      )}

      <button
        className={css.pageButton}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        »
      </button>
      <button
        className={css.pageButton}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        »»
      </button>
    </div>
  );
};

export default Pagination;

