import PetsItem from '../PetsItem/PetsItem';
import css from './PetsList.module.css';

const PetsList = ({ pets, onDeletePet }) => {
  return (
    <ul className={css.petsList}>
      {pets.length > 0 ? (
        pets.map(pet => (
          <PetsItem
            key={pet._id}
            pet={pet}
            onDelete={onDeletePet}
          />
        ))
      ) : (
        <p className={css.noPetsMessage}>You haven't added any pets yet.</p>
      )}
    </ul>
  );
};

export default PetsList;
