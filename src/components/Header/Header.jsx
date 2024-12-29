import { useState } from 'react';
import css from './Header.module.css';
import useResponsive from '../hooks/useResponsive.js';

import Logo from '../Logo/Logo';
import Nav from '../Nav/Nav';
import AuthNav from '../AuthNav/AuthNav';
import UserNav from '../UserNav/UserNav';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/users/selectors';
import LogOutBtn from '../LogOutBtn/LogOutBtn';

const Header = ({ isHomePage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { isMobile, isTablet } = useResponsive();

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div>
        <div
          className={`${css.wrapper} ${isHomePage ? css.wrapperHomePage : ''}`}>
          <Logo isHomePage={isHomePage} />
          <div className={isHomePage ? css.navWrapperTabletHome : css.navWrapperTablet}>
            {!isTablet && !isMobile && (
              <Nav isHomePage={isHomePage} variant='desktop' />
            )}

            {isLoggedIn ? (
              <UserNav isHomePage={isHomePage} />
            ) : (
              (isTablet || !isMobile) && <AuthNav />
            )}
          </div>
          <div className={css.burgerWrapper}>
            <BurgerMenu
              isOpen={isSidebarOpen}
              onClick={toggleSidebar}
              isHomePage={isHomePage}
            />
          </div>
        </div>
      </div>
      <div
        className={`${css.sidebar} ${!isHomePage && css.sidebarYellow} ${
          isSidebarOpen ? css.open : ''
        }`}>
        <div className={css.navWrapper}>
          <Nav
            closeSidebar={closeSidebar}
            isHomePage={isHomePage}
            variant='sidebar'
          />
          {isLoggedIn ? (
            <LogOutBtn closeSidebar={closeSidebar} isHomePage={isHomePage} />
          ) : (
            <AuthNav closeSidebar={closeSidebar} isHomePage={isHomePage} />
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
