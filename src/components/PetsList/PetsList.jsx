import css from "./PetsList.module.css"


const PetsList = ({ pets, onDeletePet }) => {
    return (
      <div className={css.petsList}>
        {/* {pets.length > 0 ? (
          pets.map((pet) => (
            <PetsItem
              key={pet.id}
              pet={pet}
              onDelete={() => onDeletePet(pet.id)}
            />
          ))
        ) : (
          <p className="no-pets-message">You haven't added any pets yet.</p>
        )} */}
      </div>
    );
  };
  
  export default PetsList;
  