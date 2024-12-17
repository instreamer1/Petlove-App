// import PropTypes from 'prop-types';
import css from './NoticesFilters.module.css';

import Select from 'react-select';

import SearchField from '../SearchField/SearchField';

const NoticesFilters = ({
  filters, // текущее состояние фильтров из Redux или родителя
  onFilterChange, // коллбек на изменения фильтров
  onResetFilters, // коллбек на сброс фильтров
  categories,
  sexOptions,
  speciesOptions,
  locations,
}) => {
  const handleInputChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className={css.filtersForm}>
      <div className={css.filtersFormField}>
        <SearchField onSearch={value => handleInputChange('keyword', value)} />
      </div>

      {/* Выпадающий список для категорий */}
      <div className={css.frame}>
        <select
          className={css.frameFormSelect}
          value={filters.category}
          onChange={e => handleInputChange('category', e.target.value)}>
          <option value=''>Category</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          className={css.frameFormSelect}
          value={filters.gender}
          onChange={e => handleInputChange('gender', e.target.value)}>
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
          className={css.typeFormSelect}
          value={filters.type}
          onChange={e => handleInputChange('type', e.target.value)}>
          <option value=''>By type</option>
          {speciesOptions.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <div className={css.locationFormField}>
        <Select
          // className={css.filtersFormLocationSelect}
          // options={locations}
          // value={locations.find(loc => loc.value === filters.location)}
          // onChange={e => handleInputChange('location', e.target.value)}
          // placeholder='Location'
          // isClearable
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
              onChange={e => handleInputChange('sortBy', e.target.value)}
            />
            {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
          </label>
        ))}
      </div>

      {/* Кнопка сброса */}
      <button
        type='button'
        className={css.filtersFormReset}
        onClick={onResetFilters}>
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
