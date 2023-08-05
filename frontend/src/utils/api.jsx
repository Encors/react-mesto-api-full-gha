export class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _getResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status} ${res.statusText})`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponse);
  }

  getInitialCards() {
    return this._request(this._url + `/cards`, {
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request(this._url + "/users/me", {
      headers: this._headers,
    });
  }

  setUserInfo({ name, about }) {
    return this._request(this._url + "/users/me", {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  addNewCard({ name, link }) {
    return this._request(this._url + "/cards", {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  putLike(cardId) {
    return this._request(this._url + `/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "PUT",
    });
  }

  removeCard(cardId) {
    return this._request(this._url + `/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  deleteLike(cardId) {
    return this._request(this._url + `/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  setNewAvatar(inputValues) {
    return this._request(this._url + `/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: inputValues.avatar,
      }),
    });
  }

  getAllStartedInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}

export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: "50abc53f-8d3e-448b-b494-88b8f2ced152",
    "Content-Type": "application/json",
  },
});
