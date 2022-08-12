export default class Card {
  constructor(data, handleCardClick, cardTemplateSelector, client, deleteCard) {
    this._handleCardClick = handleCardClick;
    this._cardTemplateSelector = cardTemplateSelector;
    this._data = data;
    this._client = client;
    this._deleteCard = deleteCard;
  }

  _setEventListeners() {
    this._image.addEventListener("click", () =>
      this._handleCardClick.open(this._image)
    );
    this._likeButton.addEventListener("click", this._toggleLikeButton);
    this._removeButton.addEventListener("click", this._removeCard);
  }

  _toggleLikeButton(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle("element__like-button_not-active");
  }

  _removeCard = (evt) => {
    evt.target.closest("li").remove();
    this._deleteCard(this._data._id);
  };

  _checkOwner = () => {
    return this._data.owner.name === this._client.name;
  };

  generateCard(like) {
    this._element = document
      .querySelector(this._cardTemplateSelector)
      .content.cloneNode(true)
      .querySelector(".elements__item");
    this._image = this._element.querySelector(".element__image");
    this._likeButton = this._element.querySelector(".element__like-button");
    this._removeButton = this._element.querySelector(".element__remove-button");
    if (!this._checkOwner()) {
      this._removeButton.remove();
    }
    this._likeCounter = this._element.querySelector(".element__like-counter");
    this._likeCounter.textContent = like;
    this._image.src = this._data.link;
    this._image.alt = this._data.name;
    this._element.querySelector(".element__title").textContent =
      this._data.name;
    this._setEventListeners();

    return this._element;
  }
}

export { Card };
