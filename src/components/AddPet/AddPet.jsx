import css from "./AddPet.module.css"



const AddPet = ({ onAddPet }) => {
    return (
      <div className="add-pet-container">
        <button className="add-pet-btn" onClick={onAddPet}>
          Add pet +
        </button>
      </div>
    );
  };
  
  export default AddPet;
  