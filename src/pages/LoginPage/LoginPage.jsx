import { useDispatch } from 'react-redux';
import PetBlock from '../../components/PetBlock/PetBlock';
import Title from '../../components/Title/Title';
import { logIn } from '../../redux/users/operations';
import css from './LoginPage.module.css';
import login from '../../assets/images/login_img.png';
import loginMobile2x from '../../assets/images/login_img2x.png';
import loginDesktop from '../../assets/images/loginDesktop.png';
import loginDesktop2x from '../../assets/images/loginDesktop2x.png';
import LoginForm from '../../components/LoginForm/LoginForm';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = async data => {
    const { email, password } = data;
    try {
      await dispatch(logIn({ email, password })).unwrap();
      toast.success('User registered successfully!');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <section className={css.register}>
      <div className={css.container}>
        <div className={css.imageWrapper}>
          <PetBlock
            imageSrc={login}
            imageSrc1x={login}
            imageSrc2x={loginMobile2x}
            imageSrcDesk1x={loginDesktop}
            imageSrcDesk2x={loginDesktop2x}
            altText='Registration Cat'
          />
        </div>
        <div className={css.formWrapper}>
          <Title
            title='Log in'
          />
          <p className={css.description}>
            Welcome! Please enter your credentials to login to the platform:
          </p>
          <LoginForm onSubmit={handleFormSubmit} />
          <p className={css.textLink}>
            Don’t have an account?{' '}
            <a className={css.loginLink} href='/register'>
              Register
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
