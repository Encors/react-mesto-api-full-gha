import React from "react";

export default function LoginAndRegisterForm({
  children,
  submitBtnText,
  onSubmit,
  disabled,
}) {
  return (
    <form className="form form_type_login" name="login" onSubmit={onSubmit}>
      {children}
      <button
        className={
          disabled
            ? "form__submit-btn form__submit-btn_type_login form__submit-btn_disabled"
            : "form__submit-btn form__submit-btn_type_login button"
        }
        type="submit"
      >
        {submitBtnText}
      </button>
    </form>
  );
}
