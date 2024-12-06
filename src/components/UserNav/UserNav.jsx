import LogOutBtn from '../LogOutBtn/LogOutBtn';
import UserBar from '../UserBar/UserBar';
import css from './UserNav.module.css';

const UserNav = ({closeSidebar}) => {
  return (
    <div>
      {/* <UserBar /> */}
      <LogOutBtn closeSidebar={closeSidebar}/>
    </div>
  );
};

export default UserNav;

// "Компонент відмальовується тільки авторизованим користувачам і містить:
//   - UserBar
//   - LogOutBtn

// На мобільній версії компонент потрібно розмістити в бургер меню"
