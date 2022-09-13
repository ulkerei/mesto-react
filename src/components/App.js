import React from "react";
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';

function App() {
  const[isEditProfilePopupOpen,setIsEditProfilePopupOpen]=React.useState(false);
  const[isAddPlacePopupOpen,setIsAddPlacePopupOpen]=React.useState(false);
  const[isEditAvatarPopupOpen,setIsEditAvatarPopupOpen]=React.useState(false);

  const[selectedCard,setSelectedCard]=React.useState('');

  function handleEditAvatarClick () {setIsEditAvatarPopupOpen(true);};
  function handleEditProfileClick () {setIsEditProfilePopupOpen(true);};
  function handleAddPlaceClick () {setIsAddPlacePopupOpen(true);};
  function handleCardClick (card) {setSelectedCard(card)};

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard('');
  };

  return (
    <div className="App">

<body className="body">
  <Header />
  <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
  <PopupWithForm name="avatar" title="Обновить аватар" onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} children={<>
      <input type="url" required id="avatar" name="avatar" className="popup__input popup__input_type_avatar" placeholder="Ссылка на изображение" value="" />
      <p class="popup__input-error popup__input-error_type_avatar"></p>
    </>}/>
    <PopupWithForm name="edit" title="Редактировать профиль" onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} children={<>
      <input type="text" minLength="2" maxLength="40" required id="name" name="name" className="popup__input popup__input_type_name" placeholder="Имя" value="" />
      <p class="popup__input-error popup__input-error_type_name"></p>
      <input type="text" minLength="2" maxLength="200" required id="job" name="job" className="popup__input popup__input_type_job" placeholder="Занятие" value="" />
      <p class="popup__input-error popup__input-error_type_job"></p>
    </>}/>
    <PopupWithForm name="add" title="Новое место" onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} children={<>
      <input type="text" minLength="2" maxLength="30" required id="place" name="place" className="popup__input popup__input_type_place" placeholder="Название" value="" />
      <p class="popup__input-error popup__input-error_type_place"></p>
      <input type="url" required id="link" name="link" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" value="" />
      <p class="popup__input-error popup__input-error_type_link"></p>
    </>}/>
    <PopupWithForm name="confirm" title="Вы уверены?" />
    <PopupWithImage card={selectedCard} onClose={closeAllPopups}/>
  <Footer />
</body>

    </div>
  );
}

export default App;
