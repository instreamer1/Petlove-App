import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import css from './LogOutBtn.module.css';
import { logOut } from '../../redux/users/operations';

import { toast } from 'react-hot-toast';
import ModalApproveAction from '../ModalApproveAction/ModalApproveAction';

const LogOutBtn = ({ closeSidebar, isHomePage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    try {
      await dispatch(logOut()).unwrap(); 
      toast.success('You have successfully logged out.');
      
    } catch (error) {
      toast.error('Failed to log out. Please try again.');
    } finally {
      closeSidebar();
      localStorage.removeItem('authToken'); 
      navigate('/'); 
    }
  };

  return (
    <>
      <div className={css.logOutBtn} >
        <button
          type='button'
          onClick={openModal}
          className={`${css.button} ${
            isHomePage ? css.buttonHome : css.buttonHeader
          }`}>
          Log out
        </button>
      </div>
      <ModalApproveAction
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={closeModal}
        title="Already leaving?"
        description=""
      />
    </>
  );
};

export default LogOutBtn;