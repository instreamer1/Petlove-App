import css from './AddPetForm.module.css';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import iconSprite from '../../assets/sprite.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectNoticesLoading,
  selectSpeciesOptions,
} from '../../redux/notices/selectors';
import { useEffect, useState } from 'react';
import { fetchSpeciesOptions } from '../../redux/notices/operations';

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
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const speciesOptions = useSelector(selectSpeciesOptions);
  const loading = useSelector(selectNoticesLoading);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    isSubmitting,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(fetchSpeciesOptions());
  }, [dispatch]);

  const handleUrlChange = event => {
    const value = event.target.value;
    setImageUrl(value);
    setValue('imgURL', value);
  };

  const handleFileChange = async event => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setUploading(true);
      try {
        const uploadedUrl = await uploadFile(selectedFile);

        if (uploadedUrl) {
          setImageUrl(uploadedUrl);
          setValue('imgURL', uploadedUrl);
        }
      } catch (error) {
        console.error('File upload error:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const uploadFile = async file => {
    try {
      console.log('Uploading file:', file);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'pets_images');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/ddfdrl27n/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const data = await response.json();

      if (data.url) {
        setImageUrl(data.url);
        return data.url;
      } else {
        throw new Error('Unable to get image URL');
      }
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  };

  const handleBack = () => {
    navigate('/profile');
  };

  const handleFormSubmit = data => {
    onSubmit(data);
    reset();
  };

  return (
    <>
      <h2 className={css.title}>
        Add my pet / <span>Personal details</span>
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={css.form}>
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
        {errors.sex && <p className={css.error}>{errors.sex.message}</p>}

        <div className={css.imgWrapper}>
          {uploading ? (
            <p>loading...</p>
          ) : imageUrl ? (
            <img src={imageUrl} alt='Uploaded' className={css.image} />
          ) : (
            <div className={css.iconFootWrapper}>
              <svg className={css.iconFoot}>
                <use href={`${iconSprite}#foot`}></use>
              </svg>
            </div>
          )}
        </div>

        <div className={css.upload}>
          <Controller
            name='imgURL'
            control={control}
            defaultValue={imageUrl}
            render={({ field }) => (
              <input
                type='text'
                value={imageUrl}
                onInput={e => {
                  handleUrlChange(e);
                  field.onChange(e);
                }}
                placeholder='Enter URL'
                className={css.inputUpload}
              />
            )}
          />

          <label className={css.uploadButton}>
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              style={{ display: 'none' }}
              disabled={uploading}
            />
            {uploading ? (
              <span>Loading...</span> 
            ) : (
              <>
                Upload photo
                <svg className={css.icon}>
                  <use href={`${iconSprite}#cloud`}></use>
                </svg>
              </>
            )}
          </label>
        </div>
        {errors.imgURL && <p className={css.error}>{errors.imgURL.message}</p>}
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
          <div>
            <label htmlFor='birthday' className={css.birthdayLabel}>
              <input
                type='text'
                name='birthday'
                placeholder='0000-00-00'
                lang='en'
                {...register('birthday')}
                className={`${css.input} ${css.inputDate}`}
              />
              <svg className={`${css.icon} ${css.iconCalendar}`}>
                <use href={`${iconSprite}#calendar`}></use>
              </svg>
            </label>
            {errors.birthday && (
              <p className={css.error}>{errors.birthday.message}</p>
            )}
          </div>
          <div>
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
            {errors.species && (
              <p className={css.error}>{errors.species.message}</p>
            )}
          </div>
        </div>
        <div className={css.buttons}>
          <button
            type='button'
            onClick={handleBack}
            className={`${css.button} ${css.backButton}`}>
            Back
          </button>
          <button
            type='submit'
            aria-label='Submit'
            className={`${css.button} ${css.submitButton}`}
            disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddPetForm;
