import MyNotices from '../../components/MyNotices/MyNotices';
import UserCard from '../../components/UserCard/UserCard';
import css from './ProfilePage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUser,
  selectPets,
  selectNoticesViewed,
  selectNoticesFavorites,
  selectIsLoggedIn,
  selectIsLoading,
} from '../../redux/users/selectors.js';
import {
  addToFavorites,
  getCurrentUserFullInfo,
  removeFromFavorites,
  removePet,
} from '../../redux/users/operations.js';
import { useEffect } from 'react';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const noticesFavorites = useSelector(selectNoticesFavorites);
  const pets = useSelector(selectPets);
  const noticesViewed = useSelector(selectNoticesViewed);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCurrentUserFullInfo());
    }
  }, [dispatch, isLoggedIn]);
  
  
  const handleDeletePet = id => {
    dispatch(removePet(id));
  };

  const handleAddToFavorites = async id => {
    await dispatch(addToFavorites(id));
  };

  const handleRemoveFromFavorites = async id => {
    await dispatch(removeFromFavorites(id));
  };



  return (
    <section className={css.profile}>
      <div className={css.container}>
        <UserCard pets={pets}
         user={user} 
         onDeletePet={handleDeletePet} />
        <MyNotices
          notices={noticesFavorites}
          viewedNotices={noticesViewed}
          onAddToFavorites={handleAddToFavorites}
          onRemoveFromFavorites={handleRemoveFromFavorites}
        />
      </div>
    </section>
  );
};

export default ProfilePage;
