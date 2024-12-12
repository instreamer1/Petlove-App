import css from './NewsList.module.css';

const NewsList = ({ news }) => {
  return (
    <ul className={css.list}>
      {news.map(item => (
        <li key={item.id} className={css.item}>
          <img src={item.imgUrl} alt={item.title} className={css.image} />
       
          <h3 className={css.title}>{item.title}</h3>
          <p className={css.description}>{item.text}</p>
    
          <div className={css.footer}>
            <span className={css.date}>
              {new Date(item.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </span>
            <a
              href={item.url}
              target='_blank'
              rel='noopener noreferrer'
              className={css.link}>
              Read more
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NewsList;
