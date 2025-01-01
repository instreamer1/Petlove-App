import MyNotices from '../../components/MyNotices/MyNotices';
import UserCard from '../../components/UserCard/UserCard';
import css from './ProfilePage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUser,
  selectPets,
  selectUserFavorites,
  selectNoticesViewed,
} from '../../redux/users/selectors.js';
import { getCurrentUserFullInfo, removePet } from '../../redux/users/operations.js';
import { useEffect } from 'react';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const favoritesPets = useSelector(selectUserFavorites);
  const pets = useSelector(selectPets);
  const noticesViewed = useSelector(selectNoticesViewed);

  // useEffect(() => {
  //   dispatch(getCurrentUserFullInfo());
  // }, [dispatch]);

  const onDeletePet = id => {
    dispatch(removePet(id ));
  };

  return (
    <section className={css.profile}>
      <div className={css.container}>
        <UserCard pets={pets} user={user} onDeletePet={onDeletePet} />
        <MyNotices notices={favoritesPets} 
        viewedNotices={noticesViewed} 
        // onDeleteNotice={}
        />
      </div>
    </section>
  );
};

export default ProfilePage;
