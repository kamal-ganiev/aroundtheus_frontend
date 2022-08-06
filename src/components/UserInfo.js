export default class UserInfo {
  constructor(userName, userTag) {
    this._userName = document.querySelector(".profile__name");
    this._userTag = document.querySelector(".profile__tag");
    this._name = userName;
    this._tag = userTag;
  }

  getUserInfo() {
    return { name: this._name.value, tag: this._tag.value };
  }

  setUserName() {
    this._userName.textContent = this.getUserInfo().name;
    this._userTag.textContent = this.getUserInfo().tag;
  }
}
