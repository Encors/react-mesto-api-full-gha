const BASE_URL = "https://auth.nomoreparties.co";

function getResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
}

function request(url, options) {
  return fetch(url, options).then((res) => getResponse(res));
}

export const register = (password, email) => {
  return request(BASE_URL + "/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, email: email }),
  });
};

export const login = (password, email) => {
  return request(BASE_URL + "/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, email: email }),
  });
};

export const checkToken = (token) => {
  return request(BASE_URL + "/users/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
