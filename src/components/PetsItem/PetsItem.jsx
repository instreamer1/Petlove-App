import css from "./PetsItem.module.css";
import iconSprite from "../../assets/sprite.svg";
import { capitalizeFirstLetter, formatDate } from "../constants";
import defaultImage from "../../assets/images/defaultImage.png";

const PetsItem = ({ pet, onDelete }) => {
  const { birthday, imgURL, name, sex, species, title, _id } = pet;

  return (
    <li className={css.cardItem}>
      <img
        src={imgURL || defaultImage}
        alt={name || "Unknown"}
        className={css.image}
        onError={(e) => {
          e.target.src = defaultImage;
        }}
      />

      <div className={css.cardContent}>
        <div className={css.cardContentWrapper}>
          <h3 className={css.cardTitle}>{title || "No title"}</h3>
          <div className={css.buttonWrapper}>
            <button
              type="button"
              className={css.learnMoreBtn}
              onClick={() => onDelete(_id)} 
            >
              <svg className={css.icon} aria-hidden="true">
                <use href={`${iconSprite}#trash`}></use>
              </svg>
            </button>
          </div>
        </div>

        <div className={css.cardInfoWrapper}>
          <div className={css.cardInfo}>
            <p className={css.cardInfoText}>Name:</p>
            <p className={css.cardInfoValue}>{name || "Unknown"}</p>
          </div>
          <div className={css.cardInfo}>
            <p className={css.cardInfoText}>Birthday:</p>
            <p className={css.cardInfoValue}>
              {birthday ? formatDate(birthday) : "Unknown"}
            </p>
          </div>
          <div className={css.cardInfo}>
            <p className={css.cardInfoText}>Sex:</p>
            <p className={css.cardInfoValue}>
              {sex ? capitalizeFirstLetter(sex) : "Unknown"}
            </p>
          </div>
          <div className={css.cardInfo}>
            <p className={css.cardInfoText}>Species:</p>
            <p className={css.cardInfoValue}>
              {species ? capitalizeFirstLetter(species) : "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};



export default PetsItem;