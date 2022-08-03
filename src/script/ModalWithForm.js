import Modal from "./Modal";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, submitFunction) {
    super(modalSelector);
    this._submitFunction = submitFunction;
    this._modal = document.querySelector(this._modalSelector);
    this._form = this._modal.querySelector("form");
  }

  _getInputValues() {
    return { first: this._form[0], second: this._form[1] };
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", () => {
      this._submitFunction(this._getInputValues());
    });
    this._modal
      .querySelector(".modal__close-button")
      .addEventListener("click", () => {
        this.close();
      });
  }

  close() {
    super.close();
    this._form.reset();
    this._form[2].classList.add("form__button_inactive");
  }
}
