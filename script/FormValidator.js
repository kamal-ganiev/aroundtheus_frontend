class FormValidator {
  constructor(validationSettings, form) {
    this._settings = validationSettings;
    this._form = form;
  }

  _showValidationMessage(inputElement, formElement, errorElement) {
    const errorMessage = formElement.querySelector(`.${inputElement.id}-error`);
    errorMessage.textContent = errorElement;
    errorMessage.classList.add(this._settings.errorClass);
    inputElement.classList.add(this._settings.inputErrorClass);
  }

  _hideValidationMessage(inputElement, formElement) {
    const errorMessage = formElement.querySelector(`.${inputElement.id}-error`);
    errorMessage.textContent = "";
    errorMessage.classList.remove(this._settings.errorClass);
    inputElement.classList.remove(this._settings.inputErrorClass);
  }

  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showValidationMessage(
        inputElement,
        formElement,
        inputElement.validationMessage,
        this._settings
      );
    } else {
      this._hideValidationMessage(inputElement, formElement);
    }
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _hasValid(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
    const buttonElement = this._form.querySelector(
      this._settings.submitButtonSelector
    );
    this.toggleButtonState(inputList, buttonElement, this._settings);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(this._form, inputElement, this._settings);
        this.toggleButtonState(inputList, buttonElement, this._settings);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}

export { FormValidator };
