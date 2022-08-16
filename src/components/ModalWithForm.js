import Modal from "./Modal";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, submitFunction) {
    super(modalSelector);
    this._submitFunction = submitFunction;
    this._form = this._modal.querySelector("form");
    this._inputList = this._modal.querySelectorAll("input");
    this._button = this._modal.querySelector(".form__button");
    this._buttonDefaultValue = this._button.textContent;
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = "Searching...";
    } else {
      this._button.textContent = this._buttonDefaultValue;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", () => {
      this._submitFunction(this._getInputValues());
    });
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
