import css from './LogOutBtn.module.css';

const LogOutBtn = ({closeSidebar})=> {
    return (
        <div>
            <button type="button" onClick={closeSidebar}>LogOutBtn</button>
        </div>
    );
}

export default LogOutBtn;

// Компонент рендерить кнопку для виходу користувача з облікового запису.  Клік по кнопці відкриває модальне вікно  ModalApproveAction