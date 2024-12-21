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
    workDays,
    //   "workDays": [
    //     {
    //         "_id": "67670e6b0a0375f38dc5faea",
    //         "isOpen": false
    //     },
    //     {
    //         "_id": "67670e6b0a0375f38dc5faeb",
    //         "isOpen": false
    //     },
    //     {
    //         "_id": "67670e6b0a0375f38dc5faec",
    //         "isOpen": false
    //     },
    //     {
    //         "_id": "67670e6b0a0375f38dc5faed",
    //         "isOpen": false
    //     },
    //     {
    //         "_id": "67670e6b0a0375f38dc5faee",
    //         "isOpen": false
    //     },
    //     {
    //         "_id": "67670e6b0a0375f38dc5faef",
    //         "isOpen": true,
    //         "from": "11:00",
    //         "to": "16:00"
    //     },
    //     {
    //         "_id": "67670e6b0a0375f38dc5faf0",
    //         "isOpen": true,
    //         "from": "11:00",
    //         "to": "16:00"
    //     }
    // ],
  } = friend;

  return (
    <li className={css.listItem}>
      <img src={imageUrl} alt={name} className={css.image} />
      <div className={css.cardContent}>
        <div className={css.time}>
          {/* <p className={css.cardTime}>Category: {workDays.from}</p> */}
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
