import css from './UserBar.module.css';
import iconSprite from '../../assets/sprite.svg';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/users/selectors';
import { truncateString } from '../constants';


const UserBar = ({isHomePage}) => {

  const user = useSelector(selectUser);
  return (
    <div className={css.userBar}>
      <div className={css.userIcon}>
        <NavLink to='/profile'>
          <svg className={css.icon}>
            <use href={`${iconSprite}#user`}></use>
          </svg>
        </NavLink>
      </div>

      <p className={`${css.nameUser} ${isHomePage ? css.nameUserHome : css.nameUserOther}`} >{truncateString(user.name, 12)}</p>
    </div>
  );
};

export default UserBar;

