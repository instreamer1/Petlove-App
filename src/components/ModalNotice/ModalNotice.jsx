import Modal from '../Modal/Modal';
import css from './ModalNotice.module.css';
import iconSprite from '../../assets/sprite.svg';
import { capitalizeFirstLetter, formatDate } from '../constants';
import {
  selectNoticesError,
  selectNoticesLoading,
} from '../../redux/notices/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/notices/operations';

const ModalNotice = ({ isOpen, onClose, notice, isFavorite, handleFavoriteClick }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectNoticesLoading);
  const error = useSelector(selectNoticesError);
  if (!notice) {
    return null;
  }
  const {
    _id,
    species,
    category,
    price,
    title,
    name,
    birthday,
    comment,
    sex,
    location,
    imgURL,
    createdAt,
    user,
    popularity,
    updatedAt,
  } = notice;

  // const handleFavoriteInModal = async () => {
  //   const action = isFavorite ? removeFromFavorites : addToFavorites;
  //   try {
  //     await dispatch(action(notice._id)).unwrap();
  //   } catch (error) {
  //     console.error('Ошибка изменения избранного в модальном окне:', error);
  //   }
  // };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.modalNotice}>
        <div className={css.imgWrap}>
          <img
            src={imgURL ? imgURL : ''}
            alt={name ? name : 'Unknown'}
            className={css.image}
          />
          <div className={css.sell}>
            <p className={css.sellText}>Sell </p>
          </div>
        </div>

        <div className={css.cardContent}>
          <div className={css.cardContentWrapper}>
            <h3 className={css.cardTitle}>{title}</h3>
            <div className={css.reviews}>
              <svg className={css.starIcon}>
                <use href={`${iconSprite}#star`}></use>
              </svg>
              <span className={css.cardRating}>
                {popularity ? popularity : ''}
              </span>
            </div>
          </div>
          <div className={css.footer}>
            <div className={css.cardInfoWrapper}>
              <div className={css.cardInfo}>
                <p className={css.cardInfoText}>Name:</p>
                <p className={css.cardInfoValue}>{name ? name : 'Unknown'}</p>
              </div>
              <div className={css.cardInfo}>
                <p className={css.cardInfoText}>Birthday:</p>
                <p className={css.cardInfoValue}>
                  {birthday ? formatDate(birthday) : 'Unknown'}
                </p>
              </div>
              <div className={css.cardInfo}>
                <p className={css.cardInfoText}>Sex: </p>
                <p className={css.cardInfoValue}>
                  {sex ? capitalizeFirstLetter(sex) : 'Unknown'}
                </p>
              </div>
              <div className={css.cardInfo}>
                <p className={css.cardInfoText}>Species: </p>
                <p className={css.cardInfoValue}>
                  {species ? capitalizeFirstLetter(species) : 'Unknown'}
                </p>
              </div>
              <div className={css.cardInfo}>
                <p className={css.cardInfoText}>Category: </p>
                <p className={css.cardInfoValue}>
                  {category ? capitalizeFirstLetter(category) : 'Unknown'}
                </p>
              </div>
            </div>
            <p className={css.cardDescription}>
              {comment ? comment : 'No comment'}
            </p>
            <div className={css.cardFooter}>
              <p className={css.cardPrice}>${price ? price : 'Unknown'}</p>
              <div className={css.buttonWrapper}>
                <button
                  type='button'
                  className={css.addToBtn}
                  onClick={handleFavoriteClick}>
                  {isFavorite ? 'Remove from ' : 'Add to '}

                  <svg className={css.icon}>
                    <use href={`${iconSprite}#heart`}></use>
                  </svg>
                </button>

                {user.email ? (
                  <a href={`mailto:${user.email}`} className={css.contactBtn}>
                    Contact
                  </a>
                ) : user.phone ? (
                  <a href={`tel:${user.phone}`} className={css.contactBtn}>
                    Contact
                  </a>
                ) : (
                  <span className={css.noContact}>No contact available</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalNotice;
