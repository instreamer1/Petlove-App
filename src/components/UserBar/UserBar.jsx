import css from './UserBar.module.css';
import iconSprite from '../../assets/sprite.svg';
import { NavLink } from 'react-router-dom';


const UserBar = () => {
  return (
    <div className={css.userBar}>
      <div className={css.userIcon}>
        <NavLink to='/profile'>
          <svg className={css.icon}>
            <use href={`${iconSprite}#user`}></use>
          </svg>
        </NavLink>
      </div>

      <p className={css.nameUser} ></p>
    </div>
  );
};

export default UserBar;

