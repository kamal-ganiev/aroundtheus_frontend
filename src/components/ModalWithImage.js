import Modal from "./Modal";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._modalPreviewImage = document.querySelector(`.modal-preview__image`);
    this._modalPreviewTitle = document.querySelector(`.modal-preview__title`);
  }
  open(image) {
    super.open();

    this._modalPreviewImage.src = image.src;
    this._modalPreviewImage.alt = image.alt;
    this._modalPreviewTitle.textContent = image.alt;
  }
}
