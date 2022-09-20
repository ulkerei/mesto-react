import React from "react";
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import ImagePopup from './ImagePopup';

import api from '../utils/Api.js';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  function handleEditAvatarClick() { setIsEditAvatarPopupOpen(true); };
  function handleEditProfileClick() { setIsEditProfilePopupOpen(true); };
  function handleAddPlaceClick() { setIsAddPlacePopupOpen(true); };
  
  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  };

  function handleConfirmationClick(card) { 
    setSelectedCard(card);
    setIsConfirmationPopupOpen(true); 
  };

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.setUserInfo(userData)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => 
      {setIsLoading(false)});
  }

  function handleAddPlaceSubmit (data) {
    setIsLoading(true);
    api.postNewCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => console.log(err))
    .finally(() => 
    {setIsLoading(false)});
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({});
    setImagePopupOpen(false);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteOwnersCard(card._id).then(() => {
      const newCards = cards.filter((element) => element._id === card._id ? false : true)
      setCards(newCards);
      closeAllPopups();
    })
    .catch(err => console.log(err));
  }

  React.useEffect(() => {
    Promise.all([
      api.getProfileInfo(),
      api.getInitialCards()])
      .then(([userInfo, cardsInfo]) => {
        setCurrentUser(userInfo);
        setCards(cardsInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <body className="body">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          setCards={setCards}
          onCardLike={handleCardLike}
          onCardDelete={handleConfirmationClick}
        />
        <EditAvatarPopup onClose={closeAllPopups} onUpdateAvatar={handleUpdateUser} isOpen={isEditAvatarPopupOpen} isLoading={isLoading} />
        <EditProfilePopup onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} isLoading={isLoading} />
        <AddPlacePopup onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} isLoading={isLoading} />
        <ConfirmationPopup card={selectedCard} onClose={closeAllPopups} isOpen={isConfirmationPopupOpen} onDelete={handleCardDelete}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
        <Footer />
      </body>
    </CurrentUserContext.Provider>
  );
}

export default App;
