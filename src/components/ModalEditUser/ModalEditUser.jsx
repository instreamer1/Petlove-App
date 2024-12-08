import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./ModalEditUser.module.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  avatar: Yup.string()
    .matches(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/, "Invalid avatar URL")
    .required("Avatar URL is required"),
  phone: Yup.string()
    .matches(/^\+38\d{10}$/, "Invalid phone number format (+38XXXXXXXXXX)")
    .required("Phone number is required"),
});

const ModalEditUser = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()} 
      >
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label>
            Name:
            <input type="text" {...register("name")} />
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
          </label>
          <label>
            Email:
            <input type="email" {...register("email")} />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </label>
          <label>
            Avatar URL:
            <input type="text" {...register("avatar")} />
            {errors.avatar && <p className={styles.error}>{errors.avatar.message}</p>}
          </label>
          <label>
            Phone:
            <input type="tel" {...register("phone")} />
            {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
          </label>
          <div className={styles.buttons}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditUser;
