import css from './RegistrationPage.module.css';
import Title from '../../components/Title/Title';

import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

import registrationMobile from '../../assets/images/img_register_tab.png';
import registrationMobile2x from '../../assets/images/img_register_tab2x.png';
import registrationDesktop from '../../assets/images/img_register_desk.png';
import registrationDesktop2x from '../../assets/images/img_register_desk2x.png';

import registration from '../../assets/images/img_register_tab.png';

import { useDispatch } from 'react-redux';
import PetBlock from '../../components/PetBlock/PetBlock';
import { register } from '../../redux/users/operations';
import toast from 'react-hot-toast';

const RegistrationPage = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = async data => {
    const { name, email, password } = data;
    try {
      await dispatch(register({ name, email, password })).unwrap();
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
            imageSrc={registration}
            imageSrc1x={registrationMobile}
            imageSrc2x={registrationMobile2x}
            imageSrcTab1x={registrationMobile}
            imageSrcTab2x={registrationMobile2x}
            imageSrcDesk1x={registrationDesktop}
            imageSrcDesk2x={registrationDesktop2x}
            altText='Registration Cat'
          />
        </div>
        <div className={css.formWrapper}>
          <Title
            title='Registration'
            // description='Thank you for your interest in our platform.'
          />
          <p className={css.description}>
            Thank you for your interest in our platform.
          </p>
          <RegistrationForm onSubmit={handleFormSubmit} />
          <p className={css.textLink}>
            Already have an account?{' '}
            <a className={css.loginLink} href='/login'>
              Login
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegistrationPage;
