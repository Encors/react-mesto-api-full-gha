import Card from "./Card";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const cardsElements = cards.map((card) => (
    <Card
      key={card._id}
      card={card}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
    />
  ));

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__picture">
          <img src={currentUser.avatar} className="profile__avatar" alt="Фотография профиля" />
          <button
            onClick={onEditAvatar}
            className="profile__picture-btn button"
            type="button"
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__job">{currentUser.about}</p>
          <button
            onClick={onEditProfile}
            className="profile__edit-btn button"
            type="button"
          ></button>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-btn button"
          type="button"
        ></button>
      </section>
      <section className="gallery" aria-label="Секция фотографий">
        {cardsElements}
      </section>
    </main>
  );
}
