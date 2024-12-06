import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

const AuthNav = ({ closeSidebar }) => {
  return (
    <div className={css.authNavWrapper} >
      <NavLink className={css.loginLink} to="/login" onClick={closeSidebar}>
        Log In
      </NavLink>
      <NavLink className={css.registerLink} to="/register" onClick={closeSidebar}>
        Registration
      </NavLink>
    </div>
  );
};

export default AuthNav;

// "Компонент відмальовується тільки неавторизованим користувачам і містить блок навігації з маршрутами:
//   - /register - публічний-обмежений, переадресує на сторінку Registration page
//   - /login - публічний-обмежений, переадресує на сторінку Login page

// На мобільній версії компонент потрібно розмістити в бургер меню"
