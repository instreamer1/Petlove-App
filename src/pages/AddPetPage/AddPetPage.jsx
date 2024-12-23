import AddPetForm from '../../components/AddPetForm/AddPetForm';
import PetBlock from '../../components/PetBlock/PetBlock';
import css from './AddPetPage.module.css';

import login from '../../assets/images/login_img.png';
import loginMobile2x from '../../assets/images/login_img2x.png';
import loginDesktop from '../../assets/images/loginDesktop.png';
import loginDesktop2x from '../../assets/images/loginDesktop2x.png';
import { addPet} from '../../redux/users/operations';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const AddPetPage = () => {


  const dispatch = useDispatch();




  const handleFormSubmit = async (data) => {
    const { name, title, imgURL, species, birthday, sex } = data;
    try {
      await dispatch(addPet({ name, title, imgURL, species, birthday, sex }));
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <section className={css.addPetPage}>
      <div className={css.container}>
        <div className={css.imageWrapper}>
          <PetBlock
            imageSrc={login}
            imageSrc1x={login}
            imageSrc2x={loginMobile2x}
            imageSrcDesk1x={loginDesktop}
            imageSrcDesk2x={loginDesktop2x}
            altText='dog'
          />
        </div>
        <div className={css.formWrapper}>
          <AddPetForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </section>
  );
};

export default AddPetPage;
