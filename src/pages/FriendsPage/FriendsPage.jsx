import css from './FriendsPage.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../../components/Title/Title';
import FriendsList from '../../components/FriendsList/FriendsList';
import { fetchFriends } from '../../redux/friends/operations';
import { selectError, selectFriends,  selectLoadingFriends } from '../../redux/friends/selectors';

const FriendsPage = () => {
  const dispatch = useDispatch();

  const friends = useSelector(selectFriends);
  const loading = useSelector(selectLoadingFriends);
  const error = useSelector(selectError);



  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={css.friends}>
      <div className={css.container}>
        <div className={css.friendsWrapper}>
          <Title title='Our friends' />
        </div>
        <FriendsList friends={friends} />
      </div>
    </section>
  );
};

export default FriendsPage;
