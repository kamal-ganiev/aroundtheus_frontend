class Card {
  constructor(
    cardImage,
    cardTitle,
    handleOpenImagePreview,
    cardTemplateSelector
  ) {
    this._image = cardImage;
    this._title = cardTitle;
    this._handleOpenImagePreview = handleOpenImagePreview;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  _setEventListeners(likeButton, removeButton) {
    this._imageElement.addEventListener("click", () =>
      this._handleOpenImagePreview(this._imageElement)
    );
    this._likeButton.addEventListener("click", this._toggleLikeButton);
    this._removeButton.addEventListener("click", this._removeCard);
  }

  _toggleLikeButton(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle("element__like-button_not-active");
  }

  _removeCard = (evt) => {
    const eventTarget = evt.target;
    this._element.remove();
    this._element = null;
  };

  _getCardTemplate() {
    return document
      .querySelector(this._cardTemplateSelector)
      .content.cloneNode(true)
      .querySelector(".elements__item");
  }

  renderCard() {
    this._element = this._getCardTemplate();
    this._likeButton = this._element.querySelector(".element__like-button");
    this._removeButton = this._element.querySelector(".element__remove-button");
    this._imageElement = this._element.querySelector(".element__image");
    this._imageElement.src = this._image;
    this._imageElement.alt = this._title;
    this._element.querySelector(".element__title").textContent = this._title;
    this._setEventListeners();

    return this._element;
  }
}

export { Card };
