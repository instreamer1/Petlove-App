import PropTypes from 'prop-types';
import css from './UserBlock.module.css';
import EditUserBtn from '../EditUserBtn/EditUserBtn';

const UserBlock = ({ user }) => {
  const { avatar, name, email, phone } = user;

  return (
    <div className={css.userBlock}>
      <div className={css.userAvatar}>
        {/* {avatar ? ( */}
        <img
          //   src={avatar} alt={`${name}'s avatar`}
          className={css.avatar}
        />
        {/* ) : ( */}
        <EditUserBtn />
        {/* )} */}
      </div>
      <div className={css.userBlock}>
        <div className={css.userAvatar}>
          {avatar ? (
            <img src={avatar} alt='User Avatar' className={css.avatarImg} />
          ) : (
            <button className={css.editUserBtn}>Edit Profile</button>
          )}
        </div>
        <div className={css.userInfo}>
          <h3 className={css.userTitle}>My information</h3>

          <input
            type='text'
            defaultValue={name || ''}
            className={css.userName} disabled
          />
          <input
            type='text'
            defaultValue={email || ''}
            className={css.userEmail} disabled
          />
          <input
            type='text'
            defaultValue={phone || ''}
            className={css.userPhone} disabled
          />
        </div>
      </div>
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
