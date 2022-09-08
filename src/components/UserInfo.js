export default class UserInfo {
  constructor(userName, userTag, userAvatar) {
    this._userName = document.querySelector(userName);
    this._userTag = document.querySelector(userTag);
    this._userAvatar = document.querySelector(userAvatar);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      tag: this._userTag.textContent,
      _id: this._userId,
    };
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userTag.textContent = data.about;
    this._userId = data._id;
  }

  setUserAvatar({ avatar }) {
    this._userAvatar.style.backgroundImage = `url(${avatar})`;
  }
}
