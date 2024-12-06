import css from './RegistrationPage.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import iconSprite from '../../assets/sprite.svg';
import { useDispatch } from 'react-redux';
import registrationMobile from '../../assets/images/mobRegistr.png';
import registrationMobile2x from '../../assets/images/mobRegistr2x.png';
import registrationTablet from '../../assets/images/img_register_tab.png';
import registrationTablet2x from '../../assets/images/img_register_tab2x.png';
import registrationDesktop from '../../assets/images/registrationDesktop.jpg';
import registrationDesktop2x from '../../assets/images/catNotFoundDesktop@2x.png';
import registration from '../../assets/images/registranioncat.png';

const registrationSchema = yup.object().shape({
  name: yup.string().required('Name is required!'),
  email: yup
    .string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'Invalid email format!'
    )
    .required('Email is required!'),
  password: yup
    .string()
    .min(7, 'Password must contain at least 7 characters!')
    .required('Password is required!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match!')
    .required('Confirm password is required!'),
});

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = async data => {
    const { name, email, password } = data;
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      toast.success('User registered successfully!');
      reset();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <section className={css.register}>
      <div className={css.container}>
        <div className={css.imageWrapper}>
          <div className={css.image}>
            {/* <picture>
              <source
                srcSet={`${registrationDesktop} 1x, ${registrationDesktop2x} 2x`}
                media='(min-width: 1280px)'
              />

              <source
                srcSet={`${registrationTablet} 1x, ${registrationTablet2x} 2x`}
                media='(min-width: 768px)'
              /> */}

              <source
                srcSet={`${registrationMobile} 1x, ${registrationMobile2x} 2x`}
                media='(min-width: 320px)'
              />

              <img
                className={css.img}
                src={registrationMobile}
                alt='Cat'
                loading='lazy'
              />
            {/* </picture> */}
          </div>
        </div>
        <div className={css.wrapper}>
          <h2 className={css.registerTitle}>Registration</h2>
          <p className={css.registerDesc}>
            Thank you for your interest in our platform.
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={css.inputsWrapper}>
              <div className={css.inputWrapper}>
                <label>
                  <input
                    type='text'
                    placeholder='Name'
                    {...register('name')}
                    className={css.registerInput}
                  />
                  {errors.name && (
                    <p className={css.error}>{errors.name.message}</p>
                  )}
                </label>
              </div>

              <div className={css.inputWrapper}>
                <label>
                  <input
                    type='email'
                    placeholder='Email'
                    {...register('email')}
                    className={css.registerInput}
                  />
                  {errors.email && (
                    <p className={css.error}>{errors.email.message}</p>
                  )}
                </label>
              </div>

              <div className={css.inputWrapper}>
                <div className={css.passwordWrapper}>
                  <label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Password'
                      {...register('password')}
                      className={css.registerInput}
                    />
                  </label>
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
                </div>
                {errors.password && (
                  <p className={css.error}>{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className={css.inputWrapper}>
              <div className={css.passwordWrapper}>
                <label>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm password'
                    {...register('confirmPassword')}
                    className={css.registerInput}
                  />
                </label>
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
              </div>
            </div>

            <div className={css.btnWrapper}>
              <Button
                description='Registration'
                variant='modal'
                type='submit'
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationPage;
