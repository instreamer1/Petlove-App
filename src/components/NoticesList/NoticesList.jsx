import NoticesItem from '../NoticesItem/NoticesItem';
import css from './NoticesList.module.css';

const NoticesList = ({ notices }) => {
  return (
    <ul className={css.noticesList}>
      {notices.length > 0 && notices.map(notice => (
        <NoticesItem key={notice._id} notice={notice} />
      ))}
    </ul>
  );
};

export default NoticesList;
