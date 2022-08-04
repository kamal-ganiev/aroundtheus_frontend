import Modal from "./Modal";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, submitFunction) {
    super(modalSelector);
    this._submitFunction = submitFunction;
    this._form = this._modal.querySelector("form");
    this._inputList = this._modal.querySelectorAll("input");
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", () => {
      this._submitFunction(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
