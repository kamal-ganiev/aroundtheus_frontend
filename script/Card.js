import { openModal } from "./utils.js";

const cardImageOverlay = document.querySelector(".modal-preview");
const cardImagePreview = document.querySelector(".modal-preview__image");
const cardImagePreviewTitle = document.querySelector(".modal-preview__title");

class Card {
  constructor(cardImage, cardTitle) {
    this._image = cardImage;
    this._title = cardTitle;
  }

  _setEventListeners(image, likeButton, removeButton) {
    image.addEventListener("click", () => this._modalPreviewImage(image));
    likeButton.addEventListener("click", this._toggleLikeButton);
    removeButton.addEventListener("click", this._removeCard);
  }

  _modalPreviewImage(image) {
    openModal(cardImageOverlay);
    cardImagePreview.src = image.src;
    cardImagePreview.alt = image.alt;
    cardImagePreviewTitle.textContent = image.alt;
  }

  _toggleLikeButton(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle("element__like-button_not-active");
  }

  _removeCard(evt) {
    const eventTarget = evt.target;
    eventTarget.closest(".elements__item").remove();
  }

  _getCardTemplate(cardTemplate) {
    const cloneCardTemplate = cardTemplate.content.cloneNode(true);
    const elementsItem = cloneCardTemplate.querySelector(".elements__item");
    return document.importNode(elementsItem, true);
  }

  renderCard(cardTemplate) {
    this._element = this._getCardTemplate(cardTemplate);
    this._element.querySelector(".element__image").src = this._image;
    this._element.querySelector(".element__image").alt = this._title;
    this._element.querySelector(".element__title").textContent = this._title;
    this._setEventListeners(
      this._element.querySelector(".element__image"),
      this._element.querySelector(".element__like-button"),
      this._element.querySelector(".element__remove-button")
    );

    return this._element;
  }
}

export { Card };
