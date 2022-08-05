export default class UserInfo {
  constructor(userName, userTag) {
    this._name = document.querySelector(".profile__name");
    this._tag = document.querySelector(".profile__tag");
    this._name.textContent = userName;
    this._tag.textContent = userTag;
  }

  getUserInfo() {
    return { name: this._name.textContent, tag: this._tag.textContent };
  }

  setUserName() {
    this._name.textContent = this.getUserInfo().name;
    this._tag.textContent = this.getUserInfo().tag;
  }
}
