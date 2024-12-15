// import PropTypes from 'prop-types';
import css from './NoticesFilters.module.css';

import { useState, useEffect } from 'react';
import Select from 'react-select';

import { useSelector } from 'react-redux';
import {
  selectCategories,
  selectLocations,
  selectSexOptions,
  selectSpeciesOptions,
} from '../../redux/notices/selectors';
import SearchField from '../SearchField/SearchField';

const NoticesFilters = ({
  //   categories,
  //   sexOptions,
  //   speciesOptions,
  //   locations,
  onFilterChange,
  onResetFilters,
}) => {
  const categories = useSelector(selectCategories);

  const sexOptions = useSelector(selectSexOptions);
  const speciesOptions = useSelector(selectSpeciesOptions);
  const locations = useSelector(selectLocations);
  //   const onFilterChange = useSelector(selectSpeciesOptions)
  //   const onResetFilters = useSelector(selectSpeciesOptions)

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    gender: '',
    type: '',
    location: '',
    sortBy: 'popular',
  });

  const handleChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  const handleSearch = query => {
    // dispatch(setSearchQuery(query));
  };

  const handleReset = () => {
    const defaultFilters = {
      search: '',
      category: '',
      gender: '',
      type: '',
      location: '',
      sortBy: 'popular',
    };
    setFilters(defaultFilters);
    onResetFilters(defaultFilters);
  };

  return (
    <div className={css.filtersForm}>
      {/* Поисковая строка */}
      <div className={css.filtersFormField}>
        <SearchField onSearch={handleSearch} />
      </div>

      {/* Выпадающий список для категорий */}
      <div className={css.filtersFormField}>
        <select
          className={css.filtersFormSelect}
          value={filters.category}
          onChange={e => handleChange('category', e.target.value)}>
          <option value=''>Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Выпадающий список для пола */}
      <div className={css.filtersFormField}>
        <select
          className={css.filtersFormSelect}
          value={filters.gender}
          onChange={e => handleChange('gender', e.target.value)}>
          <option value=''>By gender</option>
          {sexOptions.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      {/* Выпадающий список для типа питомца */}
      <div className={css.filtersFormField}>
        <select
          className={css.filtersFormSelect}
          value={filters.type}
          onChange={e => handleChange('type', e.target.value)}>
          <option value=''>By type</option>
          {speciesOptions.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      {/* Выпадающий список для местоположений */}
      <div className={css.filtersFormField}>
        <Select
          className={css.filtersFormLocationSelect}
          options={locations}
          value={locations.find(loc => loc.value === filters.location)}
          onChange={selectedOption =>
            handleChange('location', selectedOption?.value || '')
          }
          placeholder='Location'
          isClearable
        />
      </div>

      {/* Радио-кнопки для сортировки */}
      <div className={css.filtersFormRadioGroup}>
        {['popular', 'unpopular', 'cheap', 'expensive'].map(sortOption => (
          <label key={sortOption} className={css.filtersFormRadio}>
            <input
              type='radio'
              name='sortBy'
              value={sortOption}
              checked={filters.sortBy === sortOption}
              onChange={e => handleChange('sortBy', e.target.value)}
            />
            {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
          </label>
        ))}
      </div>

      {/* Кнопка сброса */}
      <button
        type='button'
        className={css.filtersFormReset}
        onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

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

export default NoticesFilters;
