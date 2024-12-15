import NewsItem from '../NewsItem/NewsItem';
import css from './NewsList.module.css';

const NewsList = ({ news }) => {
  return (
    <ul className={css.list}>
      {news.map(item => (
        <NewsItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default NewsList;
