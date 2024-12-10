import Modal from '../Modal/Modal';
import css from './ModalApproveAction.module.css';
import iconSprite from '../../assets/sprite.svg'

const ModalApproveAction = ({ isOpen, onConfirm, onCancel, title, description }) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <h2 className={css.title}>{title}</h2>
      <p className={css.description}>{description}</p>
      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className={css.confirmButton} onClick={onConfirm}>
          Yes
        </button>
      </div>
    </Modal>
  );
};

export default ModalApproveAction;

