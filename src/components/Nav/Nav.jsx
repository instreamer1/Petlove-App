import { NavLink } from 'react-router-dom';
import css from './Nav.module.css';

const Nav = ({ closeSidebar, isHomePage }) => {
  return (
    <div className={css.navWrapper}>
      <NavLink
        className={`${isHomePage ? css.linkHome : css.link}`}
        to='/news'
        onClick={closeSidebar}>
        News
      </NavLink>
      <NavLink
        className={`${isHomePage ? css.linkHome : css.link}`}
        to='/notices'
        onClick={closeSidebar}>
        Find pet
      </NavLink>
      <NavLink
        className={`${isHomePage ? css.linkHome : css.link}`}
        to='/friends'
        onClick={closeSidebar}>
        Our friends
      </NavLink>
    </div>
  );
};

export default Nav;
