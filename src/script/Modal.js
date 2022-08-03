export default class Modal {
  constructor(modalSelector) {
    this._modalSelector = modalSelector;
    this._modal = document.querySelector(this._modalSelector);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOutsideClickClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };

  open() {
    this._modal.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._modal
      .querySelector(".modal__close-button")
      .addEventListener("click", () => this.close());
    this._modal.addEventListener("mousedown", this._handleOutsideClickClose);
  }
}
