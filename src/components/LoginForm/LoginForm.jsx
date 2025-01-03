import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import css from './LoginForm.module.css';
import iconSprite from '../../assets/sprite.svg';
import { useState } from 'react';
import Button from '../Button/Button';

const registrationSchema = yup.object().shape({
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
});

const LoginForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

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
      <div className={css.btnWrapper}>
        <Button description='log in' variant='modal' type='submit' />
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
