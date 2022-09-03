import ModalWithForm from "./ModalWithForm";

export default class ConfirmDeleteModal extends ModalWithForm {
  setEventListeners() {
    this._modal
      .querySelector(".modal__close-button")
      .addEventListener("click", () => this.close());
    this._modal.addEventListener("mousedown", this._handleOutsideClickClose);
    this._form.addEventListener("submit", () => {
      this.setSubmitAction();
    });
  }
}
