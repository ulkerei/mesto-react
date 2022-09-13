import React from "react";
import imageTrash from '../images/delete.svg';

function Card (props) {
  function handleClick() {
    props.onCardClick(props.card);
  }  

  return (
    <div className="cards__element">
      <button type="button" id="delete" className="cards__delete"><img src={imageTrash} className="card__delete-image" alt="Х" /></button>
      <img className="cards__image" src={props.card.link} alt={props.card.place || props.card.name} onClick={handleClick}/>
      <div className="cards__subtitle">
        <p className="cards__place">{props.card.place || props.card.name}</p>
        <div>
          <button type="button" className="cards__like"></button>
          <p className="cards__likes-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;