import AddPetForm from '../../components/AddPetForm/AddPetForm';
import PetBlock from '../../components/PetBlock/PetBlock';
import css from './AddPetPage.module.css';

import login from '../../assets/images/add_my_pet_mob.png';
import loginMobile2x from '../../assets/images/add_my_pet_mob2x.png';
import imageSrcTab1x from '../../assets/images/addPetTabl1x.webp';
import imageSrcTab2x from '../../assets/images/addPetTab2x.webp';
import loginDesktop from '../../assets/images/add_pet_Desc1.png';
import loginDesktop2x from '../../assets/images/add_pet_Desc2x.png';
import { addPet } from '../../redux/users/operations';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddPetPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFormSubmit = async data => {
    const { name, title, imgURL, species, birthday, sex } = data;
    try {
      await dispatch(addPet({ name, title, imgURL, species, birthday, sex }));
      toast.success('Pet added successfully!');
      navigate('/profile');
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to add pet. Please try again.');
      }
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
            imageSrcTab1x={imageSrcTab1x}
            imageSrcTab2x={imageSrcTab2x}
            imageSrcDesk1x={loginDesktop}
            imageSrcDesk2x={loginDesktop2x}
            altText='dog'
            width='297px'
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
