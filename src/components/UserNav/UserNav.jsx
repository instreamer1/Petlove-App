import { useEffect, useState } from 'react';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import UserBar from '../UserBar/UserBar';
import css from './UserNav.module.css';

const UserNav = ({isHomePage}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  // const isLoggedIn = useSelector(selectIsLoggedIn);


    useEffect(() => {
      const handleResize = () => {
        const width = window.innerWidth;
        setIsMobile(width < 768); 
        setIsTablet(width >= 768 && width < 1280); 
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);



  return (
    <div className={`${css.userNav} ${isHomePage ? css.userNavHome : css.userNavOther }`}>
     { (isTablet || !isMobile) &&  <LogOutBtn />}
      <UserBar isHomePage={isHomePage}/>
    </div>
  );
};

export default UserNav;

// "Компонент відмальовується тільки авторизованим користувачам і містить:
//   - UserBar
//   - LogOutBtn

// На мобільній версії компонент потрібно розмістити в бургер меню"
