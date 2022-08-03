import "./styles/index.css";

////////// Intial Cards Array //////////

const initialCards = [
  {
    name: "Chicago, Illinois",
    link: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370",
  },
  {
    name: "Indianapolis, Indiana",
    link: "https://images.unsplash.com/photo-1578777108770-fcd123148f66?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987",
  },
  {
    name: "Philadelphia, Pennsylvania",
    link: "https://images.unsplash.com/photo-1601332069884-15a8149df78a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHBoaWxhZGVscGhpYSUyMHNreWxpbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=800",
  },
  {
    name: "Pittsburgh, Pennsylvania",
    link: "https://images.unsplash.com/photo-1649078487531-86fb36857c4a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fHBpdHRzYnVyZ2glMjBicmlkZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800",
  },
  {
    name: "Portland, Oregon",
    link: "https://images.unsplash.com/photo-1645934430496-6cae81215bf9?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988",
  },
  {
    name: "Seattle, Washington",
    link: "https://images.unsplash.com/photo-1495726569656-8b8886143e6a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjY1fHxzZWF0dGxlJTIwc2t5bGluZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800",
  },
];

//////////// Importing Modules \\\\\\\\\\\\

import Card from "./script/Card";
import Modal from "./script/Modal";
import FormValidator from "./script/FormValidator";
import ModalWithImage from "./script/ModalWithImage";
import Section from "./script/Section";
import ModalWithForm from "./script/ModalWithForm";

//////////// Forms Validation \\\\\\\\\\\\

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_inactive",
  inputErrorClass: "form__input-error_active",
  errorClass: "form__error-message_active",
};

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

  const newCard = card.renderer();

  card.addItem(newCard);
};

//////////// Initial Cards Rendering \\\\\\\\\\\\

initialCards.forEach((item) => {
  renderCard(item);
});

//////////// Edit Popup Form \\\\\\\\\\\\

const profileName = document.querySelector(".profile__name");
const profileTag = document.querySelector(".profile__tag");

const submitEditForm = (inputValues) => {
  profileName.textContent = inputValues.first.value;
  profileTag.textContent = inputValues.second.value;
  editProfileModal.close();
  editFormValidator.toggleButtonState();
};

const editProfileModal = new ModalWithForm(".modal-edit", submitEditForm);
editProfileModal.setEventListeners();

const editUnrollButton = document.querySelector(".profile__edit-button");

function openEditModal() {
  editProfileModal.open();
}

editUnrollButton.addEventListener("click", openEditModal);

//////////// Add Card Popup Form \\\\\\\\\\\\

const submitAddForm = (inputValues) => {
  renderCard({
    name: inputValues.first.value,
    link: inputValues.second.value,
  });
  addCardModal.close();
  cardFormValidator.toggleButtonState();
};

const addCardModal = new ModalWithForm(".modal-add", submitAddForm);
addCardModal.setEventListeners();

const addUnrollButton = document.querySelector(".profile__add-button");

addUnrollButton.addEventListener("click", function () {
  addCardModal.open();
});
