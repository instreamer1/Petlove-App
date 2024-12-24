import css from './AddPetForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import iconSprite from '../../assets/sprite.svg';
import { useSelector } from 'react-redux';
import { selectSpeciesOptions } from '../../redux/notices/selectors';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  name: yup.string().required('Name is required'),
  imgURL: yup
    .string()
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      'Invalid image URL'
    )
    .required('Image URL is required'),
  species: yup.string().required('Species is required'),
  birthday: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    .required('Birthday is required'),
  sex: yup.string().required('Sex is required'),
});

const AddPetForm = ({ onSubmit }) => {
  const speciesOptions = useSelector(selectSpeciesOptions);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleBack = () => {
    navigate('/profile');
  };

  const handleFormSubmit = data => {
    onSubmit(data);
    reset();
    navigate('/profile');
  };

  const avatar = null;
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={css.form}>
      <h2 className={css.title}>
        Add my pet / <span>Personal details</span>
      </h2>

      <div className={css.radioGroup}>
        {['female', 'male', 'multiple'].map(sex => (
          <div key={sex} className={css.radioWrapper}>
            <input
              type='radio'
              id={sex}
              value={sex}
              {...register('sex')}
              className={css.radioInput}
            />
            <label
              htmlFor={sex}
              className={`${css.radioLabel} ${css[`${sex}RadioLabel`]}`}>
              <svg
                className={`${css.iconFame} ${css[`${sex}IconFame`]}`}
                aria-hidden='true'>
                <use href={`${iconSprite}#${sex}`}></use>
              </svg>
            </label>
          </div>
        ))}
      </div>
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
        <input
          type='text'
          placeholder='Enter URL'
          {...register('imgURL')}
          className={css.inputUpload}
        />
        <button type='button' className={css.uploadButton}>
          Upload photo{' '}
          <svg className={css.icon}>
            <use href={`${iconSprite}#cloud`}></use>
          </svg>
        </button>
      </div>

      <input
        type='text'
        placeholder='Title'
        {...register('title')}
        className={css.input}
      />
      {errors.title && <p className={css.error}>{errors.title.message}</p>}

      <input
        type='text'
        placeholder='Pet’s Name'
        {...register('name')}
        className={css.input}
      />
      {errors.name && <p className={css.error}>{errors.name.message}</p>}

      <div className={css.dateTypeWrapper}>
        <label htmlFor='birthday'>
          <input
            type='date'
            name='birthday'
            placeholder='00.00.0000'
            {...register('birthday')}
            className={`${css.input} ${css.inputDate}`}
          />
        </label>
        <select
          className={`${css.input} ${css.inputDate}`}
          {...register('species')}>
          <option value=''>Type of pet</option>
          {speciesOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={css.buttons}>
        <button type='button' onClick={handleBack} className={css.backButton}>
          Back
        </button>
        <button type='submit' className={css.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddPetForm;
