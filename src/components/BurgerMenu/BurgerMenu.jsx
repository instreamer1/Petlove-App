import css from './BurgerMenu.module.css';

const BurgerMenu = ({ isOpen, onClick }) => {
  return (
    <div className={css.burgerMenu} onClick={onClick}>
      <div className={`${css.burgerLineWite} ${isOpen ? css.open : ""}`}></div>
      <div className={`${css.burgerLineWite} ${isOpen ? css.open : ""}`}></div>
      <div className={`${css.burgerLineWite} ${isOpen ? css.open : ""}`}></div>
    </div>
  );
};

export default BurgerMenu;
