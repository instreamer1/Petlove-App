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


  const handleFilterChange = (key, value) => {
    // setFiltersOptions(prevFilters => {
    //   const updatedFilters = { ...prevFilters, [key]: value };
  
      // Передача значения фильтра в родительский компонент
      onFilterChange({ ...filters, [key]: value });
  
    //   return updatedFilters;
    // });
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
      <div className={css.filtersContainer}>
        {/* Фильтр по популярности */}
        <div className={css.filterGroup}>
          <span className={css.filterLabel}>Filter by Popularity:</span>
          <div className={css.radioGroup}>
            {[
              { label: 'Popular', value: false },
              { label: 'Unpopular', value: true },
            ].map(option => (
              <label key={option.label} className={css.radioWrapper}>
                <input
                  type='radio'
                  name='byPopularity'
                  value={option.value}
                  checked={filters.byPopularity === option.value}
                
                  onChange={() =>
                    handleFilterChange('byPopularity', option.value)
                  }
                  className={css.radioInput}
                />
                {option.label}
                {filters.byPopularity === option.value && (
                  <button
                    type='button'
                    className={css.resetButton}
                    onClick={() => {
                      handleFilterChange('byPopularity', null);
                    }}>
                    <svg className={css.iconClose} aria-hidden='true'>
                      <use href={`${iconSprite}#closeModal`} />
                    </svg>
                  </button>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Фильтр по цене */}
        <div className={css.filterGroup}>
          <span className={css.filterLabel}>Filter by Price:</span>
          <div className={css.radioGroup}>
            {[
              { label: 'Cheap', value: false },
              { label: 'Expensive', value: false },
            ].map(option => (
              <label key={option.label} className={css.radioWrapper}>
                <input
                  type='radio'
                  name='byPrice'
                  value={option.value}
                  checked={filters.byPrice === option.value}
                  // checked={false}
                  onChange={() => handleFilterChange('byPrice', option.value)}
                  className={css.radioInput}
                />
                {option.label}

                {filters.byPrice === option.value && (
                  <button
                    type='button'
                    className={css.resetButton}
                    onClick={() => handleInputChange('byPrice', null)}>
                    <svg className={css.iconClose} aria-hidden='true'>
                      <use href={`${iconSprite}#closeModal`} />
                    </svg>
                  </button>
                )}
              </label>
            ))}
          </div>
        </div>
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
