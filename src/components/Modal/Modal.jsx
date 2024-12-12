import ReactModal from 'react-modal';
import css from './Modal.module.css';
import iconSprite from '../../assets/sprite.svg';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => onClose()}
      className={css.modal}
      ariaHideApp={false}
      overlayClassName={css.overlay}>
      <button className={css.closeIcon} onClick={onClose}>
        <svg className={css.icon}>
          <use href={`${iconSprite}#closeModal`}></use>
        </svg>
      </button>
      {children}
    </ReactModal>
  );
};

export default Modal;
