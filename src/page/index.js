import "./index.css";

//////////// Importing Modules \\\\\\\\\\\\

import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import ModalWithImage from "../components/ModalWithImage";
import Section from "../components/Section";
import ModalWithForm from "../components/ModalWithForm";
import UserInfo from "../components/UserInfo";
import {
  initialCards,
  profileName,
  profileTag,
  editFormInputName,
  editFormInputTag,
  validationConfig,
  editUnrollButton,
  addUnrollButton,
  formValidators,
} from "../utils/constants";

//////////// Forms Validation \\\\\\\\\\\\

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

//////////// Card Image Preview Function \\\\\\\\\\\\

const cardImageOverlay = new ModalWithImage(".modal-preview");
cardImageOverlay.setEventListeners();

//////////// Class Calling Function \\\\\\\\\\\\

const renderCard = (item) => {
  const newCard = new Card(item, cardImageOverlay, ".card__template");
  cardSection.addItem(newCard.generateCard());
};

//////////// Initial Cards Rendering \\\\\\\\\\\\

const cardSection = new Section(
  { items: initialCards, renderer: renderCard },
  ".elements__list"
);

cardSection.renderItems();

//////////// Edit Popup Form \\\\\\\\\\\\

const editProfileModal = new ModalWithForm(".modal-edit", () =>
  submitEditForm()
);
editProfileModal.setEventListeners();

function openEditModal() {
  formValidators.NameTag.resetValidation();
  editProfileModal.setInputValues({
    name: profileName.textContent,
    tag: profileTag.textContent,
  });
  editProfileModal.open();
}

editUnrollButton.addEventListener("click", openEditModal);

const userInfo = new UserInfo(editFormInputName, editFormInputTag);

const submitEditForm = () => {
  userInfo.setUserName(profileName, profileTag);
  editProfileModal.close();
};

//////////// Add Card Popup Form \\\\\\\\\\\\

const submitAddForm = (inputValues) => {
  renderCard({
    name: inputValues.title,
    link: inputValues.link,
  });
  addCardModal.close();
};

const addCardModal = new ModalWithForm(".modal-add", submitAddForm);
addCardModal.setEventListeners();

addUnrollButton.addEventListener("click", function () {
  formValidators.AddPlace.resetValidation();
  addCardModal.open();
});
