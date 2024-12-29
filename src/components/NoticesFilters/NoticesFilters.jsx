import PropTypes from 'prop-types';
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

  const formatOptions = list =>
    list.map(item => ({
      value: item._id,
      label: `${item.stateEn}, ${item.cityEn}`,
      cityEn: item.cityEn,
      stateEn: item.stateEn,
    }));

  const handleInputChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    onFilterChange(updatedFilters);
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
    onFilterChange({ ...filters, [key]: value });
  };

  const resetSortOptions = key => {
    onFilterChange({ ...filters, [key]: null });
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
      <div className={css.radioGroupContainer}>
        {[
          { label: 'Popular', value: false },
          { label: 'Unpopular', value: true },
        ].map(option => (
          <div key={option.label} className={css.radioGroup}>
            <input
              id={option.label}
              type='radio'
              name='byPopularity'
              value={option.value}
              checked={filters.byPopularity === option.value}
              onChange={() => handleFilterChange('byPopularity', option.value)}
              className={css.radioInput}
            />

            <label htmlFor={option.label} className={css.radioLabel}>
              {option.label}

              {filters.byPopularity === option.value && (
                <button
                  type='button'
                  className={css.resetButton}
                  onClick={event => {
                    event.preventDefault();
                    event.stopPropagation();
                    resetSortOptions('byPopularity');
                  }}>
                  <svg className={css.iconClose} aria-hidden='true'>
                    <use href={`${iconSprite}#closeModal`} />
                  </svg>
                </button>
              )}
            </label>
          </div>
        ))}
        {[
          { label: 'Cheap', value: false },
          { label: 'Expensive', value: true },
        ].map(option => (
          <div key={option.label} className={css.radioGroup}>
            <input
              id={option.label}
              type='radio'
              name='byPrice'
              value={option.value}
              checked={filters.byPrice === option.value}
              onChange={() => handleFilterChange('byPrice', option.value)}
              className={css.radioInput}
            />

            <label htmlFor={option.label} className={css.radioLabel}>
              {option.label}

              {filters.byPrice === option.value && (
                <button
                  type='button'
                  className={css.resetButton}
                  onClick={event => {
                    event.preventDefault();
                    event.stopPropagation();
                    resetSortOptions('byPrice');
                  }}>
                  <svg className={css.iconClose} aria-hidden='true'>
                    <use href={`${iconSprite}#closeModal`} />
                  </svg>
                </button>
              )}
            </label>
          </div>
        ))}
        <button
          type='button'
          className={css.resetAllButton}
          onClick={onResetFilters}>
          Reset All Filters
        </button>
      </div>
    </div>
  );
};

export default NoticesFilters;


NoticesFilters.propTypes = {
  filters: PropTypes.shape({
    keyword: PropTypes.string,
    category: PropTypes.string,
    sex: PropTypes.string,
    species: PropTypes.string,
    byPopularity: PropTypes.bool,
    byPrice: PropTypes.bool,
    locationId: PropTypes.string,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onFilterCitiesChange: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  sexOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  speciesOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  locationsList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      cityEn: PropTypes.string.isRequired,
      stateEn: PropTypes.string.isRequired,
    })
  ).isRequired,
  citiesList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      cityEn: PropTypes.string.isRequired,
      stateEn: PropTypes.string.isRequired,
    })
  ).isRequired,
};