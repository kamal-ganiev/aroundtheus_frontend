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
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "bcf1ec82-9142-4956-ae12-15a368287229",
    "Content-Type": "application/json",
  },
});

//////////// Setting User Info \\\\\\\\\\\\

const userInfo = new UserInfo(".profile__name", ".profile__tag");

const userAvatar = document.querySelector(".profile__avatar");

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({ name: res.name, tag: res.about });
    userAvatar.style.backgroundImage = `url(${res.avatar})`;
  })
  .catch((err) => {
    console.log(err);
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

const cardRemoveConfirmationForm = new ConfirmDeleteModal(".modal-remove");
cardRemoveConfirmationForm.setEventListeners();

//////////// Card Delete Function \\\\\\\\\\\\

const handleDeleteCardClick = (card, data) => {
  cardRemoveConfirmationForm.open();
  cardRemoveConfirmationForm.setSubmitAction = () => {
    cardRemoveConfirmationForm.close();
    api
      .removeCard(data._id)
      .then(() => {
        card.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//////////// Class Calling Function \\\\\\\\\\\\

const renderCard = (item) => {
  const newCard = new Card(
    item,
    cardImageOverlay,
    ".card__template",
    userInfo.getUserInfo(),
    handleDeleteCardClick
  );
  cardSection(item).addItem(newCard.generateCard());
};

//////////// Initial Cards Rendering \\\\\\\\\\\\

const cardSection = (data) => {
  return new Section({ items: data, renderer: renderCard }, ".elements__list");
};

api
  .getInitialCards()
  .then((res) => {
    cardSection(res.reverse()).renderItems();
  })
  .catch((err) => {
    console.log(err);
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
    .catch((err) => {
      console.log(err);
    })
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
    .catch((err) => {
      console.log(err);
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
    .catch((err) => {
      console.log(err);
    })
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
