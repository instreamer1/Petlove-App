import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

const AuthNav = ({ closeSidebar, isHomePage }) => {
  return (
    <div className={css.authNavWrapper} >
      <NavLink className={`${css.link} ${isHomePage ? '' :css.loginLinkHome }`} to="/login" onClick={closeSidebar}>
        Log In
      </NavLink>
      <NavLink className={css.registerLink} to="/register" onClick={closeSidebar}>
        Registration
      </NavLink>
    </div>
  );
};

export default AuthNav;

