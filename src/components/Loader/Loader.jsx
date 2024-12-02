import css from './Loader.module.css';
import iconSprite from '../../assets/sprite.svg'

const Loader = () => {
  const isLoading = false;

  if (!isLoading) return null; 

  return (
    <div className={css.overlay}>
      <div className={css.loader}></div>

      <div className={css.logo}>
      <h2 className={css.text} >petl<svg className={css.icon}>
            <use href={`${iconSprite}#heart`}></use>
          </svg>ve</h2>

    </div>
    </div>
  );
};

export default Loader;
