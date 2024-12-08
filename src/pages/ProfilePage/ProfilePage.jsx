import MyNotices from '../../components/MyNotices/MyNotices';
import UserCard from '../../components/UserCard/UserCard';
import css from './ProfilePage.module.css';
const ProfilePage = ()=> {
    return (
        <section className={css.profile}>
            <div className={css.container}>
            <UserCard/>
            <MyNotices/>
            </div>
        </section>
    );
}

export default ProfilePage;