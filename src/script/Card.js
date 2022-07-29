class Card {
  constructor(handleOpenImagePreview, cardTemplateSelector) {
    this._handleOpenImagePreview = handleOpenImagePreview;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  setEventListeners(image, like, remove) {
    image.addEventListener("click", () =>
      this._handleOpenImagePreview.handleOpenImagePreview(image)
    );
    image.addEventListener("click", () => this._handleOpenImagePreview.open());
    like.addEventListener("click", this._toggleLikeButton);
    remove.addEventListener("click", this._removeCard);
  }

  _toggleLikeButton(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle("element__like-button_not-active");
  }

  _removeCard = (evt) => {
    const eventTarget = evt.target;
    eventTarget.parentNode.parentNode.remove();
  };

  getCardTemplate() {
    return document
      .querySelector(this._cardTemplateSelector)
      .content.cloneNode(true)
      .querySelector(".elements__item");
  }
}

export { Card };
