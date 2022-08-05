export default class Section {
  constructor({ items, renderer }, selector) {
    this._data = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  renderItems() {
    return this._renderer(this._data);
  }
  addItem(item) {
    this._container.prepend(item);
  }
}
