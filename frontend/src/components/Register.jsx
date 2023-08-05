import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginAndRegisterForm from "./LoginAndRegisterForm";

export default function Register({ onRegister }) {
  const [formValue, setFormValue] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [isValid, setIsValid] = useState(false);

  // useEffect(() => {
  //   console.log(`state is `, formValue);
  //   console.log(`state is `, isValid);
  //   // console.log(`state is `, errorMessage);
  // }, [formValue]);

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
    onRegister(formValue).then(() => {
      setErrorMessage("");
      setFormValue("");
    });
  }

  return (
    <main className="content">
      <section className="login">
        <h2 className="login__title">Регистрация</h2>
        <LoginAndRegisterForm
          submitBtnText="Зарегистрироваться"
          onSubmit={handleSubmit}
          disabled={!isValid}
        >
          <input
            className={
              !errorMessage.email
                ? "form__input form__input_type_login"
                : "form__input form__input_type_login form__input_type_error"
            }
            type="email"
            name="email"
            value={formValue.email || ""}
            placeholder="Email"
            onChange={handleChange}
            minLength="2"
            required
          ></input>
          <span className="error">{errorMessage.email}</span>
          <input
            className={
              !errorMessage.password
                ? "form__input form__input_type_login"
                : "form__input form__input_type_login form__input_type_error"
            }
            name="password"
            type="password"
            value={formValue.password || ""}
            placeholder="Пароль"
            onChange={handleChange}
            minLength="2"
            required
          ></input>
          <span className="error">{errorMessage.password}</span>
        </LoginAndRegisterForm>
        <Link to="/sign-in" className="login__extra-link link">
          Уже зарегистрированы? Войти
        </Link>
      </section>
    </main>
  );
}
