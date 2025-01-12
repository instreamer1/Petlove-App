import css from './NoticesItem.module.css';
import iconSprite from '../../assets/sprite.svg';
import ModalAttention from '../ModalAttention/ModalAttention';
import ModalNotice from '../ModalNotice/ModalNotice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavorites,
  selectIsLoading,
  selectIsLoggedIn,
} from '../../redux/users/selectors';
import { fetchNoticeById } from '../../redux/notices/operations';
import {
  selectCurrentNotice,
  selectNoticesError,
  selectNoticesLoading,
} from '../../redux/notices/selectors';
import { capitalizeFirstLetter, formatDate } from '../constants';

const NoticesItem = ({ notice, onAddToFavorites, onRemoveFromFavorites }) => {
  const dispatch = useDispatch();
  const [isAttentionOpen, setAttentionOpen] = useState(false);
  const [isNoticeOpen, setNoticeOpen] = useState(false);

  const favorites = useSelector(selectFavorites);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentNotice = useSelector(selectCurrentNotice);

  const isNoticesLoading = useSelector(selectNoticesLoading);
  const loadingProfile = useSelector(selectIsLoading);
  const error = useSelector(selectNoticesError);

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
    imgURL,
    user,
    popularity,
  } = notice;

  const isButtonDisabled = isNoticesLoading || loadingProfile;

  const isFavorite = favorites.includes(_id);

  const handleLearnMore = async () => {
    if (!isLoggedIn) {
      setAttentionOpen(true);
      return;
    }
    try {
      await dispatch(fetchNoticeById(_id));
      setNoticeOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavoriteClick = async () => {
    if (!isLoggedIn) {
      setAttentionOpen(true);
      return;
    }

    const action = isFavorite ? onRemoveFromFavorites : onAddToFavorites;
    try {
      await action(_id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <li className={css.cardItem}>
         {error && <div className={css.error}>Error: {error}</div>}
        <img
          src={imgURL ? imgURL : ''}
          alt={name ? name : 'Unknown'}
          className={css.image}
        />

        <div className={css.cardContent}>
          <div className={css.cardContentWrapper}>
            <h3 className={css.cardTitle}>{title}</h3>
            <svg className={css.starIcon}>
              <use href={`${iconSprite}#star`}></use>
            </svg>
            <span className={css.cardRating}>
              {popularity ? popularity : ''}
            </span>
          </div>
          <div className={css.footer}>
            <div className={css.cardInfoWrapper}>
              <div className={css.cardInfo}>
                <p className={css.cardInfoText}>Name:</p>
                <p className={css.cardInfoValue}>{name || 'Unknown'}</p>
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
                  aria-label='Learn more'
                  className={css.learnMoreBtn}
                  onClick={handleLearnMore}>
                  Learn more
                </button>
                <button
                  type='button'
                  aria-label={
                    isFavorite ? 'Remove from favorites' : 'Add to favorites'
                  }
                  className={css.favoriteBtn}
                  onClick={handleFavoriteClick}
                  disabled={isButtonDisabled}>
                  <svg className={css.icon}>
                    <use
                      href={`${iconSprite}#${
                        isFavorite ? 'trash' : 'heart'
                      }`}></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
      <ModalAttention
        isOpen={isAttentionOpen}
        onClose={() => setAttentionOpen(false)}
      />
      <ModalNotice
        isOpen={isNoticeOpen}
        onClose={() => setNoticeOpen(false)}
        notice={currentNotice}
        isFavorite={isFavorite}
        onAddToFavorites={onAddToFavorites}
        onRemoveFromFavorites={onRemoveFromFavorites}
      />
    </>
  );
};

export default NoticesItem;
