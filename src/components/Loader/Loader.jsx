import css from './Loader.module.css';
import iconSprite from '../../assets/sprite.svg';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/loadingSlice/selectors';

const Loader = () => {
  const isLoading = useSelector(selectIsLoading);

  // if (!isLoading) return null;

  return (
    // <section className={css.loaderSection}>
    <div className={css.overlay}>
     

      <div className={css.logo}>
        <h2 className={css.text}>
          petl
          <svg className={css.icon}>
            <use href={`${iconSprite}#heart`}></use>
          </svg>
          ve
        </h2>
      </div>
      <div className={css.loader}>
        <div className={css.circle}></div>
        {/* <span>Loading...</span> */}
      </div>
    </div>
    // </section>
  );
};

export default Loader;
