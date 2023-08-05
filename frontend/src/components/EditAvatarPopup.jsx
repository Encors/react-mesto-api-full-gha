import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onUpdateAvatar, isLoading, onClose }) {
  const inputRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value /* Значение инпута, полученное с помощью рефа */,
    });
  }

  useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      classSelector="set-avatar"
      formName="avatar"
      title={"Обновить аватар"}
      submitBtnText={isLoading ? `Сохранение...` : `Сохранить`}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <input
        type="url"
        className="form__input form__input_type_img-link"
        placeholder="Ссылка на картинку"
        name="avatar"
        id="link-avatar"
        required
        ref={inputRef}
      />
      <span id="link-avatar-error" className="error" />
    </PopupWithForm>
  );
}
