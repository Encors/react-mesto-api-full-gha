import logo from "../images/logo.svg";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";

export default function Header({ loggedIn, userEmail, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      {loggedIn ? (
        <div className="header__user-elements">
          <p className="header__user-email">{userEmail}</p>
          <button className="header__logout button" onClick={onSignOut}>
            Выйти
          </button>
        </div>
      ) : (
        <div className="">
          <Routes>
            <Route
              path="/sign-up"
              element={
                <Link to={"/sign-in"} className="header__nav-link link">
                  Войти
                </Link>
              }
            />
            <Route
              path="/sign-in"
              element={
                <Link to={"/sign-up"} className="header__nav-link link">
                  Регистрация
                </Link>
              }
            />
          </Routes>
        </div>
      )}
    </header>
  );
}
