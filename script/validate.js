class FormValidator {
  constructor(validationSettings, formList) {
    this._settings = validationSettings;
    this._forms = formList;
  }

  _showValidationMessage(
    inputElement,
    formElement,
    errorElement,
    validationConfig
  ) {
    const errorMessage = formElement.querySelector(`.${inputElement.id}-error`);
    errorMessage.textContent = errorElement;
    errorMessage.classList.add(validationConfig.errorClass);
    inputElement.classList.add(validationConfig.inputErrorClass);
  }

  _hideValidationMessage(inputElement, formElement, validationConfig) {
    const errorMessage = formElement.querySelector(`.${inputElement.id}-error`);
    errorMessage.textContent = "";
    errorMessage.classList.remove(validationConfig.errorClass);
    inputElement.classList.remove(validationConfig.inputErrorClass);
  }

  _isValid(formElement, inputElement, validationConfig) {
    if (!inputElement.validity.valid) {
      this._showValidationMessage(
        inputElement,
        formElement,
        inputElement.validationMessage,
        validationConfig
      );
    } else {
      this._hideValidationMessage(inputElement, formElement, validationConfig);
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

  _toggleButtonState(inputList, buttonElement, validationConfig) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners(formElement, validationConfig) {
    const inputList = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      validationConfig.submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(formElement, inputElement, validationConfig);
        this._toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  }

  enableValidation() {
    this._forms = Array.from(
      document.querySelectorAll(this._settings.formSelector)
    );
    this._forms.forEach((formElement) => {
      this._setEventListeners(formElement, this._settings);
    });
  }
}

export { FormValidator };
