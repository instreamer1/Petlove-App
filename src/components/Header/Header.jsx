import { useState } from 'react';
import css from './Header.module.css';

import Logo from '../Logo/Logo';
import Nav from '../Nav/Nav';
import AuthNav from '../AuthNav/AuthNav';
import UserNav from '../UserNav/UserNav';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLoggedIn = false;

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className={css.wrapper}>
      <Logo />

      <div className={css.burgerWrapper}>
        <BurgerMenu isOpen={isSidebarOpen} onClick={toggleSidebar} />
      </div>

      <div className={`${css.sidebar} ${isSidebarOpen ? css.open : ''}`}>
        <Nav />
        {/* {isLoggedIn ? <UserNav /> : <AuthNav />} */}
        <UserNav />  <AuthNav />
      </div>
    </div>
  );
};

export default Header;

