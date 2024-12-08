import { useState } from "react";
import css from "./EditUserBtn.module.css";
import ModalEditUser from "../ModalEditUser/ModalEditUser";





const EditUserBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={css.editButton} onClick={openModal}>
        Edit User
      </button>
      {isModalOpen && <ModalEditUser onClose={closeModal} />}
    </>
  );
};

export default EditUserBtn;
