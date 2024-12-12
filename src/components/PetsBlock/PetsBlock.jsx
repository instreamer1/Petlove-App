import css from "./PetsBlock.module.css"

// import AddPet from './AddPet';
// import PetsList from './PetsList';

const PetsBlock = ({ pets, onAddPet, onDeletePet }) => {
  return (
    <div className={css.petsBlock}>
      <AddPet onAddPet={onAddPet} />
      <PetsList pets={pets} onDeletePet={onDeletePet} />
    </div>
  );
};

export default PetsBlock;
