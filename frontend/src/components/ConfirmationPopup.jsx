import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmationPopup({
  deletingCard,
  isOpen,
  isLoading,
  onCardDelete,
  onClose,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(deletingCard);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      classSelector="confirm"
      formName="confirm"
      title={"Вы уверены?"}
      submitBtnText={isLoading ? `Удаление...` : `Да`}
      onSubmit={handleSubmit}
      onClose={onClose}
    ></PopupWithForm>
  );
}
