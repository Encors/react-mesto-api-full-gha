import React from "react";
import Popup from "./Popup";

export default function ImagePopup({ isOpen, card, classSelector, onClose }) {
  return (
    <Popup isOpen={isOpen} classSelector={classSelector} onClose={onClose}>
      <div className="popup__container-photo">
        <button className="popup__close-btn button" type="button" />
        <figure className="popup__figure">
          <img
            className="popup__photo"
            src={card.link}
            alt={`Картинка города: ${card.name}`}
          />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </Popup>
  );
}
