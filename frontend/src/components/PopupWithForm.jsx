import React from "react";
import Popup from "./Popup";

export default function PopupWithForm({
  classSelector,
  isOpen,
  formName,
  title,
  submitBtnText,
  children,
  onSubmit,
  onClose,
  disabled,
}) {
  return (
    <Popup isOpen={isOpen} classSelector={classSelector} onClose={onClose}>
      <div className="popup__container">
        <button className="popup__close-btn button" type="button"></button>
        <h2 className="popup__title">{title}</h2>
        <form className="form" name={formName} onSubmit={onSubmit}>
          {children}
          <button
            className={
              disabled
                ? "form__submit-btn  form__submit-btn_disabled"
                : "form__submit-btn  button"
            }
            type="submit"
          >
            {submitBtnText}
          </button>
        </form>
      </div>
    </Popup>
  );
}
