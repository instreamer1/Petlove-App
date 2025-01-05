import css from './NoticesItem.module.css';
import iconSprite from '../../assets/sprite.svg';
import ModalAttention from '../ModalAttention/ModalAttention';
import ModalNotice from '../ModalNotice/ModalNotice';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavorites,
  // selectIsFavorite,
  selectIsLoading,
  selectIsLoggedIn,
  selectNoticesFavorites,
  // selectUserFavorites,
} from '../../redux/users/selectors';
import {
  // addToFavorites,
  fetchNoticeById,
  // removeFromFavorites,
} from '../../redux/notices/operations';
import {
  selectCurrentNotice,
  // selectFavorites,
  // selectFavorites,
  selectNoticesError,
  selectNoticesLoading,
} from '../../redux/notices/selectors';
import { capitalizeFirstLetter, formatDate } from '../constants';
// import { addToFavorites, checkAuth, removeFromFavorites } from '../../redux/users/operations';

const NoticesItem = ({ notice, onAddToFavorites, onRemoveFromFavorites }) => {
  const dispatch = useDispatch();
  const [isAttentionOpen, setAttentionOpen] = useState(false);
  const [isNoticeOpen, setNoticeOpen] = useState(false);

  const noticesFavorites = useSelector(selectNoticesFavorites);
  const favorites = useSelector(selectFavorites)
  // const favorites = useSelector(selectFavorites);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentNotice = useSelector(selectCurrentNotice);

  const loading = useSelector(selectNoticesLoading);
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
    location,
    imgURL,
    createdAt,
    user,
    popularity,
    updatedAt,
  } = notice;
  // console.log(typeof _id)
  const isButtonDisabled = loading || loadingProfile;
  // const isFavorite = () => favorites.includes(_id);



//   const isFavorite = favorites.some((favorite) => {
//     console.log(favorite);
//     console.log('Favorite ID:', favorite._id); // Проверяем значение _id в массиве
//     console.log('Type of Favorite ID:', typeof favorite._id); // Тип _id
//     console.log('Target ID:', _id); // Значение, с которым сравниваем
//     console.log('Type of Target ID:', typeof _id); // Тип значения для сравнения
//     return favorite._id === _id;
// });

// const favoritesIds = useMemo(() => noticesFavorites.map((favorite) => favorite._id), [noticesFavorites]);
// const isFavorite = favoritesIds.includes(_id);
const isFavorite = favorites.includes(_id);


  // const isFavorite = () => favorites.includes(_id);
  // console.log("favorites", favorites);
  // console.log("_id", _id);
  // console.log("isFavorite", isFavorite);



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
   
       await dispatch(action(_id)).unwrap();
  
    } catch (error) {
      console.error(error);
    }
  };

  // const handleFavoriteClick = async () => {
  //   if (!isLoggedIn) {
  //     setAttentionOpen(true);
  //     return;
  //   }

  //  console.log(isFavorite);

  //   const action = isFavorite ? onRemoveFromFavorites : onAddToFavorites;
  //   try {
  //     await dispatch(action(_id)).unwrap();
  //     //     // await dispatch(checkAuth());
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <li className={css.cardItem}>
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
                  // disabled={isButtonDisabled}
                  >
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
      />
    </>
  );
};

export default NoticesItem;
