import { useState } from 'react';
import css from './EditUserBtn.module.css';
import ModalEditUser from '../ModalEditUser/ModalEditUser';
import iconSprite from '../../assets/sprite.svg';

const EditUserBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={css.editButton} onClick={openModal}>
        <svg className={css.icon}>
          <use href={`${iconSprite}#edit`}></use>
        </svg>
      </button>
      <ModalEditUser isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default EditUserBtn;
