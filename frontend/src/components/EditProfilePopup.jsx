import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onUpdateUser, isLoading, onClose }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      classSelector="edit-profile"
      formName="profile"
      title={"Редактировать профиль"}
      submitBtnText={isLoading ? `Сохранение...` : `Сохранить`}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <input
        type="text"
        className="form__input form__input_type_name"
        placeholder="Имя"
        name="nameProfile"
        id="name-profile"
        required
        minLength={2}
        maxLength={40}
        value={name || ""}
        onChange={handleChangeName}
      />
      <span id="name-profile-error" className="error" />
      <input
        type="text"
        className="form__input form__input_type_job"
        placeholder="О себе"
        name="jobProfile"
        id="job-profile"
        required
        minLength={2}
        maxLength={200}
        value={description || ""}
        onChange={handleChangeDescription}
      />
      <span id="job-profile-error" className="error" />
    </PopupWithForm>
  );
}
