import css from './Loader.module.css';
import iconSprite from '../../assets/sprite.svg';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/loadingSlice/selectors';

const Loader = () => {
  const isLoading = useSelector(selectIsLoading);

  if (!isLoading) return null;

  return (
    <div className={css.overlay}>
      <div className={css.loader}></div>

      <div className={css.logo}>
        <h2 className={css.text}>
          petl
          <svg className={css.icon}>
            <use href={`${iconSprite}#heart`}></use>
          </svg>
          ve
        </h2>
      </div>
      <div className='loader'>
        <div className='circle'></div>
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
