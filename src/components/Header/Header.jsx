import { useState } from 'react';
import css from './Header.module.css';

import Logo from '../Logo/Logo';
import Nav from '../Nav/Nav';
import AuthNav from '../AuthNav/AuthNav';
import UserNav from '../UserNav/UserNav';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useLocation } from 'react-router-dom';

const Header = ({isHomePage}) => {
 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLoggedIn = false;

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);

  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={css.wrapper}>
      <Logo isHomePage={isHomePage}/>

      <div className={css.burgerWrapper}>
        <BurgerMenu isOpen={isSidebarOpen} onClick={toggleSidebar} isHomePage={isHomePage}/>
      </div>

      <div className={`${css.sidebar} ${isSidebarOpen ? css.open : ''}`}>
        <div className={css.navWrapper}>
      
          <Nav />
          {isLoggedIn ? <UserNav closeSidebar={closeSidebar}/> : <AuthNav closeSidebar={closeSidebar} />}
        
      
          {/* <AuthNav /> */}
        
        </div>
      </div>
    </div>
  );
};

export default Header;
