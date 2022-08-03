export default class UserInfo {
  constructor(userName, userTag) {
    this._name = userName.value;
    this._tag = userTag.value;
  }

  getUserInfo() {
    return { name: this._name, tag: this._tag };
  }

  setUserName(name, tag) {
    (name.textContent = this._name), (tag.textContent = this._tag);
  }
}
