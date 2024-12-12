import { NavLink } from 'react-router-dom';
import css from './Nav.module.css';

const Nav = ({isHomePage}) => {

  return (
    <div className={css.navWrapper} >
      <NavLink className={`${isHomePage ? css.linkHome : css.link}`} to='/news'>
        News
      </NavLink>
      <NavLink className={`${isHomePage ? css.linkHome : css.link}`} to='/notices'>
        Find pet
      </NavLink>
      <NavLink className={`${isHomePage ? css.linkHome : css.link}`} to='/friends'>
        Our friends
      </NavLink>
    </div>
  );
};

export default Nav;
