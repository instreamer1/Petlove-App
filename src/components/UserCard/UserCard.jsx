import EditUserBtn from '../EditUserBtn/EditUserBtn';
import LogOutBtn from '../LogOutBtn/LogOutBtn';

import UserBlock from '../UserBlock/UserBlock';
import css from './UserCard.module.css';

const UserCard = props => {
  return (
    <div>
      <EditUserBtn />
      <UserBlock />
      <PetsBlock />
      <LogOutBtn />
    </div>
  );
};

export default UserCard;

// UserCard
// Рендерит карточку с информацией о пользователе и его питомцах. Содержит:

// EditUserBtn
/// Кнопка для редактирования данных пользователя.
/// Действие: Открывает модальное окно ModalEditUser.

// UserBlock
/// Отображает аватар пользователя (или кнопку редактирования, если аватар отсутствует), имя, email и номер телефона.

// PetsBlock
// Содержит:
/// AddPet: Кнопка для перехода на маршрут /add-pet.
/// PetsList: Список питомцев пользователя.

// LogOutBtn
/// Кнопка для выхода из аккаунта.
/// Действие: Открывает модальное окно ModalApproveAction.
