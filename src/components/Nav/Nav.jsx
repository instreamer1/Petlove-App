import { NavLink } from 'react-router-dom';
import css from './Nav.module.css';

const Nav = () => {

  const buildLinkClass = ({ isActive }) => {
    return `${css.link} ${isActive ? css.active : ''}`;
  };

  return <div>
       <NavLink className={buildLinkClass} to='/news'>
       News
      </NavLink>
      <NavLink className={buildLinkClass} to='/notices'>
      Find pet
      </NavLink>
      <NavLink className={buildLinkClass} to='/friends'>
      
      Our friends
      </NavLink>
  </div>;
};

export default Nav;
// "Nav є блоком навігації з наступними маршрутами: 
//   - /news - публічний-необмежений, переадресує на сторінку News page
//   - /notices - публічний-необмежений, переадресує на сторінку Notices page
//   - /friends - публічний-необмежений, переадресує на сторінку Our friends page

// На планшетній і мобільній версіях компонент потрібно розмістити в бургер-меню.

// Активну сторінку, на якій перебуває користувач, необхідно виокремити."