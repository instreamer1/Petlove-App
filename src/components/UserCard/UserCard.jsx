import EditUserBtn from '../EditUserBtn/EditUserBtn';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import PetsBlock from '../PetsBlock/PetsBlock';

import UserBlock from '../UserBlock/UserBlock';
import css from './UserCard.module.css';

const UserCard = ({pets, user, onDeletePet}) => {
  return (
    <div className={css.userCard}>
      <EditUserBtn />
      <UserBlock user={user} />
   
     { pets && <PetsBlock pets={pets} onDeletePet={onDeletePet} />}
      <LogOutBtn />
    </div>
  );
};

export default UserCard;


