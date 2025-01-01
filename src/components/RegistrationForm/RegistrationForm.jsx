import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import css from './RegistrationForm.module.css';
import iconSprite from '../../assets/sprite.svg';
import { useState } from 'react';
import Button from '../Button/Button';

const registrationSchema = yup.object().shape({
  name: yup.string().required('Name is required!'),
  email: yup
    .string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'Enter a valid Email'
    ),
  password: yup
    .string()
    .min(7, 'Password must contain at least 7 characters!')
    .required('Password is required!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match!')
    .required('Confirm password is required!'),
});

const RegistrationForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const passwordValue = watch('password');

  const handleFormSubmit = data => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={css.form}>
      <div className={css.inputGroup}>
        <input
          type='text'
          placeholder='Name'
          {...register('name')}
          className={css.input}
        />
        {errors.name && <p className={css.error}>{errors.name.message}</p>}
      </div>
      <div className={css.inputGroup}>
        <input
          type='email'
          placeholder='Email'
          {...register('email')}
          className={`${css.input} ${
            errors.email
              ? css.inputError
              : watch('email') &&
                /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
                  watch('email')
                )
              ? css.inputValid
              : css.inputTyping
          }`}
        />

        {errors.email && (
          <svg className={css.iconError}>
            <use href={`${iconSprite}#shape`}></use>
          </svg>
        )}
        {!errors.email &&
          watch('email') &&
          /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
            watch('email')
          ) && (
            <svg className={css.iconValid}>
              <use href={`${iconSprite}#check`}></use>
            </svg>
          )}
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
      </div>
      <div className={css.inputGroup}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          {...register('password')}
          className={`${css.input} ${
            errors.password
              ? css.inputError
              : passwordValue?.length >= 7
              ? css.inputValid
              : ''
          }`}
        />
        <div className={css.iconWrapper}>
          {errors.password && (
            <svg className={css.iconError}>
              <use href={`${iconSprite}#shape`}></use>
            </svg>
          )}
          {!errors.password && passwordValue?.length >= 7 && (
            <svg className={css.iconValid}>
              <use href={`${iconSprite}#check`}></use>
            </svg>
          )}
        </div>
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className={css.eyeButton}>
          {showPassword ? (
            <svg className={css.eyeIcon}>
              <use href={`${iconSprite}#eye`}></use>
            </svg>
          ) : (
            <svg className={css.eyeIcon}>
              <use href={`${iconSprite}#eyeOff`}></use>
            </svg>
          )}
        </button>
        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}

        {!errors.password && passwordValue?.length >= 7 && (
          <p className={css.success}>Password is secure</p>
        )}
      </div>
      <div className={css.inputGroup}>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder='Confirm Password'
          {...register('confirmPassword')}
          className={`${css.input} ${
            errors.confirmPassword
              ? css.inputError
              : watch('confirmPassword') === watch('password') &&
                watch('confirmPassword')?.length >= 7
              ? css.inputValid
              : ''
          }`}
        />
        <div className={css.iconWrapper}>
          {(() => {
            const password = watch('password');
            const confirmPassword = watch('confirmPassword');
            const isMatching = confirmPassword === password;
            const hasLength = confirmPassword?.length >= 7;

            if (isMatching && hasLength) {
              return (
                <svg className={css.iconValid}>
                  <use href={`${iconSprite}#check`}></use>
                </svg>
              );
            }

            if (confirmPassword?.length >= 1 && !isMatching) {
              return (
                <svg className={css.iconError}>
                  <use href={`${iconSprite}#shape`}></use>
                </svg>
              );
            }

            return null;
          })()}
        </div>
        <button
          type='button'
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className={css.eyeButton}>
          {showConfirmPassword ? (
            <svg className={css.eyeIcon}>
              <use href={`${iconSprite}#eye`}></use>
            </svg>
          ) : (
            <svg className={css.eyeIcon}>
              <use href={`${iconSprite}#eyeOff`}></use>
            </svg>
          )}
        </button>
        {errors.confirmPassword && (
          <p className={css.error}>{errors.confirmPassword.message}</p>
        )}
      </div>
      <div className={css.btnWrapper}>
        <Button description='Registration' variant='modal' type='submit' />
      </div>
    </form>
  );
};

RegistrationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RegistrationForm;
