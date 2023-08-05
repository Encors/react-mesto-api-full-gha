import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `photo-card__like-btn button ${isLiked &&
    "photo-card__like-btn_active"}`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleTrashClick() {
    onCardDelete(card);
  }

  return (
    <article className="photo-card">
      <img
        className="photo-card__photo"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      {isOwn && (
        <button
          className="photo-card__remove-btn button"
          type="button"
          onClick={handleTrashClick}
        ></button>
      )}
      <div className="photo-card__decription">
        <h2 className="photo-card__title">{card.name}</h2>
        <div className="photo-card__like-section">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="photo-card__like-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}
