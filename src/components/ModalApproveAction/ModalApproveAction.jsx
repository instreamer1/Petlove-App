import Modal from '../Modal/Modal';
import css from './ModalApproveAction.module.css';
import cat from '../../assets/images/catEmoji.png';

const ModalApproveAction = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  description,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className={css.modalWrapper}>
        <div className={css.imgWrapper}>
          <img src={cat} alt='cat' />
        </div>
        <h2 className={css.title}>{title}</h2>
        <div className={css.actions}>
          <button
            type='button'
            className={css.confirmButton}
            onClick={onConfirm}>
            Yes
          </button>
          <button type='button' className={css.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalApproveAction;
