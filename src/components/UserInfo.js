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

  setUserInfo({ name, tag, avatar, _id }) {
    this._userName.textContent = name;
    this._userTag.textContent = tag;
    this._userAvatar.style.backgroundImage = `url(${avatar})`;
    this._userId = _id;
  }
}
