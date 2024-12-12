import PropTypes from 'prop-types';
import css from "./UserBlock.module.css"
import EditUserBtn from '../EditUserBtn/EditUserBtn';


const UserBlock = ({ user }) => {
//   const { avatar, name, email, phone } = user;

  return (
    <div className={css.userBlock}>
      <div className={css.userAvatar}>
        {/* {avatar ? ( */}
          <img 
        //   src={avatar} alt={`${name}'s avatar`}
           className={css.avatar} />
        {/* ) : ( */}
          <EditUserBtn />
        {/* )} */}
      </div>
      <div className={css.userInfo}>
        <div className={css.avatarWrapper}>
          <div className={css.avatar}></div>
          <button className={css.uploadPhotoBtn}>Upload photo</button>
        </div>
        <div className={css.userDetails}>
          <input type="text" placeholder="Name" className={css.input} />
          <input type="email" placeholder="name@gmail.com" className={css.input} />
          <input type="tel" placeholder="+380" className={css.input} />
        </div>
      </div>
    </div>
  );
};

export default UserBlock

// UserBlock.propTypes = {
//   user: PropTypes.shape({
//     avatar: PropTypes.string,
//     name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     phone: PropTypes.string.isRequired,
//   }).isRequired,
// };

// export default UserBlock;


