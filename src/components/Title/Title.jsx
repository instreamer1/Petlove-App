import PropTypes from 'prop-types';
import css from './Title.module.css';

const Title = ({ title, description }) => {
  return (
    <div className={css.titleWrapper}>
      <h2 className={css.title}>{title}</h2>
      {description && <p className={css.description}>{description}</p>}
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default Title;
