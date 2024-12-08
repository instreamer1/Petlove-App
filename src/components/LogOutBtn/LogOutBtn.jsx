import { useDispatch } from 'react-redux';
import css from './LogOutBtn.module.css';
import { logOut } from '../../redux/auth/operations';

const LogOutBtn = ({closeSidebar})=> {
const dispatch = useDispatch()
const handleClick= ()=>{
dispatch(logOut())
closeSidebar()
}

    return (
        <div>
            <button type="button"   onClick={handleClick} className={css.button}>Log out</button>
        </div>
    );
}

export default LogOutBtn;

// Компонент рендерить кнопку для виходу користувача з облікового запису.  Клік по кнопці відкриває модальне вікно  ModalApproveAction