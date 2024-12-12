import css from "./PetsItem.module.css"

const PetsItem = ({ pet, onDelete }) => {
    return (
      <div className="pets-item">
        <img src={pet.image} alt={pet.name} className="pet-image" />
        <div className="pet-info">
          <h4>{pet.title}</h4>
          <p>Name: {pet.name}</p>
          <p>Birthday: {pet.birthday}</p>
          <p>Gender: {pet.gender}</p>
          <p>Species: {pet.species}</p>
        </div>
        <button className="delete-pet-btn" onClick={onDelete}>
          🗑️
        </button>
      </div>
    );
  };
  
  export default PetsItem;
  