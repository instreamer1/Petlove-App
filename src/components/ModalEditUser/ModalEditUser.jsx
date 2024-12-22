import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './ModalEditUser.module.css';
import Modal from '../Modal/Modal';
import iconSprite from '../../assets/sprite.svg';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  avatar: Yup.string()
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      'Invalid avatar URL'
    )
    .required('Avatar URL is required'),
  phone: Yup.string()
    .matches(/^\+38\d{10}$/, 'Invalid phone number format (+38XXXXXXXXXX)')
    .required('Phone number is required'),
});

const ModalEditUser = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = data => {
    console.log(data);
  };

  const avatar = null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.modalBackdrop}>
        <div className={css.modalContent} onClick={e => e.stopPropagation()}>
          <h2 className={css.title}>Edit information</h2>

          <div className={css.imgWrapper}>
            {avatar !== null ? (
              <img src='' alt='' className={css.image} />
            ) : (
              <div className={css.iconFootWrapper}>
                <svg className={css.iconFoot}>
                  <use href={`${iconSprite}#foot`}></use>
                </svg>
              </div>
            )}
          </div>

          <div className={css.upload}>
            {/* <label>
            Avatar URL: */}
            <input
              type='text'
              {...register('avatar')}
              className={css.avatarInput}
            />

            {/* </label> */}
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
          <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
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
                placeholder='+380'
              />
              {errors.phone && (
                <p className={css.error}>{errors.phone.message}</p>
              )}
            </label>
            <div className={css.buttons}>
              <button type='submit' className={css.saveButton}>
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
