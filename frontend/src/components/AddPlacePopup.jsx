import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onAddPlace, isLoading, onClose }) {
  const [formValue, setFormValue] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });

    setErrorMessage({
      ...errorMessage,
      [name]: e.target.validationMessage,
    });

    setIsValid(e.target.closest("form").checkValidity());
  };

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({ name: formValue.nameCard, link: formValue.linkCard });
  }

  useEffect(() => {
    setErrorMessage("");
    if (isOpen) {
      setFormValue("");
      setIsValid(false);
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      disabled={!isValid}
      classSelector="add-card"
      formName="card"
      title={"Новое место"}
      submitBtnText={isLoading ? `Создание...` : `Создать`}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <input
        type="text"
        className={
          !errorMessage.nameCard ? "form__input " : "form__input form__input_type_error"
        }
        placeholder="Название"
        name="nameCard"
        id="name-card"
        required
        minLength={2}
        onChange={handleChange}
        maxLength={30}
        value={formValue.nameCard || ""}
      />
      <span id="name-card-error" className="error">
        {errorMessage.nameCard}
      </span>
      <input
        type="url"
        className={
          !errorMessage.linkCard ? "form__input" : "form__input form__input_type_error"
        }
        placeholder="Ссылка на картинку"
        name="linkCard"
        id="link-card"
        onChange={handleChange}
        required
        value={formValue.linkCard || ""}
      />
      <span id="link-card-error" className="error">
        {errorMessage.linkCard}
      </span>
    </PopupWithForm>
  );
}
