import { handleOpenImagePreview } from "./script.js";

class Card {
  constructor(cardImage, cardTitle) {
    this._image = cardImage;
    this._title = cardTitle;
  }

  _setEventListeners(image, likeButton, removeButton) {
    handleOpenImagePreview(image);
    likeButton.addEventListener("click", this._toggleLikeButton);
    removeButton.addEventListener("click", this._removeCard);
  }

  _toggleLikeButton(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle("element__like-button_not-active");
  }

  _removeCard = (evt) => {
    const eventTarget = evt.target;
    eventTarget.closest(".elements__item").remove();
    this._element = null;
  };

  _getCardTemplate(cardTemplate) {
    const cloneCardTemplate = cardTemplate.content.cloneNode(true);
    const elementsItem = cloneCardTemplate.querySelector(".elements__item");
    return document.importNode(elementsItem, true);
  }

  renderCard(cardTemplate) {
    this._element = this._getCardTemplate(cardTemplate);
    const imageElement = this._element.querySelector(".element__image");
    imageElement.src = this._image;
    imageElement.alt = this._title;
    this._element.querySelector(".element__title").textContent = this._title;
    this._setEventListeners(
      imageElement,
      this._element.querySelector(".element__like-button"),
      this._element.querySelector(".element__remove-button")
    );

    return this._element;
  }
}

export { Card };
