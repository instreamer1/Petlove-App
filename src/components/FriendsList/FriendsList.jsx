import css from "./FriendsList.module.css"
import FriendsItem from "../FriendsItem/FriendsItem";


const FriendsList = ({ friends }) => {
  if ( friends.length === 0) {
    return <p>No friends found.</p>; 
  }


    return (
      <ul className={css.friendsList}>
        {friends.map(friend => (
          <FriendsItem key={friend._id} friend={friend} />
        ))}
      </ul>
    );
  };
  
  export default FriendsList;