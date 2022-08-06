export default class UserInfo {
  constructor(userName, userTag) {
    this._userName = document.querySelector(userName);
    this._userTag = document.querySelector(userTag);
  }

  getUserInfo() {
    return { name: this._userName.textContent, tag: this._userTag.textContent };
  }

  setUserInfo({ name: name, tag: tag }) {
    this._userName.textContent = name;
    this._userTag.textContent = tag;
  }
}
