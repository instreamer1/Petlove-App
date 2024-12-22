import { truncateString } from '../constants';
import css from './FriendsItem.module.css';

const FriendsItem = ({ friend }) => {
  const {
    _id,
    title,
    url,
    imageUrl,
    address,
    phone,
  } = friend;

  return (
    <li className={css.listItem}>
      <img src={imageUrl} alt={name} className={css.image} />
      <div className={css.cardContent}>
        <div className={css.cardTime}>
          <p className={css.time}>09:00 - 17:00</p>
        </div>
        <div className={css.cardWrapper}>
          <h3 className={css.cardTitle}>{title}</h3>
          <div className={css.footer}>
            <p className={css.cardInfoItem}>
              Email: <span>{truncateString(url, 29)}</span>
            </p>
            <p className={css.cardInfoItem}>
              Address: <span>{address}</span>
            </p>
            <p className={css.cardInfoItem}>
              Phone: <span>{phone}</span>
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default FriendsItem;
