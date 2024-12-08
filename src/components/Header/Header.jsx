import { useState } from 'react';
import css from './Header.module.css';

import Logo from '../Logo/Logo';
import Nav from '../Nav/Nav';
import AuthNav from '../AuthNav/AuthNav';
import UserNav from '../UserNav/UserNav';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';


const Header = ({isHomePage}) => {
 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);

  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={`${css.wrapper} ${isHomePage ? css.wrapperHomePage : ''}`}>
      <Logo isHomePage={isHomePage}/>
      <div className={css.navWrapperTablet}>
      {isLoggedIn ? <UserNav /> : <AuthNav  />}
     
      </div>
      <div className={css.burgerWrapper}>
        <BurgerMenu isOpen={isSidebarOpen} onClick={toggleSidebar} isHomePage={isHomePage}/>
      </div>

      <div className={`${css.sidebar} ${!isHomePage && css.sidebarYellow } ${isSidebarOpen ? css.open : ''}`}>
        <div className={css.navWrapper}>
      
          <Nav isHomePage= {isHomePage}/>
          {isLoggedIn ? <UserNav closeSidebar={closeSidebar}/> : <AuthNav closeSidebar={closeSidebar} isHomePage={isHomePage} />}
    
        
        </div>
      </div>
    </div>
  );
};

export default Header;
