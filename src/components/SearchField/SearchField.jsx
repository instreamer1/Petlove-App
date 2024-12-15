// import PropTypes from 'prop-types';
import css from './SearchField.module.css';
import { useState } from 'react';
import iconSprite from '../../assets/sprite.svg';

const SearchField = ({ onSearch }) => {

  
  const [value, setValue] = useState('');

  const handleInputChange = e => setValue(e.target.value);

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <div onSubmit={handleSubmit} className={css.form}>
      <div className={css.inputGroup}>
        <input
          type='text'
          value={value}
          onChange={handleInputChange}
          placeholder='Search'
          className={css.input}
        />
        <div className={css.buttonGroup}>
          {value && (
            <button
              type='button'
              onClick={handleClear}
              className={`${css.button} ${css.clearButton}`}>
              <svg className={css.icon}>
                <use href={`${iconSprite}#closeModal`}></use>
              </svg>
            </button>
          )}

          <button type='submit' className={css.button}>
            <svg className={css.icon}>
              <use href={`${iconSprite}#search`}></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchField;

// SearchField.propTypes = {
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   placeholder: PropTypes.string,
//   className: PropTypes.string,
// };
