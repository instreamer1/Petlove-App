// import PropTypes from 'prop-types';
import css from './NoticesFilters.module.css';

import Select from 'react-select';
import iconSprite from '../../assets/sprite.svg';
import SearchField from '../SearchField/SearchField';
import { useState } from 'react';
import CustomDropdownIndicator from '../CustomDropdownIndicator/CustomDropdownIndicator';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '30px',
    border: state.isFocused ? '1px solid #f6b83d' : 'none',
    boxShadow: 'none',
    '&:hover': { border: '1px solid #f6b83d' },
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: ' #262626',
    borderWidth: '1.5px',
    strokeWidth: '1.5px',
    display: 'none',
  }),
  indicatorSeparator: (provided, state) => ({
    width: '0',
  }),
};

const NoticesFilters = ({
  filters,
  onFilterChange,
  onFilterCitiesChange,
  onResetFilters,
  categories,
  sexOptions,
  speciesOptions,
  locationsList,
  citiesList,
}) => {
  const [isChoosingCity, setIsChoosingCity] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  // const sortValues = {
  //   popular: false,
  //   unpopular: true,
  //   cheap: true,
  //   expensive: false,
  // };

  const formatOptions = list =>
    list.map(item => ({
      value: item._id,
      label: `${item.stateEn}, ${item.cityEn}`,
      cityEn: item.cityEn,
      stateEn: item.stateEn,
    }));

  const handleInputChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleChange = option => {
    if (!isChoosingCity) {
      setSelectedLocation(option);
      setSelectedCity(null);
    } else {
      setSelectedCity(option);
    }
  };

  const handleSearch = () => {
    if (!isChoosingCity && selectedLocation) {
      onFilterCitiesChange(selectedLocation.cityEn);
      setIsChoosingCity(true);
    } else if (isChoosingCity && selectedCity) {
      console.log('selectedCity', selectedCity);
      onFilterChange({
        ...filters,
        locationId: selectedCity.value || null,
      });
      setIsChoosingCity(false);
    }
  };

  const handleOptionChange = (key, value) => {
    setSelectedOption({ key, value }); // Устанавливаем выбранный вариант
    handleInputChange(key, value); // Вызываем обработчик с нужным значением
  };

  // const handleClearOption = optionKey => {
  //   // Обновляем состояние, сбрасывая выбранную опцию
  //   setSelectedOption(prevState => ({
  //     ...prevState,
  //     [optionKey]: { key: null, value: null }, // сбрасываем значение
  //   }));
  // };

  const handleClearOption = key => {
    setSelectedOption(null); // Сбрасываем выбор
    handleInputChange(key, 'null'); // Устанавливаем значение как "false"
  };

  return (
    <div className={css.filtersForm}>
      <div className={css.filtersFormWrapper}>
        <div className={css.filtersFormField}>
          <SearchField
            onSearch={value => handleInputChange('keyword', value)}
          />
        </div>
        <div className={css.filtersFormFrame}>
          <div className={css.frame}>
            <select
              className={css.frameFormSelect}
              value={filters.category}
              onChange={e => handleInputChange('category', e.target.value)}>
              <option value=''>Category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <svg className={css.icon}>
              <use href={`${iconSprite}#arrowDown`}></use>
            </svg>
          </div>
          <div className={css.frame}>
            <select
              className={css.frameFormSelect}
              value={filters.sex}
              onChange={e => handleInputChange('sex', e.target.value)}>
              <option value=''>By gender</option>
              {sexOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <svg className={css.icon}>
              <use href={`${iconSprite}#arrowDown`}></use>
            </svg>
          </div>
        </div>
        <div className={css.filtersFormField}>
          <div className={css.frameType}>
            <select
              className={css.typeFormSelect}
              value={filters.species}
              onChange={e => handleInputChange('species', e.target.value)}>
              <option value=''>By type</option>
              {speciesOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <svg className={css.icon}>
              <use href={`${iconSprite}#arrowDown`}></use>
            </svg>
          </div>
        </div>

        <div className={css.locationFormField}>
          <Select
            className={css.filtersFormLocationSelect}
            components={{
              DropdownIndicator: props => (
                <CustomDropdownIndicator
                  onSearch={handleSearch}
                  hasValue={!!selectedLocation}
                />
              ),
            }}
            options={
              isChoosingCity
                ? formatOptions(citiesList)
                : formatOptions(locationsList)
            }
            value={isChoosingCity ? selectedCity : selectedLocation}
            onChange={option => {
              handleChange(option);

              if (!option) {
                onFilterChange({ ...filters, locationId: null });
              }
            }}
            styles={customStyles}
            placeholder={isChoosingCity ? 'Select City' : ' Location'}
            isClearable
            classNamePrefix='filtersFormLocationSelect'
          />
        </div>
      </div>

      <hr className={css.horizontalLine} />
      {/* radio-button  */}
      <div className={css.filtersRadioGroup}>
        {/** Кнопка "Popular" */}
        <label
          className={`sort-option ${
            selectedOption?.key === 'byPopularity' &&
            selectedOption?.value === 'true'
              ? 'active'
              : ''
          }`}>
          <input
            type='radio'
            name='Popular'
            value='null'
            checked={
              selectedOption?.key === 'byPopularity' &&
              selectedOption?.value === 'true'
            }
            onChange={() => handleOptionChange('byPopularity', 'true')}
          />
          Popular
          {selectedOption?.key === 'byPopularity' &&
            selectedOption?.value === 'true' && (
              <input
                className='reset2'
                type='button'
                value='✖' // Крестик как текст
                onClick={e => {
                  e.stopPropagation();
                  handleClearOption('byPopularity');
                }}
              />
            )}
        </label>

        {/** Кнопка "Unpopular" */}
        <label
          className={`sort-option ${
            selectedOption?.key === 'byPopularity' &&
            selectedOption?.value === 'false'
              ? 'active'
              : ''
          }`}>
          <input
            type='radio'
            name='Unpopular'
            value='false'
            checked={
              selectedOption?.key === 'byPopularity' &&
              selectedOption?.value === 'false'
            }
            onChange={() => handleOptionChange('byPopularity', 'false')}
          />
          Unpopular
          {selectedOption?.key === 'byPopularity' && (
            <span
              className='clear-button'
              onClick={e => {
                e.stopPropagation();
                handleClearOption('byPopularity');
              }}>
              ✖
            </span>
          )}
        </label>

        {/** Кнопка "Cheap" */}
        <label
          className={`sort-option ${
            selectedOption?.key === 'byPrice' &&
            selectedOption?.value === 'true'
              ? 'active'
              : ''
          }`}>
          <input
            type='radio'
            name='byPrice'
            value='true'
            checked={
              selectedOption?.key === 'byPrice' &&
              selectedOption?.value === 'true'
            }
            onChange={() => handleOptionChange('byPrice', 'true')}
          />
          Cheap
          {selectedOption?.key === 'byPrice' && (
            <span
              className='clear-button'
              onClick={e => {
                e.stopPropagation();
                handleClearOption('byPrice');
              }}>
              ✖
            </span>
          )}
        </label>

        {/** Кнопка "Expensive" */}
        <label
          className={`sort-option ${
            selectedOption?.key === 'byPrice' &&
            selectedOption?.value === 'false'
              ? 'active'
              : ''
          }`}>
          <input
            type='radio'
            name='byPrice'
            value='false'
            checked={
              selectedOption?.key === 'byPrice' &&
              selectedOption?.value === 'false'
            }
            onChange={() => handleOptionChange('byPrice', 'false')}
          />
          Expensive
          {selectedOption?.key === 'byPrice' && (
            <span
              className='clear-button'
              onClick={e => {
                e.stopPropagation();
                handleClearOption('byPrice');
              }}>
              ✖
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default NoticesFilters;
// NoticesFilters.propTypes = {
//   categories: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   sexOptions: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   speciesOptions: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   locations: PropTypes.arrayOf(
//     PropTypes.shape({
//       value: PropTypes.string.isRequired,
//       label: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   onFilterChange: PropTypes.func.isRequired,
//   onResetFilters: PropTypes.func.isRequired,
// };
