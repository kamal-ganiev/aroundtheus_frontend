export default class Section {
  constructor({ items, renderer }, selector) {
    this._data = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  renderItems() {
    this._data.forEach((item) => {
      return this._renderer(item);
    });
  }
  addItem(item) {
    this._container.prepend(item);
  }
}
