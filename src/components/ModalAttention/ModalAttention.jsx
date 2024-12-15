import css from './ModalAttention.module.css';
import Modal from '../Modal/Modal';
import AuthNav from '../AuthNav/AuthNav';
import dog from '../../assets/images/dog.png';

const ModalAttention = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.modalAttention}>
        <div className={css.imgWrap}>
          <img src={dog} alt='dog' />
        </div>
        <h3 className={css.title}>Attention</h3>
        <p className={css.description}>
          We would like to remind you that certain functionality is available
          only to authorized users.If you have an account, please log in with
          your credentials. If you do not already have an account, you must
          register to access these features.
        </p>
        <AuthNav />
      </div>
    </Modal>
  );
};

export default ModalAttention;
