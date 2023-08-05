import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ConfirmationPopup from "./ConfirmationPopup";
import ProtectedRouteElement from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import { register, login, checkToken } from "../utils/authApi";

export default function App() {
  const [isOpenAvatarPopup, setIsOpenAvatarPopup] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isOpenPlacePopup, setIsOpenPlacePopup] = useState(false);
  const [isOpenSelectedCard, setIsOpenSelectedCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loadingEditProfilePopup, setLoadingEditProfilePopup] = useState(false);
  const [loadingAddPlacePopup, setLoadingAddPlacePopup] = useState(false);
  const [loadingConfirmationPopup, setLoadingConfirmationPopup] = useState(false);
  const [loadingEditAvatarPopup, setLoadingEditAvatarPopup] = useState(false);
  const [isOpenConfirmationPopup, setIsOpenConfirmationPopup] = useState(false);
  const [deletingCard, setDeletingCard] = useState(null);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isOpenInfoTooltip, setOpenInfoTooltip] = useState(false);
  const [responseInfo, setResponseInfo] = useState({
    status: false,
    text: "",
  });

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/sign-in");
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getAllStartedInfo()
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loggedIn]);

  function handleConfirmation(card) {
    setIsOpenConfirmationPopup(true);
    setDeletingCard(card);
  }

  function handleCardClick(card) {
    setIsOpenSelectedCard(true);
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsOpenAvatarPopup(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsOpenPlacePopup(true);
  }

  const closeAllPopups = useCallback(() => {
    setIsOpenAvatarPopup(false);
    setIsEditProfilePopupOpen(false);
    setIsOpenPlacePopup(false);
    setIsOpenSelectedCard(false);
    setIsOpenConfirmationPopup(false);
    setDeletingCard(null);
    setOpenInfoTooltip(false);
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .putLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleUpdateUser({ name, about }) {
    setLoadingEditProfilePopup(true);
    api
      .setUserInfo({ name, about })
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingEditProfilePopup(false);
      });
  }

  function handleUpdateAvatar(value) {
    setLoadingEditAvatarPopup(true);
    api
      .setNewAvatar(value)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingEditAvatarPopup(false);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    setLoadingAddPlacePopup(true);
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingAddPlacePopup(false);
      });
  }

  function handleCardDelete(deletingCard) {
    setLoadingConfirmationPopup(true);
    api
      .removeCard(deletingCard._id)
      .then(() => {
        setCards((state) => {
          return state.filter((card) => card._id !== deletingCard._id);
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingConfirmationPopup(false);
      });
  }

  function handleRegister({ password, email }) {
    return register(password, email)
      .then(() => {
        setResponseInfo({
          status: true,
          text: "Вы успешно зарегистрировались!",
        });
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setResponseInfo({
          status: false,
          text: `Что-то пошло не так! Попробуйте ещё раз. ${err}`,
        });
      })
      .finally(() => setOpenInfoTooltip(true));
  }

  function handleLogin({ password, email }) {
    return login(password, email)
      .then((token) => {
        if (token) {
          localStorage.setItem("jwt", token.token);
          setLoggedIn(true);
          setUserEmail(email);
          navigate("/");
        }
      })
      .catch((err) => {
        if (err === "Ошибка: 401 Unauthorized") {
          setOpenInfoTooltip(true);
          setResponseInfo({
            status: false,
            text: "Такой аккаунт не зарегистрирован",
          });
        } else {
          setOpenInfoTooltip(true);
          setResponseInfo({
            status: false,
            text: `Что-то пошло не так! Попробуйте ещё раз. ${err}`,
          });
        }
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
    setLoggedIn(false);
    setUserEmail("");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} userEmail={userEmail} onSignOut={handleSignOut} />
        <Routes>
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                component={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onCardDelete={handleConfirmation}
              />
            }
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          isLoading={loadingEditProfilePopup}
        />
        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isOpenPlacePopup}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={loadingAddPlacePopup}
        />
        <ConfirmationPopup
          onClose={closeAllPopups}
          isOpen={isOpenConfirmationPopup}
          isLoading={loadingConfirmationPopup}
          onCardDelete={handleCardDelete}
          deletingCard={deletingCard}
        />
        <EditAvatarPopup
          onClose={closeAllPopups}
          isOpen={isOpenAvatarPopup}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={loadingEditAvatarPopup}
        />
        <ImagePopup
          isOpen={isOpenSelectedCard}
          card={selectedCard}
          onClose={closeAllPopups}
          classSelector="photo"
        />
        <InfoTooltip
          isOpen={isOpenInfoTooltip}
          onClose={closeAllPopups}
          responseInfo={responseInfo}
          classSelector="info-tooltip"
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
