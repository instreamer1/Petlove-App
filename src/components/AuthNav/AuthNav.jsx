import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

const AuthNav = () => {
  return (
    <div>
      <NavLink className={css.loginLink} to="/login">
        Log In
      </NavLink>
      <NavLink className={css.registerLink} to="/register">
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
