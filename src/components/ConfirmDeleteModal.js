import Modal from "./Modal";

export default class ConfirmDeleteModal extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._form = this._modal.querySelector("form");
    this._button = this._modal.querySelector(".form__button");
    this._buttonDefaultValue = this._button.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", () => {
      this.handleSubmit();
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = "Deleting...";
    } else {
      this._button.textContent = this._buttonDefaultValue;
    }
  }
}
