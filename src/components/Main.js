import React from "react";
import imageAdd from '../images/Plus.svg';
import imageEdit from '../images/Pen.svg';
import api from '../utils/Api.js';
import Card from './Card.js';

function Main (props) {
  const[userName,setUserName]=React.useState('');
  const[userDescription,setUserDescription]=React.useState('');
  const[userAvatar,setUserAvatar]=React.useState('');

  const[cards,setCards]=React.useState([]);

  Promise.all([
    api.getProfileInfo(),
    api.getInitialCards()]) 
    .then(([userInfo, cardsInfo])=>{
      setUserName(userInfo.name);
      setUserDescription(userInfo.job || userInfo.about);
      setUserAvatar(userInfo.avatar);

      setCards(cardsInfo);
    }) 
    .catch((err)=>{
      console.log(err);
    });



  return (
    <main className="main">
    <section className="profile">
      <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }}>
        <div className="profile__avatar-overlay">
          <button type="button" class="profile__button profile__button_type_edit-avatar" onClick={props.onEditAvatar}><img className="profile__edit-avatar-image" src={imageEdit} alt="Редактировать" /></button>
        </div>
      </div>
      <div className="profile__info">
        <div className="profile__title">
          <h1 className="profile__name">{userName}</h1>
          <button type="button" class="profile__button profile__button_type_edit" onClick={props.onEditProfile}><img className="profile__edit-image" src={imageEdit} alt="Редактировать" /></button>
        </div>
        <p className="profile__job">{userDescription}</p>
      </div>
      <button type="button" className="profile__button profile__button_type_add" onClick={props.onAddPlace}><img src={imageAdd} alt="Добавить" /></button>
    </section>

    <section className="cards">
      {      
        cards.map((card) => (
            <Card card={card} onCardClick={props.onCardClick}/>
          ))
       }
    </section>
  </main>
  );
};

export default Main;