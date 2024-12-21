import css from "./CustomDropdownIndicator.module.css"
import iconSprite from '../../assets/sprite.svg';

const CustomDropdownIndicator = ({ onSearch }) => {
  return (
    <div className={css.buttonGroup}>
      <button
        type='button'
        className={css.button}
        onClick={
        onSearch
        }
        >
        <svg className={css.icon}>
          <use href={`${iconSprite}#search`}></use>
        </svg>
      </button>
    </div>
  );
};

export default CustomDropdownIndicator;
