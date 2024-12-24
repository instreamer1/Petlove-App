import PropTypes from 'prop-types';
import css from './UserBlock.module.css';
import EditUserBtn from '../EditUserBtn/EditUserBtn';
import iconSprite from '../../assets/sprite.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ModalEditUser from '../ModalEditUser/ModalEditUser';
import defaultImage from '../../assets/images/defaultImage.png';

const UserBlock = ({ user }) => {
  const { avatar, name, email, phone } = user;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.userBlock}>
      <div className={css.userBlockHeader}>
        <div className={css.userLogo}>
          <p className={css.userLogoText}>User</p>
          <svg className={css.iconUserLogo}>
            <use href={`${iconSprite}#user`}></use>
          </svg>
        </div>
        <EditUserBtn openModal={openModal} />
      </div>

      <div className={css.userAvatar}>
        {avatar ? (
          <img
            src={avatar || defaultImage}
            alt={`${name}'s avatar ||  Unknown`}
            className={css.image}
            onError={e => {
              e.target.src = defaultImage;
            }}
          />
        ) : (
          <svg className={css.iconUserAvatar}>
            <use href={`${iconSprite}#user`}></use>
          </svg>
        )}
      </div>
      <Link
        className={css.linkToEdit}
        to='#'
        onClick={e => {
          e.preventDefault();
          openModal();
        }}>
        Upload photo
      </Link>

      <div className={css.userInfo}>
        <h3 className={css.userTitle}>My information</h3>
        <div className={css.userInputsGroup}>
          <input
            type='text'
            defaultValue={name || ''}
            className={css.userName}
            disabled
          />
          <input
            type='text'
            defaultValue={email || ''}
            className={css.userEmail}
            disabled
          />
          <input
            type='text'
            defaultValue={phone || ''}
            className={css.userPhone}
            disabled
          />
        </div>
      </div>
      <ModalEditUser isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default UserBlock;

UserBlock.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
  }).isRequired,
};
