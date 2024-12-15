import css from './FriendsItem.module.css';

const FriendsItem = ({ friend }) => {
  
  const {
    _id,
    title,
    //     "url": "https://lico.vet/",
    //     "addressUrl": "https://goo.gl/maps/sub8u9TAAvLJRE9j9",
    imageUrl,
    //     "address": "77 Drugetiv Street, Uzhhorod, Transcarpathian region, 88003",
    //     "workDays": [
    //         {
    //             "_id": "675ca4a00a0375f38dc5bd35",
    //             "isOpen": true,
    //             "from": "09:00",
    //             "to": "20:00"
    //         },
    //         {
    //             "_id": "675ca4a00a0375f38dc5bd36",
    //             "isOpen": true,
    //             "from": "09:00",
    //             "to": "20:00"
    //         },
    //         {
    //             "_id": "675ca4a00a0375f38dc5bd37",
    //             "isOpen": true,
    //             "from": "09:00",
    //             "to": "20:00"
    //         },
    //         {
    //             "_id": "675ca4a00a0375f38dc5bd38",
    //             "isOpen": true,
    //             "from": "09:00",
    //             "to": "20:00"
    //         },
    //         {
    //             "_id": "675ca4a00a0375f38dc5bd39",
    //             "isOpen": true,
    //             "from": "09:00",
    //             "to": "20:00"
    //         },
    //         {
    //             "_id": "675ca4a00a0375f38dc5bd3a",
    //             "isOpen": true,
    //             "from": "09:00",
    //             "to": "20:00"
    //         },
    //         {
    //             "_id": "675ca4a00a0375f38dc5bd3b",
    //             "isOpen": true,
    //             "from": "09:00",
    //             "to": "20:00"
    //         }
    //     ],
    //     "phone": null,
    //     "email": null
    // },
  } = friend;

  return (
    <li className={css.listItem}>
      <img src={imageUrl} alt={name} className={css.image} />
      <div className={css.cardContent}>
        <h3 className={css.cardTitle}>{title}</h3>
        {/* <div className={css.footer}>
          <div className={css.cardInfo}>
            <p className={css.cardInfoItem}>Birthday: {birthday}</p>
            <p className={css.cardInfoItem}>Sex: {sex}</p>
            <p className={css.cardInfoItem}>Species: {species}</p>
            <p className={css.cardInfoItem}>Category: {category}</p>
          </div>
          <p className={css.cardDescription}>{comment}</p>
          <div className={css.cardFooter}>
            <span className={css.cardPrice}>${price}</span>
            <button className={css.cardButton}>Learn more</button>
            <span className={css.cardRating}>
              <i className={css.starIcon}>⭐</i> {popularity}
            </span>
          </div>
        </div>*/}
      </div>
    </li>
  );
};

export default FriendsItem;
