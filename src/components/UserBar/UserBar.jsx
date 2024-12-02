import css from './UserBar.module.css';
import iconSprite from '../../assets/sprite.svg'
import { NavLink } from 'react-router-dom';
const UserBar = () => {
    return (
        <div>
            <NavLink className={css.userBar} to="/profile"    > <svg className={css.icon}>
            <use href={`${iconSprite}#user`}></use></svg></NavLink>
           
        </div>
    );
}

export default UserBar;

// UserBar містить посилання на приватний маршрут /profile, що переадресує авторизованого користувача на сторінку Profile page, і складається з поточної актуальної аватарки користувача та його імені. У разі відсутності аватарки - слід відмальовувати зображення за замовчуванням.