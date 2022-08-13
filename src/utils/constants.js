////////// Modal Elements //////////

const editUnrollButton = document.querySelector(".profile__edit-button");
const addUnrollButton = document.querySelector(".profile__add-button");
const changeUnrollButton = document.querySelector(".profile__avatar");

////////// Validation config //////////

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_inactive",
  inputErrorClass: "form__input-error_active",
  errorClass: "form__error-message_active",
};

const formValidators = {};

////////// Export //////////

export {
  validationConfig,
  editUnrollButton,
  addUnrollButton,
  formValidators,
  changeUnrollButton,
};
