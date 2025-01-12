import { NavLink } from 'react-router-dom';
import css from './Nav.module.css';

const Nav = ({ closeSidebar, isHomePage, variant="sidebar" }) => {

  const buildLinkClass = ({ isActive }) => {
    return `${css.linkDesktop} ${isActive ? css.active : ""}`;
  };
  
  return (
    <div
    className={
      variant === "desktop"
        ? css.navWrapperDesktop
        : css.navWrapper
    }
  >
      <NavLink
        className={
          isHomePage
            ? css.linkHome
            : variant === "desktop"
            ? buildLinkClass
            : css.link
        }
        to="/news"
        onClick={closeSidebar}
      >
        News
      </NavLink>
      <NavLink
        className={
          isHomePage
            ? css.linkHome
            : variant === "desktop"
            ? buildLinkClass
            : css.link
        }
        to="/notices"
        onClick={closeSidebar}
      >
        Find pet
      </NavLink>
      <NavLink
        className={
          isHomePage
            ? css.linkHome
            : variant === "desktop"
            ? buildLinkClass
            : css.link
        }
        to="/friends"
        onClick={closeSidebar}
      >
        Our friends
      </NavLink>
    </div>
  );
};

export default Nav;
