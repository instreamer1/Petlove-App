import css from './EditUserBtn.module.css';
import iconSprite from '../../assets/sprite.svg';

const EditUserBtn = ({ openModal }) => {
  return (
    <>
      <button className={css.editButton} onClick={openModal}>
        <svg className={css.icon}>
          <use href={`${iconSprite}#edit`}></use>
        </svg>
      </button>
    </>
  );
};

export default EditUserBtn;
