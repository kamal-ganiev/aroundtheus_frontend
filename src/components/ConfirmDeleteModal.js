import ModalWithForm from "./ModalWithForm";

export default class ConfirmDeleteModal extends ModalWithForm {
  setEventListeners() {
    this._form.addEventListener("submit", () => {
      this.setSubmitAction();
    });
  }
}
