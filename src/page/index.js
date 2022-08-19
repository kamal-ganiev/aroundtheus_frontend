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
  changeUnrollButton,
} from "../utils/constants";
import Api from "../components/Api";

const api = new Api(1);

//////////// Setting User Info \\\\\\\\\\\\

const userInfo = new UserInfo(".profile__name", ".profile__tag");

const userAvatar = document.querySelector(".profile__avatar");

api.getUserInfo().then((res) => {
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

//////////// Remove Form Function \\\\\\\\\\\\

const cardRemoveConfirmationForm = new ModalWithForm(
  ".modal-remove",
  submitRemoveForm
);
cardRemoveConfirmationForm.setEventListeners();

function openRemoveCard() {
  cardRemoveConfirmationForm.open();
}

function submitRemoveForm() {
  cardRemoveConfirmationForm.close();
}

//////////// Class Calling Function \\\\\\\\\\\\

const renderCard = (item) => {
  const newCard = new Card(
    item,
    cardImageOverlay,
    ".card__template",
    userInfo.getUserInfo(),
    api.removeCard,
    openRemoveCard
  );
  cardSection(item).addItem(newCard.generateCard());
};

//////////// Initial Cards Rendering \\\\\\\\\\\\

const cardSection = (data) => {
  return new Section({ items: data, renderer: renderCard }, ".elements__list");
};

api.getInitialCards().then((res) => {
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
  editProfileModal.renderLoading(true);
  userInfo.setUserInfo({ name: inputValues.name, tag: inputValues.tag });
  api
    .setUserInfo({ name: inputValues.name, about: inputValues.tag })
    .finally(editProfileModal.renderLoading(false));
  editProfileModal.close();
};

const editProfileModal = new ModalWithForm(".modal-edit", submitEditForm);

editProfileModal.setEventListeners();

//////////// Add Card Popup Form \\\\\\\\\\\\

const submitAddForm = (inputValues) => {
  addCardModal.renderLoading(true);
  api
    .uploadNewCard({
      name: inputValues.title,
      link: inputValues.link,
    })
    .then(() => {
      api.getInitialCards().then((res) => {
        cardSection(res.reverse()).renderItems();
      });
    })
    .finally(addCardModal.renderLoading(false));
  addCardModal.close();
};

const addCardModal = new ModalWithForm(".modal-add", submitAddForm);
addCardModal.setEventListeners();

addUnrollButton.addEventListener("click", function () {
  formValidators.AddPlace.resetValidation();
  addCardModal.open();
});

//////////// Change Profile Picture Form \\\\\\\\\\\\

const submitChangeForm = (inputValues) => {
  changeProfilePictureModal.renderLoading(true);
  api
    .changeProfilePicture({ avatar: inputValues.link })
    .then(
      (changeUnrollButton.style.backgroundImage = `url("${inputValues.link}")`)
    )
    .then(changeProfilePictureModal.renderLoading(false))
    .finally(changeProfilePictureModal.close());
};

const changeProfilePictureModal = new ModalWithForm(
  ".modal-change",
  submitChangeForm
);
changeProfilePictureModal.setEventListeners();

changeUnrollButton.addEventListener("click", function () {
  formValidators.ChangeAvatar.resetValidation();
  changeProfilePictureModal.open();
});
