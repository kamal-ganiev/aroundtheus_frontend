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

import { Card } from "./Card.js";
import { openModal, closeModal } from "./utils.js";
import { FormValidator } from "./validate.js";

//////////// Cloning Card's Template \\\\\\\\\\\\

const cardTemplate = document.querySelector(".card__template");
const cloneCardTemplate = cardTemplate.content.cloneNode(true);

const elementsItem = cloneCardTemplate.querySelector(".elements__item");

//////////// Edit Popup Form \\\\\\\\\\\\

const editProfileModal = document.querySelector(".modal-edit");

const editUnrollButton = document.querySelector(".profile__edit-button");

const profileName = document.querySelector(".profile__name");
const profileTag = document.querySelector(".profile__tag");

const editFormName = document.querySelector("input[name='name']");
const editFormTag = document.querySelector("input[name='tag']");

const editForm = document.querySelector(".modal__form[name='NameTag']");

const cardsContainer = document.querySelector(".elements__list");

function submitEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = editFormName.value;
  profileTag.textContent = editFormTag.value;
  closeModal(editProfileModal);
}

editForm.addEventListener("submit", submitEditForm);

function fillEditForm(name, tag) {
  editFormName.value = name.textContent;
  editFormTag.value = tag.textContent;
}

function openEditModal() {
  openModal(editProfileModal);
  fillEditForm(profileName, profileTag);
}

editUnrollButton.addEventListener("click", openEditModal);

//////////// Add Card Popup Form \\\\\\\\\\\\

const addCardModal = document.querySelector(".modal-add");

const addFormTitle = document.querySelector("input[name='title']");
const addFormLink = document.querySelector("input[name='link']");

const addUnrollButton = document.querySelector(".profile__add-button");
const addCardFormSubmitButton = document.querySelector(".modal-add-button");
const addCardForm = document.forms.AddPlace;

const addCardFormInputList = [addFormTitle, addFormLink];

function submitAddForm(evt) {
  evt.preventDefault();

  const card = new Card(addFormLink.value, addFormTitle.value);
  cardsContainer.prepend(card.renderCard(cardTemplate));

  addCardForm.reset();
  closeModal(addCardModal);
  const submitButtonClass = { inactiveButtonClass: "form__button_inactive" };
  toggleButtonState(
    addCardFormInputList,
    addCardFormSubmitButton,
    submitButtonClass
  );
}

addUnrollButton.addEventListener("click", function () {
  openModal(addCardModal);
});

addCardForm.addEventListener("submit", submitAddForm);

//////////// Initial Cards Creating \\\\\\\\\\\\

initialCards.forEach((item) => {
  const card = new Card(item.link, item.name);
  cardsContainer.prepend(card.renderCard(cardTemplate));
});

//////////// Forms Validation \\\\\\\\\\\\

const formValidation = new FormValidator(
  {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_inactive",
    inputErrorClass: "form__input-error_active",
    errorClass: "form__error-message_active",
  },
  document.querySelectorAll(".form")
);

formValidation.enableValidation();
