import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup (props) {

const [place,setPlace] = React.useState('');
const [link,setLink] = React.useState('');

function handlePlaceChange(e) {
  setPlace(e.target.value);
}
function handleLinkChange(e) {
  setLink(e.target.value);
}

function handleSubmit(e) {
  e.preventDefault();
  props.onAddPlace({
    place,
    link,
  });
} 

  return (
  <PopupWithForm
    name="add"
    title="Новое место"
    buttonName="Создать"
    onClose={props.onClose}
    isOpen={props.isOpen}
    onSubmit={handleSubmit}
    children={<>
      <input
        type="text"
        minLength="2"
        maxLength="30"
        required
        id="place"
        name="place"
        className="popup__input popup__input_type_place"
        placeholder="Название"
        onChange={handlePlaceChange}
      />
      <p className="popup__input-error popup__input-error_type_place"></p>
      <input
        type="url"
        required
        id="link"
        name="link"
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        onChange={handleLinkChange}
      />
      <p className="popup__input-error popup__input-error_type_link"></p>
    </>}
  />
  )
}

export default AddPlacePopup;