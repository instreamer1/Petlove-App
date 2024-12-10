import { useEffect, useState } from 'react';
import css from './Header.module.css';

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
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

    // Определяем тип устройства
    useEffect(() => {
      const handleResize = () => {
        const width = window.innerWidth;
        setIsMobile(width < 768); // Мобильная версия
        setIsTablet(width >= 768 && width < 1280); // Планшетная версия
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

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
          <div className={css.navWrapperTablet}>
            {isLoggedIn ? (
              <UserNav isHomePage={isHomePage} />
            ) : (
              // В планшетной или десктопной версии отображаем AuthNav
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
          <Nav isHomePage={isHomePage} />
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
