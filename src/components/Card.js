import { data } from "autoprefixer";

export default class Card {
  constructor(
    data,
    handleCardClick,
    cardTemplateSelector,
    client,
    handleDeleteIconClick,
    handleLikeToggle
  ) {
    this._handleCardClick = handleCardClick;
    this._cardTemplateSelector = cardTemplateSelector;
    this._data = data;
    this._likes = data.likes;
    this._client = client;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeToggle = handleLikeToggle;
  }

  _setEventListeners() {
    this._image.addEventListener("click", () =>
      this._handleCardClick.open(this._image)
    );
    this._likeButton.addEventListener("click", () => {
      this._handleLikeToggle(this._data, this);
    });
    this._removeButton.addEventListener("click", () => {
      this._handleDeleteIconClick(this._element, this._data);
    });
  }

  updateLikes(newLike) {
    this._likeCounter.textContent = newLike.likes.length;
    this._likes = newLike.likes;
  }

  isLiked(client) {
    if (this._likes.some((like) => like._id === client)) {
      return false;
    } else {
      return true;
    }
  }

  addLike() {
    this._likeButton.classList.remove("element__like-button_not-active");
  }

  removeLike() {
    this._likeButton.classList.add("element__like-button_not-active");
  }

  _checkOwner = () => {
    if (!(this._data.owner._id === this._client._id)) {
      this._removeButton.remove();
    }
  };

  generateCard() {
    this._element = document
      .querySelector(this._cardTemplateSelector)
      .content.cloneNode(true)
      .querySelector(".elements__item");
    this._image = this._element.querySelector(".element__image");
    this._likeButton = this._element.querySelector(".element__like-button");
    this._data.likes.forEach((like) => {
      if (like._id === this._client._id) {
        this._likeButton.classList.toggle("element__like-button_not-active");
      }
    });
    this._removeButton = this._element.querySelector(".element__remove-button");
    if (this._data.owner !== undefined) {
      this._checkOwner();
    }
    this._likeCounter = this._element.querySelector(".element__like-counter");
    this._data.likes === undefined
      ? (this._likeCounter.textContent = 0)
      : (this._likeCounter.textContent = this._data.likes.length);
    this._image.src = this._data.link;
    this._image.alt = this._data.name;
    this._element.querySelector(".element__title").textContent =
      this._data.name;
    this._setEventListeners();

    return this._element;
  }
}

export { Card };
