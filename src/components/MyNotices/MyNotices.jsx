import { useState } from 'react';
import NoticesItem from '../NoticesItem/NoticesItem';
import css from './MyNotices.module.css';

const MyNotices = ({ notices, viewedNotices, onAddToFavorites, onRemoveFromFavorites }) => {

  const [activeTab, setActiveTab] = useState('favorites');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const noticesToDisplay = activeTab === 'favorites' ? notices : viewedNotices;

  return (
    <div className={css.container}>
      {/* Tabs */}
      <div className={css.tabs}>
        <button
          className={`${css.tabButton} ${
            activeTab === 'favorites' ? css.active : ''
          }`}
          onClick={() => handleTabClick('favorites')}>
          My Favorites Pets
        </button>
        <button
          className={`${css.tabButton} ${
            activeTab === 'viewed' ? css.active : ''
          }`}
          onClick={() => handleTabClick('viewed')}>
          Viewed
        </button>
      </div>
        {/* Notices List */}
        <ul className={css.noticesList}>
        {noticesToDisplay.length > 0 ? (
          noticesToDisplay.map((notice) => (
            <NoticesItem
              key={notice._id}
              notice={notice}
              onAddToFavorites={onAddToFavorites}
              onRemoveFromFavorites={onRemoveFromFavorites}
            />
          ))
        ) : (
          <p className={css.noNotices}>No notices to display</p>
        )}
      </ul>
    </div>
  );
};

export default MyNotices;
