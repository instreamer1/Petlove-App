import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './ModalEditUser.module.css';
import Modal from '../Modal/Modal';
import iconSprite from '../../assets/sprite.svg';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectIsLoading,
  selectUser,
} from '../../redux/users/selectors';
import { editUser } from '../../redux/users/operations';
import defaultImage from '../../assets/images/defaultImage.png';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'Invalid email format'
    )
    .required('Email is required'),
  avatar: Yup.string()
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      'Invalid avatar URL format'
    )
    .required('Avatar URL is required'),
  phone: Yup.string()
    .matches(/^\+38\d{10}$/, 'Invalid phone number format (+38XXXXXXXXXX)')
    .required('Phone number is required'),
});

const ModalEditUser = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const user = useSelector(selectUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async data => {
    try {
      await dispatch(editUser(data));

      toast.success('User data updated successfully');
      onClose();
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.modalBackdrop}>
        <div className={css.modalContent} onClick={e => e.stopPropagation()}>
          <h2 className={css.title}>Edit information</h2>
          <div className={css.imgWrapper}>
            {user.avatar ? (
              <img
                src={user.avatar || defaultImage}
                alt={`${user.name}'s avatar ||  Unknown`}
                className={css.image}
                onError={e => {
                  e.target.src = defaultImage;
                }}
              />
            ) : (
              <div className={css.iconFootWrapper}>
                <svg className={css.iconUser}>
                  <use href={`${iconSprite}#user`}></use>
                </svg>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
            <div className={css.upload}>
              <label>
                <input
                  type='text'
                  {...register('avatar')}
                  className={css.avatarInput}
                  placeholder='Avatar URL'
                />
                {errors.avatar && (
                  <p className={css.error}>{errors.avatar.message}</p>
                )}
              </label>
              <button
                type='button'
                onClick={onClose}
                className={css.uploadButton}>
                Upload photo{' '}
                <svg className={css.icon}>
                  <use href={`${iconSprite}#cloud`}></use>
                </svg>
              </button>
            </div>

            <label>
              <input
                type='text'
                {...register('name')}
                className={css.input}
                placeholder='Name'
              />
              {errors.name && (
                <p className={css.error}>{errors.name.message}</p>
              )}
            </label>
            <label>
              <input
                type='email'
                {...register('email')}
                className={css.input}
                placeholder='Email'
              />
              {errors.email && (
                <p className={css.error}>{errors.email.message}</p>
              )}
            </label>
            <label>
              <input
                type='tel'
                {...register('phone')}
                className={css.input}
                placeholder='+38 (XXX) XXX-XX-XX'
              />
              {errors.phone && (
                <p className={css.error}>{errors.phone.message}</p>
              )}
            </label>

            <div className={css.buttons}>
              <button
                type='submit'
                className={css.saveButton}
                disabled={isLoading}>
                Go to profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditUser;
