export default class Api {
  constructor(options) {
    this._options = options;
  }

  getUserInfo() {
    return fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
      headers: {
        authorization: "bcf1ec82-9142-4956-ae12-15a368287229",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  }

  setUserInfo(data) {
    return fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
      method: "PATCH",
      headers: {
        authorization: "bcf1ec82-9142-4956-ae12-15a368287229",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(data),
    });
  }

  changeProfilePicture(data) {
    return fetch(
      "https://around.nomoreparties.co/v1/group-12/users/me/avatar",
      {
        method: "PATCH",
        headers: {
          authorization: "bcf1ec82-9142-4956-ae12-15a368287229",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(data),
      }
    );
  }

  getInitialCards() {
    return fetch("https://around.nomoreparties.co/v1/group-12/cards", {
      headers: {
        authorization: "bcf1ec82-9142-4956-ae12-15a368287229",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  }

  uploadNewCard(data) {
    return fetch("https://around.nomoreparties.co/v1/group-12/cards", {
      method: "POST",
      headers: {
        authorization: "bcf1ec82-9142-4956-ae12-15a368287229",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(data),
    });
  }

  removeCard(cardId) {
    return fetch(
      `https://around.nomoreparties.co/v1/group-12/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: "bcf1ec82-9142-4956-ae12-15a368287229",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      }
    );
  }
}
