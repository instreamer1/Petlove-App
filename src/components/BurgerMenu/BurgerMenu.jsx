import css from './BurgerMenu.module.css';

const BurgerMenu = ({ isOpen, onClick, isHomePage }) => {
 
  return (
    <div className={css.burgerMenu} onClick={onClick}>
      <div
        className={`${isHomePage ? css.burgerLineWhite : css.burgerLineBlack} ${
          isOpen ? css.open : ''
        }`}></div>
      <div
        className={`${isHomePage ? css.burgerLineWhite : css.burgerLineBlack} ${
          isOpen ? css.open : ''
        }`}></div>
      <div
        className={`${isHomePage ? css.burgerLineWhite : css.burgerLineBlack} ${
          isOpen ? css.open : ''
        }`}></div>
    </div>
  );
};

export default BurgerMenu;
