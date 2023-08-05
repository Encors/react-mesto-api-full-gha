import React from "react";
import register_ok from "../images/register_ok.svg";
import not_register from "../images/not_register.svg";
import Popup from "./Popup";

export default function InfoTooltip({ onClose, isOpen, responseInfo, classSelector }) {
  return (
    <Popup isOpen={isOpen} classSelector={classSelector} onClose={onClose}>
      <div className="popup__container popup__container-info-tooltip">
        <button className="popup__close-btn button" type="button" />
        <img
          src={responseInfo.status ? register_ok : not_register}
          className="popup__image"
          alt="Иконка статуса регистрации / авторизации"
        />
        <h2 className="popup__title popup__title_type_info-tooltip">
          {responseInfo.text}
        </h2>
      </div>
    </Popup>
  );
}
