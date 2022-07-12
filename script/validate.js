// const showValidationMessage = (
//   inputElement,
//   formElement,
//   errorElement,
//   validationConfig
// ) => {
//   const errorMessage = formElement.querySelector(`.${inputElement.id}-error`);
//   errorMessage.textContent = errorElement;
//   errorMessage.classList.add(validationConfig.errorClass);
//   inputElement.classList.add(validationConfig.inputErrorClass);
// };

// const hideValidationMessage = (inputElement, formElement, validationConfig) => {
//   const errorMessage = formElement.querySelector(`.${inputElement.id}-error`);
//   errorMessage.textContent = "";
//   errorMessage.classList.remove(validationConfig.errorClass);
//   inputElement.classList.remove(validationConfig.inputErrorClass);
// };

// const isValid = (formElement, inputElement, validationConfig) => {
//   if (!inputElement.validity.valid) {
//     showValidationMessage(
//       inputElement,
//       formElement,
//       inputElement.validationMessage,
//       validationConfig
//     );
//   } else {
//     hideValidationMessage(inputElement, formElement, validationConfig);
//   }
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// const toggleButtonState = (inputList, buttonElement, validationConfig) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(validationConfig.inactiveButtonClass);
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove(validationConfig.inactiveButtonClass);
//     buttonElement.disabled = false;
//   }
// };

// const setEventListeners = (formElement, validationConfig) => {
//   const inputList = Array.from(
//     formElement.querySelectorAll(validationConfig.inputSelector)
//   );
//   const buttonElement = formElement.querySelector(
//     validationConfig.submitButtonSelector
//   );
//   toggleButtonState(inputList, buttonElement, validationConfig);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", () => {
//       isValid(formElement, inputElement, validationConfig);
//       toggleButtonState(inputList, buttonElement, validationConfig);
//     });
//   });
// };

// const enableValidation = (validationConfig) => {
//   const formList = Array.from(
//     document.querySelectorAll(validationConfig.formSelector)
//   );
//   formList.forEach((formElement) => {
//     setEventListeners(formElement, validationConfig);
//   });
// };

class FormValidator {
  constructor(validationSettings, form) {
    this._settings = validationSettings;
    this._form = form;
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
      _showValidationMessage(
        inputElement,
        formElement,
        inputElement.validationMessage,
        validationConfig
      );
    } else {
      _hideValidationMessage(inputElement, formElement, validationConfig);
    }
  }

  _hasValid(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement, validationConfig) {
    if (_hasInvalidInput(inputList)) {
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
    _toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        _isValid(formElement, inputElement, validationConfig);
        _toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  }

  enableValidation() {
    const formList = Array.from(
      document.querySelectorAll(validationSettings.formSelector)
    );
    formList.forEach((formElement) => {
      _setEventListeners(formElement, validationSettings);
    });
  }
}
