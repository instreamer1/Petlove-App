import LogOutBtn from '../LogOutBtn/LogOutBtn';
import PetsBlock from '../PetsBlock/PetsBlock';

import UserBlock from '../UserBlock/UserBlock';
import css from './UserCard.module.css';

const UserCard = ({ pets, user, onDeletePet }) => {
  return (
    <div className={css.userCard}>
      <UserBlock user={user} />

      <PetsBlock pets={pets} onDeletePet={onDeletePet} />
      <LogOutBtn />
    </div>
  );
};

export default UserCard;
