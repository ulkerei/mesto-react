import React from "react";
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditAvatarPopup (props) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      name: currentUser.name,
      about: currentUser.about,
      avatar: avatarRef.current.value,
    });
  } 

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonName="Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      children={<>
        <input
          type="url"
          required
          id="avatar"
          name="avatar"
          className="popup__input popup__input_type_avatar"
          placeholder="Ссылка на изображение"
          ref={avatarRef}
        />
        <p className="popup__input-error popup__input-error_type_avatar"></p>
      </>}
    />
  )
}

export default EditAvatarPopup;