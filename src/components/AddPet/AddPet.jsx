import { Link } from 'react-router-dom';
import css from './AddPet.module.css';

const AddPet = () => {
  return (
    <div className={css.addPet}>
      <h3 className={css.addPetTitle}>My pets</h3>
      <Link to='/add-pet' className={css.addPetLink}>
        Add pet +
      </Link>
    </div>
  );
};

export default AddPet;
