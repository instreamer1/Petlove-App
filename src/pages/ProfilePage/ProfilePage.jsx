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
import { removePet } from '../../redux/users/operations.js';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const favoritesPets = useSelector(selectUserFavorites);
  const pets = useSelector(selectPets);
  const noticesViewed = useSelector(selectNoticesViewed);

 

  const onDeletePet = id => {
    dispatch(removePet(id ));
  };

  return (
    <section className={css.profile}>
      <div className={css.container}>
        <UserCard pets={pets} user={user} onDeletePet={onDeletePet} />
        <MyNotices notices={favoritesPets} />
      </div>
    </section>
  );
};

export default ProfilePage;
