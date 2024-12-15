import css from './FriendsPage.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../../components/Title/Title';
import FriendsList from '../../components/FriendsList/FriendsList';
import { fetchFriends } from '../../redux/friends/operations';

const FriendsPage = () => {
  const dispatch = useDispatch();

  //   const friends = useSelector(selectNotices);

  //   const loading = useSelector(selectNoticesLoading);
  //   const error = useSelector(selectNoticesError);

  const { friends, loading, error } = useSelector(state => state.friends);
  console.log(friends);

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={css.friends}>
      <div className={css.container}>
        <div className={css.friendsWrapper}>
          <Title title='Find your favorite pet' />
        </div>
        <FriendsList friends={friends} />
      </div>
    </section>
  );
};

export default FriendsPage;
