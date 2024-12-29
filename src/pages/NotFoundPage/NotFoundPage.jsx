import { useNavigate } from 'react-router-dom';
import css from './NotFoundPage.module.css';
import catNotFound from '../../assets/images/catNotFoundDesktop.png';
const NotFoundPage = props => {

    const navigate = useNavigate(); 

  return (
    <section className={css.notFoundPage}>
      <div className={css.container}>
        <div className={css.notFoundContentWrapper}>
          <div className={css.notFoundTitle}>
            <h2 className={css.title}>4</h2>
            <div className={css.imgWrapper}>
              <img src={catNotFound} alt='cat' className={css.image} />
            </div>
            <h2 className={css.title}>4</h2>
          </div>
          <h4 className={css.notFoundDescription}>
            Ooops! This page not found :(
          </h4>
          <button type="button"   onClick={() => navigate('/')}  className={css.notFondButton} >
            To home page</button>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
