import "./index.css";

//////////// Importing Modules \\\\\\\\\\\\

import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import ModalWithImage from "../components/ModalWithImage";
import Section from "../components/Section";
import ModalWithForm from "../components/ModalWithForm";
import UserInfo from "../components/UserInfo";
import {
  validationConfig,
  editUnrollButton,
  addUnrollButton,
  formValidators,
} from "../utils/constants";
import Api from "../components/Api";

const api = new Api(1);

//////////// Setting User Info \\\\\\\\\\\\

const userInfo = new UserInfo(".profile__name", ".profile__tag");

const userAvatar = document.querySelector(".profile__avatar");

api
  .getUserInfo()
  .then((res) => res.json())
  .then((res) => {
    userInfo.setUserInfo({ name: res.name, tag: res.about });
    userAvatar.style.backgroundImage = `url(${res.avatar})`;
  });

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
  cardSection(item).addItem(newCard.generateCard(item.likes.length));
};

//////////// Initial Cards Rendering \\\\\\\\\\\\

const cardSection = (data) => {
  return new Section({ items: data, renderer: renderCard }, ".elements__list");
};

api
  .getInitialCards()
  .then((res) => res.json())
  .then((res) => {
    cardSection(res.reverse()).renderItems();
  });

//////////// Edit Popup Form \\\\\\\\\\\\

function openEditModal() {
  formValidators.NameTag.resetValidation();
  editProfileModal.setInputValues(userInfo.getUserInfo());
  editProfileModal.open();
}

editUnrollButton.addEventListener("click", openEditModal);

const submitEditForm = (inputValues) => {
  userInfo.setUserInfo({ name: inputValues.name, tag: inputValues.tag });
  api.setUserInfo({ name: inputValues.name, about: inputValues.tag });
  editProfileModal.close();
};

const editProfileModal = new ModalWithForm(".modal-edit", submitEditForm);

editProfileModal.setEventListeners();

//////////// Add Card Popup Form \\\\\\\\\\\\

const submitAddForm = (inputValues) => {
  renderCard({
    name: inputValues.title,
    link: inputValues.link,
  });
  api.uploadNewCard({
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
