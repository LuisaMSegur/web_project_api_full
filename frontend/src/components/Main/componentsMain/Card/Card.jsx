import React, { useContext, useState } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext.js";
import ImagePopup from "./ImagePopup.jsx";
import api from "../../../../utils/Api.js";


export default function Card({ card, handleOpenPopup, onCardDelete }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isLikedByCurrentUser = card?.likes?.some((like) => like._id === currentUser._id);
  const isOwner = card?.owner?._id === currentUser?._id;
  const [isLiked, setIsLiked] = useState(isLikedByCurrentUser);
  const [likesCount, setLikesCount] = useState(card.likes.length);

const cardLikeButton = `card__button-love ${isLiked ? 'card__button-love_active' : ''}`;

const handleLikeClick = () => {
  if (!currentUser || !currentUser._id) {
    console.error("No se puede dar like: currentUser no está definido.");
    return;
  }

  const newIsLiked = !isLiked;
  setIsLiked(newIsLiked);
  const newLikesCount = newIsLiked ? likesCount + 1 : likesCount - 1;

  api.toggleLike(card._id, newIsLiked)
    .then(() => {
      setLikesCount(newLikesCount);
    })
    .catch((error) => {
      console.error("Error al cambiar el estado del like:", error);
      setIsLiked(isLiked);
    });
};

  return (
    <li className="card">
      <img
        className="card__photo"
        src={card.link}
        alt={card.name}
        onClick={() => handleOpenPopup(
          null, <ImagePopup card={card} />,
        )}
      />
      {isOwner && <button
        className="card__button-trash"
        onClick={() => onCardDelete(card)}
        type="button"
      ></button>}
      <p className="card__name-place">{card.name}</p>
      <button
        className={cardLikeButton}
        onClick={handleLikeClick} 
        type="button"
      ></button>
      <div className="card__like">{likesCount}</div>
    </li>
  );
}
