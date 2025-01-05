import NoticesItem from '../NoticesItem/NoticesItem';
import css from './NoticesList.module.css';

const NoticesList = ({ notices, onAddToFavorites, onRemoveFromFavorites }) => {
  return (
    <ul className={css.noticesList}>
      {notices.length > 0 &&
        notices.map(notice => (
          <NoticesItem
            key={notice._id}
            notice={notice}
            onAddToFavorites={onAddToFavorites}
            onRemoveFromFavorites={onRemoveFromFavorites}
          />
        ))}
    </ul>
  );
};

export default NoticesList;
