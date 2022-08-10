export default class Api {
  constructor(options) {
    this._options = options;
  }

  getUserInfo() {
    return fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
      headers: {
        authorization: "bcf1ec82-9142-4956-ae12-15a368287229",
        "Content-Type": "application/json",
      },
    });
  }

  setUserInfo(data) {
    return fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
      method: "PATCH",
      headers: {
        authorization: "bcf1ec82-9142-4956-ae12-15a368287229",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  getInitialCards() {
    return fetch("https://around.nomoreparties.co/v1/group-12/cards", {
      headers: {
        authorization: "bcf1ec82-9142-4956-ae12-15a368287229",
        "Content-Type": "application/json",
      },
    });
  }
}
