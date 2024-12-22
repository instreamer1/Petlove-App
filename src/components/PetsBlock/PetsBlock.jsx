
import AddPet from '../AddPet/AddPet';
import PetsList from '../PetsList/PetsList';
import css from './PetsBlock.module.css';




const PetsBlock = ({ pets, onDeletePet }) => {


  return (
    <div className={css.petsBlock}>
      <AddPet />
      <PetsList pets={pets} onDeletePet={onDeletePet} />
    </div>
  );
};

export default PetsBlock;
