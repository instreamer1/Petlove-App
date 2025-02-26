import PropTypes from 'prop-types';
import css from './PetBlock.module.css';

const PetBlock = ({
  imageSrc,
  imageSrc1x,
  imageSrc2x,
  imageSrcTab1x,
  imageSrcTab2x,
  imageSrcDesk1x,
  imageSrcDesk2x,
  altText,
  width,
}) => {
  return (
    <picture className={css.picture}>
      <source
        srcSet={`${imageSrcDesk1x} 1x, ${imageSrcDesk2x} 2x`}
        media='(min-width: 1280px)'
      />
      <source
        srcSet={`${imageSrcTab1x} 1x, ${imageSrcTab2x} 2x`}
        media='(min-width: 768px)'
      />

      <source
        srcSet={`${imageSrc1x} 1x, ${imageSrc2x} 2x`}
        media='(min-width: 320px)'
      />
      <img
        className={css.image}
        src={imageSrc}
        alt={altText}
        loading='lazy'
        width={width}
      />
    </picture>
  );
};

export default PetBlock;
PetBlock.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};
