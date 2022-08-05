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
  editModal,
  editUnrollButton,
  addUnrollButton,
} from "../utils/constants";

//////////// Forms Validation \\\\\\\\\\\\

const cardFormValidator = new FormValidator(
  validationConfig,
  document.forms.AddPlace
);

cardFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  validationConfig,
  document.forms.NameTag
);

editFormValidator.enableValidation();

//////////// Card Image Preview Function \\\\\\\\\\\\

const cardImageOverlay = new ModalWithImage(".modal-preview");
cardImageOverlay.setEventListeners();

//////////// Class Calling Function \\\\\\\\\\\\

const cardClass = new Card(cardImageOverlay, ".card__template");

const renderCard = (item) => {
  const card = new Section(
    {
      items: item,
      renderer: (item) => {
        const element = cardClass.getCardTemplate();
        const image = element.querySelector(".element__image");
        image.src = item.link;
        image.alt = item.name;
        element.querySelector(".element__title").textContent = item.name;
        cardClass.setEventListeners(
          image,
          element.querySelector(".element__like-button"),
          element.querySelector(".element__remove-button")
        );

        return element;
      },
    },
    ".elements__list"
  );

  const newCard = card.renderItems();

  card.addItem(newCard);
};

//////////// Initial Cards Rendering \\\\\\\\\\\\

initialCards.forEach((item) => {
  renderCard(item);
});

//////////// Edit Popup Form \\\\\\\\\\\\

const replaceEditFormInputs = () => {
  editFormInputName.value = profileName.textContent;
  editFormInputTag.value = profileTag.textContent;
};

replaceEditFormInputs();

const submitEditForm = (inputValues) => {
  const userInfo = new UserInfo(inputValues.name, inputValues.tag);
  userInfo.setUserName(profileName, profileTag);
  editProfileModal.close();
  editFormInputName.value = userInfo.getUserInfo().name;
  editFormInputTag.value = userInfo.getUserInfo().tag;
  editFormValidator.toggleButtonState();
};

const editProfileModal = new ModalWithForm(".modal-edit", submitEditForm);
editProfileModal.setEventListeners();

editModal
  .querySelector(".modal__close-button")
  .addEventListener("click", replaceEditFormInputs);

function openEditModal() {
  editProfileModal.open();
}

editUnrollButton.addEventListener("click", openEditModal);

//////////// Add Card Popup Form \\\\\\\\\\\\

const submitAddForm = (inputValues) => {
  renderCard({
    name: inputValues.title,
    link: inputValues.link,
  });
  addCardModal.close();
  cardFormValidator.toggleButtonState();
};

const addCardModal = new ModalWithForm(".modal-add", submitAddForm);
addCardModal.setEventListeners();

addUnrollButton.addEventListener("click", function () {
  addCardModal.open();
});
