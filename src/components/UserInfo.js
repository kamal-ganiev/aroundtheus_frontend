export default class UserInfo {
  constructor(userName, userTag) {
    this._name = userName;
    this._tag = userTag;
  }

  getUserInfo() {
    return { name: this._name, tag: this._tag };
  }

  setUserName(name, tag) {
    (name.textContent = this._name), (tag.textContent = this._tag);
  }
}
