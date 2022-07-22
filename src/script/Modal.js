class Modal {
  constructor(modalSelector) {
    this._modalSelector = modalSelector;
    this._modal = document.querySelector(this._modalSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOutsideClickClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  open() {
    this._modal.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    this._modal.classList.remove("modal_opened");
  }

  setEventListeners() {
    this._modal
      .querySelector(".modal__close-button")
      .addEventListener("click", () => this.close());
  }
}

export { Modal };
